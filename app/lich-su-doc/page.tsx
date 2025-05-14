"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    ReadingHistoryItem,
    getReadingHistory,
    removeFromReadingHistory,
    clearReadingHistory
} from "@/lib/reading-history"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { BackToTop } from "@/components/back-to-top"

export default function ReadingHistoryPage() {
    const [history, setHistory] = useState<ReadingHistoryItem[]>([])
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    // Load reading history from localStorage
    useEffect(() => {
        setHistory(getReadingHistory())
    }, [])

    // Handle removing an item from history
    const handleRemoveItem = (storyId: number) => {
        removeFromReadingHistory(storyId)
        setHistory(getReadingHistory())
    }

    // Handle clearing all history
    const handleClearHistory = () => {
        clearReadingHistory()
        setHistory([])
        setIsAlertOpen(false)
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Lịch sử đọc truyện</h1>
            </div>

            <div className="flex justify-between items-center mb-4">
                <p className="text-muted-foreground">
                    {history.length} truyện trong lịch sử
                </p>
                {history.length > 0 && (
                    <Button
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setIsAlertOpen(true)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Xóa lịch sử
                    </Button>
                )}
            </div>

            {history.length > 0 ? (
                <div className="space-y-4">
                    {history.map((item, index) => (
                        <Card key={index} className="p-4 flex gap-4">
                            <div className="w-[80px] h-[120px] flex-shrink-0">
                                <img
                                    src={item.storyPoster || "/placeholder.svg"}
                                    alt={item.storyName}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                            <div className="flex flex-col flex-1 justify-between">
                                <div>
                                    <Link
                                        href={`/truyen/${item.storySlug}`}
                                        className="font-semibold hover:text-primary hover:underline"
                                    >
                                        {item.storyName}
                                    </Link>
                                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {formatDistanceToNow(
                                            new Date(item.readAt),
                                            {
                                                addSuffix: true,
                                                locale: vi
                                            }
                                        )}
                                    </div>
                                    <p className="text-sm mt-2">
                                        Đang đọc:{" "}
                                        <Link
                                            href={`/truyen/${item.storySlug}/chuong/${item.chapterId}`}
                                            className="text-primary hover:underline"
                                        >
                                            {item.chapterName ||
                                                `Chương ${item.chapterId}`}
                                        </Link>
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" asChild>
                                        <Link
                                            href={`/truyen/${item.storySlug}/chuong/${item.chapterId}`}
                                        >
                                            Tiếp tục đọc
                                        </Link>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            handleRemoveItem(item.storyId)
                                        }
                                    >
                                        <Trash2 className="h-3 w-3 mr-1" />
                                        Xóa khỏi lịch sử
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">
                        Bạn chưa đọc truyện nào gần đây
                    </p>
                    <Button asChild>
                        <Link href="/">Khám phá truyện</Link>
                    </Button>
                </div>
            )}

            <BackToTop />

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Xóa tất cả lịch sử đọc?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Hành động này sẽ xóa tất cả lịch sử đọc truyện của
                            bạn và không thể khôi phục lại được.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleClearHistory}
                            className="bg-destructive"
                        >
                            Xóa tất cả
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
