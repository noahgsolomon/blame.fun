import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("middleware: middleware called", { req });
    if (req.nextUrl.pathname === "/auth") {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return null;
    }
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
