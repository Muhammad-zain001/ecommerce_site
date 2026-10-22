"""
Run this script to seed all Zain Craft Atelier products into your Django database:
python seed_data.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from store.models import Product

PRODUCTS_DATA = [
    {
        'title': 'The Royal Giza Shalwar Kameez with Waistcoat',
        'category': 'shalwar-kameez',
        'category_label': 'Shalwar Kameez',
        'price': 8950.00,
        'original_price': 10500.00,
        'sku': 'ZK-SK-2026-01',
        'rating': 4.9,
        'review_count': 42,
        'stock_status': 'In Stock',
        'fabric': '100% Superfine Egyptian Giza Cotton & Structured Tropical Waistcoat',
        'fit': 'Tailored Traditional Silhouette with Contemporary Chest Structure',
        'care': 'Dry clean recommended for waistcoat; gentle hand wash for Kameez Shalwar.',
        'model_info': 'Model is 6\'1" (185cm) / 79kg wearing Size Large',
        'description': 'A masterpiece of Pakistani sartorial craftsmanship. Crafted from handpicked long-staple Egyptian Giza cotton, complemented by a structured charcoal waistcoat.',
        'features': [
            'Pure Egyptian cotton with silky hand-feel and breathable weave',
            'Crisp band collar (Sherwani neckline) with concealed placket',
            'Matching tailored Shalwar with refined cuff gathering',
            'Charcoal tropical waistcoat with internal silk lining',
            'Wrinkle-resistant luxury finish'
        ],
        'images': [
            '/images/category_shalwar_kameez_1791520997987.jpg',
            '/images/hero_menswear_editorial_1791520981668.jpg',
            '/images/craftsmanship_fabric_detail_1791521042891.jpg'
        ],
        'sizes': ['S', 'M', 'L', 'XL', 'XXL'],
        'colors': [
            {'name': 'Charcoal & Off-White', 'hex': '#242424'},
            {'name': 'Pure White & Slate', 'hex': '#EBEBEB'}
        ],
        'is_best_seller': True,
        'is_new_arrival': False,
    },
    {
        'title': 'The Atelier Olive Kurta & Trouser Ensemble',
        'category': 'kurtas',
        'category_label': 'Kurtas',
        'price': 6850.00,
        'original_price': 7800.00,
        'sku': 'ZK-KT-2026-02',
        'rating': 5.0,
        'review_count': 29,
        'stock_status': 'In Stock',
        'fabric': 'Organic Long-Staple Twill Cotton with Matte Lustre',
        'fit': 'Straight Cut Kurta with Tailored Pakistani Trouser',
        'care': 'Machine wash cold with like colors, warm iron while slightly damp.',
        'model_info': 'Model is 6\'0" / 75kg wearing Size Medium',
        'description': 'Sophisticated Pakistani casual elegance. Cut in deep earthy tones with a subtle tailored shoulder and side slit bar-tacking.',
        'features': [
            '100% fine cotton twill with natural cooling properties',
            'Sleek notch placket with hand-sewn cross-stitches',
            'Includes matching straight-cut trouser with internal drawstring',
            'Deep side inseam pockets'
        ],
        'images': [
            '/images/hero_menswear_editorial_1791520981668.jpg',
            '/images/craftsmanship_fabric_detail_1791521042891.jpg'
        ],
        'sizes': ['S', 'M', 'L', 'XL'],
        'colors': [
            {'name': 'Deep Olive', 'hex': '#2E4A3B'},
            {'name': 'Warm Khaki', 'hex': '#C2B280'}
        ],
        'is_best_seller': True,
        'is_new_arrival': True,
    },
    {
        'title': 'Loomed Crisp Linen Sartorial Shirt',
        'category': 'shirts',
        'category_label': 'Shirts',
        'price': 4950.00,
        'original_price': 5800.00,
        'sku': 'ZK-SH-2026-03',
        'rating': 4.8,
        'review_count': 18,
        'stock_status': 'In Stock',
        'fabric': '100% Pure Normandy Flax Linen (140 GSM)',
        'fit': 'Relaxed Smart Fit with Curved Shirt Hem',
        'care': 'Machine wash cold, air dry in shade to preserve crisp linen texture.',
        'model_info': 'Model is 6\'2" wearing Large',
        'description': 'Pure Italian-inspired luxury linen shirts engineered specifically for warm climates across Pakistan.',
        'features': [
            'Breathable 100% pure linen from European flax',
            'Reinforced spread collar with collar stays',
            'Genuine mother-of-pearl finish buttons'
        ],
        'images': [
            '/images/category_shirts_casual_1791521010064.jpg',
            '/images/craftsmanship_fabric_detail_1791521042891.jpg'
        ],
        'sizes': ['M', 'L', 'XL'],
        'colors': [
            {'name': 'Chambray Slate', 'hex': '#708090'},
            {'name': 'Crisp White', 'hex': '#FFFFFF'}
        ],
        'is_best_seller': False,
        'is_new_arrival': True,
    },
    {
        'title': 'The Rawalpindi Chore Jacket & Overshirt',
        'category': 'outerwear',
        'category_label': 'Outerwear',
        'price': 9450.00,
        'original_price': 11500.00,
        'sku': 'ZK-OW-2026-04',
        'rating': 4.9,
        'review_count': 33,
        'stock_status': 'Low Stock',
        'fabric': 'Heavyweight Brushed Wool Blend (380 GSM)',
        'fit': 'Architectural Boxy Cut with Room for Layering',
        'care': 'Specialist dry clean only.',
        'model_info': 'Model is 6\'1" wearing Large',
        'description': 'Designed for brisk northern and Punjab winters. Features three deep patch utility pockets and heavy horn buttons.',
        'features': [
            'Heavyweight insulating wool blend',
            'Three front patch pockets with double needle stitching',
            'Internal passport/phone welt pocket'
        ],
        'images': [
            '/images/category_outerwear_jackets_1791521024708.jpg',
            '/images/craftsmanship_fabric_detail_1791521042891.jpg'
        ],
        'sizes': ['M', 'L', 'XL', 'XXL'],
        'colors': [
            {'name': 'Espresso Tweed', 'hex': '#362B28'},
            {'name': 'Midnight Navy', 'hex': '#1B263B'}
        ],
        'is_best_seller': True,
        'is_new_arrival': False,
    }
]

def seed():
    print("Seeding Zain Craft Atelier products into Django database...")
    for item in PRODUCTS_DATA:
        p, created = Product.objects.update_or_create(
            sku=item['sku'],
            defaults=item
        )
        status_msg = "Created" if created else "Updated"
        print(f"[{status_msg}] {p.title} - Rs. {p.price}")
    print("\n✓ Successfully seeded database! Start server with: python manage.py runserver")

if __name__ == '__main__':
    seed()
