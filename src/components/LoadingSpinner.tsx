import React from 'react';

/**
 * Reusable loading spinner component
 * Demonstrates component composition and props interface
 */
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-3 text-sm text-gray-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;