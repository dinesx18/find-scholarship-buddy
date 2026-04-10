import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="space-y-1">
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
      <div className="flex justify-between pt-3 border-t border-border">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  );
}
