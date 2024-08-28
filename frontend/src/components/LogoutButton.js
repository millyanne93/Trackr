import React from 'react';
import { logout } from '../utils/auth';

const LogoutButton = () => (
  <button onClick={logout} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
    Logout
  </button>
);

export default LogoutButton;
