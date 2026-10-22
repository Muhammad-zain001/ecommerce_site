from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('shalwar-kameez', 'Shalwar Kameez'),
        ('kurtas', 'Kurtas'),
        ('shirts', 'Shirts'),
        ('outerwear', 'Outerwear'),
    ]

    STOCK_CHOICES = [
        ('In Stock', 'In Stock'),
        ('Low Stock', 'Low Stock'),
        ('Pre-Order', 'Pre-Order'),
    ]

    title = models.CharField(max_length=255)
    sku = models.CharField(max_length=60, unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    category_label = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.9)
    review_count = models.PositiveIntegerField(default=24)
    stock_status = models.CharField(max_length=30, choices=STOCK_CHOICES, default='In Stock')
    fabric = models.TextField()
    fit = models.TextField(default='Tailored Silhouette')
    care = models.TextField(default='Gentle wash or Dry clean recommended.')
    model_info = models.CharField(max_length=255, default='Model is 6\'1" wearing Large')
    description = models.TextField()
    features = models.JSONField(default=list, blank=True)
    images = models.JSONField(default=list, blank=True)
    sizes = models.JSONField(default=list, blank=True)
    colors = models.JSONField(default=list, blank=True)
    is_best_seller = models.BooleanField(default=False)
    is_new_arrival = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.sku}) - Rs. {self.price}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('Confirmed', 'Confirmed'),
        ('Processing', 'Processing (Tailoring)'),
        ('Dispatched', 'Dispatched (Courier)'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    PAYMENT_CHOICES = [
        ('cod', 'Cash on Delivery (COD)'),
        ('bank_transfer', 'Direct Bank Transfer (Meezan)'),
    ]

    order_number = models.CharField(max_length=50, unique=True)
    customer_name = models.CharField(max_length=150)
    customer_phone = models.CharField(max_length=30)
    customer_email = models.EmailField(blank=True, null=True)
    city = models.CharField(max_length=100)
    address = models.TextField()
    notes = models.TextField(blank=True, null=True)
    payment_method = models.CharField(max_length=30, choices=PAYMENT_CHOICES, default='cod')
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Confirmed')
    estimated_delivery = models.CharField(max_length=100, default='2–3 business days')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order_number} - {self.customer_name} ({self.city}) - Rs. {self.total}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    product_title = models.CharField(max_length=255)
    selected_size = models.CharField(max_length=20)
    selected_color = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product_title} ({self.selected_size}) x {self.quantity}"
