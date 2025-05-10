import { BookOpen, Eye, Star, PenLine, Radio } from "lucide-react"
import Link from "next/link"
import { Story } from "@/types/api"

export function StoryCardVertical({ story }: { story: Story }) {
    return (
        <div className="flex items-stretch border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="w-32 flex-shrink-0 relative">
                <img
                    src={story.poster[150] || "/placeholder.svg"}
                    alt={story.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-2 flex flex-col flex-1">
                <div className="flex-none flex justify-between items-start">
                    <div>
                        <Link
                            href={`/truyen/${story.slug}`}
                            className="text-lg font-semibold hover:text-primary hover:underline line-clamp-2"
                        >
                            {story.name}
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                            {story.author?.name}
                        </p>
                    </div>
                    <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm ml-1">
                            {Number(story.review_score).toFixed(1)}
                        </span>
                    </div>
                </div>
                <div className="flex-1 flex items-center">
                    <p className="text-sm line-clamp-3">{story.synopsis}</p>
                </div>

                <div className="flex flex-none gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {story.chapter_count} chương
                    </div>
                    <div className="flex items-center">
                        <PenLine className="h-3 w-3 mr-1" />
                        {story.status_name}
                    </div>
                    {story.reading_count > 0 ? (
                        <div className="flex items-center">
                            <Radio className="h-3 w-3 mr-1" />
                            {story.reading_count}
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {story.view_count}
                        </div>
                    )}
                    <button className="item-center ml-auto mt-1 outline outline-1 text-amber-700 outline-amber-700 rounded-md h-auto">
                        <p className="p-1">{story.genres[0].name}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
