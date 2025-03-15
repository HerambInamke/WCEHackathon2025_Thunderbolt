import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAuth } from "firebase/auth";

const TawkToChat = () => {
  const { isLoggedIn } = useAuth();
  const auth = getAuth();

  useEffect(() => {
    if (window.Tawk_API) {
      // Set visitor information if user is logged in
      if (isLoggedIn) {
        const user = auth.currentUser;
        window.Tawk_API.onLoad = function() {
          window.Tawk_API.setAttributes({
            name: user?.displayName || 'Anonymous User',
            email: user?.email || 'No Email',
          }, function(error) {
            if (error) {
              console.error('Error setting Tawk.to attributes:', error);
            }
          });
        };
      }

      // Custom event handlers
      window.Tawk_API.onChatMaximized = function() {
        console.log('Chat window maximized');
      };

      window.Tawk_API.onChatMinimized = function() {
        console.log('Chat window minimized');
      };

      window.Tawk_API.onChatStarted = function() {
        console.log('Chat started');
      };

      window.Tawk_API.onChatEnded = function() {
        console.log('Chat ended');
      };
    }
  }, [isLoggedIn, auth.currentUser]);

  return null; // This component doesn't render anything
};

export default TawkToChat; 