-- Incremental migration: run this in the Supabase SQL editor if you already
-- ran schema.sql before the events table was added.

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  route text not null,
  ip text,
  country text,
  city text,
  region text,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table events enable row level security;

create index if not exists events_created_at_idx on events (created_at desc);
