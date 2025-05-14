import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const storyId = searchParams.get("storyId")
        const chapterId = searchParams.get("chapterId")

        let url = `https://backend.metruyencv.com/api/comments?storyId=${storyId}`
        if (chapterId) {
            url += `&chapterId=${chapterId}`
        }

        // Forward the request to the external API
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`
            }
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch comments: ${response.statusText}` },
                { status: response.status }
            )
        }

        // Get the data from the external API
        const data = await response.json()

        // Return the data with appropriate headers
        return NextResponse.json(data, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=300" // Cache for 5 minutes on the edge
            }
        })
    } catch (error) {
        console.error("Error fetching comments:", error)
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Forward the request to the external API
        const response = await fetch(
            `https://backend.metruyencv.com/api/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`
                },
                body: JSON.stringify(body)
            }
        )

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to create comment: ${response.statusText}` },
                { status: response.status }
            )
        }

        // Get the data from the external API
        const data = await response.json()

        // Return the data
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error creating comment:", error)
        return NextResponse.json(
            { error: "Failed to create comment" },
            { status: 500 }
        )
    }
}
