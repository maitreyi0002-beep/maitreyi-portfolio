import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import assert from "node:assert/strict";
const root = resolve("site");
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(resolve(dir, e.name)) : resolve(dir, e.name),
      ),
    )
  ).flat();
}
for (const file of (await walk(root)).filter((p) => p.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  assert.match(html, /<title>[^<]+<\/title>/, `${file}: title missing`);
  for (const [, link] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(link)) continue;
    if (link.startsWith("#")) {
      assert.ok(
        html.includes(`id="${link.slice(1)}"`),
        `${file}: missing anchor ${link}`,
      );
      continue;
    }
    const target = resolve(dirname(file), link.split("#")[0]);
    assert.ok(
      (await stat(target)).isFile() || (await stat(target)).isDirectory(),
      `Missing ${target}`,
    );
  }
  assert.ok(!/[—–]/.test(html), `${file}: unexpected em/en dash`);
}
const homepage = await readFile(resolve(root, "index.html"), "utf8");
assert.ok(
  !homepage.includes('id="stack"'),
  "Stack must remain off the landing page",
);
assert.ok(
  !homepage.includes("experience-section"),
  "Experience must remain off the landing page",
);
assert.equal(
  (homepage.match(/class="experiment"/g) || []).length,
  3,
  "Keep exactly three experiment placeholders",
);
assert.match(homepage, /mailto:maitreyi0002@gmail.com/);
console.log(
  "Page titles, local files, anchors, requested scope, and contact verified.",
);
