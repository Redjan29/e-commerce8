import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext); // Accéder aux produits depuis le contexte
  const [sortOrder, setSortOrder] = useState('default'); // État pour l'ordre de tri
  const [filteredProducts, setFilteredProducts] = useState([]); // État pour les produits filtrés par catégorie

  useEffect(() => {
    // Filtrer les produits par catégorie lorsque les produits ou la catégorie changent
    const categoryIdMap = {
      women: 1,
      men: 2,
      kid: 3,
    };
    const filtered = all_product.filter(item => item.Id_CategorieProduit === categoryIdMap[props.category]);
    console.log('Filtered products for category', props.category, ':', filtered); // Debug: log the filtered products
    setFilteredProducts(filtered);
  }, [all_product, props.category]);

  // Fonction pour trier les produits
  const sortProducts = (products, order) => {
    if (order === 'asc') {
      return products.sort((a, b) => a.Prix - b.Prix); // Trier par prix croissant
    } else if (order === 'desc') {
      return products.sort((a, b) => b.Prix - a.Prix); // Trier par prix décroissant
    }
    return products; // Ne pas trier si 'default'
  };

  const sortedProducts = sortProducts([...filteredProducts], sortOrder); // Trier les produits filtrés

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="shopcategory-sort-select"
          >
            <option value="default">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => (
          <Item
            key={i}
            id={item.Id_Produit}
            name={item.Titre}
            image={item.Image}
            new_price={item.Prix}
            old_price={item.old_price || item.Prix} // Utilisez item.Prix s'il n'y a pas de old_price
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
