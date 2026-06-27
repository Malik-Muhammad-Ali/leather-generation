import { getEvents } from "@/lib/data/events";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div>
      <h1 className="font-playfair text-3xl text-black">Events</h1>
      <p className="mt-1 font-inter text-sm text-black/50">
        Page views across the storefront — route, IP, and IP-derived location only. Most recent
        {" "}
        {events.length} visits.
      </p>

      <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
        <table className="w-full min-w-[720px] font-inter text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-widest text-black/40">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Referrer</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-black/40">
                  No visits logged yet. (Geo/IP headers only populate on Vercel — locally
                  they&apos;ll show as unknown.)
                </td>
              </tr>
            )}
            {events.map((event) => (
              <tr key={event.id} className="border-b border-black/5">
                <td className="px-4 py-3 whitespace-nowrap text-black/60" title={event.createdAt}>
                  {timeAgo(event.createdAt)}
                </td>
                <td className="px-4 py-3 text-black">{event.route}</td>
                <td className="px-4 py-3 text-black/60">{event.ip ?? "—"}</td>
                <td className="px-4 py-3 text-black/60">
                  {[event.city, event.region, event.country].filter(Boolean).join(", ") || "—"}
                </td>
                <td className="max-w-[200px] truncate px-4 py-3 text-black/40" title={event.referrer ?? ""}>
                  {event.referrer ?? "Direct"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
