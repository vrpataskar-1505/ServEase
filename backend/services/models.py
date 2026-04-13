from django.db import models

# category model - e.g. Plumbing, Electrical, Cleaning
class Category(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=10, default='🔧')    # emoji icon
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'

# service model - e.g. "AC Service", "Kitchen Deep Clean"=>
class Service(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='services')
    description = models.TextField()
    what_you_get = models.TextField(blank=True, help_text="Comma-separated list of inclusions")
    price = models.DecimalField(max_digits=8, decimal_places=2)
    duration_hours = models.FloatField(default=1.0)
    rating = models.FloatField(default=4.5)
    total_bookings = models.IntegerField(default=0)
    is_available = models.BooleanField(default=True)
    image_url = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
