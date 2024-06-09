import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './Pages/Payment';
import Login from './Pages/LoginPage';
import MainMenu from './Pages/MainMenu'
import History from './Pages/History';
const AppRoutes = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/payment" element={<Payment />} />
    <Route path="/main" element={<MainMenu />} />
    <Route path="/History" element={<History />} />
    </Routes>
  </Router>
);

export default AppRoutes;