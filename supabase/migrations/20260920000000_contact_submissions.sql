-- Quote / contact enquiries submitted from nexumfocus.com
create table if not exists public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null check (char_length(name) between 1 and 100),
  email        text not null check (char_length(email) between 3 and 255),
  company      text check (char_length(company) <= 150),
  query        text not null check (char_length(query) between 5 and 2000),
  source       text not null default 'website',
  email_sent   boolean not null default false,
  user_agent   text
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- No anon policies: the public key cannot read or write this table directly.
-- Inserts happen only through the send-quote edge function, which uses the
-- service-role key and therefore bypasses RLS.
revoke all on public.contact_submissions from anon, authenticated;
