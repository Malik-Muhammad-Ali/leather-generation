-- Leather Generation — core schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  image text not null,
  description text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category_id uuid references categories (id) on delete set null,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  images text[] not null default '{}',
  short_description text not null default '',
  description text not null default '',
  specs jsonb not null default '[]',
  colors jsonb not null default '[]',
  sizes jsonb not null default '[]',
  rating numeric(2, 1) not null default 0,
  review_count int not null default 0,
  reviews jsonb not null default '[]',
  is_new boolean not null default false,
  is_best_seller boolean not null default false,
  stock int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null default ('LG-' || floor(random() * 90000 + 10000)::text),
  items jsonb not null default '[]',
  customer jsonb not null default '{}',
  shipping_method text not null default 'standard',
  subtotal numeric(10, 2) not null default 0,
  shipping numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  status text not null default 'Processing' check (status in ('Processing', 'Shipped', 'Delivered', 'Cancelled')),
  created_at timestamptz not null default now()
);

-- Page-view analytics for the admin "Events" tab. Route/IP/geo only — never
-- anything tying a visit back to a real identity (no email, no accounts).
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

alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table events enable row level security;

-- Public (anon) can read products & categories — this is an open storefront, no login required.
create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (true);

-- Anyone can place an order (no shopper accounts), but cannot read/update/delete orders.
create policy "Public insert orders" on orders for insert with check (true);

-- No policies at all for events — every read/write goes through the
-- service-role client (proxy.ts writes, /admin/events reads).

-- No insert/update/delete policies for anon/authenticated on categories/products/orders reads/writes —
-- all admin writes go through the service-role key server-side (bypasses RLS), after verifying
-- the request is from the authenticated admin session (see src/lib/supabase/requireAdmin.ts).

create index if not exists events_created_at_idx on events (created_at desc);
