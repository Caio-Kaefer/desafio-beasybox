import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Sobre from './pages/Sobre';
import SAC from './pages/SAC';
import Produto from './pages/Produto';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/sac" element={<SAC />} />
          <Route path="/produto" element={<Produto />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
