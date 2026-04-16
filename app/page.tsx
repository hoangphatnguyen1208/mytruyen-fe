import Link from 'next/link'
import { BookOpen, Loader, History } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { useAuth } from "@/contexts/auth-context"
import { SlidingBanner } from '@/components/sliding-banner'
import { Story, HotStory } from '@/types/api'
import { StoriesList } from '@/components/stories-list'
import { NewChapter } from '@/components/new-chapter'
import { ReadingHistory } from '@/components/reading-history'
import { Metadata } from 'next'
import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: 'MyTruyen - Đọc truyện online',
  description: 'Đọc truyện online, truyện hay nhất, truyện hot, truyện full',
}

export default async function Home() {
  // const { user } = useAuth()
  const [hotListData, newChaptData, completeData, suggestData] =
    await Promise.all([
      api.book.getList({ page: 1, limit: 10, sort: '-comment_count' }),
      api.book.getList({ page: 1, limit: 10, sort: '-new_chap_at' }),
      api.book.getList({ page: 1, limit: 10, sort: 'average_rating', status: 2 }),
      api.book.getList({ page: 1, limit: 10, sort: '-average_rating'}),
    ])
  return (
    <div className="container mx-auto px-4 py-6">
      <SlidingBanner />
      <div className="mb-12">
        <h2 className="mb-4 flex items-center text-xl font-semibold">
          <History className="mr-2 h-5 w-5 text-primary" />
          Đọc gần đây
        </h2>
        <ReadingHistory />
      </div>
      <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="md:col-span-4">
          <Tabs defaultValue="hot" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="hot">Đề cử</TabsTrigger>
              <TabsTrigger value="new">Truyện hot</TabsTrigger>
              <TabsTrigger value="complete">Hoàn Thành</TabsTrigger>
              {/* {user && (
                                <TabsTrigger value="my">My Truyện</TabsTrigger>
                            )} */}
            </TabsList>
            <TabsContent value="hot">
              <StoriesList
                stories={suggestData.data}
                vertical={false}
                href="/truyen-de-cu"
              />
            </TabsContent>

            <TabsContent value="new">
              <StoriesList
                stories={hotListData.data}
                vertical={false}
                href="/truyen-hot"
              />
            </TabsContent>

            <TabsContent value="complete">
              <StoriesList
                stories={completeData.data}
                vertical={false}
                href="/truyen-hoan-thanh"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div>
        <h2 className="flex items-center text-xl font-semibold">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          Vừa cập nhật
        </h2>
        <StoriesList
          stories={newChaptData.data}
          vertical={true}
          href="/truyen-moi-cap-nhat"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <h2 className="flex items-center text-xl font-semibold">
            <Loader className="mr-2 h-5 w-5 animate-spin text-primary" />
            Vừa lên chương
          </h2>
          <Link
            href="/truyen-moi-len-chuong"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Xem tất cả
          </Link>
        </div>
        <NewChapter />
      </div>
    </div>
  )
}
