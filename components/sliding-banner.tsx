"use client"

import { useState, useEffect, useCallback, use } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Banner } from "@/types/api"
import Link from "next/link"

export function SlidingBanner() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [bannerSlides, setBannerSlides] = useState<Banner[]>([])
    const [isMobile, setIsMobile] = useState(false)

    // Check if the device is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize() // Set initial value
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        const fetchBannerSlides = async () => {
            try {
                const response = await fetch("/api/banner")
                const data = await response.json()
                setBannerSlides(() => {
                    return data.data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        slug: item.url.split(".com")[1],
                        banner_desktop: item.banner_desktop,
                        banner_mobile: item.banner_mobile,
                        created_at: item.created_at,
                        updated_at: item.updated_at,
                        owner_name: item.owner_name
                    }))
                })
            } catch (error) {
                console.error("Error fetching banner slides:", error)
            }
        }
        fetchBannerSlides()
    }, [])

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) =>
            prev === bannerSlides.length - 1 ? 0 : prev + 1
        )
        // Reset auto-play timer when manually changing slides
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 100)
    }, [bannerSlides.length])

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) =>
            prev === 0 ? bannerSlides.length - 1 : prev - 1
        )
        // Reset auto-play timer when manually changing slides
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 100)
    }, [bannerSlides.length])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
        // Reset auto-play timer when manually changing slides
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 100)
    }

    // Auto-play functionality
    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isAutoPlaying) {
            interval = setInterval(() => {
                nextSlide()
            }, 5000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isAutoPlaying, nextSlide])

    return (
        <div className="relative rounded-lg shadow-md mb-8 w-full overflow-hidden">
            {/* Slides */}
            <div
                className="flex transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {bannerSlides.map((slide) => (
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

            {/* Navigation arrows */}
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

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {bannerSlides.map((_, index) => (
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
