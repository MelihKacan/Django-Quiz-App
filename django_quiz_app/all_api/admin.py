from django.contrib import admin
from .models import Questions, Quiz,Results

admin.site.register(Quiz)
admin.site.register(Questions)
admin.site.register(Results)