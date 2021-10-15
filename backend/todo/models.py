from django.db import models
from django.utils import timezone

LOW = "LOW"
MID = "MID"
HIGH = "HIGH"

PRIORITY_CHOICES = (
    (LOW, "Low"),
    (MID, "Mid"),
    (HIGH, "High"),
)


class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=4, choices=PRIORITY_CHOICES, default=LOW)
    due_date = models.DateField(auto_now_add=False, null=True)

    # This method just tells Django what to print when it needs to print out an instance of the any model
    def _str_(self):
        return self.title
