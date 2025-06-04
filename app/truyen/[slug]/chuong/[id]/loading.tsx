import { Skeleton } from "@/components/ui/skeleton"

export default function ChapterLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
        </div>
      </header>

      <div className="w-full h-1 bg-muted mb-6">
        <div className="h-full bg-primary w-0"></div>
      </div>

      <div className="flex justify-between mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <Skeleton className="h-8 w-64 mx-auto mb-6" />

        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  )
}
