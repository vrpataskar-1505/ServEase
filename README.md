# ServEase 🛠️
### A Home Services Booking Web App

I built this project — basically an Urban Company clone but simpler.  
You can browse services, create an account, book a service, and cancel it too.

**Tech used:** React + Tailwind CSS | Django + Django REST Framework | SQLite

---

## 💡 What does this app do?

- Browse home services like Plumbing, Electrical, AC Repair, Cleaning etc.
- Register and Login
- Book any service by picking a date and time slot
- View and cancel your bookings
- Admin can manage everything from Django's admin panel

---

## 🗂️ Project Structure

```
servease/
├── backend/              → Django (API + Database)
│   ├── users/            → Login, Register, Logout
│   ├── services/         → All service listings
│   ├── bookings/         → Booking logic
│   └── servease_project/ → Main settings and URLs
│
└── frontend/             → React App
    └── src/
        ├── pages/        → Home, Services, Booking, My Bookings etc.
        ├── components/   → Navbar, Footer, ServiceCard
        └── context/      → Login state (AuthContext)
```

---

## 🚀 How to Run This Project

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations users services bookings
python manage.py migrate
python manage.py loaddata fixtures/sample_data.json
python manage.py runserver
```

Django will run at → http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm start
```

React will run at → http://localhost:3000

> Make sure both are running at the same time!
git 
---

## 🔌 API Endpoints I Made

| Method | URL | What it does |
|--------|-----|-------------|
| POST | `/api/users/register/` | Create account |
| POST | `/api/users/login/` | Login |
| POST | `/api/users/logout/` | Logout |
| GET | `/api/users/me/` | Who is logged in? |
| GET | `/api/services/` | Get all services |
| GET | `/api/services/?search=ac` | Search services |
| GET | `/api/services/?category=1` | Filter by category |
| GET | `/api/services/categories/` | Get all categories |
| GET | `/api/services/<id>/` | Single service detail |
| GET | `/api/bookings/` | My bookings |
| POST | `/api/bookings/` | Book a service |
| DELETE | `/api/bookings/<id>/` | Cancel booking |

---

## 🧰 Services Available

Plumbing 🔧 | Electrical ⚡ | Home Cleaning 🧹
AC Service ❄️ | Carpentry 🪵 | Painting 🎨 | Chef at Home 🍳

---

## 📚 Tech Stack

**Frontend**
- React 18 + React Router v6
- Tailwind CSS
- Axios (for API calls)

**Backend**
- Django 4.2
- Django REST Framework
- Django Sessions for auth
- CORS headers

**Database**
- SQLite (used for development)
- Can be switched to MySQL in production by changing 4 lines in settings.py

---

## ⚙️ Admin Panel

```bash
python manage.py createsuperuser
```

Then go to → http://localhost:8000/admin
You can see all users, services and bookings from here.

---

## 🤔 Why I chose these technologies

- **Django** — Python based, easy to understand, has built-in admin panel
- **DRF** — Makes building APIs super simple using Serializers and Views
- **React** — Component based, easy to manage pages and state
- **SQLite** — Zero setup needed, perfect for development and demos

---

*Built by Vaishnavi Pataskar — B.Tech Final Year Project* 🙂
