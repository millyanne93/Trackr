import React from 'react';
import { logout } from '../utils/auth';

const LogoutButton = () => (
  <button onClick={logout} className="bg-forest-500 text-white py-2 px-4 rounded-full hover:bg-forest-600">
    Logout
  </button>
);

export default LogoutButton;
