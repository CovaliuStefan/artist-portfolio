import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PortfolioList from './components/PortfolioList';
import PortfolioForm from './components/PortfolioForm';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'; // Import Navbar component
import './App.css'; // Import the main CSS file

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Render the Navbar component */}
      <main>
        <Routes>
          <Route path="/" element={<PortfolioList />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<PrivateRoute><ProfilePage /></PrivateRoute>}
          />
          <Route
            path="/add"
            element={<PrivateRoute><PortfolioForm /></PrivateRoute>}
          />
          <Route path="/add/:id" element={<PrivateRoute><PortfolioForm /></PrivateRoute>} />
          <Route path="*" element={<p>404 Not Found!</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
