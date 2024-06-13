import React, { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter(item => item.Id_Produit >= 1 && item.Id_Produit <= 4);

  return (
    <div className="popular">
      <h1>Popular in Women</h1>
      <hr />
      <div className="popular-item">
        {filteredProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.Id_Produit}
              name={item.Titre}
              image={item.Image}
              new_price={item.Prix}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
