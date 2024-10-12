import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { newBrowserToken } = await req.json();

  if (!newBrowserToken) {
    return NextResponse.json(
      { error: "Browser token is missing" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("browser_token", newBrowserToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    domain: "localhost",
    expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), // 10 years
    path: "/",
  });

  return response;
}
