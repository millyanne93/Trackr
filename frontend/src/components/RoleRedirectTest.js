import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRedirectTest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const testRole = 'admin'; // Change this to 'user' and see the result
    if (testRole === 'admin') {
      navigate('/admin-home');
    } else {
      navigate('/user-home');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Testing Role-Based Redirection</h1>
    </div>
  );
};

export default RoleRedirectTest;
