import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminHomePage from './pages/AdminHomePage';
import RegularUserHomePage from './pages/RegularUserHomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Register from './components/Register';
import Login from './components/Login';
import EquipmentDetail from './pages/EquipmentDetail';
import NotFound from './pages/NotFound';
import AddEquipmentForm from './components/AddEquipmentForm';
import ResponseInterceptor from './components/ResponseInterceptor'; // Import the ResponseInterceptor
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

function App() {
  const username = localStorage.getItem('username');

  return (
    <Router>
      <ResponseInterceptor /> {/* Add ResponseInterceptor here */}
      <Header />
      <main className="container mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
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
          <Route path="/add-equipment" element={<AddEquipmentForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
