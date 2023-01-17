// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// WONT USE IT FOR THE TIME BEING, will just focus on Apollo Middleware
export function middleware(request: NextRequest) {
  console.log("middle original" + "route: " + request.url);

  const cookie = request.cookies.get("auth");
  const url = request.url; //http://localhost:3000/form
  //or u can use nextUrl which is an object
  if (request.nextUrl.pathname === "/api/graphql") {
    //PASSING CONTEXT TO THE APOLLO SERVER DOESNT WORK, maybe check later if there is an alternative

    //In a Next.js MIDDLEWARE you can't redirect when visiting the /api/graphql endpoint because it is an API endpoint and not a page. Instead of using a redirect, you can throw an error in the middleware and handle it in your client-side code.
    console.log("GRAPHQL API CALL, NEXTJS ORIGINAL MIDDLE");
  }

  /*IF YOU WANT TO REDIRECT return NextResponse.redirect(new URL("/about-2", request.url)); */
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
/* export const config = {
  matcher: "/about/:path*",
};
 */
