import React from 'react';
import SkeletonBase from './SkeletonBase';
import { TextGroup } from './SkeletonGroups';

const SupportSkeleton = () => {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Hero Skeleton */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonBase variant="text" width="100px" height="10px" className="mb-4 skeleton-rounded-full" />
          <SkeletonBase variant="text" width="500px" height="48px" className="mb-6 skeleton-rounded-lg" />
          <SkeletonBase variant="text" width="400px" height="16px" className="skeleton-rounded-full" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-12 gap-12">
        {/* Form Skeleton */}
        <div className="lg:col-span-8 bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-6">
              <div className="flex items-center space-x-4">
                <SkeletonBase variant="circle" width="32px" height="32px" className="bg-[#22c55e]/10" />
                <SkeletonBase variant="text" width="200px" height="20px" className="skeleton-rounded-lg" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <SkeletonBase variant="text" width="80px" height="10px" className="skeleton-rounded-full" />
                    <SkeletonBase variant="box" height="48px" className="skeleton-rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <SkeletonBase variant="box" width="200px" height="52px" className="skeleton-rounded-xl mt-8" />
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-4 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center space-x-3">
                <SkeletonBase variant="box" width="24px" height="24px" className="skeleton-rounded-lg" />
                <SkeletonBase variant="text" width="120px" height="18px" className="skeleton-rounded-lg" />
              </div>
              <div className="space-y-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="flex justify-between items-center">
                    <SkeletonBase variant="text" width="150px" height="10px" className="skeleton-rounded-full" />
                    <SkeletonBase variant="circle" width="16px" height="16px" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportSkeleton;
