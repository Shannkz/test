# Generated by Django 4.2.3 on 2023-07-25 18:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_contact_person_user_newsletter_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='contact_person',
        ),
    ]
