
import React from 'react';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome to Narrativai</h1>
      <p>Engage in interactive conversations with AI-powered characters.</p>
      <div>
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
    </div>
  );
};

export default App;

