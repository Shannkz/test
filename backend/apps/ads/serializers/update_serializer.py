from apps.ads.models import FAQ, Ad, Category, Country, SubCategory
from apps.utils.serializers.base import BaseSerializer


class AdUpdateSerializer(BaseSerializer):
    
    
    class Meta:
        model = Ad
        fields = '__all__'

class SubCategoryUpdateSerializer(BaseSerializer):
    
    
    class Meta:
        model = SubCategory
        fields = '__all__'


class CategoryUpdateSerializer(BaseSerializer):
    
    
    class Meta:
        model = Category
        fields = '__all__'

class CountryUpdateSerializer(BaseSerializer):
    
    
    class Meta:
        model = Country
        fields = '__all__'


class FaqsUpdateSerializer(BaseSerializer):
    
    
    class Meta:
        model = FAQ
        fields = '__all__'