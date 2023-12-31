import datetime
from re import sub
from apps.companies.serializers.update_serializers import UserDeleteSerializer, UserUpdateSerializer
from apps.users.constants import USER_ROLE_TYPES
from apps.users.permissions import IsSuperAdmin, IsVendorUser
from apps.users.serializers import (
    CreateUserSerializer,
    CustomTokenObtainPairSerializer,
    GetUserSerializer,
    UpdatePasswordSerializer,
    ValidatePasswordSerializer,
)
from rest_framework.decorators import action
from rest_framework.response import Response
import jwt
from rest_framework import status
from apps.users.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from  my_site.settings import SECRET_KEY


from apps.utils.views.base import BaseViewset, ResponseInfo
from rest_framework.permissions import IsAuthenticated


class UserViewSet(BaseViewset):
    """
    API endpoints that allows users to be viewed.
    """
    queryset = User.objects.all()
    action_serializers = {
        'default': GetUserSerializer,
        'validate_user': ValidatePasswordSerializer,
        'update_password': UpdatePasswordSerializer,
        'partial_update':UserUpdateSerializer,
        'delete_user':UserDeleteSerializer
    }
    action_permissions = {
        'default': [IsAuthenticated],
        'partial_update':[IsAuthenticated,IsSuperAdmin|IsVendorUser],
        'retrieve':[IsAuthenticated,IsSuperAdmin|IsVendorUser],
        'delete_user':[IsAuthenticated,IsSuperAdmin|IsVendorUser],
    }
    user_role_queryset = {
        USER_ROLE_TYPES['VENDOR']: lambda self: User.objects.filter(
            id=self.request.user.id
        )
    }

    @action(detail=False, url_path='validate-user', methods=['post'])
    def validate_user(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.validated_data.get('password', None)
        

        user = request.user
        if not user.check_password(password):
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data=ResponseInfo().format_response(
                    data={}, message='Passowrd incorrect',
                    status_code=status.HTTP_403_FORBIDDEN,
                )
            )

        token = jwt.encode({"id": user.id, "exp": datetime.datetime.now(tz=datetime.timezone.utc) +
                            datetime.timedelta(minutes=20)}, SECRET_KEY, algorithm="HS256")

        return Response(
            status=status.HTTP_200_OK,
            data=ResponseInfo().format_response(
                data={"token": token}, message='token generated',
                status_code=status.HTTP_200_OK,
            )
        )
    
    @action(detail=False, url_path='me', methods=['get'])
    def get_me(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user, many=False)

        return Response(
            status=status.HTTP_200_OK,
            data=ResponseInfo().format_response(
                data=serializer.data, message='Me',
                status_code=status.HTTP_200_OK,
            )
        )
    
    @action(detail=False, url_path='update-password', methods=['patch'])
    def update_password(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password')

        user = request.user

        if not user.check_password(old_password):
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data=ResponseInfo().format_response(
                    data={}, message='Password incorrect',
                    status_code=status.HTTP_403_FORBIDDEN,
                )
            )

        user.set_password(new_password)
        user.save()

        return Response(
            status=status.HTTP_200_OK,
            data=ResponseInfo().format_response(
                data={}, message='Password Updated',
                status_code=status.HTTP_200_OK,
            )
        )
    
    @action(detail=False, url_path='delete', methods=['post'])
    def delete_user(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        resp_status=status.HTTP_200_OK

        if user.check_password(serializer.validated_data.pop('password')):
            user.delete_reason=serializer.validated_data.pop('delete_reason')
            user.is_active=False
            user.save()
        else:
            resp_status=status.HTTP_400_BAD_REQUEST
        
        return Response(
            status=resp_status,
            data=ResponseInfo().format_response(
                data={}, message='Account Deleted',
                status_code=resp_status,
            )
        )
    
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        
       
       
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        
        return super().post(request, *args, **kwargs)

        
    
    