from django.contrib import admin
from .models import Booking

# registering booking model to see all the bookings in admin panel
@admin.register(Booking)

class BookingAdmin(admin.ModelAdmin):
    
    # columns will show in the booking list=>
    list_display = ['user', 'service', 'booking_date', 'booking_time', 'status', 'total_price']
    
    # filters on the right side - makes it easy to find the bookings=>
    list_filter = ['status', 'booking_date']
    
    # search by username or service name=>
    search_fields = ['user__username', 'service__name']
