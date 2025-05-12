// "use client"

import Link from "next/link"
import { BookOpen, Loader } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useAuth } from "@/contexts/auth-context"
import { SlidingBanner } from "@/components/sliding-banner"
import { Story, HotStory } from "@/types/api"
import { StoriesList } from "@/components/stories-list"
import { NewChapter } from "@/components/new-chapter"

export default async function Home() {
    // const { user } = useAuth()
    const [hotList, newChapter, completeStories, suggestStories] =
        await Promise.all([
            fetch(
                "https://backend.metruyencv.com/api/readings/realtime?duration=60&limit=10&page=1"
            )
                .then((res) => res.json())
                .then((data) => data.data),
            fetch(
                "https://backend.metruyencv.com/api/books?filter%5Bgender%5D=1&filter%5Bstate%5D=published&include=author%2Cgenres%2Ccreator&limit=15&page=1&sort=-new_chap_at"
            )
                .then((res) => res.json())
                .then((data) => data.data),
            fetch(
                "https://backend.metruyencv.com/api/books?filter%5Bgender%5D=1&filter%5Bstate%5D=published&filter%5Bstatus%5D=2&include=author%2Cgenres%2Ccreator&limit=10&page=1&sort=-new_chap_at"
            )
                .then((res) => res.json())
                .then((data) => data.data),
            fetch(
                "https://backend.metruyencv.com/api/books?filter%5Bgender%5D=1&filter%5Bstate%5D=published&filter%5Btype%5D=picked&include=author%2Cgenres%2Ccreator&limit=10&page=1&sort=-new_chap_at"
            )
                .then((res) => res.json())
                .then((data) => data.data),
        ])
    const hotStories = hotList.map((story: HotStory) => {
        story.book.reading_count = story.reading_count
        return {
            ...story.book,
        }
    })
    return (
        <div className="container mx-auto px-4 py-6">
            <SlidingBanner />

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
                        <Loader className="mr-2 h-5 w-5 text-primary animate-spin"/>
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
