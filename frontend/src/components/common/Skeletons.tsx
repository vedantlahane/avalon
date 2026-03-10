import React from 'react';

export const SkeletonBase = ({ className }: { className?: string }) => (
  <div className={`skeleton-pulse ${className}`} />
);

export const Skeleton = SkeletonBase;

export const DashboardSkeleton = () => (
  <div className="p-6 space-y-8 page-fade-in">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 space-y-4">
          <SkeletonBase className="h-4 w-24" />
          <SkeletonBase className="h-8 w-32" />
          <SkeletonBase className="h-4 w-48" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 h-[400px] space-y-4">
        <SkeletonBase className="h-6 w-48" />
        <SkeletonBase className="h-full w-full" />
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 h-[400px] space-y-4">
        <SkeletonBase className="h-6 w-48" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <SkeletonBase className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonBase className="h-4 w-32" />
                <SkeletonBase className="h-3 w-48" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ListSkeleton = () => (
  <div className="p-6 space-y-4 page-fade-in">
    <div className="flex justify-between items-center mb-8">
      <SkeletonBase className="h-8 w-48" />
      <div className="flex space-x-2">
        <SkeletonBase className="h-10 w-32" />
        <SkeletonBase className="h-10 w-32" />
      </div>
    </div>
    <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="p-4 flex items-center space-x-4">
          <SkeletonBase className="h-10 w-10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <SkeletonBase className="h-4 w-1/4" />
            <SkeletonBase className="h-3 w-1/3" />
          </div>
          <SkeletonBase className="h-8 w-24" />
        </div>
      ))}
    </div>
  </div>
);

export const CardGridSkeleton = () => (
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 page-fade-in">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 space-y-4">
        <div className="flex justify-between">
          <SkeletonBase className="h-12 w-12 rounded-lg" />
          <SkeletonBase className="h-6 w-20" />
        </div>
        <SkeletonBase className="h-6 w-3/4" />
        <SkeletonBase className="h-4 w-1/2" />
        <div className="pt-4 border-t border-gray-50 space-y-2">
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-2/3" />
        </div>
        <div className="flex space-x-2 pt-4">
          <SkeletonBase className="h-8 flex-1" />
          <SkeletonBase className="h-8 flex-1" />
        </div>
      </div>
    ))}
  </div>
);
