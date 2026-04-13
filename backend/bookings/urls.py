from django.urls import path
from . import views

urlpatterns = [
    path('', views.bookings_view),
    path('<int:pk>/', views.single_booking_view),
]
