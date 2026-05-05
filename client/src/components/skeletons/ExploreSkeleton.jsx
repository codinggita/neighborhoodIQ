import React from 'react';
import SkeletonBase from './SkeletonBase';

const ExploreSkeleton = () => {
  return (
    <div className="pt-20 h-screen flex flex-col">
      {/* Filters Bar Skeleton */}
      <div className="h-16 border-b border-slate-100 bg-white flex items-center px-8 space-x-4 shrink-0">
        {[...Array(5)].map((_, i) => (
          <SkeletonBase key={i} variant="box" width="120px" height="36px" className="skeleton-rounded-lg" />
        ))}
      </div>
      
      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="w-[450px] border-r border-slate-100 bg-white overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center mb-8">
            <SkeletonBase variant="text" width="150px" height="24px" className="skeleton-rounded-lg" />
            <SkeletonBase variant="text" width="80px" height="12px" className="skeleton-rounded-full" />
          </div>
          
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4 p-3 border border-slate-100 rounded-2xl">
              <SkeletonBase variant="box" width="100px" height="100px" className="shrink-0 skeleton-rounded-xl" />
              <div className="flex-grow space-y-3 py-1">
                <SkeletonBase variant="text" width="70%" height="16px" className="skeleton-rounded-lg" />
                <SkeletonBase variant="text" width="40%" height="10px" className="skeleton-rounded-full" />
                <div className="flex items-center space-x-2 pt-2">
                  <SkeletonBase variant="circle" width="24px" height="24px" />
                  <SkeletonBase variant="text" width="60px" height="10px" className="skeleton-rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Map Skeleton */}
        <div className="flex-grow bg-slate-50 relative">
          <SkeletonBase variant="box" height="100%" />
          {/* Mock markers shimmer */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute" 
              style={{ 
                top: `${Math.random() * 80 + 10}%`, 
                left: `${Math.random() * 80 + 10}%` 
              }}
            >
              <SkeletonBase variant="circle" width="12px" height="12px" className="bg-[#22c55e]/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreSkeleton;
