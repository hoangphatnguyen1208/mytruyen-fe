import { type NextRequest, NextResponse } from "next/server"

interface Props {
    params: {
        id: string
    }
}

export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const { id } = params
        const body = await request.json()

        // Forward the request to the external API
        const response = await fetch(
            `https://backend.metruyencv.com/api/comments/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`
                },
                body: JSON.stringify(body)
            }
        )

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to update comment: ${response.statusText}` },
                { status: response.status }
            )
        }

        // Get the data from the external API
        const data = await response.json()

        // Return the data
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error updating comment:", error)
        return NextResponse.json(
            { error: "Failed to update comment" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const { id } = params

        // Forward the request to the external API
        const response = await fetch(
            `https://backend.metruyencv.com/api/comments/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`
                }
            }
        )

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to delete comment: ${response.statusText}` },
                { status: response.status }
            )
        }

        // Return success response
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error("Error deleting comment:", error)
        return NextResponse.json(
            { error: "Failed to delete comment" },
            { status: 500 }
        )
    }
}
