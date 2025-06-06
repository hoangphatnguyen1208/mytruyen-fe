import { Clock } from 'lucide-react'
import Link from 'next/link'
import { Story } from '@/types/api'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import Image from 'next/image'

export function StoryCardVertical({ story }: { story: Story }) {
  return (
    <div className="flex">
      <Link
        key={story.id}
        href={`/truyen/${story.slug}`}
        className="group flex w-[235px] flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
      >
        <div className="relative h-72 overflow-hidden">
          <Image
            src={story.poster[300] || '/placeholder.svg'}
            alt={story.name}
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/100 to-transparent p-2">
            <div className="flex items-center text-xs text-white">
              <Clock className="mr-1 h-3 w-3" />
              <span>
                {formatDistanceToNow(new Date(story.new_chap_at), {
                  addSuffix: true,
                  locale: vi,
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-3">
          <h3 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-primary">
            {story.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
            {story.author?.name}
          </p>
          <div className="mt-auto pt-2 text-xs text-muted-foreground">
            Chương {story.chapter_count}
          </div>
        </div>
      </Link>
    </div>
  )
}
