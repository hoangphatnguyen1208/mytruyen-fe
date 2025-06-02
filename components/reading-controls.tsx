"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Type, ZoomIn, ZoomOut } from "lucide-react"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { getReadingPrefs, saveReadingPrefs } from "@/lib/reading-preferences"

interface Props {
    onFontSizeChange: (size: "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge") => void
}

export function ReadingControls({ onFontSizeChange }: Props) {
    const [currentFontSize, setCurrentFontSize] = useState<
        "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge"
    >("medium")
    const { theme, setTheme } = useTheme()

    // Load saved preferences on component mount
    useEffect(() => {
        const prefs = getReadingPrefs()
        setCurrentFontSize(prefs.fontSize)
        onFontSizeChange(prefs.fontSize)

        if (prefs.theme !== "system") {
            setTheme(prefs.theme)
        }
    }, [setTheme, onFontSizeChange])

    const handleFontSizeChange = (
        size: "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge"
    ) => {
        setCurrentFontSize(size)
        onFontSizeChange(size)
        saveReadingPrefs({ fontSize: size })
    }

    const handleThemeChange = (newTheme: "light" | "dark") => {
        setTheme(newTheme)
        saveReadingPrefs({ theme: newTheme })
    }

    return (
        <div className="flex gap-2 mb-4">
            {/* Font size controls */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" title="Cỡ chữ">
                        <Type className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={() => handleFontSizeChange("small")}
                        className={
                            currentFontSize === "small" ? "bg-accent" : ""
                        }
                    >
                        <span className="text-sm">Nhỏ</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleFontSizeChange("medium")}
                        className={
                            currentFontSize === "medium" ? "bg-accent" : ""
                        }
                    >
                        <span className="text-base">Vừa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleFontSizeChange("large")}
                        className={
                            currentFontSize === "large" ? "bg-accent" : ""
                        }
                    >
                        <span className="text-lg">Lớn</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleFontSizeChange("xlarge")}
                        className={
                            currentFontSize === "xlarge" ? "bg-accent" : ""
                        }
                    >
                        <span className="text-xl">Rất lớn</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleFontSizeChange("xxlarge")}
                        className={
                            currentFontSize === "xxlarge" ? "bg-accent" : ""
                        }
                    >
                        <span className="text-2xl">Cực lớn</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleFontSizeChange("xxxlarge")}
                        className={
                            currentFontSize === "xxxlarge" ? "bg-accent" : ""
                        }
                    >
                        <span className="text-3xl">Siêu lớn</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>{" "}
            {/* Theme controls */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleThemeChange("light")}
                title="Giao diện sáng"
                className={theme === "light" ? "bg-accent" : ""}
            >
                <Sun className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleThemeChange("dark")}
                title="Giao diện tối"
                className={theme === "dark" ? "bg-accent" : ""}
            >
                <Moon className="h-4 w-4" />
            </Button>
        </div>
    )
}
