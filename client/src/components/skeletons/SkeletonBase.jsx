import React from 'react';
import './Skeleton.css';

const SkeletonBase = ({ 
  variant = 'box', 
  width, 
  height, 
  className = '', 
  style = {} 
}) => {
  const baseClass = 'skeleton-base';
  const variantClass = variant === 'circle' ? 'skeleton-circle' : '';
  
  const combinedStyle = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%'),
    ...style
  };

  return (
    <div 
      className={`${baseClass} ${variantClass} ${className}`} 
      style={combinedStyle}
    />
  );
};

export default SkeletonBase;
