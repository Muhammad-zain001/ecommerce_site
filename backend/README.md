# Zain Craft Atelier • Django Backend

This is the production-ready Django REST Framework backend for the **Zain Craft Atelier** e-commerce store.

---

## 🚀 How to Run in 3 Steps (Quickstart)

### Step 1: Open Terminal in the `backend/` Folder
```bash
cd backend
```

### Step 2: Create a Virtual Environment & Install Dependencies
```bash
# On Windows:
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# On Mac/Linux:
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 3: Run Database Migrations & Seed Products
```bash
python manage.py makemigrations
python manage.py migrate

# Seed all initial products (Giza Shalwar Kameez, Kurta, Linen Shirt, Chore Jacket)
python seed_data.py

# Create your store owner credentials for Django Admin:
python manage.py createsuperuser
```

### Step 4: Start Django Server
```bash
python manage.py runserver
```

That's it!
* **API Root:** `http://127.0.0.1:8000/api/`
* **Products API:** `http://127.0.0.1:8000/api/products/`
* **Orders API:** `http://127.0.0.1:8000/api/orders/`
* **Admin Dashboard:** `http://127.0.0.1:8000/admin/`

---

## ⚡ Connecting with React Frontend
Your React frontend automatically looks for `http://127.0.0.1:8000/api/`. When Django is running, orders and products sync live with SQLite database. When Django is not running, React seamlessly uses localStorage as a fallback.
