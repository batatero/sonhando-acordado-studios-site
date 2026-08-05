import { supabase } from "@/integrations/supabase/client";
import type {
  ProjectInsert,
  ProjectRow,
  ProjectUpdate,
} from "@/integrations/supabase/types";

function requireSupabase() {
  if (!supabase) {
    throw new Error("Configure o Supabase antes de usar o painel administrativo.");
  }

  return supabase;
}

export async function isCurrentUserAdmin() {
  const client = requireSupabase();
  const { data, error } = await client.rpc("is_admin");
  if (error) throw error;
  return data === true;
}

export async function listAdminProjects() {
  const client = requireSupabase();
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as ProjectRow[];
}

export async function createAdminProject(project: ProjectInsert) {
  const client = requireSupabase();
  const { data, error } = await client
    .from("projects")
    .insert(project)
    .select("*")
    .single();

  if (error) throw error;
  return data as ProjectRow;
}

export async function updateAdminProject(id: string, project: ProjectUpdate) {
  const client = requireSupabase();
  const { data, error } = await client
    .from("projects")
    .update(project)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as ProjectRow;
}

export async function deleteAdminProject(id: string) {
  const client = requireSupabase();
  const { error } = await client.from("projects").delete().eq("id", id);
  if (error) throw error;
}
