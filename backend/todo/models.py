from django.db import models
import datetime

LOW = "LOW"
MID = "MID"
HIGH = "HIGH"

MONTH_CHOICES = (
    (LOW, "Low"),
    (MID, "Mid"),
    (HIGH, "High"),
)


class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=4, choices=MONTH_CHOICES, default=LOW)
    due_date = models.DateField(default=datetime.date.today)

    # This method just tells Django what to print when it needs to print out an instance of the any model
    def _str_(self):
        return self.title
