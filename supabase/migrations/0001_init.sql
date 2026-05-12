-- KNB Detailing — initial schema
-- Generated for Phase 2. Apply via `supabase db push` after linking.

-- =====================================================================
-- Extensions
-- =====================================================================
create extension if not exists "pgcrypto";    -- gen_random_uuid()
create extension if not exists "citext";       -- case-insensitive text

-- =====================================================================
-- Helper: updated_at auto-touch
-- =====================================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- =====================================================================
-- Profiles (extends auth.users)
-- =====================================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext not null unique,
  full_name text,
  phone text,
  sms_opt_in boolean default false,
  marketing_opt_in boolean default false,
  role text not null default 'customer' check (role in ('customer','admin','staff')),
  stripe_customer_id text unique,
  referral_code text unique,
  referred_by uuid references public.profiles(id),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles(role) where deleted_at is null;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Auto-create profile row when an auth.users row is inserted
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  short_id text;
begin
  short_id := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  insert into public.profiles (id, email, referral_code)
  values (new.id, new.email, 'KNB-' || short_id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================================================================
-- Vehicles
-- =====================================================================
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('car','truck','suv','boat','rv','motorcycle')),
  year int check (year between 1900 and extract(year from now())::int + 2),
  make text,
  model text,
  color text,
  vin_or_hin text,
  size_category text check (size_category in ('compact','midsize','large','xl','xxl')),
  notes text,
  primary_photo_url text,
  created_at timestamptz not null default now()
);

create index vehicles_owner_idx on public.vehicles(owner_id);
create index vehicles_kind_idx on public.vehicles(kind);

-- =====================================================================
-- Service catalog
-- =====================================================================
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('auto','boat','rv','motorcycle','ceramic','correction','add_on')),
  short_description text,
  long_description text,
  base_duration_min int not null default 60,
  active boolean default true,
  sort_order int default 0,
  created_at timestamptz not null default now()
);

create index services_category_idx on public.services(category) where active = true;

create table public.service_prices (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  size_category text not null check (size_category in ('compact','midsize','large','xl','xxl')),
  price_cents int not null check (price_cents >= 0),
  unique (service_id, size_category)
);

-- =====================================================================
-- Packages (bundles)
-- =====================================================================
create table public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tier text check (tier in ('express','full','premium','ceramic','membership')),
  category text not null check (category in ('auto','boat','rv','motorcycle','ceramic','correction','add_on')),
  description text,
  base_price_cents int not null check (base_price_cents >= 0),
  deposit_pct int default 25 check (deposit_pct between 0 and 100),
  stripe_price_id text,
  active boolean default true,
  sort_order int default 0,
  created_at timestamptz not null default now()
);

create table public.package_services (
  package_id uuid references public.packages(id) on delete cascade,
  service_id uuid references public.services(id) on delete cascade,
  primary key (package_id, service_id)
);

-- =====================================================================
-- Service area (ZIPs + travel fees)
-- =====================================================================
create table public.service_zips (
  zip text primary key,
  city text,
  county text,
  tier int default 1 check (tier between 1 and 3),
  travel_fee_cents int default 0 check (travel_fee_cents >= 0)
);

-- =====================================================================
-- Appointments
-- =====================================================================
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id),
  vehicle_id uuid not null references public.vehicles(id),
  package_id uuid references public.packages(id),
  status text not null default 'pending' check (status in ('pending','confirmed','in_progress','completed','cancelled','no_show')),
  scheduled_start timestamptz not null,
  scheduled_end timestamptz not null,
  service_address text not null,
  service_city text,
  service_state text default 'IN',
  service_zip text references public.service_zips(zip),
  service_notes text,
  subtotal_cents int not null check (subtotal_cents >= 0),
  travel_fee_cents int not null default 0 check (travel_fee_cents >= 0),
  discount_cents int not null default 0 check (discount_cents >= 0),
  total_cents int not null check (total_cents >= 0),
  deposit_cents int not null check (deposit_cents >= 0),
  deposit_paid boolean default false,
  balance_paid boolean default false,
  stripe_payment_intent_id text,
  stripe_balance_intent_id text,
  internal_notes text,
  cancelled_at timestamptz,
  cancellation_reason text,
  refund_amount_cents int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (scheduled_end > scheduled_start)
);

create index appointments_customer_idx on public.appointments(customer_id);
create index appointments_status_idx on public.appointments(status);
create index appointments_scheduled_idx on public.appointments(scheduled_start);
create index appointments_zip_idx on public.appointments(service_zip);

create trigger appointments_touch before update on public.appointments
  for each row execute function public.touch_updated_at();

create table public.appointment_services (
  appointment_id uuid references public.appointments(id) on delete cascade,
  service_id uuid references public.services(id),
  price_cents int not null check (price_cents >= 0),
  primary key (appointment_id, service_id)
);

-- =====================================================================
-- Service history photos
-- =====================================================================
create table public.service_photos (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  storage_path text not null,
  caption text,
  is_before boolean default false,
  is_after boolean default false,
  display_on_public_gallery boolean default false,
  created_at timestamptz not null default now()
);

create index service_photos_appt_idx on public.service_photos(appointment_id);
create index service_photos_gallery_idx on public.service_photos(display_on_public_gallery) where display_on_public_gallery = true;

-- =====================================================================
-- Memberships (Stripe subscriptions)
-- =====================================================================
create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id),
  vehicle_id uuid references public.vehicles(id),
  package_id uuid not null references public.packages(id),
  stripe_subscription_id text unique,
  status text not null default 'active' check (status in ('active','past_due','paused','cancelled','incomplete')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index memberships_customer_idx on public.memberships(customer_id);

create trigger memberships_touch before update on public.memberships
  for each row execute function public.touch_updated_at();

-- =====================================================================
-- Gift cards
-- =====================================================================
create table public.gift_cards (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  initial_amount_cents int not null check (initial_amount_cents > 0),
  remaining_amount_cents int not null check (remaining_amount_cents >= 0),
  purchaser_email citext,
  recipient_email citext,
  recipient_name text,
  message text,
  stripe_payment_intent_id text,
  redeemed boolean default false,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

create index gift_cards_code_idx on public.gift_cards(code);

-- =====================================================================
-- Reviews
-- =====================================================================
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id),
  appointment_id uuid references public.appointments(id),
  display_name text not null,
  rating int not null check (rating between 1 and 5),
  body text not null check (length(body) >= 10),
  approved boolean default false,
  featured boolean default false,
  source text default 'site' check (source in ('site','google','facebook')),
  created_at timestamptz not null default now()
);

create index reviews_approved_idx on public.reviews(approved, featured);

-- =====================================================================
-- Coupons
-- =====================================================================
create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code citext unique not null,
  description text,
  discount_type text not null check (discount_type in ('pct','fixed')),
  discount_value int not null check (discount_value > 0),
  max_uses int,
  uses int not null default 0,
  expires_at timestamptz,
  active boolean default true,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- Contact form submissions / quote leads
-- =====================================================================
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact','quote')),
  name text not null,
  email citext not null,
  phone text,
  vehicle_type text,
  vehicle_size text,
  zip text,
  package_interest text,
  message text,
  estimated_price_cents int,
  handled boolean default false,
  created_at timestamptz not null default now()
);

create index contact_submissions_handled_idx on public.contact_submissions(handled, created_at);

-- =====================================================================
-- Stripe webhook event idempotency
-- =====================================================================
create table public.stripe_events (
  id text primary key,             -- Stripe event id (evt_...)
  type text not null,
  payload jsonb not null,
  processed_at timestamptz not null default now()
);

-- =====================================================================
-- Audit log
-- =====================================================================
create table public.audit_log (
  id bigserial primary key,
  actor_id uuid references public.profiles(id),
  action text not null,
  entity text,
  entity_id text,
  payload jsonb,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- Row Level Security
-- =====================================================================
alter table public.profiles               enable row level security;
alter table public.vehicles               enable row level security;
alter table public.services               enable row level security;
alter table public.service_prices         enable row level security;
alter table public.packages               enable row level security;
alter table public.package_services       enable row level security;
alter table public.service_zips           enable row level security;
alter table public.appointments           enable row level security;
alter table public.appointment_services   enable row level security;
alter table public.service_photos         enable row level security;
alter table public.memberships            enable row level security;
alter table public.gift_cards             enable row level security;
alter table public.reviews                enable row level security;
alter table public.coupons                enable row level security;
alter table public.contact_submissions    enable row level security;
alter table public.stripe_events          enable row level security;
alter table public.audit_log              enable row level security;

-- Role-check helper
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','staff') and deleted_at is null
  );
$$;

-- Profiles
create policy "profiles_self_read"  on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles_self_update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = 'customer');
create policy "profiles_admin_all"  on public.profiles for all  using (public.is_admin()) with check (public.is_admin());

-- Vehicles
create policy "vehicles_owner_all"  on public.vehicles for all  using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());

-- Service catalog: public read, admin write
create policy "services_public_read"        on public.services           for select using (active = true or public.is_admin());
create policy "services_admin_write"        on public.services           for all  using (public.is_admin()) with check (public.is_admin());
create policy "service_prices_public_read"  on public.service_prices     for select using (true);
create policy "service_prices_admin_write"  on public.service_prices     for all  using (public.is_admin()) with check (public.is_admin());
create policy "packages_public_read"        on public.packages           for select using (active = true or public.is_admin());
create policy "packages_admin_write"        on public.packages           for all  using (public.is_admin()) with check (public.is_admin());
create policy "package_services_public_read" on public.package_services  for select using (true);
create policy "package_services_admin_write" on public.package_services  for all  using (public.is_admin()) with check (public.is_admin());
create policy "service_zips_public_read"    on public.service_zips       for select using (true);
create policy "service_zips_admin_write"    on public.service_zips       for all  using (public.is_admin()) with check (public.is_admin());

-- Appointments
create policy "appointments_owner_read"  on public.appointments         for select using (customer_id = auth.uid() or public.is_admin());
create policy "appointments_owner_write" on public.appointments         for insert with check (customer_id = auth.uid() or public.is_admin());
create policy "appointments_owner_update" on public.appointments        for update using (customer_id = auth.uid() or public.is_admin()) with check (customer_id = auth.uid() or public.is_admin());
create policy "appt_services_read"       on public.appointment_services for select using (exists (select 1 from public.appointments a where a.id = appointment_id and (a.customer_id = auth.uid() or public.is_admin())));
create policy "appt_services_write"      on public.appointment_services for all   using (public.is_admin()) with check (public.is_admin());

-- Photos
create policy "photos_gallery_public" on public.service_photos for select using (display_on_public_gallery = true);
create policy "photos_owner_read"     on public.service_photos for select using (exists (select 1 from public.appointments a where a.id = appointment_id and (a.customer_id = auth.uid() or public.is_admin())));
create policy "photos_admin_write"    on public.service_photos for all   using (public.is_admin()) with check (public.is_admin());

-- Memberships
create policy "memberships_owner_read"  on public.memberships for select using (customer_id = auth.uid() or public.is_admin());
create policy "memberships_admin_write" on public.memberships for all   using (public.is_admin()) with check (public.is_admin());

-- Gift cards: only admin can read (codes are sensitive); purchase happens via service-role server actions
create policy "gift_cards_admin"        on public.gift_cards for all using (public.is_admin()) with check (public.is_admin());

-- Reviews
create policy "reviews_public_read"     on public.reviews for select using (approved = true or public.is_admin());
create policy "reviews_customer_insert" on public.reviews for insert with check (customer_id = auth.uid());
create policy "reviews_admin_write"     on public.reviews for all   using (public.is_admin()) with check (public.is_admin());

-- Coupons: only admin direct access; validation happens via server-side function
create policy "coupons_admin" on public.coupons for all using (public.is_admin()) with check (public.is_admin());

-- Contact submissions: anonymous insert OK; admin read only
create policy "contact_anon_insert" on public.contact_submissions for insert with check (true);
create policy "contact_admin_read"  on public.contact_submissions for select using (public.is_admin());
create policy "contact_admin_write" on public.contact_submissions for update using (public.is_admin()) with check (public.is_admin());

-- Stripe events: only the service-role key writes; admins can read for diagnostics
create policy "stripe_events_admin_read" on public.stripe_events for select using (public.is_admin());

-- Audit log: admin read only; inserts via security-definer functions
create policy "audit_log_admin_read" on public.audit_log for select using (public.is_admin());
