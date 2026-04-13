import os
from django.core.wsgi import get_wsgi_application

# this file is needed to run the django app
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'servease_project.settings')

application = get_wsgi_application()