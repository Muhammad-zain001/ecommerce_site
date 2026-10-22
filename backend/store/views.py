from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category and category != 'all':
            queryset = queryset.filter(category=category)
        
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(title__icontains=search)
            
        return queryset


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        phone = self.request.query_params.get('phone')
        if phone:
            # Clean customer phone to find their own orders
            clean_digits = ''.join(filter(str.isdigit, phone))
            queryset = queryset.filter(customer_phone__icontains=clean_digits[-9:])
        
        order_num = self.request.query_params.get('order_number')
        if order_num:
            queryset = queryset.filter(order_number__iexact=order_num)
            
        return queryset

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('status')
        if new_status in dict(Order.STATUS_CHOICES):
            order.status = new_status
            order.save()
            return Response(OrderSerializer(order).data)
        return Response({'error': 'Invalid status choice'}, status=status.HTTP_400_BAD_REQUEST)


class DashboardStatsView(APIView):
    """
    Returns store operations summary for the Owner Admin Panel
    """
    def get(self, request):
        total_orders = Order.objects.count()
        total_revenue = Order.objects.aggregate(total=Sum('total'))['total'] or 0
        processing_orders = Order.objects.filter(status='Processing').count()
        dispatched_orders = Order.objects.filter(status='Dispatched').count()
        delivered_orders = Order.objects.filter(status='Delivered').count()
        
        return Response({
            'totalRevenue': float(total_revenue),
            'totalOrders': total_orders,
            'processingCount': processing_orders,
            'dispatchedCount': dispatched_orders,
            'deliveredCount': delivered_orders,
            'avgOrderValue': round(float(total_revenue) / total_orders, 2) if total_orders > 0 else 0
        })
