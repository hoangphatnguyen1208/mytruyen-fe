import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const keyword = searchParams.get("keyword")
        const page = searchParams.get("page") || "1"

        // Forward the request to the external API
        const response = await fetch(
            `https://backend.metruyencv.com/api/books/search?keyword=${encodeURIComponent(
                keyword || ""
            )}&page=${page}`,
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
                { error: `Failed to search books: ${response.statusText}` },
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
                "Cache-Control": "s-maxage=180" // Cache for 3 minutes on the edge
            }
        })
    } catch (error) {
        console.error("Error searching books:", error)
        return NextResponse.json(
            { error: "Failed to search books" },
            { status: 500 }
        )
    }
}
