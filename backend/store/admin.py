from django.contrib import admin
from .models import Product, Order, OrderItem

admin.site.site_header = "Zain Craft Atelier • Store Management"
admin.site.site_title = "Zain Craft Admin"
admin.site.index_title = "Store Operations & Live Orders"

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'sku', 'category', 'price', 'stock_status', 'is_best_seller')
    list_filter = ('category', 'stock_status', 'is_best_seller')
    search_fields = ('title', 'sku', 'fabric')
    list_editable = ('price', 'stock_status')


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_title', 'selected_size', 'selected_color', 'quantity', 'price')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'customer_name', 'customer_phone', 'city', 'total', 'payment_method', 'status', 'created_at')
    list_filter = ('status', 'payment_method', 'city', 'created_at')
    search_fields = ('order_number', 'customer_name', 'customer_phone', 'city', 'address')
    list_editable = ('status',)
    inlines = [OrderItemInline]
    readonly_fields = ('order_number', 'created_at')
