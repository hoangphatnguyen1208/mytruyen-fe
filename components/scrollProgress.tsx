'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
    const [scrollProgress, setScrollprogress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop
            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight
            const scrollPercentage = (scrollTop / windowHeight) * 100
            setScrollprogress(scrollPercentage)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div
            className="sticky bottom-0 left-0 h-1 bg-primary transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
        ></div>
    )
}
