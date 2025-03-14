import React, { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

const Snackbar = ({ message, isOpen, onClose, type = 'error' }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bgColor = type === 'error' ? 'bg-red-50' : 'bg-green-50';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';
  const iconColor = type === 'error' ? 'text-red-500' : 'text-green-500';

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
      <div className={`flex items-center p-4 rounded-lg shadow-lg ${bgColor}`}>
        <AlertCircle className={`w-5 h-5 ${iconColor} mr-2`} />
        <span className={`${textColor} font-medium`}>{message}</span>
        <button
          onClick={onClose}
          className={`ml-4 ${textColor} hover:opacity-70 transition-opacity`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
