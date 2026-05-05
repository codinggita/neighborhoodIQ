import React from 'react';
import SkeletonBase from './SkeletonBase';

const NavbarSkeleton = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-100 z-50 py-4 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <SkeletonBase variant="box" width="32px" height="32px" className="skeleton-rounded-lg" />
        <SkeletonBase variant="text" width="120px" height="20px" className="skeleton-rounded-full" />
      </div>
      
      <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
        {[...Array(4)].map((_, i) => (
          <SkeletonBase key={i} variant="text" width="60px" height="14px" className="skeleton-rounded-full" />
        ))}
      </div>
      
      <div className="flex items-center space-x-6">
        <SkeletonBase variant="box" width="200px" height="36px" className="skeleton-rounded-xl hidden xl:block" />
        <SkeletonBase variant="circle" width="36px" height="36px" />
        <SkeletonBase variant="box" width="80px" height="36px" className="skeleton-rounded-xl" />
      </div>
    </nav>
  );
};

export default NavbarSkeleton;
