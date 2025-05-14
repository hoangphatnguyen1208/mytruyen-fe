"use client"

import { useState, useEffect, useCallback } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { RefreshCw } from "lucide-react"

interface ChapterUpdateNotifierProps {
    slug: string
    chapterId: string | number
    onUpdateAvailable: (content: string) => void
}

export function ChapterUpdateNotifier({
    slug,
    chapterId,
    onUpdateAvailable
}: ChapterUpdateNotifierProps) {
    const { toast } = useToast()
    const [hasUpdate, setHasUpdate] = useState(false)
    const [isChecking, setIsChecking] = useState(false)
    const [nextCheckTime, setNextCheckTime] = useState<Date | null>(null)
    const [timeRemaining, setTimeRemaining] = useState<string>("")

    // Configure check interval (in milliseconds)
    const CHECK_INTERVAL = 5 * 60 * 1000 // 5 minutes

    const checkForUpdates = useCallback(async () => {
        try {
            setIsChecking(true)

            const result = await api.chapter.checkForUpdates(slug, chapterId)

            if (result.hasUpdates && result.updatedContent) {
                setHasUpdate(true)
                // Show toast notification
                toast({
                    title: "Cập nhật nội dung!",
                    description:
                        "Nội dung chương đã được cập nhật. Nhấn nút làm mới để xem.",
                    duration: 10000
                })
            }

            // Set next check time
            const nextCheck = new Date()
            nextCheck.setTime(nextCheck.getTime() + CHECK_INTERVAL)
            setNextCheckTime(nextCheck)
        } catch (error) {
            console.error("Error checking for updates:", error)
            toast({
                title: "Lỗi kiểm tra cập nhật",
                description:
                    "Không thể kiểm tra cập nhật. Vui lòng thử lại sau.",
                variant: "destructive"
            })
        } finally {
            setIsChecking(false)
        }
    }, [slug, chapterId, toast])

    const applyUpdate = useCallback(() => {
        if (hasUpdate) {
            api.chapter.checkForUpdates(slug, chapterId).then((result) => {
                if (result.hasUpdates && result.updatedContent) {
                    onUpdateAvailable(result.updatedContent)
                    setHasUpdate(false)
                    toast({
                        title: "Đã cập nhật",
                        description: "Nội dung chương đã được làm mới."
                    })
                }
            })
        }
    }, [hasUpdate, slug, chapterId, onUpdateAvailable, toast])

    // Update the countdown timer
    useEffect(() => {
        const updateTimeRemaining = () => {
            if (!nextCheckTime) return

            const now = new Date()
            const diff = Math.max(0, nextCheckTime.getTime() - now.getTime())

            const minutes = Math.floor(diff / 60000)
            const seconds = Math.floor((diff % 60000) / 1000)

            setTimeRemaining(
                `${minutes}:${seconds.toString().padStart(2, "0")}`
            )
        }

        const timer = setInterval(updateTimeRemaining, 1000)
        return () => clearInterval(timer)
    }, [nextCheckTime])

    // Initial check and setup interval
    useEffect(() => {
        // Initial check
        checkForUpdates()

        // Set up periodic checks
        const interval = setInterval(checkForUpdates, CHECK_INTERVAL)

        // Clean up on unmount
        return () => {
            clearInterval(interval)
        }
    }, [checkForUpdates])

    return (
        <div className="flex items-center space-x-2 text-sm">
            {hasUpdate ? (
                <Button
                    onClick={applyUpdate}
                    variant="outline"
                    size="sm"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                >
                    <RefreshCw className="w-4 h-4 mr-2" /> Cập nhật nội dung mới
                </Button>
            ) : (
                <div className="text-muted-foreground flex items-center text-xs">
                    {isChecking ? (
                        <span className="flex items-center">
                            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                            Đang kiểm tra cập nhật...
                        </span>
                    ) : nextCheckTime ? (
                        <span className="flex items-center">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Kiểm tra cập nhật sau: {timeRemaining}
                        </span>
                    ) : null}
                </div>
            )}
        </div>
    )
}
