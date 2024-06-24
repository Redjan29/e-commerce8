import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    Titre: '',
    Description: '',
    Image: '',
    Prix: '',
    old_price: '',
    Id_CategorieProduit: '',
    isNewCollection: false,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleClientButtonClick = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/admin/products', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Failed to fetch products');
    }
  };

  const handleDelete = async (id) => {
    try {
      const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('XSRF-TOKEN=')).split('=')[1];

      const response = await fetch(`http://localhost:5001/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'csrf-token': csrfToken,
        },
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Problem with the delete request: ${errorData.message}`);
      }
      fetchProducts();
      setSuccessMessage('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      setErrorMessage(`Failed to delete product: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({ ...newProduct, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddProduct = async () => {
    if (!newProduct.Titre || !newProduct.Prix || !newProduct.Id_CategorieProduit) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('XSRF-TOKEN=')).split('=')[1];

      const response = await fetch('http://localhost:5001/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.message}`);
      }
      fetchProducts();
      setNewProduct({
        Titre: '',
        Description: '',
        Image: '',
        Prix: '',
        old_price: '',
        Id_CategorieProduit: '',
        isNewCollection: false,
      });
      setSuccessMessage('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage(`Failed to add product: ${error.message}`);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct.Titre || !selectedProduct.Prix || !selectedProduct.Id_CategorieProduit) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('XSRF-TOKEN=')).split('=')[1];

      const response = await fetch(`http://localhost:5001/api/admin/products/${selectedProduct.Id_Produit}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(selectedProduct),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.message}`);
      }
      fetchProducts();
      setSelectedProduct(null);
      setSuccessMessage('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage(`Failed to update product: ${error.message}`);
    }
  };

  const handleSelectedInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="admin-container">
      <button className="client-button" onClick={handleClientButtonClick}>Client</button>
      <h1>Product Administration</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="admin-section">
        <div className="admin-form">
          <h2>Add New Product</h2>
          <label htmlFor="new_Titre">Titre</label>
          <input id="new_Titre" type="text" name="Titre" value={newProduct.Titre} onChange={handleInputChange} required />
          <label htmlFor="new_Description">Description</label>
          <input id="new_Description" type="text" name="Description" value={newProduct.Description} onChange={handleInputChange} />
          <label htmlFor="new_Image">Image</label>
          <input id="new_Image" type="text" name="Image" value={newProduct.Image} onChange={handleInputChange} />
          <label htmlFor="new_Prix">Prix</label>
          <input id="new_Prix" type="text" name="Prix" value={newProduct.Prix} onChange={handleInputChange} required />
          <label htmlFor="new_old_price">Old Price</label>
          <input id="new_old_price" type="text" name="old_price" value={newProduct.old_price} onChange={handleInputChange} />
          <label htmlFor="new_Id_CategorieProduit">Category ID</label>
          <select id="new_Id_CategorieProduit" name="Id_CategorieProduit" value={newProduct.Id_CategorieProduit} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            <option value="1">Women</option>
            <option value="2">Men</option>
            <option value="3">Kid</option>
          </select>
          <label htmlFor="new_isNewCollection">New Collection</label>
          <input id="new_isNewCollection" type="checkbox" name="isNewCollection" checked={newProduct.isNewCollection} onChange={handleInputChange} />
          <button onClick={handleAddProduct}>Save</button>
        </div>
        {selectedProduct && (
          <div className="admin-update-form">
            <h2>Edit Product</h2>
            <label htmlFor="edit_Titre">Titre</label>
            <input id="edit_Titre" type="text" name="Titre" value={selectedProduct.Titre} onChange={handleSelectedInputChange} required />
            <label htmlFor="edit_Description">Description</label>
            <input id="edit_Description" type="text" name="Description" value={selectedProduct.Description} onChange={handleSelectedInputChange} />
            <label htmlFor="edit_Image">Image</label>
            <input id="edit_Image" type="text" name="Image" value={selectedProduct.Image} onChange={handleSelectedInputChange} />
            <label htmlFor="edit_Prix">Prix</label>
            <input id="edit_Prix" type="text" name="Prix" value={selectedProduct.Prix} onChange={handleSelectedInputChange} required />
            <label htmlFor="edit_old_price">Old Price</label>
            <input id="edit_old_price" type="text" name="old_price" value={selectedProduct.old_price} onChange={handleSelectedInputChange} />
            <label htmlFor="edit_Id_CategorieProduit">Category ID</label>
            <select id="edit_Id_CategorieProduit" name="Id_CategorieProduit" value={selectedProduct.Id_CategorieProduit} onChange={handleSelectedInputChange} required>
              <option value="">Select Category</option>
              <option value="1">Women</option>
              <option value="2">Men</option>
              <option value="3">Kid</option>
            </select>
            <label htmlFor="edit_isNewCollection">New Collection</label>
            <input id="edit_isNewCollection" type="checkbox" name="isNewCollection" checked={selectedProduct.isNewCollection} onChange={handleSelectedInputChange} />
            <button onClick={handleUpdateProduct}>Update</button>
          </div>
        )}
      </div>
      <div className="admin-list">
        <h2>Existing Products</h2>
        <ul>
          {Array.isArray(products) && products.map(product => (
            <li key={product.Id_Produit}>
              <div><strong>Titre:</strong> {product.Titre}</div>
              <div><strong>Description:</strong> {product.Description}</div>
              <div><strong>Image:</strong> {product.Image}</div>
              <div><strong>Prix:</strong> {product.Prix}</div>
              <div><strong>Old Price:</strong> {product.old_price}</div>
              <div><strong>Category ID:</strong> {product.Id_CategorieProduit}</div>
              <div><strong>New Collection:</strong> {product.isNewCollection ? 'Yes' : 'No'}</div>
              <button className="edit" onClick={() => handleSelectProduct(product)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(product.Id_Produit)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;

