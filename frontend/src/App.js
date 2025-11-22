import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import IntroTour from './components/IntroTour';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState('A');

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <IntroTour />
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
    </ThemeProvider>
  );
}

export default App;