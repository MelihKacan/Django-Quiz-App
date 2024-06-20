from django.shortcuts import render
from .models import Quiz, Results
from .serializer import QuizSerializer, ResultSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

def quiz_page(request,quiz_id):
    
    all_questions = Quiz.objects.all().filter(id = quiz_id)
    currently_user = request.user.id
    quiz = quiz_id
    
    
    context = {
        "all_questions": all_questions,
        "currently_user": currently_user,
        "quiz_id": quiz
    }
    
    return render(request,"quiz_page.html",context)


@api_view(['GET'])
def get_all_car_parks(request,quiz_id):
    all_car_parks = Quiz.objects.all().filter(id = quiz_id)
    serializer = QuizSerializer(all_car_parks,many=True)
    return Response(serializer.data)

from django.http import JsonResponse

@api_view(['GET'])
def get_results(request,quiz_id):
    try:
        all_results = Results.objects.all().filter(results = quiz_id)
        serializer = ResultSerializer(all_results, many=True)
        return Response(serializer.data)
    except Results.DoesNotExist:
        return JsonResponse({'a': 'a'})

@api_view(["POST"])
def post_result(request):
    if request.method == "POST":
        serializer = ResultSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
def index(request):
    all_quizzes = Quiz.objects.all()
    context = {
        "all_quizzes": all_quizzes
    }
    
    return render(request,"index.html",context)