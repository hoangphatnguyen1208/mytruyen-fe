// "use client"

import Link from "next/link"
import { BookOpen, Clock, Star, ChevronRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useAuth } from "@/contexts/auth-context"
import { SlidingBanner } from "@/components/sliding-banner"
import { RecentStories } from "@/components/recent-stories"
import { Story, HotStory } from "@/types/api"
import { StoryCardVertical } from "@/components/story-card-vertical"
import { ListStories } from "@/components/list-stories"

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
                "https://backend.metruyencv.com/api/books?filter%5Bgender%5D=1&filter%5Bstate%5D=published&include=author%2Cgenres%2Ccreator&limit=10&page=1&sort=-new_chap_at"
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
                        <TabsContent
                            value="hot"
                        >
                            <ListStories
                                stories={suggestStories}
                                horizontal={false}
                            />
                            <div className="flex justify-center mt-6">
                                <Button variant="outline" asChild>
                                    <Link
                                    href="/truyen-de-cu"
                                    className="flex items-center gap-1"
                                    >
                                        Xem tất cả
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="new">
                            <ListStories
                                stories={hotStories}
                                horizontal={false}
                            />

                            <div className="flex justify-center mt-6">
                                <Button variant="outline" asChild>
                                    <Link
                                        href="/truyen-hot"
                                        className="flex items-center gap-1"
                                    >
                                        Xem tất cả
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="complete">
                            <ListStories
                                stories={completeStories}
                                horizontal={false}
                            />

                            <div className="flex justify-center mt-6">
                                <Button variant="outline" asChild>
                                    <Link
                                        href="/truyen-hoan-thanh"
                                        className="flex items-center gap-1"
                                    >
                                        Xem tất cả
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </TabsContent>

                        {/* <TabsContent value="my" className="space-y-4">
                            {user && (
                                <>
                                    <div className="text-center py-4">
                                        <h3 className="text-lg font-medium">
                                            Truyện của bạn
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Các truyện bạn đã lưu và theo dõi
                                        </p>
                                    </div>
                                    {myStories.length > 0 ? (
                                        <>
                                            {myStories.map((story) => (
                                                <StoryCardVertical
                                                    key={story.id}
                                                    story={story}
                                                />
                                            ))}

                                            <div className="flex justify-center mt-6">
                                                <Button
                                                    variant="outline"
                                                    asChild
                                                >
                                                    <Link
                                                        href="/my-stories"
                                                        className="flex items-center gap-1"
                                                    >
                                                        Xem tất cả
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8 border rounded-lg">
                                            <p className="text-muted-foreground">
                                                Bạn chưa có truyện nào trong
                                                danh sách
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </TabsContent> */}
                    </Tabs>
                </div>

                {/* <div className="md:col-span-1">
                    <div className="border rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Thể Loại</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    className="text-sm hover:text-primary hover:underline"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="border rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">Đề cử</h2>
                        <div className="space-y-4">
                            {suggestStories.map(
                                (story: Story, index: number) => (
                                    <div key={story.id} className="flex gap-3">
                                        <div className="font-bold text-muted-foreground">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <Link
                                                href={`/truyen/${story.slug}`}
                                                className="font-medium hover:text-primary hover:underline"
                                            >
                                                {story.name}
                                            </Link>
                                            <p className="text-xs text-muted-foreground">
                                                {story.author?.name}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div> */}
            </div>

            <RecentStories stories={newChapter} />
        </div>
    )
}
