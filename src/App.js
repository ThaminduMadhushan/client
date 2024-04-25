import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './AdminDashboard.jsx';
import Home from './pages/Home.jsx';
import Setting from './pages/Setting.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
// import LandingPage from './LandingPage.jsx';
import SignUp from './pages/SignUp.jsx';
import LandingPage from './LandingPage/LandingPage.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminDashboard/>} ></Route>
                <Route path="/home" element={<Home/>} ></Route>
                <Route path="/setting" element={<Setting/>} ></Route>
                <Route path="/about" element={<About/>} ></Route>
                <Route path="/login" element={<Login/>} ></Route>
                // <Route path="/landing" element={<LandingPage/>} ></Route>
                <Route path="/signup" element={<SignUp/>} ></Route>
                <Route path="/landing" element={<LandingPage/>} ></Route>
                
            </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App
