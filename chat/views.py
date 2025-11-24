from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Message
from .serializers import MessageSerializer, MessageCreateSerializer


def get_bot_response(username, user_message):
    responses = {
        'A': f"Olá Usuario A! Obrigado por sua mensagem: '{user_message}'. Em breve responderemos com mais detalhes!",
        'B': f"Oi Usuario B! Recebemos sua mensagem: '{user_message}'. Nossa equipe entrará em contato em breve!"
    }
    return responses.get(username, "Obrigado por seu contato. Em breve responderemos.")


@api_view(['POST', 'GET'])  
def messages_view(request):
    """
    Endpoint unificado para mensagens
    POST /api/messages/ - Enviar mensagem
    GET /api/messages/?username=A - Buscar histórico
    """
    
    if request.method == 'POST':
        
        serializer = MessageCreateSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        username = serializer.validated_data['username']
        user_message = serializer.validated_data['message']
        
        
        user, created = User.objects.get_or_create(username=username)
        
        
        bot_response = get_bot_response(username, user_message)
        
    
        message = Message.objects.create(
            user=user,
            user_message=user_message,
            bot_response=bot_response
        )
        
        
        response_serializer = MessageSerializer(message)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    elif request.method == 'GET':
        username = request.query_params.get('username')
        
        if not username:
            return Response(
                {"error": "Parametro 'username' é obrigatorio"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if username not in ['A', 'B']:
            return Response(
                {"error": "Username deve ser 'A' ou 'B'"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(username=username)
            messages = Message.objects.filter(user=user).order_by('-created_at')
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)