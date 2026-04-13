from django.apps import AppConfig

# configure class for the bookings app==>
class BookingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bookings'
