import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Clubs from './components/Clubs/Clubs'; // Import the new Clubs component

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/login">Login</Link> | 
          <Link to="/register">Register</Link> | 
          <Link to="/profile">Profile</Link> | 
          <Link to="/clubs">Clubs</Link> {/* New link to the Clubs page */}
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/clubs" element={<ProtectedRoute element={Clubs} />} /> {/* Clubs route */}
          <Route path="/" element={<h1>Welcome to the Book Club App</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
