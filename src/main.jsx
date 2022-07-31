import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// componentes
import App from "./App";

import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/Users/UserProfile";
// import Forgot from "./components/Users/Forgot";
// import ResetPass from "./components/Users/ResetPass";

import Products from "./components/Products/Products";
import Product from "./components/Products/Product";
import ModifyProducts from "./components/Modifications/ModifyProducts";
import NewProduct from "./components/Modifications/NewProduct";
import EditProduct from "./components/Modifications/EditProduct";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        {/* products */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/modifications" element={<ModifyProducts />} />
        <Route path="/newProduct" element={<NewProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />

        {/* users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userProfile" element={<UserProfile />} />
        {/* <Route path="/forgot-password" element={<Forgot />}></Route> */}
        {/* <Route path="/users/reset/:token" element={<ResetPass />}></Route> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
