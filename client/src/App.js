import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/" element={<h1>Welcome to the Book Club App</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
