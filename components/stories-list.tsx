import Link from 'next/link'
import { Clock, BookOpen } from 'lucide-react'
import { Story } from '../types/api'
import { StoryCardVertical } from './story-card-vertical'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import { StoryCardHorizontal } from './story-card-horizontal'

interface Props {
  stories: Story[]
  vertical: boolean
  href?: string
}

export function StoriesList({ stories, vertical, href }: Props) {
  return vertical ? (
    <div className="w-full py-6">
      <div className="flex flex-wrap gap-4">
        {stories.slice(0, 12).map((story) => (
          <StoryCardVertical key={story.id} story={story} />
        ))}
      </div>
      {/* <div className="flex justify-center mt-6">
                <Button variant="outline" asChild>
                    <Link href={href} className="flex items-center gap-1">
                        Xem tất cả
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div> */}
    </div>
  ) : (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {stories.map((story: Story) => (
          <StoryCardHorizontal key={story.id} story={story} />
        ))}
      </div>
      {/* <div className="flex justify-center mt-6">
                <Button variant="outline" asChild>
                    <Link href={href} className="flex items-center gap-1">
                        Xem tất cả
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div> */}
    </div>
  )
}
