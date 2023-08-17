# Generated by Django 4.2.3 on 2023-07-27 16:22

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0002_ad_city_ad_country_ad_facebook_ad_full_address_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ad',
            options={'ordering': ['-id']},
        ),
        migrations.RemoveField(
            model_name='adsfaqs',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='adsfaqs',
            name='updated_by',
        ),
        migrations.AddField(
            model_name='ad',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='ad',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]