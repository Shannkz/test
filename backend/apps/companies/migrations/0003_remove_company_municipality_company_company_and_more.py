# Generated by Django 4.2.3 on 2023-07-25 18:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0002_ad_city_ad_country_ad_facebook_ad_full_address_and_more'),
        ('companies', '0002_company_municipality_alter_company_address_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='municipality',
        ),
        migrations.AddField(
            model_name='company',
            name='country',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='country_companies', to='ads.country', verbose_name='Judet'),
        ),
        migrations.AlterField(
            model_name='company',
            name='address',
            field=models.TextField(blank=True, null=True, verbose_name='adresa'),
        ),
        migrations.AlterField(
            model_name='company',
            name='bank_iban',
            field=models.TextField(blank=True, null=True, verbose_name='IBAN'),
        ),
        migrations.AlterField(
            model_name='company',
            name='bank_name',
            field=models.TextField(blank=True, null=True, verbose_name='Banca'),
        ),
        migrations.AlterField(
            model_name='company',
            name='firm_number',
            field=models.TextField(blank=True, null=True, verbose_name='Nr. Reg. Comertului'),
        ),
        migrations.AlterField(
            model_name='company',
            name='fiscal_code',
            field=models.TextField(blank=True, null=True, verbose_name='Cod Fiscal'),
        ),
        migrations.AlterField(
            model_name='company',
            name='name',
            field=models.TextField(verbose_name='Categorie'),
        ),
        migrations.AlterField(
            model_name='company',
            name='postal_code',
            field=models.TextField(blank=True, null=True, verbose_name='Cod Postal'),
        ),
    ]
