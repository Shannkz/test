# Generated by Django 4.2.3 on 2023-08-05 11:06

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ads", "0006_activationsubcategory_relatedsubcategory"),
    ]

    operations = [
        migrations.AddField(
            model_name="ad",
            name="name",
            field=models.CharField(default="Ad", verbose_name="Commercial Name"),
        )
    ]
