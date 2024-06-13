import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOrder, setSortOrder] = useState('default'); // Ajoutez un état pour le tri

  // Fonction de tri
  const sortProducts = (products, order) => {
    if (order === 'asc') {
      return products.sort((a, b) => a.Prix - b.Prix);
    } else if (order === 'desc') {
      return products.sort((a, b) => b.Prix - a.Prix);
    }
    return products; // Si 'default', ne faites rien
  };

  const sortedProducts = sortProducts([...all_product], sortOrder);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
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
        {sortedProducts.map((item, i) => {
          if (props.category === item.Id_CategorieProduit) {
            return (
              <Item
                key={i}
                id={item.Id_Produit}
                name={item.Titre}
                image={item.Image}
                new_price={item.Prix}
                old_price={item.old_price || item.Prix} // Utilisez item.Prix s'il n'y a pas de old_price
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
