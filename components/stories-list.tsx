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
    href: string
}

export function StoriesList({ stories, horizontal, href }: Props) {
    return horizontal ? (
        <div className="w-full py-6">
            <div className="flex flex-wrap gap-4">
                {stories.slice(0, 12).map((story) => (
                    <StoryCardHorizontal key={story.id} story={story} />
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <Button variant="outline" asChild>
                    <Link href={href} className="flex items-center gap-1">
                        Xem tất cả
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    ) : (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {stories.map((story: Story) => (
                    <StoryCardVertical key={story.id} story={story} />
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <Button variant="outline" asChild>
                    <Link href={href} className="flex items-center gap-1">
                        Xem tất cả
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
