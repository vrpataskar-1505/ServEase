from rest_framework import serializers
from .models import Booking
from services.serializers import ServiceSerializer


class BookingSerializer(serializers.ModelSerializer):
    service_detail = ServiceSerializer(source='service', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'username', 'service', 'service_detail',
            'name', 'phone', 'address', 'pincode',
            'booking_date', 'booking_time',
            'status', 'status_display', 'total_price', 'notes',
            'created_at'
        ]
        read_only_fields = ['user', 'status', 'created_at', 'total_price']