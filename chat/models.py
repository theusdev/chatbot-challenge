from django.db import models

class User(models.Model):
    USER_CHOICES = [
        ('A', 'Usuario A'),
        ('B', 'Usuario B'),
    ]
    
    username = models.CharField(max_length=1, choices=USER_CHOICES, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'chat_user'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return f"Usuario {self.username}"


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')
    user_message = models.TextField(verbose_name='Mensagem do Usuario')
    bot_response = models.TextField(verbose_name='Resposta do Bot')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'chat_message'
        verbose_name = 'Mensagem'
        verbose_name_plural = 'Mensagens'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Mensagem de {self.user.username} em {self.created_at.strftime('%d/%m/%Y %H:%M')}"