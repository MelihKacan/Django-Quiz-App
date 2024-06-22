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
]
