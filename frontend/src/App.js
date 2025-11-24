import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import ManualTour from './components/ManualTour';
import './App.css';

function AppContent() {
  const [currentUser, setCurrentUser] = useState('A');
  const { currentColors } = useTheme();

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content" style={{ backgroundColor: currentColors.background }}>
          <ManualTour />
          <Routes>
            <Route
              path="/"
              element={
                <ChatPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/historico"
              element={
                <HistoryPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;