from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# main url file - all requests come here first
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),          # login, register, logout
    path('api/services/', include('services.urls')),    # all service related urls
    path('api/bookings/', include('bookings.urls')),    # booking related urls
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
