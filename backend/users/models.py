from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    """
    Extra info linked to Django's built-in User.
    Django already handles username, email, password for us.
    We just store the extra stuff here.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=10, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"
