import { Skeleton } from "@/components/ui/skeleton";

export function DocSuccessSkeleton() {
  return (
    <div className="flex items-center flex-col text-center justify-center min-h-screen space-y-6">
      {/* Lottie Animation Skeleton */}
      <Skeleton className="h-14 w-14 rounded-full" />

      {/* Title Skeleton */}
      <Skeleton className="h-6 w-[400px]" />

      {/* ID Section Skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-[300px]" />
          <Skeleton className="h-10 w-[300px]" />
        </div>

        {/* Copy Button Skeleton */}
        <Skeleton className="h-10 w-24 mx-auto" />
      </div>

      {/* Back Button Skeleton */}
      <Skeleton className="h-10 w-32 mt-14" />
    </div>
  );
}
