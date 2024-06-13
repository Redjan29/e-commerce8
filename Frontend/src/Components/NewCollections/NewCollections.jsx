import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => {
        // Filtrer les produits pour ne garder que ceux qui sont dans la nouvelle collection
        const filteredData = data.filter(item => item.isNewCollection);
        setNewCollections(filteredData);
      })
      .catch(error => console.error('Error fetching new collections:', error));
  }, []);

  return (
    <div id='latest-collection' className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollections.map((item, i) => (
          <Item 
            key={i} 
            id={item.Id_Produit} 
            name={item.Titre} 
            image={item.Image} 
            new_price={item.Prix} 
            old_price={item.old_price} 
          />
        ))}
      </div>
    </div>
  );
}

export default NewCollections;
