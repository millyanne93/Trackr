import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Register from './components/Register';
import Login from './components/Login';
import AdminHomePage from './pages/AdminHomePage';
import RegularUserHomePage from './pages/RegularUserHomePage';
import EquipmentDetail from './pages/EquipmentDetail';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ResponseInterceptor from './components/ResponseInterceptor';

function App() {
  const username = localStorage.getItem('username');

  return (
    <Router>
      <ResponseInterceptor />
      {/* Flex container to ensure footer placement */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin-home"
              element={
                <ProtectedRoute roleRequired="admin">
                  <AdminHomePage username={username} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-home"
              element={
                <ProtectedRoute roleRequired="user">
                  <RegularUserHomePage username={username} />
                </ProtectedRoute>
              }
            />
            <Route path="/equipment-detail" element={<EquipmentDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer /> {/* Ensure footer is at the bottom */}
      </div>
    </Router>
  );
}

export default App;
