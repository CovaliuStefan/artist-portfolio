import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your CSS for the Navbar

const Navbar = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('authToken'); // If you have stored a token
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
          Register
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          Profile
        </NavLink>
        {username && (
          <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>
            Add Work
          </NavLink>
        )}
      </div>
      
      {username ? (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <NavLink to="/login" className="login-button">
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
