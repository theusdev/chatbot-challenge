import React, { useEffect, useState } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import { useLocation } from 'react-router-dom';

const IntroTour = () => {
  const [enabled, setEnabled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenChatTour');
    
    if (!hasSeenTour && location.pathname === '/') {
      setTimeout(() => {
        setEnabled(true);
      }, 1000);
    }
  }, [location]);

  const onExit = () => {
    localStorage.setItem('hasSeenChatTour', 'true');
    setEnabled(false);
  };

  const steps = [
    {
      element: '.intro-step-1',
      intro: '👋 Bem-vindo ao Chatbot de Atendimento 4Blue! Vamos fazer um tour rápido para você conhecer as funcionalidades.',
      position: 'top',
    },
    {
      element: '.intro-step-1',
      intro: '✍️ Aqui você digita sua mensagem. Digite o que precisa e clique no botão de enviar (ou pressione Enter).',
      position: 'top',
    },
    {
      element: '.intro-step-2',
      intro: '💬 Suas mensagens e as respostas do bot aparecerão aqui. Mensagens em azul são suas, e as em cinza são do bot.',
      position: 'bottom',
    },
    {
      element: '.intro-step-3',
      intro: '📚 Clique aqui para ver todo o histórico de suas conversas anteriores!',
      position: 'left',
    },
    {
      intro: '🎉 Pronto! Agora você já sabe usar o sistema. Comece enviando sua primeira mensagem!',
    },
  ];

  const options = {
    nextLabel: 'Próximo',
    prevLabel: 'Anterior',
    skipLabel: 'Pular',
    doneLabel: 'Concluir',
    showProgress: true,
    showBullets: false,
    exitOnOverlayClick: false,
    exitOnEsc: true,
    disableInteraction: true,
  };

  return (
    <Steps
      enabled={enabled}
      steps={steps}
      initialStep={0}
      onExit={onExit}
      options={options}
    />
  );
};

export default IntroTour;