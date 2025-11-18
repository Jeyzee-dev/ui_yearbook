import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  const handleRegister = () => {
    navigate('/register');
    onClose();
  };

  return (
      <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close-btn" onClick={onClose}>&times;</button>
        
        <div className="auth-modal-header">
          <img 
            src="https://tse3.mm.bing.net/th/id/OIP.tMmFZwBZrMx31lmMpteDpQHaHa?pid=Api&P=0&h=220" 
            alt="MinSU Logo" 
            className="auth-modal-logo"
          />
          <h2>Join the MinSU Alumni Community</h2>
          <p>Sign in or register to access exclusive alumni features.</p>
        </div>

        <div className="auth-modal-actions">
          <button className="auth-modal-btn login-btn" onClick={handleLogin}>
            <i className="fas fa-sign-in-alt"></i>
            Login
          </button>
          <button className="auth-modal-btn register-btn" onClick={handleRegister}>
            <i className="fas fa-user-plus"></i>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

