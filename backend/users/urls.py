from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view),   # POST - create account
    path('login/', views.login_view),         # POST - login
    path('logout/', views.logout_view),       # POST - logout
    path('me/', views.me_view),               # GET  - get current user
]
