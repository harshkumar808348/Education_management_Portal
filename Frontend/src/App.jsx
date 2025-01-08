import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { motion } from "framer-motion";
import './App.css';

// Components
import MiddleSection from "../src/middelSeaction.jsx/middlessection.jsx";
import SecondMiddle from "../src/secondMiddleSection/secondMiddle.jsx";
import TechnologySection from "../src/secondMiddleSection/secondMiddle.jsx";
import Class9adminPannel from '../src/adminPannel/Class9adminPannel.jsx';
import Class10adminPannel from '../src/adminPannel/Class10adminPannel.jsx';
import EducationalServicesSection from '../src/middelSeaction.jsx/middlessection.jsx';
import HeroHighlightDemo from '../src/background/HeroHIghlightDemo.jsx';
import MainAdmin from '../src/adminPannel/MainAdmin.jsx';
import AdminLogin from '../src/adminPannel/adminLogin.jsx';
import AdminRegister from '../src/adminPannel/adminRegister.jsx';
import { useAutoLogout } from '../src/hooks/useAutoLogout.jsx'; // Import the auto-logout hook
import FourthMiddle from '../src/fourthSection.jsx/adminandteacher.jsx';
import Footer from "../src/Footer/footer.jsx";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  useAutoLogout(); // Use the auto-logout hook

  const isAuthenticated = localStorage.getItem('adminToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <HeroHighlightDemo />
              <FourthMiddle />
              <MiddleSection />
              <SecondMiddle />
              <Footer />
              
            </>
          }
        />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/educational-services/*" element={<EducationalServicesSection />} />
        <Route path="/technology-services/*" element={<TechnologySection />} />
        
        {/* Authentication Route */}
        <Route path='/adminlogin' element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="/MainAdmin/*" element={
          <ProtectedRoute>
            <MainAdmin />
           </ProtectedRoute>
        } />
        
        <Route path="/admin/class9" element={
          <ProtectedRoute>
            <Class9adminPannel />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/class10" element={
          <ProtectedRoute>
            <Class10adminPannel />
          </ProtectedRoute>
        } />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;