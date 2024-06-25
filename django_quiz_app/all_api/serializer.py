from rest_framework import serializers
from .models import Quiz, Questions, Results
from django.contrib.auth.models import User

class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ['id', 'name', 'correct_answer']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionsSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'name', 'questions','publish_date_time','finish_date_time']

class ResultSerializer(serializers.ModelSerializer):
    name = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        allow_null = True
    )
    results = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Quiz.objects.all()
    )
    
    class Meta:
        model = Results
        fields = ["name", "success", "results"]

    def create(self, validated_data):
        results_data = validated_data.pop('results')
        result = Results.objects.create(**validated_data)
        result.results.set(results_data)
        return result

class SettingsSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    theme = serializers.BooleanField()