// TawkChat.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TawkChat = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if the current path starts with any of the paths to hide on
    // const shouldHideChat = hideOnPaths.some(path => 
    //   location.pathname.startsWith(path)
    // );
    
    // // Only load Tawk if it should not be hidden on the current page
    // if (!shouldHideChat) {
      const Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      
      // You can set initial properties for the widget here
      Tawk_API.onLoad = function() {
        console.log('Chat widget loaded');
      };
      
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = 'https://embed.tawk.to/67d48c2017af9c190a27e3da/1imb46nv5';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.head.appendChild(s1);
      
      // Cleanup function to remove the script when component unmounts
      // or when the route changes to a page where chat should be hidden
      return () => {
        const tawkScript = document.querySelector('script[src*="tawk.to"]');
        if (tawkScript) {
          tawkScript.remove();
          
          // Remove any Tawk instances from the DOM
          const tawkElements = document.querySelectorAll('div[class*="tawk-"]');
          tawkElements.forEach(element => element.remove());
          
          // Reset Tawk_API
          if (window.Tawk_API) {
            if (window.Tawk_API.hideWidget) window.Tawk_API.hideWidget();
          }
        }
    //   };
    }
  }, []);

  // This component doesn't render anything itself
  return null;
};

export default TawkChat;