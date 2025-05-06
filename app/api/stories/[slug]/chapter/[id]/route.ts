import { NextResponse } from "next/server";

interface Props {
    params: {
        slug: string;
        id: string;
    };
}
export async function GET(request: Request, { params }: Props) {
    // const { slug, id } = params;
    // const response = await fetch(
    //     `https://metruyencv.com/truyen/${slug}/chuong-${id}`,
    //     {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
    //         },
    //     }
    // );
    // const data = await response.json();
    // console.log(data);
    // return NextResponse.json(data);
}
