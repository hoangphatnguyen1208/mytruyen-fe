import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(
        "https://backend.metruyencv.com/api/topboxes?filter%5Btopboxable.kind%5D=1&limit=5"
    );
    const data = await res.json();

    return NextResponse.json(data);
}