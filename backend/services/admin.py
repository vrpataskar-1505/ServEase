from django.contrib import admin
from .models import Category, Service

# registered Category so I can add/edit categories from admin panel
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon']

# registered Service with some extra filters and search
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'rating', 'is_available']
    list_filter = ['category', 'is_available']
    search_fields = ['name']
