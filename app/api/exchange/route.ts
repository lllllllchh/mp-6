import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { code } = await req.json();

    const res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.REDIRECT_URI,
        }),
    });

    const data = await res.json();
    return NextResponse.json(data);
}
