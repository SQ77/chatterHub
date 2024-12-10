import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import PostsPage from './components/PostsPage.tsx';
import Home from './components/Home.tsx';
import { Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container sx={{ marginTop: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

