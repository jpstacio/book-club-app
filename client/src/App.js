import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login'; // Import the Login component

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h1>Welcome to the Book Club App</h1>} />
          {/* Add other routes like profile, register, etc. */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
