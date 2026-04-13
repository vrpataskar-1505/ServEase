from django.urls import path
from . import views

# service related URLs
urlpatterns = [
    path('', views.get_all_services),                   # GET all services
    path('categories/', views.get_all_categories),      # GET all categories
    path('<int:pk>/', views.get_single_service),        # GET single service by id
]
