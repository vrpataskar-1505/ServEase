# 🛠️ ServEase — Home Services Booking Platform

> A full-stack web application inspired by Urban Company.  
> Built with **React + Tailwind CSS** (Frontend) | **Django + DRF** (Backend) | **MySQL** (Database)

---

## 📁 Project Structure

```
servease/
├── backend/                   ← Django project
│   ├── servease_project/      ← settings.py, urls.py (main config)
│   ├── users/                 ← Register, Login, Logout APIs
│   ├── services/              ← Service & Category APIs
│   ├── bookings/              ← Booking APIs
│   ├── fixtures/
│   │   └── sample_data.json   ← Sample services to load into DB
│   └── requirements.txt
│
└── frontend/                  ← React app
    ├── public/
    │   └── index.html
    └── src/
        ├── api.js             ← Axios setup (talks to Django)
        ├── App.jsx            ← Routes
        ├── index.css          ← Tailwind + custom styles
        ├── context/
        │   └── AuthContext.jsx ← Global login state
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   └── ServiceCard.jsx
        └── pages/
            ├── Home.jsx
            ├── Services.jsx
            ├── ServiceDetail.jsx
            ├── BookingPage.jsx
            ├── MyBookings.jsx
            ├── Login.jsx
            └── Register.jsx
```

---

## 🚀 Step-by-Step Setup

### 1. MySQL — Create the Database

Open MySQL and run:
```sql
CREATE DATABASE servease_db;
```
Then update `backend/servease_project/settings.py` with your MySQL username and password.

---

### 2. Backend — Django Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create DB tables
python manage.py makemigrations users services bookings
python manage.py migrate

# Load sample data (categories + services)
python manage.py loaddata fixtures/sample_data.json

# Create an admin account (optional, to use Django admin panel)
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

Django runs at: **http://localhost:8000**  
Admin panel: **http://localhost:8000/admin**

---

### 3. Frontend — React Setup

```bash
cd frontend

# Install packages
npm install

# Start React app
npm start
```

React runs at: **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | URL | What it does |
|--------|-----|-------------|
| POST | `/api/users/register/` | Create account |
| POST | `/api/users/login/` | Login |
| POST | `/api/users/logout/` | Logout |
| GET | `/api/users/me/` | Get logged-in user |
| GET | `/api/services/` | List all services |
| GET | `/api/services/?category=1` | Filter by category |
| GET | `/api/services/?search=plumbing` | Search services |
| GET | `/api/services/categories/` | List all categories |
| GET | `/api/services/<id>/` | Get one service |
| GET | `/api/bookings/` | My bookings (login required) |
| POST | `/api/bookings/` | Create booking (login required) |
| DELETE | `/api/bookings/<id>/` | Cancel booking |

---

## 🧰 Services Offered

| Category | Icon |
|----------|------|
| Plumbing | 🔧 |
| Electrical | ⚡ |
| Home Cleaning | 🧹 |
| AC Service | ❄️ |
| Carpentry | 🪵 |
| Painting | 🎨 |
| Chef at Home | 🍳 |

---

## 🎨 Tech Stack

**Frontend:**
- React 18
- React Router v6 (for page navigation)
- Axios (for API calls)
- Tailwind CSS (for styling)
- Google Fonts: Syne + Plus Jakarta Sans

**Backend:**
- Django 4.2
- Django REST Framework (API)
- django-cors-headers (React ↔ Django communication)
- Django Sessions (for login)

**Database:**
- MySQL

---

## 💡 Key Things to Know for Interview

1. **Why Django Sessions?** — Simpler than JWT for beginners. Django handles login cookies automatically.

2. **Why DRF?** — Makes it easy to return JSON from Django views using Serializers.

3. **Why CORS?** — React runs on port 3000, Django on 8000. Without CORS, the browser blocks the request.

4. **Serializer** — Converts a Python object (e.g., a Service) into JSON to send as an API response.

5. **ForeignKey** — Links two tables. A Booking is linked to both a User and a Service.

---

Made with ❤️ as a final-year B.Tech project.
