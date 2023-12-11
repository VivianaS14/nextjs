import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/entries")) {
    const id = request.nextUrl.pathname.replace("/api/entries/", "");
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if (!checkMongoIDRegExp.test(id)) {
      const url = request.nextUrl.clone();
      url.pathname = "/api/bad-request";
      url.search = `?message=${id} is not a valid Mongo ID`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/entries/:path/",
};
