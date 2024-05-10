import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

import AdminHome from "./admin/AdminHome.jsx";
import AdminProduct from "./admin/AdminProduct.jsx";
import AdminSetting from "./admin/AdminSetting.jsx";
import AdminMaterial from "./admin/AdminMaterial.jsx";
import AdminOrder from "./admin/AdminOrder.jsx";

import BailerHome from "./bailer/BailerHome.jsx";
import BailerAbout from "./bailer/BailerAbout.jsx";
import BailerSetting from "./bailer/BailerSetting.jsx";

import DriverHome from "./driver/DriverHome.jsx";
import DriverAbout from "./driver/DriverAbout.jsx";
import DriverSetting from "./driver/DriverSetting.jsx";

import CustomerHome from "./customer/CustomerHome.jsx";
import CustomerAbout from "./customer/CustomerAbout.jsx";
import CustomerSetting from "./customer/CustomerSetting.jsx";

import SupplierHome from "./supplier/SupplierHome.jsx";
import SupplierAbout from "./supplier/SupplierAbout.jsx";
import SupplierSetting from "./supplier/SupplierSetting.jsx";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/details" element={<AdminDashboard />}></Route>

          <Route path="/admin/home" element={<AdminHome />}></Route>
          <Route path="/admin/Product" element={<AdminProduct />}></Route>
          <Route path="/admin/setting" element={<AdminSetting />}></Route>
          <Route path="/admin/material" element={<AdminMaterial />}></Route>
          <Route path="/admin/order" element={<AdminOrder />}></Route>

          <Route path="/bailer/home" element={<BailerHome />}></Route>
          <Route path="/bailer/about" element={<BailerAbout />}></Route>
          <Route path="/bailer/setting" element={<BailerSetting />}></Route>

          <Route path="/driver/home" element={<DriverHome />}></Route>
          <Route path="/driver/about" element={<DriverAbout />}></Route>
          <Route path="/driver/setting" element={<DriverSetting />}></Route>

          <Route path="/customer/home" element={<CustomerHome />}></Route>
          <Route path="/customer/order" element={<CustomerAbout />}></Route>
          <Route path="/customer/setting" element={<CustomerSetting />}></Route>

          <Route path="/supplier/home" element={<SupplierHome />}></Route>
          <Route path="/supplier/about" element={<SupplierAbout />}></Route>
          <Route path="/supplier/setting" element={<SupplierSetting />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
