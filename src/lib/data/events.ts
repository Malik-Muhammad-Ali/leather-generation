import { createAdminClient } from "@/lib/supabase/admin";

// No RLS policies exist for `events` at all (see supabase/schema.sql) — every
// read/write goes through the service-role client. Writes happen from
// proxy.ts on every page view; reads happen from the admin Events tab.

export interface VisitEvent {
  id: string;
  route: string;
  ip: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  referrer: string | null;
  userAgent: string | null;
  createdAt: string;
}

type EventRow = {
  id: string;
  route: string;
  ip: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

function mapEvent(row: EventRow): VisitEvent {
  return {
    id: row.id,
    route: row.route,
    ip: row.ip,
    country: row.country,
    city: row.city,
    region: row.region,
    referrer: row.referrer,
    userAgent: row.user_agent,
    createdAt: row.created_at,
  };
}

export async function logEvent(input: {
  route: string;
  ip?: string;
  country?: string;
  city?: string;
  region?: string;
  referrer?: string;
  userAgent?: string;
}) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("events").insert({
    route: input.route,
    ip: input.ip ?? null,
    country: input.country ?? null,
    city: input.city ?? null,
    region: input.region ?? null,
    referrer: input.referrer ?? null,
    user_agent: input.userAgent ?? null,
  });

  // Never let logging failures break the page request that triggered them.
  if (error) console.error("logEvent failed:", error.message);
}

export async function getEvents(limit = 200): Promise<VisitEvent[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("events")
    .select()
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map(mapEvent);
}
