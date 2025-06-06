import Link from 'next/link'
import { Clock, BookOpen } from 'lucide-react'
import { Story } from '../types/api'
import { StoryCardHorizontal } from './story-card-horizontal'

interface Props {
  stories: Story[]
}

export function RecentStories({ stories }: Props) {
  return (
    <div className="w-full py-6">
      <div className="container px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center text-xl font-semibold">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Truyện vừa cập nhật
          </h2>
          <Link
            href="/truyen-moi"
            className="text-sm text-primary hover:underline"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="mb-12 flex flex-wrap gap-4">
          {stories.map((story) => (
            <StoryCardHorizontal key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  )
}
