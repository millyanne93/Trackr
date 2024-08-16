import React from 'react';
import { logout } from '../utils/auth';

const LogoutButton = () => (
  <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
    Logout
  </button>
);

export default LogoutButton;
