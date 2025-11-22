import React from 'react';
import { useTheme } from '../ThemeContext';
import { FiGlobe, FiMail, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const { currentColors } = useTheme();

  return (
    <footer style={{
      ...styles.footer,
      backgroundColor: currentColors.surface,
      borderTop: `1px solid ${currentColors.border}`,
      color: currentColors.text,
    }}>
      <div style={styles.container}>
        <div style={styles.section}>
          <img 
            src="/4blue-logo.png" 
            alt="4Blue Logo" 
            style={styles.logo}
            onError={(e) => {
              e.target.src = 'https://www.4blue.com.br/wp-content/uploads/2023/01/logo-4blue.png';
            }}
          />
          <p style={{...styles.description, color: currentColors.textSecondary}}>
            Transformando ideias em soluções digitais inovadoras
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Contato</h3>
          <div style={styles.contactItem}>
            <FiGlobe size={16} color={currentColors.textSecondary} />
            <a 
              href="https://www.4blue.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{...styles.link, color: currentColors.textSecondary}}
            >
              www.4blue.com.br
            </a>
          </div>
          <div style={styles.contactItem}>
            <FiMail size={16} color={currentColors.textSecondary} />
            <a 
              href="mailto:contato@4blue.com.br"
              style={{...styles.link, color: currentColors.textSecondary}}
            >
              contato@4blue.com.br
            </a>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Redes Sociais</h3>
          <div style={styles.socialLinks}>
            <a 
              href="https://www.instagram.com/4blueoficial" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{...styles.socialIcon, color: currentColors.text}}
            >
              <FiInstagram size={24} />
            </a>
            <a 
              href="https://www.youtube.com/@4bluegestao" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{...styles.socialIcon, color: currentColors.text}}
            >
              <FiYoutube size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div style={{
        ...styles.copyright,
        borderTop: `1px solid ${currentColors.border}`,
        color: currentColors.textSecondary,
      }}>
        <p style={styles.copyrightText}>
          © 2025 4Blue - Todos os direitos reservados | Desenvolvido para o Desafio Técnico
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  logo: {
    height: '35px',
    width: 'auto',
    marginBottom: '10px',
  },
  description: {
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0,
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 10px 0',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  link: {
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s',
  },
  socialLinks: {
    display: 'flex',
    gap: '15px',
  },
  socialIcon: {
    transition: 'transform 0.3s',
    cursor: 'pointer',
  },
  copyright: {
    marginTop: '30px',
    paddingTop: '20px',
    textAlign: 'center',
  },
  copyrightText: {
    fontSize: '13px',
    margin: 0,
  },
};

export default Footer;