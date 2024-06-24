//frontend/src/Pages/LoginSignup
import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [Nom, setNom] = useState(''); // État pour le nom
  const [Prenom, setPrenom] = useState(''); // État pour le prénom
  const [Email, setEmail] = useState(''); // État pour l'email
  const [Mot_de_passe, setMotDePasse] = useState(''); // État pour le mot de passe
  const [error, setError] = useState(''); // État pour les messages d'erreur
  const [success, setSuccess] = useState(''); // État pour les messages de succès
  const [csrfToken, setCsrfToken] = useState(''); // État pour le token CSRF

  useEffect(() => {
    // Récupérer le token CSRF des cookies
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    if (csrfCookie) {
      const csrfToken = csrfCookie.split('=')[1];
      setCsrfToken(csrfToken);
    } else {
      console.error('CSRF token not found');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Effacer les erreurs précédentes
    setSuccess(''); // Effacer les messages de succès précédents

    fetch('http://localhost:5001/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken // Envoyer le token CSRF avec les autres données
      },
      credentials: 'include',
      body: JSON.stringify({
        Nom,
        Prenom,
        Email,
        Mot_de_passe,
      }),
    })
    .then(response => response.json().then(data => ({
      status: response.status,
      body: data
    })))
    .then(obj => {
      if (obj.status !== 201) {
        throw new Error(obj.body.errors ? obj.body.errors.map(err => err.msg).join(', ') : obj.body.message);
      }
      console.log('Success:', obj.body);
      setSuccess('Inscription avec succès'); // Afficher le message de succès
    })
    .catch((error) => {
      console.error('Error:', error);
      setError(`Error: ${error.message}`);
    });
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input type="text" placeholder='LastName' value={Nom} onChange={(e) => setNom(e.target.value)} />
            <input type="text" placeholder='FirstName' value={Prenom} onChange={(e) => setPrenom(e.target.value)} />
            <input type="email" placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
          </div>
          <button type="submit">Continue</button>
        </form>
        <p className="loginsignup-login">Already have an account? <span onClick={() => window.location.href = '/login'}>Login here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
