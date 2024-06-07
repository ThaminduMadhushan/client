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
import AdminBin from "./admin/AdminBin.jsx";
import AdminEmployee from "./admin/AdminEmployee.jsx";
import AdminBailerJob from "./admin/AdminBailerJob.jsx";

import BailerHome from "./bailer/BailerHome.jsx";
import BailerJobs from "./bailer/BailerJobs.jsx";
import BailerProfile from "./bailer/BailerProfile.jsx";
import BailerMaterial from "./bailer/BailerMaterial.jsx";

import DriverHome from "./driver/DriverHome.jsx";
import DriverSetting from "./driver/DriverSetting.jsx";
import DriverBin from "./driver/DriverBin.jsx";
import DriverSalary  from "./driver/DriverSalary.jsx";

import CustomerHome from "./customer/CustomerHome.jsx";
import CustomerAbout from "./customer/CustomerAbout.jsx";
import CustomerProduct from "./customer/CustomerProduct.jsx";
import CustomerSetting from "./customer/CustomerSetting.jsx";

import SupplierHome from "./supplier/SupplierHome.jsx";
import SupplierCollection from "./supplier/SupplierCollection.jsx";
import SupplierMaterial from "./supplier/SupplierMaterial.jsx";
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
          <Route path="/admin/bin" element={<AdminBin />}></Route>
          <Route path="/admin/employee" element={<AdminEmployee />}></Route>
          <Route path="/admin/bailer" element={<AdminBailerJob />}></Route>

          <Route path="/bailer/home" element={<BailerHome />}></Route>
          <Route path="/bailer/jobs" element={<BailerJobs />}></Route>
          <Route path="/bailer/profile" element={<BailerProfile />}></Route>
          <Route path="/bailer/material" element={<BailerMaterial />}></Route>

          <Route path="/driver/home" element={<DriverHome />}></Route>
          <Route path="/driver/bin" element={<DriverBin />}></Route>
          <Route path="/driver/profile" element={<DriverSetting />}></Route>
          <Route path="/driver/salary" element={<DriverSalary />}></Route>

          <Route path="/customer/home" element={<CustomerHome />}></Route>
          <Route path="/customer/order" element={<CustomerAbout />}></Route>
          <Route path="/customer/product" element={<CustomerProduct />}></Route>
          <Route path="/customer/setting" element={<CustomerSetting />}></Route>

          <Route path="/supplier/home" element={<SupplierHome />}></Route>
          <Route path="/supplier/collection" element={<SupplierCollection />}></Route>
          <Route path="/supplier/material" element={<SupplierMaterial />}></Route>
          <Route path="/supplier/setting" element={<SupplierSetting />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
