import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

//Configure next-intl middleware
const intlMiddleware = createMiddleware({
  locales: ["en", "rw"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req: any) => {
    // Run internationalization first
    return intlMiddleware(req);
  },

  publicRoutes: [
    "/",
    "/:locale/sign-in(.*)",
    "/:locale/sign-up(.*)",
    "/api(.*)",
  ],

  afterAuth: (auth: any, req: any) => {
    const { pathname } = req.nextUrl;

    // Admin route protection
    if (
      pathname.startsWith("/gov") &&
      auth().sessionClaims?.metadata?.role !== "admin"
    ) {
      const homeUrl = new URL(`/${req.nextUrl.locale}`, req.url);
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
