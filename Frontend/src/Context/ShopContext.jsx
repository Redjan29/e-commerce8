import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  for (let index = 0; index < products.length; index++) {
    cart[products[index].Id_Produit] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [all_product, setAllProduct] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    // Fetch products from the API when the component mounts
    fetch('http://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => {
        setAllProduct(data); // Set all products state
        setCartItems(getDefaultCart(data)); // Initialize cart with default values
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (itemId) => {
    // Add item to cart
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    // Remove item from cart
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const applyPromoCode = (code) => {
    // Apply promo code logic
    if (code === "SUMMER2024") {
      setPromoCode(code);
      setPromoDiscount(0.1); // 10% discount
    } else {
      // Invalid promo code
      setPromoCode("");
      setPromoDiscount(0);
    }
  };

  const getTotalCartAmount = () => {
    // Calculate total amount of items in the cart
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.Id_Produit === Number(item));
        totalAmount += cartItems[item] * itemInfo.Prix;
      }
    }
    totalAmount *= (1 - promoDiscount); // Apply promo discount
    return totalAmount;
  };

  const getTotalCartItems = () => {
    // Calculate total number of items in the cart
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = { 
    getTotalCartItems, 
    getTotalCartAmount, 
    all_product, 
    cartItems, 
    addToCart, 
    removeFromCart,
    applyPromoCode,
    promoCode,
    promoDiscount
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
