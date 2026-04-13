from rest_framework import serializers
from .models import Booking
from services.serializers import ServiceSerializer

# serializer => converts Booking model data into JSON format
class BookingSerializer(serializers.ModelSerializer):
    
    # these are extra fields added to get more details in the response=>
    service_detail = ServiceSerializer(source='service', read_only=True)         # full service info
    username = serializers.CharField(source='user.username', read_only=True)     # show username
    status_display = serializers.CharField(source='get_status_display', read_only=True)     # e.g. "Pending" instead of "pending"

    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'username', 'service', 'service_detail',
            'name', 'phone', 'address', 'pincode',
            'booking_date', 'booking_time',
            'status', 'status_display', 'total_price', 'notes',
            'created_at'
        ]
        
        # these fields are set by backend only, user can't change them
        read_only_fields = ['user', 'status', 'created_at', 'total_price']