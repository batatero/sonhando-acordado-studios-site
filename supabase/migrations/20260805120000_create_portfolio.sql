create extension if not exists pgcrypto;

create type public.studio_slug as enum ('story', 'creative', 'ai', 'systems');
create type public.project_status as enum ('draft', 'published', 'archived');
create type public.project_visual as enum ('cinema', 'world', 'portrait', 'system');
create type public.project_stage as enum ('concept', 'prototype', 'functional', 'released');

create table public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create unique index admin_profiles_single_admin_idx
  on public.admin_profiles ((true));

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 2 and 160),
  summary text not null check (char_length(summary) between 10 and 360),
  description text not null check (char_length(description) >= 10),
  studios public.studio_slug[] not null check (cardinality(studios) > 0),
  services text[] not null default '{}',
  delivery_type text not null default '',
  cover_image_url text,
  cover_alt text not null default '',
  gallery jsonb not null default '[]'::jsonb check (jsonb_typeof(gallery) = 'array'),
  videos jsonb not null default '[]'::jsonb check (jsonb_typeof(videos) = 'array'),
  external_links jsonb not null default '[]'::jsonb check (jsonb_typeof(external_links) = 'array'),
  evidence jsonb not null default '[]'::jsonb check (jsonb_typeof(evidence) = 'array'),
  status public.project_status not null default 'draft',
  is_featured boolean not null default false,
  sort_order integer not null default 100 check (sort_order >= 0),
  project_date date,
  client_name text,
  client_authorized boolean not null default false,
  challenge text,
  objective text,
  process text,
  solution text,
  deliverables text[] not null default '{}',
  results text,
  technologies text[] not null default '{}',
  stage public.project_stage not null default 'concept',
  locale text not null default 'pt-BR',
  seo_title text,
  seo_description text,
  seo_image_url text,
  visual public.project_visual not null default 'world',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cover_requires_alt check (cover_image_url is null or char_length(trim(cover_alt)) > 0),
  constraint authorized_client_only check (client_authorized or client_name is null)
);

create unique index projects_one_published_featured_idx
  on public.projects ((is_featured))
  where is_featured and status = 'published';

create index projects_public_order_idx
  on public.projects (status, sort_order, published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  if new.status = 'published' and new.published_at is null then
    if tg_op = 'INSERT' or old.status is distinct from 'published' then
      new.published_at = now();
    end if;
  end if;
  return new;
end;
$$;

create trigger projects_set_updated_at
before insert or update on public.projects
for each row execute function public.set_updated_at();

create or replace function public.is_admin(check_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles where user_id = check_user_id
  );
$$;

alter table public.admin_profiles enable row level security;
alter table public.projects enable row level security;

create policy "Admins can read their own profile"
  on public.admin_profiles for select
  to authenticated
  using (user_id = auth.uid());

create policy "Published projects are public"
  on public.projects for select
  to anon, authenticated
  using (status = 'published');

create policy "Admins can read all projects"
  on public.projects for select
  to authenticated
  using (public.is_admin());

create policy "Admins can insert projects"
  on public.projects for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update projects"
  on public.projects for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete projects"
  on public.projects for delete
  to authenticated
  using (public.is_admin());

revoke all on public.admin_profiles from anon, authenticated;
revoke insert, update, delete on public.projects from anon;
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
grant select on public.admin_profiles to authenticated;
revoke all on function public.is_admin(uuid) from public;
grant execute on function public.is_admin(uuid) to authenticated;

comment on table public.admin_profiles is
  'Allowlist administrativa. Cadastre usuários aqui somente após criá-los no Supabase Auth.';
comment on column public.projects.evidence is
  'Array JSON de evidências com tipo, título, URL/fonte e observação. Resultados nunca devem ser inventados.';
