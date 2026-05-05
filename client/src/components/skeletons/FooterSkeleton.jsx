import React from 'react';
import SkeletonBase from './SkeletonBase';
import { TextGroup } from './SkeletonGroups';

const FooterSkeleton = () => {
  return (
    <footer className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <SkeletonBase variant="box" width="32px" height="32px" className="bg-white/10 skeleton-rounded-lg" />
              <SkeletonBase variant="text" width="140px" height="24px" className="bg-white/10 skeleton-rounded-full" />
            </div>
            <SkeletonBase variant="text" width="80%" height="14px" className="bg-white/10 skeleton-rounded-full" />
            <SkeletonBase variant="text" width="60%" height="14px" className="bg-white/10 skeleton-rounded-full" />
          </div>
          
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-4">
              <SkeletonBase variant="text" width="100px" height="18px" className="bg-white/10 skeleton-rounded-lg mb-6" />
              {[...Array(4)].map((_, j) => (
                <SkeletonBase key={j} variant="text" width="120px" height="12px" className="bg-white/10 skeleton-rounded-full" />
              ))}
            </div>
          ))}
          
          <div className="space-y-6">
            <SkeletonBase variant="text" width="120px" height="18px" className="bg-white/10 skeleton-rounded-lg" />
            <SkeletonBase variant="text" width="90%" height="12px" className="bg-white/10 skeleton-rounded-full" />
            <SkeletonBase variant="box" height="48px" className="bg-white/10 skeleton-rounded-xl" />
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
          <SkeletonBase variant="text" width="300px" height="12px" className="bg-white/10 skeleton-rounded-full" />
          <div className="flex space-x-6 mt-6 md:mt-0">
            {[...Array(3)].map((_, i) => (
              <SkeletonBase key={i} variant="text" width="80px" height="12px" className="bg-white/10 skeleton-rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;
