import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiClock } from 'react-icons/fi';
import { FaUser, FaCheckDouble, FaCheck } from 'react-icons/fa';
import UserSelector from '../components/UserSelector';
import { sendMessage } from '../services/api';
import { useTheme } from '../ThemeContext';

const ChatPage = ({ currentUser, setCurrentUser }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { currentColors, colors } = useTheme();

  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      alert('Por favor, digite uma mensagem');
      return;
    }

    const userMessageObj = {
      type: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status: 'sent', 
    };

    
    setChatHistory(prev => [...prev, userMessageObj]);
    setMessage('');
    setLoading(true);

    try {
      const response = await sendMessage(currentUser, message);
      
    
      setTimeout(() => {
        setChatHistory(prev => 
          prev.map((msg, idx) => 
            idx === prev.length - 1 ? { ...msg, status: 'delivered' } : msg
          )
        );
      }, 500);

     
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev.map((msg, idx) => 
            idx === prev.length - 1 ? { ...msg, status: 'read' } : msg
          ),
          {
            type: 'bot',
            text: response.bot_response,
            timestamp: new Date().toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
          },
        ]);
      }, 1000);

    } catch (error) {
      alert('Erro ao enviar mensagem. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const MessageStatus = ({ status }) => {
    if (status === 'sent') {
      return <FaCheck size={14} color="#B0B0B0" />;
    } else if (status === 'delivered' || status === 'read') {
      return <FaCheckDouble size={14} color={status === 'read' ? '#0066CC' : '#B0B0B0'} />;
    }
    return null;
  };

  return (
    <div style={{
      ...styles.container,
      backgroundColor: currentColors.background,
    }}>
      <UserSelector currentUser={currentUser} onUserChange={setCurrentUser} />

      <div style={styles.header}>
        <h1 style={{...styles.title, color: currentColors.text}}>
          Chat de Atendimento
        </h1>
        <button
          style={{
            ...styles.historyButton,
            backgroundColor: colors.primary,
          }}
          onClick={() => navigate('/historico')}
          className="intro-step-3"
        >
          <FiClock size={16} />
          <span>Ver Histórico</span>
        </button>
      </div>

      <div style={{
        ...styles.chatContainer,
        backgroundColor: currentColors.surface,
        border: `1px solid ${currentColors.border}`,
      }}>
        <div 
          style={{
            ...styles.messagesContainer,
            backgroundImage: currentColors === colors.light 
              ? 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)' 
              : 'none',
            backgroundSize: '100% 40px',
          }}
          className="intro-step-2"
        >
          {chatHistory.length === 0 ? (
            <div style={styles.emptyState}>
              <FiSend size={48} color={currentColors.textSecondary} />
              <p style={{...styles.emptyMessage, color: currentColors.textSecondary}}>
                Nenhuma mensagem ainda. <br />
                Envie uma mensagem para começar!
              </p>
            </div>
          ) : (
            <>
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.messageWrapper,
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {msg.type === 'bot' && (
                    <div style={styles.avatar}>
                      <img 
                        src="/4blue-logo.png" 
                        alt="Bot" 
                        style={styles.avatarImage}
                        onError={(e) => {
                          e.target.src = 'https://www.4blue.com.br/wp-content/uploads/2023/01/logo-4blue.png';
                        }}
                      />
                    </div>
                  )}
                  
                  <div
                    style={{
                      ...styles.message,
                      backgroundColor: msg.type === 'user' 
                        ? colors.primary 
                        : currentColors.botMessage,
                      color: msg.type === 'user' 
                        ? 'white' 
                        : currentColors.botMessageText,
                      borderRadius: msg.type === 'user'
                        ? '12px 12px 0 12px'
                        : '12px 12px 12px 0',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    <p style={styles.messageText}>{msg.text}</p>
                    <div style={styles.messageFooter}>
                      <span style={{
                        ...styles.timestamp,
                        color: msg.type === 'user' 
                          ? 'rgba(255,255,255,0.8)' 
                          : currentColors.textSecondary,
                      }}>
                        {msg.timestamp}
                      </span>
                      {msg.type === 'user' && msg.status && (
                        <MessageStatus status={msg.status} />
                      )}
                    </div>
                  </div>

                  {msg.type === 'user' && (
                    <div style={{
                      ...styles.avatar,
                      backgroundColor: colors.primary,
                    }}>
                      <FaUser size={16} color="white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <form 
          onSubmit={handleSendMessage} 
          style={{
            ...styles.form,
            backgroundColor: currentColors.surface,
            borderTop: `1px solid ${currentColors.border}`,
          }}
          className="intro-step-1"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            style={{
              ...styles.input,
              backgroundColor: currentColors.background,
              color: currentColors.text,
              border: `1px solid ${currentColors.border}`,
            }}
            disabled={loading}
          />
          <button
            type="submit"
            style={{
              ...styles.sendButton,
              backgroundColor: colors.primary,
              opacity: loading || !message.trim() ? 0.5 : 1,
            }}
            disabled={loading || !message.trim()}
          >
            {loading ? (
              <div style={styles.spinner} />
            ) : (
              <FiSend size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    minHeight: 'calc(100vh - 200px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
  },
  historyButton: {
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s',
  },
  chatContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  messagesContainer: {
    height: '500px',
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: '15px',
  },
  emptyMessage: {
    textAlign: 'center',
    lineHeight: '1.6',
    fontSize: '15px',
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    animation: 'fadeIn 0.3s ease-in',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  message: {
    maxWidth: '65%',
    padding: '10px 14px',
    wordWrap: 'break-word',
    animation: 'slideIn 0.3s ease-out',
  },
  messageText: {
    margin: '0 0 6px 0',
    fontSize: '15px',
    lineHeight: '1.4',
  },
  messageFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '5px',
  },
  timestamp: {
    fontSize: '11px',
  },
  form: {
    display: 'flex',
    padding: '15px',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '15px',
    borderRadius: '24px',
    outline: 'none',
    transition: 'all 0.3s',
  },
  sendButton: {
    width: '48px',
    height: '48px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    color: 'white',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

export default ChatPage;