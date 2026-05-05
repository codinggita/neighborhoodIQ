import React from 'react';
import SkeletonBase from './SkeletonBase';
import { TextGroup } from './SkeletonGroups';

const AreaDetailSkeleton = () => {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end">
          <div className="space-y-4">
            <SkeletonBase variant="text" width="120px" height="12px" className="skeleton-rounded-full" />
            <SkeletonBase variant="text" width="350px" height="40px" className="skeleton-rounded-lg" />
            <div className="flex items-center space-x-4">
              <SkeletonBase variant="text" width="150px" height="14px" className="skeleton-rounded-full" />
              <SkeletonBase variant="text" width="100px" height="14px" className="skeleton-rounded-full" />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <SkeletonBase variant="circle" width="80px" height="80px" />
              <SkeletonBase variant="text" width="60px" height="12px" className="mx-auto mt-2 skeleton-rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="bg-white border-b border-slate-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center space-x-10">
          {[...Array(5)].map((_, i) => (
            <SkeletonBase key={i} variant="text" width="80px" height="14px" className="skeleton-rounded-full" />
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <SkeletonBase variant="text" width="200px" height="24px" className="mb-8 skeleton-rounded-lg" />
              <SkeletonBase variant="box" height="300px" className="skeleton-rounded-2xl" />
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <SkeletonBase variant="text" width="150px" height="20px" className="mb-6 skeleton-rounded-lg" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <SkeletonBase variant="text" width="100px" height="12px" className="skeleton-rounded-full" />
                  <SkeletonBase variant="text" width="40px" height="12px" className="skeleton-rounded-full" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#0F2F20] rounded-3xl p-8 text-white">
            <SkeletonBase variant="text" width="120px" height="20px" className="bg-white/10 mb-4 skeleton-rounded-lg" />
            <SkeletonBase variant="text" width="90%" height="12px" className="bg-white/10 mb-8 skeleton-rounded-full" />
            <SkeletonBase variant="box" height="48px" className="bg-white/20 skeleton-rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaDetailSkeleton;
