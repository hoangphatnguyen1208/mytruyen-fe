import { Clock } from "lucide-react"
import Link from "next/link"
import { Story } from "@/types/api"

export function StoryCardHorizontal({ story }: { story: Story }) {
    return (
        <div className="flex flex-wrap gap-4 mb-2">
            <Link
                key={story.id}
                href={`/truyen/${story.slug}`}
                className="w-[235px] group flex flex-col overflow-hidden rounded-lg border bg-card hover:shadow-md transition-all"
            >
                <div className="relative w-full overflow-hidden">
                    <img
                        src={story.poster[300] || "/placeholder.svg"}
                        alt={story.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/100 to-transparent p-2">
                        <div className="flex items-center text-xs text-white">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{story.new_chap_at}</span>
                        </div>
                    </div>
                </div>
                <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {story.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {story.author?.name}
                    </p>
                    <div className="text-xs text-muted-foreground mt-auto pt-2">
                        Chương {story.chapter_count}
                    </div>
                </div>
            </Link>
        </div>
    )
}
