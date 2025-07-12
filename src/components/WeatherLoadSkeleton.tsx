import { Skeleton } from "./ui/skeleton";

function WeatherLoadSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Weather Cards Skeleton */}
      <div className="grid gap-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Current Weather Skeleton */}
          <div className="flex-1">
            <div className="glass-effect p-8 rounded-xl border-white/20 dark:border-slate-700/50">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <div className="flex gap-3">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Skeleton className="h-48 w-48 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Temperature Skeleton */}
          <div className="flex-1">
            <div className="glass-effect p-6 rounded-xl border-white/20 dark:border-slate-700/50">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-effect p-6 rounded-xl border-white/20 dark:border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherLoadSkeleton;
