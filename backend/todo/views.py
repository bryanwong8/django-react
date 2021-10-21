from rest_framework import generics
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo
import ast

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


class TodoListView(generics.ListAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        filters = self.request.query_params.get("filter")
        completed = self.request.query_params.get("completed")

        if completed == "false":
            completed = False
        else:
            completed = True

        # This might not be practical so I am looking forward to any improvements/comments :)
        if filters:
            filters = ast.literal_eval(filters)
            title = ""

            # Restict so we only sort by title for now
            if filters[0] == "title":
                title = filters[2]

            return Todo.objects.filter(completed=completed, title=title)

        return Todo.objects.filter(completed=completed)
