import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './Pages/Payment';
import Login from './Pages/LoginPage';
import MainMenu from './Pages/MainMenu'
import History from './Pages/History';
import Landing from './Pages/LandingPage';
import CarTypes from './Pages/CarType';
const AppRoutes = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/payment" element={<Payment />} />
    <Route path="/main" element={<MainMenu />} />
    <Route path="/History" element={<History />} />
    <Route path="/CarTypes" element={<CarTypes />} />
    </Routes>
  </Router>
);

export default AppRoutes;