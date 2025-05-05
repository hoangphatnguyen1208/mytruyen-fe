import { NextResponse } from "next/server";

interface Props {
    params: {
        slug: string;
        id: string;
    };
}
export async function GET(request: Request, { params }: Props) {
    const { slug, id } = params;
    const response = await fetch(
        `https://backend.metruyencv.com/api/story/${slug}/chapter/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
            },
        }
    );
    const data = await response.json();
    return NextResponse.json(data);
}
