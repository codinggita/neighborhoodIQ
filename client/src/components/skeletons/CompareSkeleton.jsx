import React from 'react';
import SkeletonBase from './SkeletonBase';

const CompareSkeleton = () => {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen pb-20">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="py-12 flex justify-between items-center">
          <div className="space-y-4">
            <SkeletonBase variant="text" width="250px" height="32px" className="skeleton-rounded-lg" />
            <SkeletonBase variant="text" width="400px" height="14px" className="skeleton-rounded-full" />
          </div>
          <SkeletonBase variant="box" width="200px" height="48px" className="skeleton-rounded-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <SkeletonBase variant="box" height="200px" />
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-grow">
                    <SkeletonBase variant="text" width="80%" height="20px" className="skeleton-rounded-lg" />
                    <SkeletonBase variant="text" width="50%" height="12px" className="skeleton-rounded-full" />
                  </div>
                  <SkeletonBase variant="circle" width="48px" height="48px" />
                </div>
                
                <div className="space-y-6">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <SkeletonBase variant="text" width="60px" height="10px" className="skeleton-rounded-full" />
                        <SkeletonBase variant="text" width="30px" height="10px" className="skeleton-rounded-full" />
                      </div>
                      <SkeletonBase variant="box" height="8px" className="skeleton-rounded-full" />
                    </div>
                  ))}
                </div>
                
                <SkeletonBase variant="box" height="48px" className="skeleton-rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareSkeleton;
