//frontend/src/Components/Navbar/Navbar.jsx

import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo2 from "../Assets/logo2.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const { getTotalCartItems } = useContext(ShopContext);
  

  useEffect(() => {
    fetch('http://localhost:5001/api/protected/dashboard', {
      method: 'GET',
      credentials: 'include', // Inclure les cookies dans les requêtes
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => { throw new Error(error.message); });
      }
      return response.json();
    })
    .then(data => {
      setAuth(true);
      setMessage(`Welcome, ${data.name}`);
    })
    .catch(error => {
      setAuth(false);
      setMessage(`Error: ${error.message}`);
    });
  }, []);


  

  const handleLogout = () => {
    fetch('http://localhost:5001/api/protected/logout', {
      method: 'GET',
      credentials: 'include', // Inclure les cookies dans les requêtes
    })
    .then(res => res.json())
    .then(data => {
      setAuth(false);
      
    })
    .catch(err => console.log(err));
  }


  const [menu, setMenu] = useState("Shop");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo2} alt="logo" />
        <p>North Stark</p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("Shop")}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> {menu === "Shop" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("mens")}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("womens")}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("kids")}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
      </ul>

      {auth ? (
        <div className="nav-login-cart">
          <button onClick={handleLogout}> Logout</button>
          <Link to='/Profile'><button>Profile</button></Link>
          <Link to='/cart'> <img src={cart_icon} alt="cart icon" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      ) : (
        <div className="nav-login-cart">
         
         <Link to='/LoginSignup'><button>Register</button></Link>
          <Link to='/Login'><button>Login</button></Link>
          <Link to='/cart'> <img src={cart_icon} alt="cart icon" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
