from rest_framework import serializers
from .models import Product, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'id',
            'product_title',
            'selected_size',
            'selected_color',
            'quantity',
            'price',
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = [
            'id',
            'order_number',
            'customer_name',
            'customer_phone',
            'customer_email',
            'city',
            'address',
            'notes',
            'payment_method',
            'subtotal',
            'delivery_fee',
            'total',
            'status',
            'estimated_delivery',
            'created_at',
            'items',
        ]

    def create(self, validated_data):
        items_data = self.context.get('request').data.get('items', [])
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            # Handle product payload structure from React
            product_info = item_data.get('product', {})
            OrderItem.objects.create(
                order=order,
                product_title=product_info.get('title', item_data.get('product_title', 'Garment')),
                selected_size=item_data.get('selectedSize', item_data.get('selected_size', 'L')),
                selected_color=item_data.get('selectedColor', {}).get('name', item_data.get('selected_color', 'Standard')),
                quantity=item_data.get('quantity', 1),
                price=product_info.get('price', item_data.get('price', 0)),
            )
        
        return order
