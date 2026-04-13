from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


# used when a new user registers =>
class RegisterSerializer(serializers.ModelSerializer):      ### password will not be returned in response
    password = serializers.CharField(write_only=True, min_length=6)
    phone = serializers.CharField(required=False, allow_blank=True)

    # check if username is already taken=>
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'phone']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")    
        return value

    def create(self, validated_data):           # this hashes the password automatically
        phone = validated_data.pop('phone', '')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, phone=phone)
        return user

# used to return user info after login
class UserSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source='profile.phone', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone']
