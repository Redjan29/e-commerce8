// frontend/src/Context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Créer un contexte d'authentification
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // État pour savoir si l'utilisateur est connecté ou non
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // État pour gérer le chargement initial
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour vérifier l'authentification de l'utilisateur
    const checkAuth = async () => {
      try {
        // Faire une requête GET pour vérifier si l'utilisateur est authentifié
        const response = await fetch('http://localhost:5001/api/protected/dashboard', {
          method: 'GET',
          credentials: 'include', // Inclure les cookies dans les requêtes pour envoyer le jeton JWT
        });

        if (!response.ok) {
          // Si la réponse n'est pas correcte (par exemple, si le statut n'est pas 200 OK), lever une erreur
          throw new Error('Not authenticated');
        }

        const data = await response.json();
        // Si la réponse est correcte, définir l'utilisateur comme connecté
        setIsLoggedIn(true);
      } catch (error) {
        // En cas d'erreur, définir l'utilisateur comme non connecté
        setIsLoggedIn(false);
      } finally {
        // Qu'il y ait une erreur ou non, arrêter le chargement initial
        setLoading(false);
      }
    };

    // Appeler la fonction de vérification de l'authentification au montage du composant
    checkAuth();
  }, []);

  return (
    // Fournir les états de connexion et de chargement à tous les composants enfants
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
