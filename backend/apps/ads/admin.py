from django.contrib import admin

# Register your models here.

# Register your models here.
from .models import (
    FAQ,
    Ad,
    Category,
    SubCategory,
    Country,
    RelatedSubCategory,
    ActivationSubCategory,
    Gallery,
)


class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 1


class FAQInline(admin.TabularInline):
    model = FAQ
    extra = 1


class AdAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "company",
    )
    search_fields = [
        "id",
        "name",
    ]
    raw_id_fields = (
        "company",
        "sub_category",
        "related_sub_categories",
    )
    filter_horizontal = ("activation_countries",)

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "created_at",
                    "name",
                    "company",
                    "activation_countries",
                )
            },
        ),
        (
            "Description",
            {"fields": ("description",)},
        ),
        (
            "Contact Information",
            {
                "fields": (
                    "website",
                    "country",
                    "city",
                    "street",
                    "number",
                    "full_address",
                )
            },
        ),
        (
            "Categorie Information",
            {
                "fields": (
                    "sub_category",
                    "related_sub_categories",
                )
            },
        ),
        (
            "Offered Services Information",
            {"fields": ("offered_services",)},
        ),
        (
            "Social Media Information",
            {
                "fields": (
                    "facebook",
                    "instagram",
                    "youtube",
                    "tiktok",
                    "twitter",
                    "others",
                )
            },
        ),
    )
    inlines = (
        GalleryInline,
        FAQInline,
    )


class CountyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )
    search_fields = [
        "id",
        "name",
    ]


class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )
    search_fields = [
        "id",
        "name",
    ]


class SubCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "category",
        "name",
    )
    search_fields = [
        "id",
        "name",
    ]

    raw_id_fields = ("category",)


class GalleryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "ad",
    )
    search_fields = [
        "id",
        "ad__name",
    ]


class ActivationSubCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "sub_category",
    )
    search_fields = [
        "id",
        "sub_category__name",
    ]

    raw_id_fields = ("sub_category",)


class RelatedSubCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "sub_category_1",
        "sub_category_2",
    )
    search_fields = [
        "id",
        "sub_category_1__name",
        "sub_category_2__name",
    ]

    raw_id_fields = (
        "sub_category_1",
        "sub_category_2",
    )


class FAQAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "ad",
        "sub_category",
        "type",
        "question",
        "answer_input",
    )
    search_fields = [
        "id",
        "ad__name",
        "sub_category__name",
        "type",
        "question",
        "answer_input",
    ]

    raw_id_fields = (
        "ad",
        "sub_category",
    )


admin.site.register(Ad, AdAdmin)

admin.site.register(Gallery, GalleryAdmin)

admin.site.register(Category, CategoryAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)
admin.site.register(Country, CountyAdmin)
admin.site.register(FAQ, FAQAdmin)
admin.site.register(RelatedSubCategory, RelatedSubCategoryAdmin)
admin.site.register(ActivationSubCategory, ActivationSubCategoryAdmin)
