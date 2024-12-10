import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar.tsx';
import PostsPage from './components/PostsPage.tsx';
import CreatePost from './components/CreatePost.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container sx={{ marginTop: 3 }}>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

