import { createServerClient } from "@supabase/ssr";
import { geolocation, ipAddress } from "@vercel/functions";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { logEvent } from "@/lib/data/events";

// Next.js 16 renamed `middleware` to `proxy` (see node_modules/next/dist/docs
// .../file-conventions/proxy.md). This runs an optimistic auth check only —
// every admin API route still calls requireAdmin() itself as the real guard.
export default async function proxy(request: NextRequest, event: NextFetchEvent) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdminRoute && !data.user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Visitor analytics: log real storefront page visits only — skip admin
  // pages, API calls, and prefetch requests (which aren't an actual visit).
  const isPrefetch =
    request.headers.get("next-router-prefetch") || request.headers.get("purpose") === "prefetch";
  const shouldLog =
    !pathname.startsWith("/admin") && !pathname.startsWith("/api") && !isPrefetch;

  if (shouldLog) {
    const geo = geolocation(request);
    event.waitUntil(
      logEvent({
        route: pathname,
        ip: ipAddress(request),
        country: geo.country,
        city: geo.city,
        region: geo.countryRegion,
        referrer: request.headers.get("referer") ?? undefined,
        userAgent: request.headers.get("user-agent") ?? undefined,
      })
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
