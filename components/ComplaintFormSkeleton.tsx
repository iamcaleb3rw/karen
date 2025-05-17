"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ComplaintFormSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Main Form */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-[250px] mb-2" />
            <Skeleton className="h-4 w-[300px]" />
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-center mb-8">
              <div className="relative flex items-center w-full max-w-3xl justify-between">
                {[1, 2, 3, 4].map((id) => (
                  <div key={id} className="flex flex-col items-center z-10">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="h-4 w-[100px] mt-2" />
                  </div>
                ))}
                <div className="absolute top-5 left-0 w-full px-5 flex">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex-1 flex items-center justify-center"
                    >
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Skeleton className="h-[1px] w-full my-6" />

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Personal Info Step */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-10" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-[120px]" />
                  <Skeleton className="h-9 w-[200px]" />
                </div>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div className="space-y-4">
              <Skeleton className="h-[150px] w-full rounded-md" />
              <Skeleton className="h-9 w-[200px]" />
            </div>

            {/* Preferences Section */}
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-[200px]" />
                </div>
              ))}
            </div>

            {/* Review Section */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-36" />
          </div>
        </div>

        {/* Right Side - Process Info */}
        <div className="w-full lg:w-[350px] bg-muted rounded-lg p-6 lg:p-8 h-fit sticky top-8">
          <Skeleton className="h-6 w-[200px] mb-4" />
          <div className="space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
