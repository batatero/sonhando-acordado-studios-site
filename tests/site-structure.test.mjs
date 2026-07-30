import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("home includes the required institutional sections", async () => {
  const source = await read("src/App.tsx");

  for (const id of ["inicio", "universos", "portfolio", "sobre", "contato"]) {
    assert.match(source, new RegExp(`id=["']${id}["']`));
  }
});

test("the four universes are stored as structured data", async () => {
  const source = await read("src/data/universes.ts");

  for (const title of [
    "Story Studio",
    "Creative Studio",
    "AI Studio",
    "Systems Studio",
  ]) {
    assert.match(source, new RegExp(title));
  }
});

test("mobile accessibility controls are present", async () => {
  const header = await read("src/components/Header.tsx");
  const styles = await read("src/index.css");

  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-controls/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /focus-visible/);
});

