import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import LoginSignup from "./Pages/LoginSignup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Address from "./Components/Address/Address";
import Payment from "./Components/Payment/Payment";

function Layout() {
  const location = useLocation(); 
  const hideNavFooter = location.pathname === '/Dashboard' || location.pathname === '/Profile';

  return (
    <div>
      {!hideNavFooter && <Navbar />} 
      <Routes>
        <Route path="/" element={<Shop gender="all" />} />
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path='/product' element={<Product />}>
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/address" element={<Address />} />
        <Route path="/cart/payment" element={<Payment />} />
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      {!hideNavFooter && <Footer />} 
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
