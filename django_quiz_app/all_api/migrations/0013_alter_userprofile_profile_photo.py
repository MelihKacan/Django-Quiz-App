# Generated by Django 5.0.6 on 2024-07-08 16:03

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("all_api", "0012_rename_quiz_photo_questions_question_photo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userprofile",
            name="profile_photo",
            field=models.ImageField(
                default="profile_photos\x824\x06\x18\x07lchemyrefiner_alchemymagic_3_eb248b33-c6c9-48fb-bab2-75e92f71df15_0.jpg",
                upload_to="profile_photos/%Y/%m/%d/",
            ),
        ),
    ]
