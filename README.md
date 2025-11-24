# 🤖 Chatbot de Atendimento 4Blue

<div align="center">

![4Blue Logo](frontend/public/4blue-logo.png)

**Sistema fullstack de chat inteligente com histórico personalizado**

[![Python](https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.1-green?style=for-the-badge&logo=django)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Django REST](https://img.shields.io/badge/DRF-3.15-red?style=for-the-badge)](https://www.django-rest-framework.org/)

[🚀 Ver Demo](#-demonstração) • [📖 Documentação](#-como-executar) • [💡 Decisões Técnicas](#-decisões-técnicas-e-arquiteturais)

</div>

---

## 📋 Sobre o Projeto

Sistema de chat interativo desenvolvido como solução para o desafio técnico da **4Blue**, simulando um atendimento automatizado com respostas personalizadas por usuário. O projeto demonstra domínio completo do stack Python/Django + React, com foco em experiência do usuário, boas práticas e código profissional.

### 🎯 Diferenciais Implementados

- ✨ **Interface WhatsApp-like** - Design moderno e familiar
- 🌓 **Dark Mode** - Alternância suave entre temas claro/escuro
- 🎓 **Tour Guiado Interativo** - Onboarding com Intro.js
- 📱 **Totalmente Responsivo** - Funciona em mobile, tablet e desktop
- 💬 **Indicador "Digitando..."** - Feedback visual durante processamento
- 🎨 **Identidade Visual 4Blue** - Header e Footer fiéis ao site oficial
- 🔔 **Contador de Mensagens** - Badge no botão de histórico
- ⚡ **Animações Suaves** - Micro-interações que melhoram UX

---

## ✨ Funcionalidades Principais

### 🔐 Sistema de Usuários (Mock)
- Alternância simples entre Usuário A e Usuário B
- Estado gerenciado no frontend via React
- Validação de usuário em todas as requisições

### 💬 Chat em Tempo Real
- Envio de mensagens com feedback visual imediato
- Respostas personalizadas por usuário
- Animação de "digitando..." antes da resposta do bot
- Layout inspirado no WhatsApp para melhor experiência

### 📚 Histórico Completo
- Visualização de todas as conversas do usuário selecionado
- Filtragem automática por usuário
- Cards organizados com timestamps
- Diferenciação visual entre pergunta e resposta
- Loading state durante carregamento

### 🎨 Interface Premium
- Design system baseado nas cores da 4Blue
- Tema claro/escuro com persistência
- Ícones profissionais (react-icons)
- Logo da 4Blue integrada ao bot
- Responsividade total

---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Python | 3.13+ | Linguagem principal |
| Django | 5.1+ | Framework web |
| Django REST Framework | 3.15+ | API RESTful |
| django-cors-headers | 4.3+ | Gerenciamento CORS |
| SQLite | 3.x | Banco de dados |

### Frontend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | 18.3+ | Biblioteca UI |
| React Router DOM | 6.x | Roteamento SPA |
| Axios | 1.x | Cliente HTTP |
| React Icons | 5.x | Biblioteca de ícones |
| Intro.js | 7.x | Tour guiado |

---

## 🏗️ Arquitetura do Sistema
```
chatbot-challenge/
├── 📁 backend/              # Configurações Django
│   ├── settings.py          # Config: CORS, REST, Apps
│   ├── urls.py              # URLs principais
│   └── wsgi.py              # WSGI config
│
├── 📁 chat/                 # App Django (Core)
│   ├── 📄 models.py         # User e Message models
│   ├── 📄 serializers.py    # DRF serializers
│   ├── 📄 views.py          # Lógica de negócio (API)
│   ├── 📄 urls.py           # Rotas da API
│   ├── 📄 admin.py          # Interface admin
│   └── 📁 migrations/       # Migrações do banco
│
├── 📁 frontend/
│   ├── 📁 public/           # Assets estáticos
│   │   └── 4blue-logo.png   # Logo da empresa
│   │
│   └── 📁 src/
│       ├── 📄 App.js        # Componente raiz
│       ├── 📄 App.css       # Estilos globais + animações
│       ├── 📄 ThemeContext.js # Gerenciamento de tema
│       │
│       ├── 📁 components/   # Componentes reutilizáveis
│       │   ├── Header.js    # Cabeçalho com tema toggle
│       │   ├── Footer.js    # Rodapé 4Blue
│       │   ├── UserSelector.js # Seletor A/B
│       │   └── ManualTour.js # Tour guiado
│       │
│       ├── 📁 pages/        # Páginas da aplicação
│       │   ├── ChatPage.js  # Tela de chat
│       │   └── HistoryPage.js # Tela de histórico
│       │
│       └── 📁 services/     # Integração com API
│           └── api.js       # Axios config + endpoints
│
├── 📄 requirements.txt     # Dependências Python
├── 📄 .gitignore           # Arquivos ignorados
├── 📄 db.sqlite3           # Banco de dados
└── 📄 README.md            # Este arquivo
```

---

## 🎨 Modelagem de Dados

### Model: User
```python
class User(models.Model):
    username = CharField(max_length=1, choices=[('A', 'Usuario A'), ('B', 'Usuario B')], unique=True)
    created_at = DateTimeField(auto_now_add=True)
```

**Decisão de Design:**
- Model separado (não hardcoded) garante escalabilidade
- Choices no campo valida no nível do banco
- Unique constraint previne duplicação

### Model: Message
```python
class Message(models.Model):
    user = ForeignKey(User, on_delete=CASCADE, related_name='messages')
    user_message = TextField()
    bot_response = TextField()
    created_at = DateTimeField(auto_now_add=True)
```

**Decisão de Design:**
- ForeignKey mantém integridade referencial
- Armazena pergunta E resposta juntas (contexto completo)
- related_name facilita queries reversas
- Ordering por created_at DESC (mais recentes primeiro)

---

## 🔌 API Endpoints

### POST `/api/messages/`
Envia uma nova mensagem e recebe resposta automática.

**Request Body:**
```json
{
  "username": "A",
  "message": "Preciso de ajuda com meu pedido"
}
```

**Response:** (201 Created)
```json
{
  "id": 1,
  "user": 1,
  "user_username": "A",
  "user_message": "Preciso de ajuda com meu pedido",
  "bot_response": "Olá Usuario A! Obrigado por sua mensagem...",
  "created_at": "2025-11-22T14:30:00Z"
}
```

### GET `/api/messages/?username=A`
Busca histórico de mensagens do usuário especificado.

**Response:** (200 OK)
```json
[
  {
    "id": 2,
    "user": 1,
    "user_username": "A",
    "user_message": "Segunda mensagem",
    "bot_response": "Olá Usuario A! Obrigado...",
    "created_at": "2025-11-22T14:35:00Z"
  },
  {
    "id": 1,
    "user": 1,
    "user_username": "A",
    "user_message": "Primeira mensagem",
    "bot_response": "Olá Usuario A! Obrigado...",
    "created_at": "2025-11-22T14:30:00Z"
  }
]
```

---

## 🚀 Como Executar

### Pré-requisitos

- Python 3.8+ ([Download](https://www.python.org/downloads/))
- Node.js 14+ e npm ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))

### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/theusdev/chatbot-challenge.git
cd chatbot-challenge
```

### 2️⃣ Configure o Backend
```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar migrations
python manage.py makemigrations
python manage.py migrate

# (Opcional) Criar superusuário
python manage.py createsuperuser
# Username: admin
# Email: (Enter para pular)
# Password: admin123

# Iniciar servidor Django
python manage.py runserver
```

✅ Backend rodando em: **http://127.0.0.1:8000**

### 3️⃣ Configure o Frontend

**Abra um NOVO terminal** (deixe o backend rodando):
```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor React
npm start
```

✅ Frontend abrirá automaticamente em: **http://localhost:3000**

---

## 🧪 Testando a Aplicação

### ✅ Checklist de Testes

1. **Tour Guiado**
   - [ ] Aparece automaticamente na primeira visita
   - [ ] Botão "?" permite reiniciar tour
   - [ ] Todos os 5 passos funcionam

2. **Seleção de Usuário**
   - [ ] Botões A e B alternam corretamente
   - [ ] Usuário ativo é destacado em azul

3. **Envio de Mensagens**
   - [ ] Digite mensagem e pressione Enter
   - [ ] Mensagem aparece à direita (azul)
   - [ ] Indicador "digitando..." aparece
   - [ ] Resposta do bot aparece à esquerda (cinza)
   - [ ] Logo 4Blue aparece no avatar do bot

4. **Histórico**
   - [ ] Badge mostra quantidade de mensagens
   - [ ] Clique em "Ver Histórico"
   - [ ] Mensagens aparecem corretamente
   - [ ] Troque de usuário → histórico muda
   - [ ] Volte ao chat

5. **Dark Mode**
   - [ ] Clique no ícone lua/sol no header
   - [ ] Tema alterna suavemente
   - [ ] Tema persiste após reload

6. **Responsividade**
   - [ ] Abra DevTools (F12)
   - [ ] Teste em mobile (375px)
   - [ ] Teste em tablet (768px)
   - [ ] Teste em desktop (1920px)

### 🔧 Testando API Diretamente
```bash
# Enviar mensagem do Usuário A
curl -X POST http://127.0.0.1:8000/api/messages/ \
  -H "Content-Type: application/json" \
  -d '{"username": "A", "message": "Teste via cURL"}'

# Buscar histórico do Usuário A
curl http://127.0.0.1:8000/api/messages/?username=A

# Enviar mensagem do Usuário B
curl -X POST http://127.0.0.1:8000/api/messages/ \
  -H "Content-Type: application/json" \
  -d '{"username": "B", "message": "Outra mensagem"}'

# Buscar histórico do Usuário B
curl http://127.0.0.1:8000/api/messages/?username=B
```

---

## 💡 Decisões Técnicas e Arquiteturais

### 🎯 Backend - Django REST Framework

#### 1. Separação de Concerns

**Models (models.py)**
- Responsabilidade: Definir estrutura de dados e regras de negócio no banco
- User e Message como models separados para escalabilidade
- Choices no username para validação nativa do Django

**Serializers (serializers.py)**
- Responsabilidade: Validação e transformação de dados (Python ↔ JSON)
- `MessageCreateSerializer` específico para input (username + message)
- `MessageSerializer` para output completo (inclui bot_response)
- Validação personalizada (trim de espaços, mensagem não vazia)

**Views (views.py)**
- Responsabilidade: Lógica de negócio e orquestração
- View única que aceita GET e POST (convenção REST)
- `get_or_create` para evitar duplicação de usuários
- Função `get_bot_response()` centralizada (fácil manter/expandir)

#### 2. API Design RESTful

**Endpoint Unificado:**
```
POST /api/messages/   → Criar mensagem
GET  /api/messages/   → Listar mensagens
```

**Por que não rotas separadas?**
- Convenção REST: mesma entidade = mesma rota
- Query params (?username=A) são semânticos para filtros
- Código mais limpo e manutenível

**Tratamento de Erros:**
```python
# Bad Request (400)
- Campos faltando
- Username inválido
- Mensagem vazia

# Created (201)
- Mensagem criada com sucesso
- Retorna objeto completo

# OK (200)
- Lista vazia se usuário não tem mensagens
- Não retorna 404 (design intencional)
```

#### 3. Lógica de Negócio

**Respostas Personalizadas:**
```python
responses = {
    'A': "Olá Usuario A! Obrigado por sua mensagem...",
    'B': "Oi Usuario B! Recebemos sua mensagem..."
}
```
**Filtragem Eficiente:**
```python
Message.objects.filter(user=user).order_by('-created_at')
```
- Usa índice do banco (FK)
- Ordenação no banco (não no Python)
- Escalável para milhares de mensagens

---

### ⚛️ Frontend - React

#### 1. Gerenciamento de Estado

**Context API para Tema:**
```javascript
<ThemeProvider>
  <App />
</ThemeProvider>
```

**Por que Context e não Redux?**
- App pequeno: Context é suficiente
- Theme é estado global simples
- Evita boilerplate desnecessário
- Performance adequada (poucas re-renders)

**Estado Local nos Componentes:**
```javascript
// ChatPage
const [message, setMessage] = useState('');
const [chatHistory, setChatHistory] = useState([]);
const [loading, setLoading] = useState(false);
const [isTyping, setIsTyping] = useState(false);
```

**Por que não Context para tudo?**
- Dados específicos da página
- Não precisam ser compartilhados

#### 2. Componentização Estratégica

**Componentes Reutilizáveis:**
- `UserSelector` - Usado em 2 páginas
- `Header` - Compartilhado globalmente
- `Footer` - Compartilhado globalmente
- `ManualTour` - Overlay global

**Componentes de Página:**
- `ChatPage` - Lógica complexa isolada
- `HistoryPage` - Responsabilidade única

**Service Layer:**
```javascript
// api.js
export const sendMessage = async (username, message) => {
  // Abstração do axios
  // Facilita mock em testes
  // Centraliza tratamento de erros
}
```

#### 3. UX/UI Avançada

**Feedback Visual:**
```javascript
// Status de mensagem
{ status: 'sent' }     → V (cinza)
{ status: 'delivered' } → VV (cinza)
{ status: 'read' }      → VV (azul)
```

**Implementação:**
```javascript
setTimeout(() => {
  setStatus('delivered');
}, 500);

setTimeout(() => {
  setStatus('read');
  addBotResponse();
}, 2000);
```

**Animação "Digitando...":**
```css
@keyframes pulse {
  0%, 80%, 100% { opacity: 0.4; }
  40% { opacity: 1; }
}
```

**Tour Guiado:**
- Intro.js nativo (não wrapper bugado)
- Verifica elementos antes de iniciar
- Persiste estado no localStorage
- Botão manual sempre disponível

#### 4. Performance

**Auto-scroll otimizado:**
```javascript
const messagesEndRef = useRef(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [chatHistory]);
```

**Por que useRef?**
- Não causa re-render
- Acesso direto ao DOM
- Performance superior

**Debounce implícito:**
- Loading states previnem cliques múltiplos
- Botão disabled durante requisições

---

### 🔒 Segurança e Boas Práticas

#### Backend

✅ **CORS configurado** apenas para localhost:3000
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

✅ **Validação em múltiplas camadas**
```
1. Serializer (formato, tipos)
2. View (lógica de negócio)
3. Model (constraints do banco)
```

✅ **Query parameters sanitizados**
```python
username = request.query_params.get('username')
if username not in ['A', 'B']:
    return Response({"error": "..."}, status=400)
```

✅ **Environment variables prontas** (.env support)

#### Frontend

✅ **Sanitização de inputs**
```javascript
const trimmedMessage = message.trim();
if (!trimmedMessage) {
  alert('Mensagem vazia');
  return;
}
```

✅ **Try/catch em todas as requisições**
```javascript
try {
  const response = await sendMessage(...);
} catch (error) {
  alert('Erro ao enviar');
  console.error(error);
}
```

✅ **localStorage usado adequadamente**
```javascript
localStorage.setItem('theme', 'dark');
localStorage.setItem('hasSeenChatTour', 'true');

```

---

### 🎨 Design System

**Cores 4Blue (do site oficial):**
```javascript
primary: '#0066CC'    
secondary: '#003D7A' 
accent: '#00A3E0'     
```

**Tipografia:**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
```

**Espaçamento consistente:**
- Pequeno: 8px
- Médio: 15-20px
- Grande: 30-40px

**Border Radius:**
- Pequeno: 5-8px
- Médio: 12px
- Círculos: 50%

---

## 📈 Possíveis Melhorias Futuras

### Funcionalidades
- [ ] WebSockets para chat em tempo real real
- [ ] Autenticação JWT com refresh tokens
- [ ] Upload de arquivos/imagens nas mensagens
- [ ] Busca/filtro no histórico
- [ ] Paginação infinita (histórico grande)
- [ ] Exportar histórico (PDF, CSV)
- [ ] Notificações push
- [ ] Múltiplos idiomas (i18n)

### Técnicas
- [ ] Testes automatizados
  - Backend: pytest + coverage
  - Frontend: Jest + React Testing Library
  - E2E: Cypress
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Docker + docker-compose
- [ ] Deploy em cloud (AWS/Heroku/Vercel)
- [ ] Cache com Redis
- [ ] Monitoring (Sentry)
- [ ] Logging estruturado
- [ ] Rate limiting na API
- [ ] PostgreSQL em produção

### UX/UI
- [ ] PWA (Progressive Web App)
- [ ] Notificações desktop
- [ ] Temas customizáveis
- [ ] Acessibilidade WCAG 2.1 AA
- [ ] Atalhos de teclado
- [ ] Modo offline (Service Workers)

---

## 🎓 Aprendizados e Destaques

Este projeto demonstra:

✅ **Arquitetura fullstack completa** - Backend robusto + Frontend moderno  
✅ **APIs RESTful bem projetadas** - Endpoints semânticos, validação completa  
✅ **Componentização eficiente** - Reutilização e separação de responsabilidades  
✅ **UX excepcional** - Animações, feedbacks visuais, tour guiado  
✅ **Código limpo e documentado** - Comentários explicativos, nomes descritivos  
✅ **Boas práticas de segurança** - Validação, CORS, tratamento de erros  
✅ **Atenção aos detalhes** - Dark mode, ícones, identidade visual  
✅ **Pensamento escalável** - Arquitetura preparada para crescimento  

---

## 👨‍💻 Autor

**Matheus Magno Oliveira Coutinho**

- 💼 LinkedIn: matheus-coutinho(https://www.linkedin.com/in/matheus-coutinho/)
- 🐙 GitHub: theusdev(https://github.com/theusdev)
- 📧 Email: matheus.magno7@gmail.com


---

## 📄 Sobre o Desafio

Este projeto foi desenvolvido como parte do processo seletivo da **4Blue**, demonstrando:

- Capacidade de entregar soluções completas e funcionais
- Domínio das tecnologias solicitadas (Django + React)
- Atenção aos requisitos e detalhes
- Proatividade em implementar melhorias além do solicitado
- Compromisso com qualidade e boas práticas de código

---

## 🙏 Agradecimentos

Agradeço à equipe da **[4Blue](https://www.4blue.com.br)** pela oportunidade de participar deste desafio técnico. Foi uma experiência enriquecedora que me permitiu demonstrar minhas habilidades e aprender ainda mais sobre desenvolvimento fullstack.

---

## 📝 Licença

Este projeto foi desenvolvido exclusivamente para o processo seletivo da 4Blue.

---

<div align="center">

**Desenvolvido com ❤️ por Matheus Coutinho, ☕ e muito código para o desafio 4Blue**

[![4Blue](https://img.shields.io/badge/4Blue-Transformando%20Ideias-0066CC?style=for-the-badge)](https://www.4blue.com.br)

</div>
