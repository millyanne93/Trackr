import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; // Update with role-based pages
import AdminHomePage from './pages/AdminHomePage'; // Add Admin Home Page
import RegularUserHomePage from './pages/RegularUserHomePage'; // Add Regular User Home Page
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Register from './components/Register';
import Login from './components/Login';
import EquipmentDetail from './pages/EquipmentDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-home" element={<AdminHomePage />} />
          <Route path="/user-home" element={<RegularUserHomePage />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
