import apiClient from './apiClient';

/**
 * Authentication Service
 * Handles all auth-related API calls
 */

const authService = {
  /**
   * Register a new user
   * @param {object} credentials - { name, email, password }
   * @returns {Promise<object>} Response with token and user data
   */
  register: async (credentials) => {
    const response = await apiClient.post('/auth/register', credentials);
    
    // Store token and user in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  /**
   * Login user
   * @param {object} credentials - { email, password }
   * @returns {Promise<object>} Response with token and user data
   */
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    
    // Store token and user in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  /**
   * Get current user profile
   * @returns {Promise<object>} Current user data
   */
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Logout user (client-side)
   */
  logout: async () => {
    try {
      // Optional: Call logout endpoint
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Remove token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get stored token
   * @returns {string|null} JWT token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Get stored user
   * @returns {object|null} User object or null
   */
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
