// backend/tests/userController.test.js
import request from 'supertest';
import { expect } from 'chai'; // Importation correcte de chai
import app from '../app.js'; // Assurez-vous que le chemin est correct

describe('UserController', function() {
  describe('POST /api/users/register', function() {
    it('registers a new user and returns success message', async function() {
      const userData = {
        Nom: 'John',
        Prenom: 'Doe',
        Email: 'john.doe@example.com',
        Mot_de_passe: 'password1234'
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201);

      expect(response.body.message).to.equal('User registered successfully');
      expect(response.body.user).to.include({
        Nom: 'John',
        Prenom: 'Doe',
        Email: 'john.doe@example.com'
      });
    });
  });
});
