from rest_framework import filters, viewsets
from .serializers import TodoSerializer
from .models import Todo


class CompletedFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        """Filter queryset by completed"""

        print(request.query_params)
        print(queryset)
        completed = request.query_params.get("completed")

        # If the flag exists, then filter
        if completed == "true":
            completed = True
        elif completed == "false":
            completed = False
        else:
            return queryset

        return queryset.filter(completed=completed)


# View to handle CRUD routes
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    filter_backends = [CompletedFilter]
