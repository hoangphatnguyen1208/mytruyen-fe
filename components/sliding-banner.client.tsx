"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Banner } from "@/types/api"
import Link from "next/link"

interface SlidingBannerClientProps {
    banners: Banner[]
}

export default function SlidingBannerClient({
    banners
}: SlidingBannerClientProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    // Check if the device is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 100)
    }, [banners.length])

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 100)
    }, [banners.length])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 100)
    }

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isAutoPlaying) {
            interval = setInterval(nextSlide, 5000)
        }
        return () => clearInterval(interval)
    }, [isAutoPlaying, nextSlide])

    if (banners.length === 0) return null

    return (
        <div className="relative rounded-lg shadow-md mb-8 w-full overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {banners.map((slide) => (
                    <div className="flex-none w-full flex" key={slide.id}>
                        <Link href={slide.slug} className="mx-auto">
                            <img
                                src={
                                    isMobile
                                        ? slide.banner_mobile
                                        : slide.banner_desktop
                                }
                                alt={slide.name}
                                className="object-cover"
                            />
                        </Link>
                    </div>
                ))}
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                onClick={prevSlide}
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                onClick={nextSlide}
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                            currentSlide === index
                                ? "bg-white w-4"
                                : "bg-white/50"
                        }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
