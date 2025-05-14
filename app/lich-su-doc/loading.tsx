import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReadingHistoryLoading() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" disabled>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">Lịch sử đọc truyện</h1>
            </div>

            <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-9 w-24" />
            </div>

            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="p-4 flex gap-4">
                        <Skeleton className="w-[80px] h-[120px] flex-shrink-0" />
                        <div className="flex flex-col flex-1 justify-between">
                            <div>
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/3 mb-2" />
                                <Skeleton className="h-4 w-1/2 mt-2" />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Skeleton className="h-9 w-28" />
                                <Skeleton className="h-9 w-36" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
