import React from 'react';
import SkeletonBase from './SkeletonBase';

export const TextGroup = ({ lines = 3, className = '', lastLineWidth = '70%' }) => (
  <div className={`space-y-2 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <SkeletonBase 
        key={i} 
        variant="text" 
        width={i === lines - 1 ? lastLineWidth : '100%'} 
        height="12px" 
        className="skeleton-rounded-full"
      />
    ))}
  </div>
);

export const CardSkeleton = ({ className = '', height = '200px' }) => (
  <div className={`bg-white rounded-2xl border border-slate-100 p-6 shadow-sm ${className}`}>
    <SkeletonBase variant="box" height="40px" width="40px" className="skeleton-rounded-lg mb-4" />
    <SkeletonBase variant="text" width="60%" height="20px" className="mb-2" />
    <TextGroup lines={3} />
  </div>
);

export const AvatarSkeleton = ({ size = '40px', className = '' }) => (
  <SkeletonBase variant="circle" width={size} height={size} className={className} />
);
