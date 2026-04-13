from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['user', 'service', 'booking_date', 'booking_time', 'status', 'total_price']
    list_filter = ['status', 'booking_date']
    search_fields = ['user__username', 'service__name']
