"use client"

import { useEffect, useState } from "react"
import { Loader } from "lucide-react"
import Link from "next/link"
import { ChapterDetail } from "@/types/api"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { Clock } from "lucide-react"

interface Props {
    story: {
        id: number  
        slug: string
    }
}

export function ChaptersList({story}: Props) {
    const [isLoading, setIsLoading] = useState(true)
    const [chapters_detail, setChaptersDetail] = useState<ChapterDetail[]>([])

    useEffect(() => {
        fetch(
            `/api/stories/${story.id}/chapter`,
        )
            .then((res) => res.json())
            .then((data) => {
                setChaptersDetail(data.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching chapters:", error)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader className="animate-spin" />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {chapters_detail.slice(0, 30).map((data: ChapterDetail) => (
                <Link
                    key={data.id}
                    href={`/truyen/${story.slug}/chuong/${data.index}`}
                    className="p-2 hover:bg-muted rounded text-sm w-full flex-col"
                >
                    <span className="font-semibold">{data.name}</span>
                    <div className="flex">
                        <Clock className="h-4 w-3 inline mr-1 ml-1 text-muted-foreground" />
                        <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(data.published_at), {
                                addSuffix: true,
                                locale: vi,
                            })}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
