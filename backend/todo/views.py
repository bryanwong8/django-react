from django.db.models import F
from rest_framework import filters, pagination, viewsets
from .serializers import TodoSerializer
from .models import Todo
import json


# Function to convert the filters to a dictionary to make it easier to filter
def convert_filters_to_dict(filters):
    filter_dict = {}

    # If this is the case then we have a 2d list of filters(two filters or more)
    if isinstance(filters[0], list):
        for i in range(len(filters)):
            if isinstance(filters[i], list):
                curr_filter = filters[i]
                filter_dict[curr_filter[0]] = curr_filter[2]
    # We have a 1d array and can just pull the attributes out(only occurs when there is only one filter applied)
    else:
        filter_dict[filters[0]] = filters[2]

    return filter_dict


# Class to apply filter params from DevExtreme
class DevExtremeFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        """Filter queryset by DevExtreme parameters"""

        filters = request.query_params.get("filter")

        if filters:
            filters = json.loads(filters)
            filter_dict = convert_filters_to_dict(filters)

            # Loops through filter dictionary and applies appropriate filters
            for key, val in filter_dict.items():
                if key == "title":
                    queryset = queryset.filter(title__icontains=val)
                elif key == "description":
                    queryset = queryset.filter(description__icontains=val)
                elif key == "priority":
                    queryset = queryset.filter(priority__icontains=val)
                elif key == "due_date":
                    queryset = queryset.filter(due_date__icontains=val)

        return queryset


# Class to apply pagination from DevExtreme
class DevExtremePagination(pagination.LimitOffsetPagination):
    default_limit = 5
    limit_query_param = "take"
    offset_query_param = "skip"


# Class to order data from DevExtreme
class DevExtremeOrdering(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        """Order queryset by DevExtreme parameters"""
        sort_params = request.query_params.get("sort")

        if sort_params:
            sort_params = json.loads(sort_params)[0]
            param = sort_params["selector"]
            queryset = queryset.order_by(param)

            if sort_params["desc"]:
                return queryset.order_by(F(param).desc())

        return queryset


# Class to filter out completed and incompleted Todos
class CompletedFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        """Filter queryset by completed"""

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
    filter_backends = [
        CompletedFilter,
        DevExtremeFilter,
        DevExtremeOrdering,
    ]
    pagination_class = DevExtremePagination
