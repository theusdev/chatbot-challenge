from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import response
from .models import User, Message
from .serializers import MessageSerializer, MessageCreateSerializer


def get_bot_response(username, user_message):
  response = {
    'A': f"Olá {username}! Obrigado por sua mensagem: '{user_message}'. 
    Em breve responderemos com mais detalhes!",
    'B': f"Olá {username}! Recebemos sua mensagem: '{user_message}'. 
    Nossa equipe entrará em contato em breve !",
  }
  return responses.get(username, "Obrigado por seu contato. Em breve responderemos!")


@api_view(['POST'])
def send_message(request):
  """ Endpoint para enviar mensagem """
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
    chatbot_message=bot_response
  )
  response_serializer = MessageSerializer(message)
  return Response(response_serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_messages(request):
 """Endpoint para buscar histórico de todas as mensagens"""
  username = request.query_params.get('username')

  if not username:
    return Response({"error": "Username é obrigatório"}, 
    status=status.HTTP_400_BAD_REQUEST)

 if username not in ['A', 'B']:
    return Response({"error": "Username deve ser 'A' ou 'B'"}, 
    status=status.HTTP_400_BAD_REQUEST)

try:
  user = User.objects.get(username=username)
  messages = Message.objects.filter(user=user).order_by('-created_at')
  serializer = MessageSerializer(messages, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)
except User.DoesNotExist:
  return Response([], status=status.HTTP_200_OK)
