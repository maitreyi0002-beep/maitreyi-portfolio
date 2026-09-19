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
  // Preserve punctuation in the user-supplied Super Agent case-study copy.
  if (!file.includes('/work/super-agent/'))
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
  "Keep exactly three experiments",
);
assert.match(homepage, /mailto:maitreyi0002@gmail.com/);
console.log(
  "Page titles, local files, anchors, requested scope, and contact verified.",
);

assert.ok(
  !homepage.includes('id="about"'),
  "About must remain off the landing page",
);
for (const path of ["index.html", "agents/index.html", "llms.txt"]) {
  const content = (await readFile(resolve(root, path), "utf8")).replace(
    /\s+/g,
    " ",
  );
  assert.ok(
    !/open to (work|design|opportunit)|available for work/i.test(content),
    `${path}: availability language is prohibited`,
  );
}
assert.ok(
  homepage.includes('class="logo-stroke"'),
  "Use the new stroke-drawn mark",
);
assert.ok(!homepage.includes("logo-eyes"), "The face logo is retired");
assert.equal(
  (homepage.match(/data-project="/g) || []).length,
  3,
  "Keep three project rows",
);
console.log(
  "Revised logo, project cards, and content exclusions verified.",
);
