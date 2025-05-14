"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ChapterListSkeleton() {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-[180px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 min-h-[200px]">
                {Array.from({ length: 15 }).map((_, i) => (
                    <Skeleton key={i} className="h-16" />
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <Skeleton className="h-10 w-[300px]" />
            </div>
        </div>
    )
}

export function ChapterListLoadingOverlay() {
    return (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 backdrop-blur-sm rounded">
            <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">
                    Đang tải chương...
                </p>
            </div>
        </div>
    )
}
