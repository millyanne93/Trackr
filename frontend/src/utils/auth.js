// src/utils/auth.js

export const logout = () => {
  localStorage.removeItem('token'); // or sessionStorage.removeItem('token')
  window.location.href = '/login'; // Redirect to the login page
};
