from rest_framework import serializers
from apps.companies.models import Company


from apps.users.models import User
from apps.utils.serializers.base import BaseSerializer


# class UserChildSerializer(BaseSerializer):

#     class Meta:
#         model = User
#         fields = [ 'email', 'first_name', 'last_name',
#                   'phone','contact_person','newsletter']


class VendorUpdateSerializer(BaseSerializer):
    class Meta:
        model = Company
        fields = [
            "name",
            "postal_code",
            "fiscal_code",
            "address",
            "firm_number",
            "bank_name",
            "bank_iban",
            "country",
        ]


class UserUpdateSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "phone"]


class UserDeleteSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = ["password", "delete_reason"]
