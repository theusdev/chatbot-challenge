import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      primary: '#0066CC',
      secondary: '#003D7A',
      accent: '#00A3E0',
      
      // Tema claro
      light: {
        background: '#F5F7FA',
        surface: '#03417E',
        text: '#4EACFF',
        textSecondary: '#F0F0F0',
        border: '#E0E0E0',
        userMessage: '#0066CC',
        botMessage: '#F0F0F0',
        botMessageText: '#1A1A1A',
      },
      
      // Tema escuro
      dark: {
        background: '#0A1929',
        surface: '#1A2332',
        text: '#FFFFFF',
        textSecondary: '#F0F0F0',
        border: '#2D3748',
        userMessage: '#0066CC',
        botMessage: '#2D3748',
        botMessageText: '#FFFFFF',
      }
    }
  };

  const currentColors = isDark ? theme.colors.dark : theme.colors.light;

  return (
    <ThemeContext.Provider value={{ ...theme, currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};