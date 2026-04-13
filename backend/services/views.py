from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category, Service
from .serializers import CategorySerializer, ServiceSerializer


# returns all categories
@api_view(['GET'])
def get_all_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# returns all services - also supports filtering and search
@api_view(['GET'])
def get_all_services(request):
    services = Service.objects.filter(is_available=True)
    
    # filter by category if provided in URL like=> /api/services/?category=1
    category_id = request.query_params.get('category')
    if category_id:
        services = services.filter(category_id=category_id)

    # search by name like=> /api/services/?search=plumbing
    search = request.query_params.get('search')
    if search:
        services = services.filter(name__icontains=search)

    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)

# returns a single service by id=>
@api_view(['GET'])
def get_single_service(request, pk):
    try:
        service = Service.objects.get(id=pk, is_available=True)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found.'}, status=404)
    return Response(ServiceSerializer(service).data)
