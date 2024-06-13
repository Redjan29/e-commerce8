//backend/src/Pages/Login.jsx
import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Mot_de_passe, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');

  //captcha
  useEffect(() => {
    window.grecaptcha.enterprise.ready(() => {
      window.grecaptcha.enterprise.execute('6LdzjvYpAAAAAG_w8ffCGXrMJ3XK8HfWF5BAnp8g', {action: 'LOGIN'}).then((token) => {
        setToken(token);
      });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    console.log('Attempting login with:', { Email, Mot_de_passe, token });

    fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        Email,
        Mot_de_passe,
        token // Envoyer le token reCAPTCHA avec les autres données
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => { throw new Error(error.message); });
      }
      return response.json();
    })
    .then(data => {
      console.log('Login successful:', data);
      setSuccess('Login successful');
      window.location.href = '/'; // Redirection vers la page d'accueil ou tableau de bord
    })
    .catch((error) => {
      console.error('Error:', error);
      setError(`Error: ${error.message}`);
    });
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input type="email" placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Mot de passe' value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="loginsignup-login">Don't have an account? <span onClick={() => window.location.href = '/LoginSignup'}>Sign up here</span></p>
      </div>
    </div>
  );
}

export default Login;
