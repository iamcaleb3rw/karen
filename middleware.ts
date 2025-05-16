// middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Supported locales
  locales: ["en", "rw"],

  // Default locale if no match
  defaultLocale: "en",
});

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
