# Generated by Django 4.2.3 on 2023-07-27 15:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_user_bio_remove_user_gender_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='avatar_url',
        ),
        migrations.RemoveField(
            model_name='user',
            name='linked_entity_id',
        ),
        migrations.RemoveField(
            model_name='user',
            name='linked_entity_type',
        ),
        migrations.RemoveField(
            model_name='user',
            name='role',
        ),
    ]
