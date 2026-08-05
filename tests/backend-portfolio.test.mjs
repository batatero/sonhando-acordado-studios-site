import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("fallback remains available when the backend has no content", async () => {
  const service = await read("src/services/projects.ts");
  assert.match(service, /if \(!supabase\) return fallbackProjectsContent/);
  assert.match(service, /if \(error \|\| !data\?\.length\) return fallbackProjectsContent/);
});

test("database migration protects administrative writes", async () => {
  const migration = await read(
    "supabase/migrations/20260805120000_create_portfolio.sql",
  );

  assert.match(migration, /enable row level security/);
  assert.match(migration, /Published projects are public/);
  assert.match(migration, /Admins can read all projects/);
  assert.match(migration, /Admins can insert projects/);
  assert.match(migration, /Admins can update projects/);
  assert.match(migration, /Admins can delete projects/);
  assert.match(migration, /admin_profiles_single_admin_idx/);
  assert.match(migration, /cardinality\(studios\) > 0/);
});

test("public and administrative routes are registered", async () => {
  const main = await read("src/main.tsx");
  for (const route of ["/portfolio", "/portfolio/:slug", "/admin"]) {
    assert.match(main, new RegExp(route.replace("/", "\\/")));
  }
});
