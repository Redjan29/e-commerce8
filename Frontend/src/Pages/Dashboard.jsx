//frontend/src/Pages/Dashboard
import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Dashboard.css'; // Assurez-vous que le chemin vers le fichier CSS est correct

const DashboardNavbar = () => {
  const handleLogout = () => {
    // Supprimez le jeton utilisateur et redirigez vers la page de connexion
    localStorage.removeItem('userToken');
    window.location.href = '/Login';
  };

  return (
    <nav className="dashboard-navbar">
      <Link to="/Profile" className="nav-link">Profile</Link>
      <button onClick={handleLogout} className="logout-button">Déconnexion</button>
    </nav>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardNavbar />
      <div className="dashboard-content">
        <h1>Tableau de Bord</h1>
        {/* D'autres éléments de votre Dashboard ici */}
      </div>
    </div>
  );
};

export default Dashboard;
