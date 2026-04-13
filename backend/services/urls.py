from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_services),
    path('categories/', views.get_all_categories),
    path('<int:pk>/', views.get_single_service),
]
