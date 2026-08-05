import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { Container } from "@/components/Container";
import { PageShell } from "@/components/PageShell";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import type { ProjectInsert, ProjectRow } from "@/integrations/supabase/types";
import {
  createAdminProject,
  deleteAdminProject,
  isCurrentUserAdmin,
  listAdminProjects,
  updateAdminProject,
} from "@/services/adminProjects";
import type { ProjectEvidence, ProjectLink, ProjectMedia, StudioSlug } from "@/types/content";

type FormState = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  studios: StudioSlug[];
  services: string;
  deliveryType: string;
  coverImageUrl: string;
  coverAlt: string;
  gallery: string;
  videos: string;
  links: string;
  evidence: string;
  status: "draft" | "published" | "archived";
  isFeatured: boolean;
  sortOrder: string;
  projectDate: string;
  clientName: string;
  clientAuthorized: boolean;
  challenge: string;
  objective: string;
  process: string;
  solution: string;
  deliverables: string;
  results: string;
  technologies: string;
  stage: "concept" | "prototype" | "functional" | "released";
  locale: string;
  seoTitle: string;
  seoDescription: string;
  seoImageUrl: string;
  visual: "cinema" | "world" | "portrait" | "system";
};

const studioOptions: Array<{ value: StudioSlug; label: string }> = [
  { value: "story", label: "Story Studio" },
  { value: "creative", label: "Creative Studio" },
  { value: "ai", label: "AI Studio" },
  { value: "systems", label: "Systems Studio" },
];

const emptyForm: FormState = {
  slug: "",
  title: "",
  summary: "",
  description: "",
  studios: ["story"],
  services: "",
  deliveryType: "",
  coverImageUrl: "",
  coverAlt: "",
  gallery: "",
  videos: "",
  links: "",
  evidence: "",
  status: "draft",
  isFeatured: false,
  sortOrder: "100",
  projectDate: "",
  clientName: "",
  clientAuthorized: false,
  challenge: "",
  objective: "",
  process: "",
  solution: "",
  deliverables: "",
  results: "",
  technologies: "",
  stage: "concept",
  locale: "pt-BR",
  seoTitle: "",
  seoDescription: "",
  seoImageUrl: "",
  visual: "world",
};

const lines = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);
const nullable = (value: string) => value.trim() || null;
const mediaFromLines = (value: string): ProjectMedia[] => lines(value).map((line) => {
  const [url, alt = "", title = ""] = line.split("|").map((item) => item.trim());
  return { url, alt, title };
});
const linksFromLines = (value: string): ProjectLink[] => lines(value).map((line) => {
  const [label, url] = line.split("|").map((item) => item.trim());
  return { label, url };
});
const evidenceFromLines = (value: string): ProjectEvidence[] => lines(value).map((line) => {
  const [type, title, source = "", note = ""] = line.split("|").map((item) => item.trim());
  if (!type || !title || !source || !note) {
    throw new Error("Cada evidência precisa de tipo, título, fonte e observação.");
  }
  if (!["link", "image", "video", "document", "metric"].includes(type)) {
    throw new Error(`Tipo de evidência inválido: ${type}.`);
  }
  return { type: type as ProjectEvidence["type"], title, source, note };
});
const mediaToLines = (items: ProjectMedia[]) => items.map((item) => [item.url, item.alt, item.title].filter(Boolean).join(" | ")).join("\n");
const linksToLines = (items: ProjectLink[]) => items.map((item) => `${item.label} | ${item.url}`).join("\n");
const evidenceToLines = (items: ProjectEvidence[]) => items.map((item) => [item.type, item.title, item.source, item.note].join(" | ")).join("\n");

function rowToForm(row: ProjectRow): FormState {
  return {
    slug: row.slug, title: row.title, summary: row.summary, description: row.description,
    studios: row.studios, services: row.services.join("\n"), deliveryType: row.delivery_type,
    coverImageUrl: row.cover_image_url ?? "", coverAlt: row.cover_alt,
    gallery: mediaToLines(row.gallery), videos: mediaToLines(row.videos), links: linksToLines(row.external_links),
    evidence: evidenceToLines(row.evidence), status: row.status, isFeatured: row.is_featured,
    sortOrder: String(row.sort_order), projectDate: row.project_date ?? "", clientName: row.client_name ?? "",
    clientAuthorized: row.client_authorized, challenge: row.challenge ?? "", objective: row.objective ?? "", process: row.process ?? "",
    solution: row.solution ?? "", deliverables: row.deliverables.join("\n"), results: row.results ?? "",
    technologies: row.technologies.join("\n"), stage: row.stage, locale: row.locale, seoTitle: row.seo_title ?? "",
    seoDescription: row.seo_description ?? "", seoImageUrl: row.seo_image_url ?? "", visual: row.visual,
  };
}

function formToPayload(form: FormState): ProjectInsert {
  if (!form.studios.length) throw new Error("Selecione pelo menos um estúdio.");
  if (form.coverImageUrl && !form.coverAlt.trim()) throw new Error("Informe o texto alternativo da capa.");
  if (form.clientName && !form.clientAuthorized) throw new Error("O cliente só pode ser exibido quando houver autorização.");

  return {
    slug: form.slug.trim(), title: form.title.trim(), summary: form.summary.trim(), description: form.description.trim(),
    studios: form.studios, services: lines(form.services), delivery_type: form.deliveryType.trim(),
    cover_image_url: nullable(form.coverImageUrl), cover_alt: form.coverAlt.trim(), gallery: mediaFromLines(form.gallery),
    videos: mediaFromLines(form.videos), external_links: linksFromLines(form.links), evidence: evidenceFromLines(form.evidence),
    status: form.status, is_featured: form.isFeatured, sort_order: Number(form.sortOrder), project_date: nullable(form.projectDate),
    client_name: form.clientAuthorized ? nullable(form.clientName) : null, client_authorized: form.clientAuthorized,
    challenge: nullable(form.challenge), objective: nullable(form.objective), process: nullable(form.process), solution: nullable(form.solution),
    deliverables: lines(form.deliverables), results: nullable(form.results), technologies: lines(form.technologies), stage: form.stage,
    locale: form.locale.trim() || "pt-BR", seo_title: nullable(form.seoTitle), seo_description: nullable(form.seoDescription),
    seo_image_url: nullable(form.seoImageUrl), visual: form.visual,
  };
}

export function AdminPage() {
  const [authState, setAuthState] = useState<"loading" | "signed-out" | "unauthorized" | "admin">(
    isSupabaseConfigured ? "loading" : "signed-out",
  );
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedProject = useMemo(() => projects.find((item) => item.id === selectedId), [projects, selectedId]);

  const loadProjects = useCallback(async () => {
    const nextProjects = await listAdminProjects();
    setProjects(nextProjects);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    const inspectSession = async () => {
      const { data } = await client.auth.getSession();
      if (!data.session) { setAuthState("signed-out"); return; }
      try {
        const admin = await isCurrentUserAdmin();
        setAuthState(admin ? "admin" : "unauthorized");
        if (admin) await loadProjects();
      } catch { setAuthState("unauthorized"); }
    };
    void inspectSession();
    const { data: listener } = client.auth.onAuthStateChange(() => { void inspectSession(); });
    return () => listener.subscription.unsubscribe();
  }, [loadProjects]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const values = new FormData(event.currentTarget);
    const { error: loginError } = await supabase!.auth.signInWithPassword({ email: String(values.get("email")), password: String(values.get("password")) });
    if (loginError) setError("Não foi possível entrar. Verifique suas credenciais.");
    setBusy(false);
  }

  async function save(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const payload = formToPayload(form);
      if (selectedId) await updateAdminProject(selectedId, payload);
      else await createAdminProject(payload);
      await loadProjects(); setForm(emptyForm); setSelectedId(null); setMessage("Projeto salvo com segurança.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível salvar o projeto."); }
    finally { setBusy(false); }
  }

  async function remove(project: ProjectRow) {
    if (!window.confirm(`Excluir definitivamente “${project.title}”? Para preservar histórico, prefira arquivar.`)) return;
    setBusy(true); setError("");
    try { await deleteAdminProject(project.id); await loadProjects(); if (selectedId === project.id) { setSelectedId(null); setForm(emptyForm); } setMessage("Projeto excluído."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível excluir."); }
    finally { setBusy(false); }
  }

  async function changeStatus(project: ProjectRow, status: ProjectRow["status"]) {
    const action = status === "published" ? "publicar" : status === "draft" ? "despublicar" : "arquivar";
    if (!window.confirm(`Deseja ${action} “${project.title}”?`)) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await updateAdminProject(project.id, { status });
      await loadProjects();
      setMessage(`Projeto ${action === "publicar" ? "publicado" : action === "despublicar" ? "despublicado" : "arquivado"}.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : `Não foi possível ${action} o projeto.`);
    } finally { setBusy(false); }
  }

  if (!isSupabaseConfigured) return <PageShell><Container className="admin-state"><h1>Configure o banco</h1><p>Copie <code>.env.example</code> para <code>.env.local</code> e aplique as migrations no Supabase. A Home continua funcionando com o fallback local.</p></Container></PageShell>;
  if (authState === "loading") return <PageShell><Container className="admin-state"><p role="status">Verificando acesso…</p></Container></PageShell>;
  if (authState === "signed-out") return <PageShell><Container className="admin-state"><form className="admin-login" onSubmit={login}><p className="eyebrow">Área restrita</p><h1>Administração do portfólio</h1><label>E-mail<input name="email" type="email" autoComplete="username" required /></label><label>Senha<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button" disabled={busy}>{busy ? "Entrando…" : "Entrar"}</button><small>Não existe cadastro público. O acesso é liberado somente pela allowlist administrativa.</small></form></Container></PageShell>;
  if (authState === "unauthorized") return <PageShell><Container className="admin-state"><h1>Acesso não autorizado</h1><p>Sua conta está autenticada, mas não pertence à allowlist administrativa.</p><button className="button button--ghost" onClick={() => supabase!.auth.signOut()}>Sair</button></Container></PageShell>;

  return <PageShell><Container className="admin-page">
    <header className="admin-page__header"><div><p className="eyebrow">Área restrita</p><h1>Projetos</h1></div><button className="button button--ghost" onClick={() => supabase!.auth.signOut()}>Sair</button></header>
    {(message || error) && <p className={error ? "form-error" : "form-success"} role={error ? "alert" : "status"}>{error || message}</p>}
    <div className="admin-layout">
      <aside className="admin-list"><button className="button" onClick={() => { setSelectedId(null); setForm(emptyForm); }}>Novo projeto</button>{projects.length === 0 ? <p>Nenhum projeto cadastrado.</p> : projects.map((project) => <article key={project.id}><button onClick={() => { setSelectedId(project.id); setForm(rowToForm(project)); }}><strong>{project.title}</strong><span>{project.status} · ordem {project.sort_order}</span></button><div><button disabled={busy} onClick={() => void changeStatus(project, project.status === "published" ? "draft" : "published")}>{project.status === "published" ? "Despublicar" : "Publicar"}</button><button disabled={busy || project.status === "archived"} onClick={() => void changeStatus(project, "archived")}>Arquivar</button><button disabled={busy} onClick={() => void remove(project)}>Excluir</button></div></article>)}</aside>
      <form className="project-form" onSubmit={save}>
        <h2>{selectedProject ? `Editar: ${selectedProject.title}` : "Novo projeto"}</h2>
        <div className="form-grid"><label>Título<input value={form.title} onChange={(e) => updateField("title", e.target.value)} required minLength={2} /></label><label>Slug<input value={form.slug} onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" /></label></div>
        <fieldset><legend>Estúdios relacionados</legend><div className="checkbox-grid">{studioOptions.map((studio) => <label key={studio.value}><input type="checkbox" checked={form.studios.includes(studio.value)} onChange={(e) => updateField("studios", e.target.checked ? [...form.studios, studio.value] : form.studios.filter((item) => item !== studio.value))} />{studio.label}</label>)}</div></fieldset>
        <label>Resumo<textarea value={form.summary} onChange={(e) => updateField("summary", e.target.value)} required minLength={10} maxLength={360} /></label><label>Descrição completa<textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} required minLength={10} rows={6} /></label>
        <div className="form-grid"><label>Tipo de entrega<input value={form.deliveryType} onChange={(e) => updateField("deliveryType", e.target.value)} /></label><label>Serviços/competências, um por linha<textarea value={form.services} onChange={(e) => updateField("services", e.target.value)} /></label></div>
        <div className="form-grid"><label>URL da capa<input type="url" value={form.coverImageUrl} onChange={(e) => updateField("coverImageUrl", e.target.value)} /></label><label>Texto alternativo da capa<input value={form.coverAlt} onChange={(e) => updateField("coverAlt", e.target.value)} required={Boolean(form.coverImageUrl)} /></label></div>
        <label>Galeria — URL | alt | título, uma por linha<textarea value={form.gallery} onChange={(e) => updateField("gallery", e.target.value)} /></label><label>Vídeos — URL | descrição | título, um por linha<textarea value={form.videos} onChange={(e) => updateField("videos", e.target.value)} /></label><label>Links — rótulo | URL, um por linha<textarea value={form.links} onChange={(e) => updateField("links", e.target.value)} /></label><label>Evidências — tipo | título | URL/fonte | observação<textarea value={form.evidence} onChange={(e) => updateField("evidence", e.target.value)} placeholder="link | Matéria sobre o projeto | https://… | Publicada em…" /></label>
        <div className="form-grid"><label>Status<select value={form.status} onChange={(e) => updateField("status", e.target.value as FormState["status"])}><option value="draft">Rascunho</option><option value="published">Publicado</option><option value="archived">Arquivado</option></select></label><label>Ordem<input type="number" min="0" value={form.sortOrder} onChange={(e) => updateField("sortOrder", e.target.value)} required /></label><label>Data do projeto<input type="date" value={form.projectDate} onChange={(e) => updateField("projectDate", e.target.value)} /></label><label>Visual<select value={form.visual} onChange={(e) => updateField("visual", e.target.value as FormState["visual"])}><option value="cinema">Cinema</option><option value="world">Mundo</option><option value="portrait">Retrato</option><option value="system">Sistema</option></select></label></div>
        <div className="checkbox-grid"><label><input type="checkbox" checked={form.isFeatured} onChange={(e) => updateField("isFeatured", e.target.checked)} />Projeto em destaque</label><label><input type="checkbox" checked={form.clientAuthorized} onChange={(e) => updateField("clientAuthorized", e.target.checked)} />Cliente autorizou divulgação</label></div><label>Cliente (somente com autorização)<input value={form.clientName} onChange={(e) => updateField("clientName", e.target.value)} disabled={!form.clientAuthorized} /></label>
        <label>Problema ou oportunidade<textarea value={form.challenge} onChange={(e) => updateField("challenge", e.target.value)} /></label><label>Objetivo<textarea value={form.objective} onChange={(e) => updateField("objective", e.target.value)} /></label><label>Processo criativo<textarea value={form.process} onChange={(e) => updateField("process", e.target.value)} /></label><label>Solução desenvolvida<textarea value={form.solution} onChange={(e) => updateField("solution", e.target.value)} /></label><label>Entregáveis, um por linha<textarea value={form.deliverables} onChange={(e) => updateField("deliverables", e.target.value)} /></label><label>Resultados comprovados<textarea value={form.results} onChange={(e) => updateField("results", e.target.value)} placeholder="Preencha apenas com resultados comprovados e registre as evidências acima." /></label><label>Tecnologias/ferramentas, uma por linha<textarea value={form.technologies} onChange={(e) => updateField("technologies", e.target.value)} /></label>
        <label>Situação do projeto<select value={form.stage} onChange={(e) => updateField("stage", e.target.value as FormState["stage"])}><option value="concept">Conceito</option><option value="prototype">Protótipo</option><option value="functional">Funcional</option><option value="released">Publicado</option></select></label>
        <div className="form-grid"><label>Idioma<input value={form.locale} onChange={(e) => updateField("locale", e.target.value)} /></label><label>SEO title<input value={form.seoTitle} onChange={(e) => updateField("seoTitle", e.target.value)} /></label></div><label>SEO description<textarea value={form.seoDescription} onChange={(e) => updateField("seoDescription", e.target.value)} /></label><label>Imagem social/SEO<input type="url" value={form.seoImageUrl} onChange={(e) => updateField("seoImageUrl", e.target.value)} /></label>
        <button className="button" disabled={busy}>{busy ? "Salvando…" : "Salvar projeto"}</button>
      </form>
    </div>
  </Container></PageShell>;
}
