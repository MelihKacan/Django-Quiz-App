from django.db import models
from django.contrib.auth.models import User

class Questions(models.Model):
    name = models.CharField(max_length=255)
    header = models.CharField(max_length=9999)
    a = models.CharField(max_length=9999)
    b = models.CharField(max_length=9999)
    c = models.CharField(max_length=9999)
    d = models.CharField(max_length=9999)
    correct_answer = models.CharField(max_length=1)
    answer = models.CharField(max_length=1,null=True,blank=True)
    question_photo = models.ImageField(upload_to="question_photos/%Y/%m/%d/",null=True,blank=True)
    
    def __str__(self):
        return str(self.id)
    
class Quiz(models.Model):
    name = models.CharField(max_length=250)
    questions = models.ManyToManyField(Questions,blank=True,null=True)
    publish_date_time = models.DateTimeField(auto_now=True)
    finish_date_time = models.DateTimeField(null=True,blank=True)
    
class Results(models.Model):
    name = models.ForeignKey(User,null=True,blank=True,on_delete=models.CASCADE)
    success = models.FloatField()
    results = models.ManyToManyField(Quiz,blank=True,null=True)
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    theme = models.BooleanField(default=False)
    profile_photo = models.ImageField(upload_to="profile_photos/%Y/%m/%d/",default="profile_photo_default.png")
    user_level = models.IntegerField(default=1)
    user_exp = models.FloatField(default=0)