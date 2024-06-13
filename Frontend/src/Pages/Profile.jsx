// frontend/src/pages/Profile.jsx

import React, { useEffect, useState } from "react";
import "./CSS/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('http://localhost:5001/api/protected/profile', {
      method: 'GET',
      credentials: 'include', // Inclure les cookies dans les requêtes
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => { throw new Error(error.message); });
      }
      return response.json();
    })
    .then(data => {
      setUser(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="profile">Chargement...</div>;
  }

  if (error) {
    return <div className="profile">Erreur: {error}</div>;
  }

  return (
    <div className="profile">
      <h1>Profil Utilisateur</h1>
      {user && (
        <div className="profile-info">
          <p><strong>Nom:</strong> {user.nom}</p>
          <p><strong>Prénom:</strong> {user.prenom}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
