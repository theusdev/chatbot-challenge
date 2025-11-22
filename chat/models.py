from django.db import models

class User(models.Model):
  USER_CHOICES = [
    ('A', 'Usuário A'),
    ('B', 'Usuário B'),
  ]

  username = models.CharField(max_length=1, choices=USER_CHOICES, unique=True)
  created_at = models.DateTimeField(auto_now_add=True)

class Meta:
  db_table = 'chat_user'
  verbose_name = 'Usuário'
  verbose_name_plural = 'Usuários'

  def __str__(self):
    return f"Usuário {self.username} criado em {self.created_at.strftime('%d/%m/%Y %H:%M:%S') }"


class Message(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')
  user_message = models.TextField(verbose_name='Mensagem do usuário')
  chatbot_message = models.TextField(verbose_name='Mensagem do bot')
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta:
    db_table = 'chat_message'
    verbose_name = 'Mensagem'
    verbose_name_plural = 'Mensagens'
    ordering = ['-created_at']

  def __str__(self):
    return f"Mensagem de {self.user.username} criada em {self.created_at.strftime('%d/%m/%Y %H:%M:%S')}"  