from rest_framework import serializers
from .models import User, Message


class UserSerializer(serializers.ModelSerializer):
    """Serializer para o modelo User"""
    class Meta:
        model = User
        fields = ['id', 'username', 'created_at']
        read_only_fields = ['id', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    """Serializer para o modelo Message"""
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'user', 'user_username', 'user_message', 'bot_response', 'created_at']
        read_only_fields = ['id', 'bot_response', 'created_at']


class MessageCreateSerializer(serializers.Serializer):
    username = serializers.ChoiceField(choices=['A', 'B'])
    message = serializers.CharField(max_length=1000)
    
    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("A mensagem não pode estar vazia")
        return value.strip()