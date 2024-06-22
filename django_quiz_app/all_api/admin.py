from django.contrib import admin
from .models import Questions, Quiz,Results, UserProfile

admin.site.register(Quiz)
admin.site.register(Questions)
admin.site.register(Results)
admin.site.register(UserProfile)