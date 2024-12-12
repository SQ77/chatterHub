import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar.tsx';
import PostsPage from './components/PostsPage.tsx';
import CreatePost from './components/CreatePost.tsx';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import Profile from './components/Profile.tsx';
import { AuthProvider } from './components/AuthContext.tsx';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Container sx={{ marginTop: 3 }}>
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;

