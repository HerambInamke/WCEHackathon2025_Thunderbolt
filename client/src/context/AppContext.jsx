import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState('light');
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Navigation state
  const [currentPage, setCurrentPage] = useState('home');
  
  // Notifications state
  const [notifications, setNotifications] = useState([]);
  
  // Language/Locale state
  const [language, setLanguage] = useState('en');

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
  });

  // Helper functions
  const updateUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(!!userData);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Additional cleanup if needed
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    setSettings(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };

  const addNotification = (notification) => {
    setNotifications(prev => [...prev, { ...notification, id: Date.now() }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Additional language-specific logic if needed
  };

  // Effects
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', theme);
    // Apply theme to body
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    // User
    user,
    isAuthenticated,
    updateUser,
    logout,
    
    // Theme
    theme,
    toggleTheme,
    
    // Loading and error
    isLoading,
    setIsLoading,
    error,
    setError,
    
    // Navigation
    currentPage,
    setCurrentPage,
    
    // Notifications
    notifications,
    addNotification,
    removeNotification,
    
    // Language
    language,
    updateLanguage,
    
    // Settings
    settings,
    updateSettings,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 