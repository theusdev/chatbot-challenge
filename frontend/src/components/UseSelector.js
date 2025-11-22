import React from 'react';
import { FiUser } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';

const UserSelector = ({ currentUser, onUserChange }) => {
  const { currentColors, colors } = useTheme();

  return (
    <div style={{
      ...styles.container,
      backgroundColor: currentColors.surface,
      borderBottom: `1px solid ${currentColors.border}`,
    }}>
      <h3 style={{...styles.title, color: currentColors.text}}>
        Selecione o Usuário:
      </h3>
      <div style={styles.buttonGroup}>
        <button
          style={{
            ...styles.button,
            backgroundColor: currentUser === 'A' ? colors.primary : currentColors.background,
            color: currentUser === 'A' ? 'white' : currentColors.text,
            border: `2px solid ${currentUser === 'A' ? colors.primary : currentColors.border}`,
          }}
          onClick={() => onUserChange('A')}
        >
          <FiUser size={18} />
          <span>Usuário A</span>
        </button>
        <button
          style={{
            ...styles.button,
            backgroundColor: currentUser === 'B' ? colors.primary : currentColors.background,
            color: currentUser === 'B' ? 'white' : currentColors.text,
            border: `2px solid ${currentUser === 'B' ? colors.primary : currentColors.border}`,
          }}
          onClick={() => onUserChange('B')}
        >
          <FiUser size={18} />
          <span>Usuário B</span>
        </button>
      </div>
      <p style={{...styles.currentUser, color: currentColors.textSecondary}}>
        Usuário ativo: <strong style={{color: colors.primary}}>{currentUser}</strong>
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 15px 0',
    fontSize: '18px',
    fontWeight: '600',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  button: {
    padding: '12px 30px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
  },
  currentUser: {
    margin: '10px 0 0 0',
    fontSize: '14px',
  },
};

export default UserSelector;