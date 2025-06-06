import { Skeleton } from '@/components/ui/skeleton'

export default function ChapterLoading() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-6">
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <Skeleton className="mb-2 h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-8 rounded-full" />
                    ))}
                </div>
            </header>

            <div className="mb-6 h-1 w-full bg-muted">
                <div className="h-full w-0 bg-primary"></div>
            </div>

            <div className="mb-6 flex justify-between">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-32" />
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <Skeleton className="mx-auto mb-6 h-8 w-64" />

                <div className="space-y-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-32" />
            </div>
        </div>
    )
}
