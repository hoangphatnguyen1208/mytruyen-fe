// "use client"

import Link from "next/link"
import { BookOpen, Loader, History } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useAuth } from "@/contexts/auth-context"
import { SlidingBanner } from "@/components/sliding-banner"
import { Story, HotStory } from "@/types/api"
import { StoriesList } from "@/components/stories-list"
import { NewChapter } from "@/components/new-chapter"
import { ReadingHistory } from "@/components/reading-history"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "MyTruyen - Đọc truyện online",
    description: "Đọc truyện online, truyện hay nhất, truyện hot, truyện full"
}

import { homeApi } from "@/lib/home-api"

export default async function Home() {
    // const { user } = useAuth()
    const [hotList, newChapter, completeStories, suggestStories] =
        await Promise.all([
            homeApi.getHotStories(60, 10, 1),
            homeApi.getNewChapters(15, 1),
            homeApi.getCompletedStories(10, 1),
            homeApi.getSuggestedStories(10, 1)
        ])
    const hotStories = hotList.map((story: HotStory) => {
        story.book.reading_count = story.reading_count
        return {
            ...story.book
        }
    })
    return (
        <div className="container mx-auto px-4 py-6">
            <SlidingBanner />
            <div className="mb-12">
                <h2 className="text-xl font-semibold flex items-center mb-4">
                    <History className="mr-2 h-5 w-5 text-primary" />
                    Đọc gần đây
                </h2>
                <ReadingHistory />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <div className="md:col-span-4">
                    <Tabs defaultValue="hot" className="mb-8">
                        <TabsList className="mb-4">
                            <TabsTrigger value="hot">Đề cử</TabsTrigger>
                            <TabsTrigger value="new">Truyện hot</TabsTrigger>
                            <TabsTrigger value="complete">
                                Hoàn Thành
                            </TabsTrigger>
                            {/* {user && (
                                <TabsTrigger value="my">My Truyện</TabsTrigger>
                            )} */}
                        </TabsList>
                        <TabsContent value="hot">
                            <StoriesList
                                stories={suggestStories}
                                horizontal={false}
                                href="/truyen-de-cu"
                            />
                        </TabsContent>

                        <TabsContent value="new">
                            <StoriesList
                                stories={hotStories}
                                horizontal={false}
                                href="/truyen-hot"
                            />
                        </TabsContent>

                        <TabsContent value="complete">
                            <StoriesList
                                stories={completeStories}
                                horizontal={false}
                                href="/truyen-hoan-thanh"
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Vừa cập nhật
                </h2>
                <StoriesList
                    stories={newChapter}
                    horizontal={true}
                    href="/truyen-moi-cap-nhat"
                />
            </div>
            <div>
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold flex items-center">
                        <Loader className="mr-2 h-5 w-5 text-primary animate-spin" />
                        Vừa lên chương
                    </h2>
                    <Link
                        href="/truyen-moi-len-chuong"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        Xem tất cả
                    </Link>
                </div>
                <NewChapter />
            </div>
        </div>
    )
}
