from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .serializers import RegisterSerializer, UserSerializer


@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        login(request, user)
        return Response({
            'message': 'Account created! Welcome to ServEase.',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '')

    if not username or not password:
        return Response({'error': 'Please enter username and password.'}, status=400)

    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        return Response({
            'message': f'Welcome back, {user.first_name or user.username}!',
            'user': UserSerializer(user).data
        })
    return Response({'error': 'Wrong username or password.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out. See you soon!'})


@api_view(['GET'])
def me_view(request):
    if request.user.is_authenticated:
        return Response(UserSerializer(request.user).data)
    return Response({'error': 'Not logged in.'}, status=status.HTTP_401_UNAUTHORIZED)
