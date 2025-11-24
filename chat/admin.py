from django.contrib import admin
from .models import User, Message


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'created_at']
    search_fields = ['username']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['user', 'user_message', 'created_at']
    list_filter = ['user', 'created_at']
    search_fields = ['user_message', 'bot_response']
    readonly_fields = ['created_at']