import React from 'react';
import { logout } from '../utils/auth';

const LogoutButton = () => (
  <button onClick={logout} className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600">
    Logout
  </button>
);

export default LogoutButton;
