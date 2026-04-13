from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import Booking
from .serializers import BookingSerializer
from services.models import Service


@csrf_exempt
@api_view(['GET', 'POST'])
def bookings_view(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Please login to manage bookings.'}, status=401)

    if request.method == 'GET':
        bookings = Booking.objects.filter(user=request.user)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            service = Service.objects.get(id=request.data['service'])
            serializer.save(user=request.user, total_price=service.price)
            service.total_bookings += 1
            service.save()
            return Response({
                'message': 'Booking confirmed! Our professional will be there on time.',
                'booking': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'DELETE'])
def single_booking_view(request, pk):
    if not request.user.is_authenticated:
        return Response({'error': 'Please login.'}, status=401)

    try:
        booking = Booking.objects.get(id=pk, user=request.user)
    except Booking.DoesNotExist:
        return Response({'error': 'Booking not found.'}, status=404)

    if request.method == 'GET':
        return Response(BookingSerializer(booking).data)

    if request.method == 'DELETE':
        if booking.status == 'completed':
            return Response({'error': 'Cannot cancel a completed booking.'}, status=400)
        booking.status = 'cancelled'
        booking.save()
        return Response({'message': 'Booking cancelled successfully.'})