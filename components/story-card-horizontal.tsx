import { BookOpen, Eye, Star, PenLine, Radio } from 'lucide-react'
import Link from 'next/link'
import { Story } from '@/types/api'
import Image from 'next/image'

export function StoryCardHorizontal({ story }: { story: Story }) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md">
      <Link href={`/truyen/${story.slug}`} className="group flex">
        <div className="relative w-32 overflow-hidden">
          <Image
            src={story.poster?.[300] || '/placeholder.svg'}
            alt={story.name || 'Poster'}
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
        </div>
        <div className="flex flex-1 flex-col px-2 pb-1 pt-2">
          <div className="underline-none flex flex-none items-start justify-between py-1">
            <div>
              <div className="line-clamp-2 text-lg font-semibold group-hover:text-primary">
                {story.name}
              </div>
              <p className="line-clamp-1 text-sm text-muted-foreground">
                {story.author?.name}
              </p>
            </div>
            <div className="flex items-center py-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm">
                {Number(story.average_rating).toFixed(1)}
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center">
            <p className="line-clamp-3 text-sm">{story.synopsis}</p>
          </div>

          <div className="flex flex-none gap-4 py-1 text-xs text-muted-foreground">
            <div className="flex items-center">
              <BookOpen className="mr-1 h-3 w-3" />
              {story.chapter_count} chương
            </div>
            <div className="flex items-center">
              <PenLine className="mr-1 h-3 w-3" />
              {story.status_name}
            </div>
            {story.reading_count && story.reading_count > 0 ? (
              <div className="flex items-center">
                <Radio className="mr-1 h-3 w-3" />
                {story.reading_count}
              </div>
            ) : (
              <div className="flex items-center">
                <Eye className="mr-1 h-3 w-3" />
                {story.view_count}
              </div>
            )}
            <button className="item-center ml-auto mt-1 h-auto rounded-md text-amber-700 outline outline-1 outline-amber-700">
              <p className="p-1">{story.genres ? story.genres[0].name : ''}</p>
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
