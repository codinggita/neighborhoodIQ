import React from 'react';
import SkeletonBase from './SkeletonBase';
import { TextGroup, CardSkeleton } from './SkeletonGroups';

const HomeSkeleton = () => {
  return (
    <div className="pt-20 bg-white">
      {/* Hero Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SkeletonBase variant="text" width="40%" height="12px" className="mb-6 skeleton-rounded-full" />
          <SkeletonBase variant="text" width="90%" height="48px" className="mb-4 skeleton-rounded-lg" />
          <SkeletonBase variant="text" width="70%" height="48px" className="mb-8 skeleton-rounded-lg" />
          <TextGroup lines={2} className="mb-10" />
          <SkeletonBase variant="box" width="180px" height="52px" className="skeleton-rounded-xl" />
        </div>
        <div className="hidden lg:block">
          <SkeletonBase variant="box" height="400px" className="skeleton-rounded-3xl" />
        </div>
      </section>

      {/* Stats Skeleton */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <SkeletonBase variant="text" width="60px" height="32px" className="mx-auto mb-2 skeleton-rounded-lg" />
                <SkeletonBase variant="text" width="100px" height="12px" className="mx-auto skeleton-rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Skeleton */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SkeletonBase variant="text" width="200px" height="32px" className="mx-auto mb-4 skeleton-rounded-lg" />
            <SkeletonBase variant="text" width="400px" height="16px" className="mx-auto skeleton-rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSkeleton;
