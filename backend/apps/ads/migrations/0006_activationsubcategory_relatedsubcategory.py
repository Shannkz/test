# Generated by Django 4.2.3 on 2023-08-05 10:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("ads", "0005_alter_faq_options_remove_faq_created_at_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="ActivationSubCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "sub_category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sub_category_countries",
                        to="ads.subcategory",
                        verbose_name="SubCategorie",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="RelatedSubCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "sub_category_1",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sub_category_relation_1",
                        to="ads.subcategory",
                        verbose_name="SubCategorie",
                    ),
                ),
                (
                    "sub_category_2",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sub_category_relation_2",
                        to="ads.subcategory",
                        verbose_name="SubCategorie",
                    ),
                ),
            ],
            options={
                "unique_together": {("sub_category_1", "sub_category_2")},
            },
        ),
    ]
