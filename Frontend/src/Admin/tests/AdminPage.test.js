import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import AdminPage from '../AdminPage'; // Assurez-vous que le chemin est correct

// Active les mocks pour les appels réseau avant tous les tests
beforeAll(() => {
  fetchMock.enableMocks();
});

// Réinitialise les mocks avant chaque test
beforeEach(() => {
  fetchMock.resetMocks();
});

// Test pour vérifier le fetch des produits lors du montage du composant
it('fetches products on component mount', async () => {
  // Simule une réponse API avec un produit factice
  const fakeProducts = [{ Id_Produit: '1', Titre: 'Product 1' }];
  fetchMock.mockResponseOnce(JSON.stringify(fakeProducts));

  // Affiche le composant AdminPage
  render(<AdminPage />);

  // Attendre que le produit soit affiché après le montage du composant
  await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());

  // Vérifier que l'appel API a été effectué avec la bonne URL
  expect(fetchMock).toHaveBeenCalledWith('http://localhost:5001/api/admin/products');
});

// Test pour vérifier l'ajout d'un nouveau produit
it('adds a new product', async () => {
  // Définition d'un nouveau produit factice
  const newProduct = { 
    Titre: 'New Product', 
    Description: 'New Desc', 
    Image: '', 
    Prix: '100', 
    old_price: '', 
    Id_CategorieProduit: '', 
    isNewCollection: false 
  };

  // Simule une réponse API pour l'ajout du produit
  fetchMock.mockResponseOnce(JSON.stringify(newProduct), { status: 201 });

  // Affiche le composant AdminPage
  render(<AdminPage />);

  // Utiliser act pour s'assurer que les changements d'état sont traités correctement
  await act(async () => {
    // Remplir le formulaire d'ajout de produit
    fireEvent.change(screen.getByLabelText('Titre'), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'New Desc' } });
    fireEvent.change(screen.getByLabelText('Prix'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Image'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Old Price'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Category ID'), { target: { value: '' } });
    // Ne pas cliquer sur la case à cocher 'New Collection' pour qu'elle reste false
    fireEvent.click(screen.getByText('Save'));
  });

  // Vérifier que l'appel API a été effectué avec les bons paramètres
  await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
    'http://localhost:5001/api/admin/products',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    }
  ));
});

// Test pour vérifier la suppression d'un produit
it('deletes a product', async () => {
  // Simule une réponse API avec un produit factice
  const fakeProducts = [{ Id_Produit: '1', Titre: 'Product 1' }];
  fetchMock.mockResponseOnce(JSON.stringify(fakeProducts));
  fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

  // Affiche le composant AdminPage
  render(<AdminPage />);

  // Attendre que le produit soit affiché
  await waitFor(() => screen.getByText('Product 1'));

  // Simuler un clic sur le bouton de suppression
  fireEvent.click(screen.getByText('Delete'));

  // Vérifier que l'appel API de suppression a été effectué avec la bonne URL et méthode
  await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
    'http://localhost:5001/api/admin/products/1',
    {
      method: 'DELETE'
    }
  ));
});

// Test pour vérifier la mise à jour d'un produit
it('updates a product', async () => {
    // Simule une réponse API avec un produit factice
    const fakeProducts = [{ Id_Produit: '1', Titre: 'Product 1', Description: '', Image: '', Prix: '', old_price: '', Id_CategorieProduit: '', isNewCollection: false }];
    fetchMock.mockResponseOnce(JSON.stringify(fakeProducts));
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });
  
    // Affiche le composant AdminPage
    render(<AdminPage />);
    // Attendre que le produit soit affiché
    await waitFor(() => screen.getByText('Product 1'));
  
    // Simuler un clic sur le bouton d'édition
    fireEvent.click(screen.getByText('Edit'));
    // Attendre que les champs d'édition soient affichés
    await waitFor(() => screen.getByLabelText('Titre', { selector: 'input[id="edit_Titre"]' }));
    // Remplir les champs d'édition avec de nouvelles valeurs
    fireEvent.change(screen.getByLabelText('Titre', { selector: 'input[id="edit_Titre"]' }), { target: { value: 'Updated Product' } });
    fireEvent.change(screen.getByLabelText('Description', { selector: 'input[id="edit_Description"]' }), { target: { value: 'Updated Desc' } });
    fireEvent.change(screen.getByLabelText('Prix', { selector: 'input[id="edit_Prix"]' }), { target: { value: '150' } });
    // Simuler un clic sur le bouton de mise à jour
    fireEvent.click(screen.getByText('Update'));
  
    // Vérifier que l'appel API de mise à jour a été effectué avec les bons paramètres
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:5001/api/admin/products/1',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id_Produit: '1', Titre: 'Updated Product', Description: 'Updated Desc', Image: '', Prix: '150', old_price: '', Id_CategorieProduit: '', isNewCollection: false }),
      }
    ));
});
