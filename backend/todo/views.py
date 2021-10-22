from drf_dx_datagrid import DxModelViewSet
from .serializers import TodoSerializer
from .models import Todo


# DxModelViewSet handles the parsing of Devextreme query params
class TodoView(DxModelViewSet):
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = Todo.objects.all()
        completed = self.request.query_params.get('completed')

        if completed == "true":
            completed = True
        else:
            completed = False

        return queryset.filter(completed=completed)
