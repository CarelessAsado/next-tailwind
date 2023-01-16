// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middle original" + "route: " + request.url);

  const cookie = request.cookies.get("auth");
  const url = request.url; //http://localhost:3000/form
  //or u can use nextUrl which is an object
  if (request.nextUrl.pathname === "/api/graphql") {
    //el redirect no nada, debe ser xq estoy llamando a la api desde un hook on load
    //VER CAPAZ DE USAR OTRA ALTERNATIVA, maybe throw an error
    console.log("GRAPHQL API CALL, NEXTJS ORIGINAL MIDDLE");
    /*   return NextResponse.redirect(new URL("/", request.url)); */
  }
  //see if I can pass context from here to GRAPHQL
  //I visit /form but the server also requests /api/graphql
  /* return NextResponse.redirect(new URL("/about-2", request.url)); */
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
/* export const config = {
  matcher: "/about/:path*",
};
 */
