# Generated by Django 4.2.3 on 2023-07-26 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0003_remove_company_municipality_company_company_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='phone',
        ),
        migrations.AlterField(
            model_name='company',
            name='name',
            field=models.TextField(verbose_name='Denumire Firma'),
        ),
    ]
