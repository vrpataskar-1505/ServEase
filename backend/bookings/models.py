from django.db import models
from django.contrib.auth.models import User
from services.models import Service

# this model stores all booking details when a user books a service
class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending',    'Pending'),      # bookings can have 4 states
        ('confirmed',  'Confirmed'),
        ('completed',  'Completed'),
        ('cancelled',  'Cancelled'),     
    ]

    # linking booking to a user and a service
    
    user        = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    service     = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='bookings')

    # Customer details at time of booking a service
    name        = models.CharField(max_length=100)
    phone       = models.CharField(max_length=10)
    address     = models.TextField()
    pincode     = models.CharField(max_length=6)

    booking_date = models.DateField()                
    booking_time = models.CharField(max_length=20)   # e.g. "10:00 AM"

    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_price  = models.DecimalField(max_digits=8, decimal_places=2)
    notes        = models.TextField(blank=True)      # optional field

    created_at   = models.DateTimeField(auto_now_add=True)  # auto sets when booking is created

    def __str__(self):
        return f"{self.user.username} → {self.service.name} on {self.booking_date}"

    class Meta:
        ordering = ['-created_at']   # latest bookings show first
