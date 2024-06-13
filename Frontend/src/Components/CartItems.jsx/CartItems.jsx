//frontend/src/Components/CartItems/CartItems.jsx
import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { AuthContext } from '../../Context/AuthContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { Link, useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, applyPromoCode, promoDiscount } = useContext(ShopContext);
  const { isLoggedIn, loading } = useContext(AuthContext);
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

  const handleApplyPromoCode = () => {
    applyPromoCode(promoCode);
    setPromoCode(""); // Effacer le champ de saisie après l'application du code promo
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate('/cart/address');
    } else {
      alert("You need to be logged in to proceed to checkout.");
      navigate('/login');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const totalAmount = getTotalCartAmount();
  const discountAmount = promoDiscount * totalAmount;
  const discountedTotal = totalAmount - discountAmount;
  const discountPercentage = promoDiscount * 100;

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.Id_Produit] > 0) {
          return (
            <div key={e.Id_Produit}>
              <div className="cartitems-format cartitems-format-main">
                <img src={`http://localhost:5001/images/${e.Image}`} alt={e.Titre} className='carticon-product-icon' />
                <p>{e.Titre}</p>
                <p>${e.Prix}</p>
                <button className='cartitems-quantity'>{cartItems[e.Id_Produit]}</button>
                <p>${e.Prix * cartItems[e.Id_Produit]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.Id_Produit) }} alt="" />
              </div>
              <hr />
            </div>
          )
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${totalAmount.toFixed(1)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Promo Discount ({discountPercentage.toFixed(1)}%)</p>
              <p>- ${discountAmount.toFixed(1)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${discountedTotal.toFixed(1)}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input 
              type="text" 
              placeholder='Enter promo code' 
              value={promoCode} 
              onChange={(e) => setPromoCode(e.target.value)} 
            />
            <button onClick={handleApplyPromoCode}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;


/*//frontend/src/Components/CartItems/CartItems.jsx
import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, applyPromoCode, promoDiscount } = useContext(ShopContext);
  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromoCode = () => {
    applyPromoCode(promoCode);
    setPromoCode(""); // Effacer le champ de saisie après l'application du code promo
  };

  const totalAmount = getTotalCartAmount();
  const discountAmount = promoDiscount * totalAmount;
  const discountedTotal = totalAmount - discountAmount;
  const discountPercentage = promoDiscount * 100;

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.Id_Produit] > 0) {
          return (
            <div key={e.Id_Produit}>
              <div className="cartitems-format cartitems-format-main">
                <img src={`http://localhost:5001/images/${e.Image}`} alt={e.Titre} className='carticon-product-icon' />
                <p>{e.Titre}</p>
                <p>${e.Prix}</p>
                <button className='cartitems-quantity'>{cartItems[e.Id_Produit]}</button>
                <p>${e.Prix * cartItems[e.Id_Produit]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.Id_Produit) }} alt="" />
              </div>
              <hr />
            </div>
          )
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${totalAmount.toFixed(1)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Promo Discount ({discountPercentage.toFixed(1)}%)</p>
              <p>- ${discountAmount.toFixed(1)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${discountedTotal.toFixed(1)}</h3>
            </div>
          </div>
         <Link to='/cart/address'><button>PROCEED TO CHECKOUT</button></Link>  
         </div>
         <div className="cartitems-promocode">
           <p>If you have a promo code, enter it here</p>
           <div className="cartitems-promobox">
             <input 
               type="text" 
               placeholder='Enter promo code' 
               value={promoCode} 
               onChange={(e) => setPromoCode(e.target.value)} 
             />
             <button onClick={handleApplyPromoCode}>Apply</button>
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 export default CartItems;*/ 