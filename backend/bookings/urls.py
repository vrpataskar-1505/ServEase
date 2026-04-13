from django.urls import path
from . import views

# booking related URLs
urlpatterns = [
    path('', views.bookings_view),               # GET all bookings / POST create booking
    path('<int:pk>/', views.single_booking_view),# GET / DELETE a specific booking
]
