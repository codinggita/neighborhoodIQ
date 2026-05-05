import React from 'react';
import SkeletonBase from './SkeletonBase';

const DashboardSkeleton = () => {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Nav Skeleton */}
        <div className="w-64 bg-white border-r border-slate-100 p-6 space-y-8 hidden md:block">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 px-3 py-2">
                <SkeletonBase variant="box" width="20px" height="20px" className="skeleton-rounded-lg" />
                <SkeletonBase variant="text" width="100px" height="12px" className="skeleton-rounded-full" />
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-slate-100">
            <SkeletonBase variant="box" height="100px" className="skeleton-rounded-2xl" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <SkeletonBase variant="text" width="200px" height="28px" className="skeleton-rounded-lg" />
              <SkeletonBase variant="text" width="300px" height="12px" className="skeleton-rounded-full" />
            </div>
            <SkeletonBase variant="box" width="150px" height="44px" className="skeleton-rounded-xl" />
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <SkeletonBase variant="box" width="40px" height="40px" className="skeleton-rounded-xl" />
                  <SkeletonBase variant="text" width="40px" height="10px" className="skeleton-rounded-full" />
                </div>
                <SkeletonBase variant="text" width="80px" height="24px" className="skeleton-rounded-lg" />
                <SkeletonBase variant="text" width="120px" height="10px" className="skeleton-rounded-full" />
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <SkeletonBase variant="text" width="200px" height="20px" className="mb-8 skeleton-rounded-lg" />
              <SkeletonBase variant="box" height="300px" className="skeleton-rounded-2xl" />
            </div>
            <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <SkeletonBase variant="text" width="150px" height="20px" className="mb-4 skeleton-rounded-lg" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <SkeletonBase variant="circle" width="32px" height="32px" />
                  <div className="space-y-2 flex-grow">
                    <SkeletonBase variant="text" width="70%" height="10px" className="skeleton-rounded-full" />
                    <SkeletonBase variant="text" width="40%" height="8px" className="skeleton-rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
