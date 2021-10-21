from drf_dx_datagrid import DxModelViewSet
from rest_framework import generics
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo
import ast

# Create your views here.
class TodoDx(DxModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
