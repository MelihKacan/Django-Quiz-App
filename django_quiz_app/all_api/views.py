from django.shortcuts import render
from .models import Quiz, Results, UserProfile
from .serializer import QuizSerializer, ResultSerializer, SettingsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

def quiz_page(request,quiz_id):
    
    all_questions = Quiz.objects.all().filter(id = quiz_id)
    currently_user = request.user.id
    quiz = quiz_id
    request_user_profile = UserProfile.objects.get(user = request.user.id)
    user_theme = request_user_profile.theme
    
    context = {
        "all_questions": all_questions,
        "currently_user": currently_user,
        "quiz_id": quiz,
        "user_theme": user_theme
    }
    
    return render(request,"quiz_page.html",context)


@api_view(['GET'])
def get_quiz(request,quiz_id):
    quiz = Quiz.objects.all().filter(id = quiz_id)
    serializer = QuizSerializer(quiz,many=True)
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
    request_user_profile = UserProfile.objects.get(user = request.user.id)
    user_theme = request_user_profile.theme
    
    context = {
        "all_quizzes": all_quizzes,
        "user_theme": user_theme
    }
    
    return render(request,"index.html",context)

def settings(request):
    request_user_profile = UserProfile.objects.get(user = request.user.id)
    user_theme = request_user_profile.theme
    user_id = request.user.id
    
    context = {
        "user_theme": user_theme,
        "user_id": user_id,
    }
    
    return render(request,"settings.html",context)

@api_view(['POST'])
def post_settings(request):
    if request.method == "POST":
        serializer = SettingsSerializer(data = request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            theme = serializer.validated_data['theme']
            request_user_profile = UserProfile.objects.get(user = user_id)
            request_user_profile.theme = theme
            request_user_profile.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        