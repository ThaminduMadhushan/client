import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

import AdminHome from "./admin/AdminHome.jsx";
import AdminAbout from "./admin/AdminAbout.jsx";
import AdminSetting from "./admin/AdminSetting.jsx";

import EmployeeHome from "./employee/EmployeeHome.jsx";
import EmployeeAbout from "./employee/EmployeeAbout.jsx";
import EmployeeSetting from "./employee/EmployeeSetting.jsx";

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
          <Route path="/admin/about" element={<AdminAbout />}></Route>
          <Route path="/admin/setting" element={<AdminSetting />}></Route>

          <Route path="/employee/home" element={<EmployeeHome />}></Route>
          <Route path="/employee/about" element={<EmployeeAbout />}></Route>
          <Route path="/employee/setting" element={<EmployeeSetting />}></Route>

          <Route path="/customer/home" element={<CustomerHome />}></Route>
          <Route path="/customer/about" element={<CustomerAbout />}></Route>
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
