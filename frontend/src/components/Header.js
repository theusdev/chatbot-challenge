import React from 'react';
import { useTheme } from '../ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';

const Header = () => {
  const { isDark, toggleTheme, currentColors } = useTheme();

  return (
    <header style={{
      ...styles.header,
      backgroundColor: currentColors.surface,
      borderBottom: `1px solid ${currentColors.border}`,
      color: currentColors.text,
    }}>
      <div style={styles.container}>
        <div style={styles.logoSection}>
          <img 
            src="/4blue-logo.png" 
            alt="4Blue Logo" 
            style={styles.logo}
            onError={(e) => {
              e.target.src = 'https://www.4blue.com.br/wp-content/uploads/2023/01/logo-4blue.png';
            }}
          />
          <div style={styles.titleSection}>
            <h1 style={styles.title}>Chatbot de Atendimento</h1>
            <p style={{...styles.subtitle, color: currentColors.textSecondary}}>
              Sistema de atendimento inteligente
            </p>
          </div>
        </div>
        
        <button 
          onClick={toggleTheme}
          style={{
            ...styles.themeButton,
            backgroundColor: currentColors.background,
            color: currentColors.text,
          }}
          title={isDark ? 'Tema Claro' : 'Tema Escuro'}
        >
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logo: {
    height: '45px',
    width: 'auto',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
  },
  themeButton: {
    padding: '10px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
  },
};

export default Header;