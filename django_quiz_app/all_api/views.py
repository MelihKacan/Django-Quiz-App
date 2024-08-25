from django.shortcuts import render, redirect
from .models import Quiz, Results, UserProfile
from .serializer import QuizSerializer, ResultSerializer, SettingsSerializer, UserProfileSerializer, UserLevelSeralizer, UserExpSerializer, UserProfilePhotoSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from .forms import LoginForm, RegisterForm
from django.contrib import messages
from django.contrib.auth.models import User

@login_required
def quiz_page(request,quiz_id):
    return render(request,"quiz_page.html")


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


@api_view(['GET'])
def index_api(request):
    all_quizzes = Quiz.objects.all()
    serializer = QuizSerializer(all_quizzes, many=True)
    return Response(serializer.data)

@login_required        
def index(request):    
    return render(request,"index.html")

@login_required
def settings(request): 
    return render(request,"settings.html")

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

def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(request, username = username, password = password)
            
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('index')
                
                else:
                    messages.info(request, 'Disabled Account')   
            else:
                messages.info(request,'Check Your Username and Password')
        
    else:
        form = LoginForm()
    
    return render(request, 'login.html', {'form': form})

@login_required
def user_logout(request):
    logout(request)
    return redirect("index")

def user_register(request):
    form = RegisterForm()
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data["username"]
            created_user = User.objects.get(username = username)
            UserProfile.objects.create(user = created_user)
            messages.success(request, 'Account has been created, You can LOGIN')
            return redirect('login')
    
    else:
        form = RegisterForm()
    
    return render(request, 'register.html', {'form': form})

@api_view(['GET'])
def user_dashboard_api(request):
    solved_quiz_results = Results.objects.filter(name = request.user)
    
    solved_quiz = Quiz.objects.filter(id__in=solved_quiz_results.values_list('results', flat=True))
    
    serialized_solved_quiz_results = ResultSerializer(solved_quiz_results, many=True).data
    
    serialized_solved_quiz = QuizSerializer(solved_quiz,many=True).data
    
    user_name = request.user.username
    
    user_id = request.user.id
    
    user_profile = UserProfile.objects.get(user = request.user)
    
    user_profile_photo = UserProfileSerializer(user_profile).data
    
    context = {
        "solved_quiz_results": serialized_solved_quiz_results,
        "solved_quiz": serialized_solved_quiz,
        "user_name": user_name,
        "user_id": user_id,
        "user_profile": user_profile_photo,
    }
    
    return Response(context)

@login_required
def user_dashboard_web_page(request):
    return render(request,"user_dashboard.html")

@api_view(['GET'])
def theme_api(request):
    request_user_profile = UserProfile.objects.get(user = request.user.id)
    user_theme = request_user_profile.theme
    
    context = {
        "user_theme": user_theme,
    }
    
    return Response(context)

@api_view(['POST'])
def user_level_api_post(request):
    if request.method == 'POST':
        serializer = UserLevelSeralizer(data = request.data)
        if serializer.is_valid():
            currently_user = UserProfile.objects.get(user = serializer.validated_data["user"])
            currently_user.user_exp = serializer.validated_data["user_exp"]
            currently_user.user_level = serializer.validated_data["user_level"]
            currently_user.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
@api_view(['POST'])
def user_exp_api_post(request):
    if request.method == 'POST':
        serializer = UserExpSerializer(data = request.data)
        if serializer.is_valid():
            currently_user = UserProfile.objects.get(user = serializer.validated_data["currently_user"])
            currently_user.user_exp += serializer.validated_data["exp"]
            currently_user.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
@api_view(['POST'])
def user_photo_api_post(request):
    if request.method == "POST":
        serializer = UserProfilePhotoSerializer(data = request.data)
        if serializer.is_valid():
            currently_user = UserProfile.objects.get(user = request.user)
            currently_user.profile_photo = serializer.validated_data["profile_photo"]
            currently_user.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
@api_view(['GET'])
def get_user_id(request):
    currently_user = request.user.id
    
    context = {
        "user_id": currently_user,
    }
    
    return Response(context)

def all_quizzes_web_page(request):
    return render(request,"all_quizzes.html")


from rest_framework.pagination import PageNumberPagination

@api_view(['GET'])
def all_quizzes_api(request):
    all_quizzes = Quiz.objects.all().order_by("id") #It Will Change According To Popularity In Next Updates
    pagination = PageNumberPagination()
    pagination.page_size = 1  #Will Be Change In Next Updates (To 10 Or 20)
    pagination.page_query_param = "page"
    paginated_all_quizzes = pagination.paginate_queryset(all_quizzes, request)
    serializer = QuizSerializer(paginated_all_quizzes, many=True)
    return pagination.get_paginated_response(serializer.data)