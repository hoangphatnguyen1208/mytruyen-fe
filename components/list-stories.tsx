import Link from "next/link"
import { Clock, BookOpen } from "lucide-react"
import { Story } from "../types/api"
import { StoryCardHorizontal } from "./story-card-horizontal"
import { StoryCardVertical } from "./story-card-vertical"
import { Button } from "./ui/button"
import { ChevronRight } from "lucide-react"

interface Props {
    stories: Story[]
    horizontal: boolean
    content?: string
}

export function ListStories({ stories, horizontal, content }: Props) {
    return horizontal ? (
        <div className="w-full py-6">
            <div className="container px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-primary" />
                        {content}
                    </h2>
                    <Link
                        href="/truyen-moi"
                        className="text-sm text-primary hover:underline"
                    >
                        Xem tất cả
                    </Link>
                </div>

                <div className="flex flex-wrap gap-4 mb-12">
                    {stories.map((story) => (
                        <StoryCardHorizontal key={story.id} story={story} />
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {stories.map((story: Story) => (
                <StoryCardVertical key={story.id} story={story} />
            ))}

            {/* <div className="col-span-1 lg:col-span-2 flex justify-center mt-6">
                <Button variant="outline" asChild>
                    <Link
                        href="/truyen-de-cu"
                        className="flex items-center gap-1"
                    >
                        Xem tất cả
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div> */}
        </div>
    )
}
