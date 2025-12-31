import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import MensWearPage from "./components/Shop/Products.jsx";
import Hero from "./components/HeroSection/Hero.jsx";
import Collections from "./components/Collections/collections.jsx";
import About from "./components/About/about.jsx";
import Contact from "./components/Contact/contact.jsx";
import Cart from "./components/Cart/cart.jsx";
import Orders from "./components/Cart/orders.jsx";
import Login from "./components/UserAuth/Login.jsx";
import Signup from "./components/UserAuth/Signup.jsx";
import Account from "./components/Account/Account.jsx";
import Wishlist from "./components/Cart/wish.jsx";
import ShopLayout from "./components/Shop/Products.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmailOrMobile, setUserEmailOrMobile] = useState("");

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userName={userEmailOrMobile}
      />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* 🛒 Nested Shopping Routes under ShopLayout */}
        <Route path="/shop" element={<ShopLayout />}>
          <Route path="mens" element={<MensWearPage category="mens" />} />
          <Route path="womens" element={<MensWearPage category="womens" />} />
          <Route path="newArrivals" element={<MensWearPage category="newArrivals" />} />
        </Route>

        {/* 🔒 Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart emailOrMobile={userEmailOrMobile} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* 🔐 Auth */}
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUserName={setUserEmailOrMobile}
            />
          }
        />
        <Route path="/signup" element={<Signup setActiveCategory={() => {}} />} />
        <Route path="/account" element={<Account />} />

        {/* 🌐 Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
