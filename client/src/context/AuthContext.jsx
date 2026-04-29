import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

/**
 * Auth Context
 * Provides authentication state and methods to the entire app
 */
const AuthContext = createContext();

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = authService.getUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Register user
   */
  const register = async (name, email, password) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await authService.register({
        name,
        email,
        password,
      });
      
      setUser(response.user);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.details?.email || 
                          err.response?.data?.error || 
                          'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login user
   */
  const login = async (email, password) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await authService.login({
        email,
        password,
      });
      
      setUser(response.user);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (role) => {
    return user?.role === role;
  };

  /**
   * Check if user has any of the provided roles
   */
  const hasAnyRole = (roles) => {
    return Array.isArray(roles) && roles.includes(user?.role);
  };

  const value = {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use Auth Context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};
