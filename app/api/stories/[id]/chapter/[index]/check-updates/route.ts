import { NextResponse } from "next/server"

interface Props {
    params: {
        id: string
        index: string
    }
}

export async function GET(request: Request, { params }: Props) {
    const { id: slug, index: chapterId } = params

    // Get the "If-Modified-Since" header from the request
    const ifModifiedSince = request.headers.get("If-Modified-Since")
    const modifiedSinceDate = ifModifiedSince ? new Date(ifModifiedSince) : null

    try {
        // Fetch the latest chapter content from the source
        const response = await fetch(
            `https://metruyencv.com/truyen/${slug}/chuong-${chapterId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`
                }
            }
        )

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch chapter content" },
                { status: response.status }
            )
        }

        const data = await response.text()

        // If we have an If-Modified-Since header, we need to check if the content has changed
        // In a real implementation, we would compare against a server-side timestamp
        // Here, we'll use a heuristic approach since we don't have actual timestamps from the source API
        if (modifiedSinceDate) {
            // For demo purposes: Return 304 Not Modified if the request was within the last minute
            // In production, you would compare actual content or use ETag/Last-Modified from source
            const now = new Date()
            const timeDiff = now.getTime() - modifiedSinceDate.getTime()

            if (timeDiff < 60000) {
                // Less than 1 minute, assume no changes
                return new NextResponse(null, { status: 304 })
            }
        }

        // Set appropriate headers for caching
        const headers = new Headers()
        headers.append("Last-Modified", new Date().toUTCString())

        return new NextResponse(data, {
            status: 200,
            headers: headers
        })
    } catch (error) {
        console.error("Error checking for updates:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
