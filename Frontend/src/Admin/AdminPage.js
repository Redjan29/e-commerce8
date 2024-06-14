import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Make sure to create this CSS file

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/admin/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Problem with the delete request');
      }
      fetchProducts();  // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({ ...newProduct, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchProducts();  // Refresh the list after adding
      setNewProduct({
        Titre: '',
        Description: '',
        Image: '',
        Prix: '',
        old_price: '',
        Id_CategorieProduit: '',
        isNewCollection: false,
      }); // Clear the form
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/products/${selectedProduct.Id_Produit}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProduct),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchProducts();  // Refresh the list after updating
      setSelectedProduct(null); // Clear the selection
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSelectedInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="admin-container">
      <h1>Product Administration</h1>
      <div className="admin-section">
        <div className="admin-form">
          <h2>Add New Product</h2>
          <label>Titre</label>
          <input type="text" name="Titre" value={newProduct.Titre} onChange={handleInputChange} />
          <label>Description</label>
          <input type="text" name="Description" value={newProduct.Description} onChange={handleInputChange} />
          <label>Image</label>
          <input type="text" name="Image" value={newProduct.Image} onChange={handleInputChange} />
          <label>Prix</label>
          <input type="text" name="Prix" value={newProduct.Prix} onChange={handleInputChange} />
          <label>Old Price</label>
          <input type="text" name="old_price" value={newProduct.old_price} onChange={handleInputChange} />
          <label>Category ID</label>
          <input type="text" name="Id_CategorieProduit" value={newProduct.Id_CategorieProduit} onChange={handleInputChange} />
          <label>New Collection</label>
          <input type="checkbox" name="isNewCollection" checked={newProduct.isNewCollection} onChange={handleInputChange} />
          <button onClick={handleAddProduct}>Save</button>
        </div>
        {selectedProduct && (
          <div className="admin-update-form">
            <h2>Edit Product</h2>
            <label>Titre</label>
            <input type="text" name="Titre" value={selectedProduct.Titre} onChange={handleSelectedInputChange} />
            <label>Description</label>
            <input type="text" name="Description" value={selectedProduct.Description} onChange={handleSelectedInputChange} />
            <label>Image</label>
            <input type="text" name="Image" value={selectedProduct.Image} onChange={handleSelectedInputChange} />
            <label>Prix</label>
            <input type="text" name="Prix" value={selectedProduct.Prix} onChange={handleSelectedInputChange} />
            <label>Old Price</label>
            <input type="text" name="old_price" value={selectedProduct.old_price} onChange={handleSelectedInputChange} />
            <label>Category ID</label>
            <input type="text" name="Id_CategorieProduit" value={selectedProduct.Id_CategorieProduit} onChange={handleSelectedInputChange} />
            <label>New Collection</label>
            <input type="checkbox" name="isNewCollection" checked={selectedProduct.isNewCollection} onChange={handleSelectedInputChange} />
            <button onClick={handleUpdateProduct}>Update</button>
          </div>
        )}
      </div>
      <div className="admin-list">
        <h2>Existing Products</h2>
        <ul>
          {products.map(product => (
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
