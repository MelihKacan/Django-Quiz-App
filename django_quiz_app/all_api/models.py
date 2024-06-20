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
    
    def __str__(self):
        return str(self.id)
    
class Quiz(models.Model):
    name = models.CharField(max_length=250)
    questions = models.ManyToManyField(Questions,blank=True,null=True)
    
class Results(models.Model):
    name = models.ForeignKey(User,null=True,blank=True,on_delete=models.CASCADE)
    success = models.FloatField()
    results = models.ManyToManyField(Quiz,blank=True,null=True)