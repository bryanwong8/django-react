from django.db.models import query
from drf_dx_datagrid import DxModelViewSet
from .serializers import TodoSerializer
from .models import Todo


# DxModelViewSet handles the parsing of Devextreme query params
class TodoView(DxModelViewSet):
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = Todo.objects.all()
        completed = self.request.query_params.get('completed')

        # If the flag exists, then filter
        if completed == "true":
                completed = True
        elif completed == "false":
                completed = False
        else:
            return queryset

        return queryset.filter(completed=completed)
