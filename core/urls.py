from django.urls import path

app_name = 'core'
from .views import *

urlpatterns = [
    path('',index,name="home"),
    path('user_list/',chatView,name="user_list"),
    path('user_list/<int:sender>/<int:receiver>', message_view, name='chat'),
    
    
    
    
    
    
    
    path('api/messages', message_list, name='message-list'),
    path('api/users', user_list, name='user-list'),
    path('api/users/<int:pk>', user_list, name='user-detail'),
    path('api/messages/<int:sender>/<int:receiver>', message_list, name='message-detail'),
]
