import React from 'react';

const UserSelector = ({ currentUser, onUserChange }) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Selecione o Usuário:</h3>
      <div style={styles.buttonGroup}>
        <button style={{...styles.button, ...(currentUser === 'A' ? styles.buttonActive : {}),
        }} onClick={() => onUserChange('A')}> Usuário A</button>
        <button style={{...styles.button, ...(currentUser === 'B' ? styles.buttonActive : {}),
        }} onClick={() => onUserChange('B')}>Usuário B</button>
      </div>
      <p style={styles.currentUser}> Usuário Ativo: <strong>{currentUser}</strong></p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  button: {
    padding: '8px 12px',
    margin: '0 5px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonActive: {
    backgroundColor: '#0066CC',
    color: '#fff',
  },
  currentUser: {
    fontSize: '0.9rem',
    margin: '10px 0 0 0',
    color: '#666',
  },
}

export default UserSelector;