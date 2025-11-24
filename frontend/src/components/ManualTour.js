import React, { useEffect } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import { useLocation } from 'react-router-dom';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

const ManualTour = () => {
  const { colors } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenChatTour');
    
    if (!hasSeenTour && location.pathname === '/') {
      const timer = setTimeout(() => {
        startTour();
        localStorage.setItem('hasSeenChatTour', 'true');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [location]);

  const startTour = () => {
    const step1 = document.querySelector('.intro-step-1');
    const step2 = document.querySelector('.intro-step-2');
    const step3 = document.querySelector('.intro-step-3');

    if (!step1 || !step2 || !step3) {
      console.warn('Elementos do tour não encontrados. Aguarde a página carregar.');
      return;
    }

    const intro = introJs();
    
    intro.setOptions({
      nextLabel: 'Próximo →',
      prevLabel: '← Anterior',
      skipLabel: '✕',
      doneLabel: 'Concluir ✓',
      showProgress: true,
      showBullets: false,
      exitOnOverlayClick: false,
      disableInteraction: true,
      steps: [
        {
          intro: '<div style="text-align: center;"><h3>Bem-vindo!</h3><p>Vamos fazer um tour rápido pelo sistema</p></div>',
        },
        {
          element: document.querySelector('.intro-step-1'),
          intro: '<strong>Campo de Mensagem</strong><br/>Digite sua mensagem aqui e pressione Enter ou clique no botão de enviar.',
          position: 'top',
        },
        {
          element: document.querySelector('.intro-step-2'),
          intro: '<strong>Área de Conversa</strong><br/>Suas mensagens aparecem em azul à direita, e as nossas respostas em cinza à esquerda.',
          position: 'bottom',
        },
        {
          element: document.querySelector('.intro-step-3'),
          intro: '<strong>Histórico</strong><br/>Clique aqui para ver todas as suas conversas anteriores.',
          position: 'left',
        },
        {
          intro: '<div style="text-align: center;"><h3>Pronto!</h3><p>Agora você já conhece o nosso sistema.<br/>Comece enviando sua primeira mensagem!</p></div>',
        },
      ],
    });

    intro.start();
  };

  return (
    <button
      onClick={startTour}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: colors.primary,
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,102,204,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        transition: 'all 0.3s',
      }}
      title="Iniciar Tour Guiado"
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0 6px 20px rgba(0,102,204,0.6)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 12px rgba(0,102,204,0.4)';
      }}
    >
      <FiHelpCircle size={28} />
    </button>
  );
};

export default ManualTour;