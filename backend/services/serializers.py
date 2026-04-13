from rest_framework import serializers
from .models import Category, Service



# converts Service model to JSON=>
class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_icon = serializers.CharField(source='category.icon', read_only=True)
    what_you_get_list = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'category', 'category_name', 'category_icon',
            'description', 'what_you_get', 'what_you_get_list',
            'price', 'duration_hours', 'rating', 'total_bookings',
            'is_available', 'image_url'
        ]
        
    # e.g. "Tap repair, Pipe sealing" → ["Tap repair", "Pipe sealing"]
    def get_what_you_get_list(self, obj):
        if obj.what_you_get:
            return [item.strip() for item in obj.what_you_get.split(',')]
        return []


# converts Category model to JSON - also includes its services
class CategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    service_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'description', 'service_count', 'services']

    # count only available services
    def get_service_count(self, obj):
        return obj.services.filter(is_available=True).count()
