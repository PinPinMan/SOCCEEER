import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './Pages/Payment';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/payment" element={<Payment />} />
      {/* other routes */}
    </Routes>
  </Router>
);

export default AppRoutes;