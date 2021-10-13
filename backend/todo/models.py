from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    # This method just tells Django what to print when it needs to print out an instance of the any model
    def _str_(self):
        return self.title
