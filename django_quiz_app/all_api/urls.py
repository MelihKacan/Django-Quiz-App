from django.urls import path
from . import views

urlpatterns = [
    path("quiz_page/<int:quiz_id>",views.quiz_page,name="quiz_page"),
    path("get_all/<int:quiz_id>",views.get_quiz,name="get_all"),
    path("post_results",views.post_result,name="post_results"),
    path("",views.index,name="index"),
    path("get_results/<int:quiz_id>",views.get_results,name="get_results"),
    path("settings",views.settings,name="settings"),
    path("post_settings",views.post_settings,name="post_settings"),
    path("accounts/login/",views.user_login,name="login"),
    path("accounts/logout/",views.user_logout,name="logout"),
    path("accounts/register/",views.user_register,name="register"),
    path("user_dashboard_api",views.user_dashboard_api,name="user_dashboard_api"),
    path("user_dashboard_web_page",views.user_dashboard_web_page,name="user_dashboard_web_page"),
    path("theme_api",views.theme_api,name="theme_api"),
    path("user_level_api_post",views.user_level_api_post,name="user_level_api_post"),
    path("user_exp_api_post",views.user_exp_api_post,name="user_exp_api_post"),
]
