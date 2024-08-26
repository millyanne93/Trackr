import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoleRedirectTest from './components/RoleRedirectTest';
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

const RoleBasedRedirect = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      if (role === 'admin') {
        navigate('/admin-home');
      } else {
        navigate('/user-home');
      }
    }
  }, [navigate]);

  return null; // This component does not render anything
};

function App() {
  const username = localStorage.getItem('username');

  return (
    <Router>
      <ResponseInterceptor /> {/* Add ResponseInterceptor here */}
      <Header />
      <main className="container mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test-role-redirect" element={<RoleRedirectTest />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-home" element={<AdminHomePage username={username} />} />
          <Route path="/user-home" element={<RegularUserHomePage username={username} />} />
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
