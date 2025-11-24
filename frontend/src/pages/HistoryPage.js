import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMessageSquare } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import UserSelector from '../components/UserSelector';
import { getMessages } from '../services/api';
import { useTheme } from '../ThemeContext';

const HistoryPage = ({ currentUser, setCurrentUser }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentColors, colors } = useTheme();

  useEffect(() => {
    loadHistory();
  }, [currentUser]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await getMessages(currentUser);
      setMessages(data);
    } catch (error) {
      alert('Erro ao carregar histórico');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      ...styles.container,
      backgroundColor: currentColors.background,
    }}>
      <UserSelector currentUser={currentUser} onUserChange={setCurrentUser} />

      <div style={styles.header}>
        <h1 style={{...styles.title, color: currentColors.text}}>
          <FiMessageSquare size={28} />
          Histórico de Mensagens
        </h1>
        <button
          style={{
            ...styles.backButton,
            backgroundColor: colors.secondary,
          }}
          onClick={() => navigate('/')}
        >
          <FiArrowLeft size={16} />
          <span>Voltar ao Chat</span>
        </button>
      </div>

      <div style={styles.historyContainer}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={{
              ...styles.loadingSpinner,
              borderTopColor: colors.primary,
            }} />
            <p style={{...styles.loadingText, color: currentColors.textSecondary}}>
              Carregando histórico...
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div style={styles.emptyState}>
            <FiMessageSquare size={64} color={currentColors.textSecondary} />
            <p style={{...styles.emptyMessage, color: currentColors.textSecondary}}>
              Nenhuma mensagem encontrada para o <strong>Usuário {currentUser}</strong>.
            </p>
            <button
              style={{
                ...styles.startChatButton,
                backgroundColor: colors.primary,
              }}
              onClick={() => navigate('/')}
            >
              Iniciar Conversa
            </button>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{
                ...styles.messageCard,
                backgroundColor: currentColors.surface,
                border: `1px solid ${currentColors.border}`,
              }}
            >
              <div style={styles.messageHeader}>
                <div style={styles.userInfo}>
                  <div style={{
                    ...styles.userAvatar,
                    backgroundColor: colors.primary,
                  }}>
                    <FaUser size={16} color="white" />
                  </div>
                  <span style={{...styles.username, color: colors.primary}}>
                    Usuário {msg.user_username}
                  </span>
                </div>
                <span style={{...styles.date, color: currentColors.textSecondary}}>
                  {new Date(msg.created_at).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              
              <div style={styles.messageContent}>
                <div style={{
                  ...styles.userMessageBlock,
                  backgroundColor: currentColors.background,
                  border: `1px solid ${currentColors.border}`,
                }}>
                  <div style={styles.messageLabel}>
                    <FaUser size={14} color={colors.primary} />
                    <strong style={{color: currentColors.text}}>Pergunta:</strong>
                  </div>
                  <p style={{...styles.messageBlockText, color: currentColors.text}}>
                    {msg.user_message}
                  </p>
                </div>
                
                <div style={{
                  ...styles.botMessageBlock,
                  backgroundColor: currentColors.background,
                  border: `1px solid ${currentColors.border}`,
                }}>
                  <div style={styles.messageLabel}>
                    <img 
                      src="/4blue-chat.jpg" 
                      alt="Bot" 
                      style={styles.botIcon}
                      onError={(e) => {
                        e.target.src = 'https://www.4blue.com.br/wp-content/uploads/2023/01/logo-4blue.png';
                      }}
                    />
                    <strong style={{color: currentColors.text}}>Resposta:</strong>
                  </div>
                  <p style={{...styles.messageBlockText, color: currentColors.text}}>
                    {msg.bot_response}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
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
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  backButton: {
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
  historyContainer: {
    minHeight: '400px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    gap: '20px',
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(0,0,0,0.1)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '16px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    gap: '20px',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: '1.6',
    maxWidth: '400px',
  },
  startChatButton: {
    padding: '12px 30px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s',
  },
  messageCard: {
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    animation: 'fadeIn 0.5s ease-in',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: '600',
    fontSize: '16px',
  },
  date: {
    fontSize: '13px',
  },
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  userMessageBlock: {
    padding: '15px',
    borderRadius: '10px',
  },
  botMessageBlock: {
    padding: '15px',
    borderRadius: '10px',
  },
  messageLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
  },
  botIcon: {
    width: '18px',
    height: '18px',
    objectFit: 'contain',
    borderRadius: '50%',
  },
  messageBlockText: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '1.6',
  },
};

export default HistoryPage;