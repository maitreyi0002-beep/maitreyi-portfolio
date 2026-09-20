import './sync-agent.mjs';
import './sync-super-agent.mjs';
import './sync-connect.mjs';
import './sync-warmcall.mjs';
import './sync-design-observability.mjs';
import { cp, mkdir, rm } from "node:fs/promises";
await rm(new URL("../dist/", import.meta.url), {
  recursive: true,
  force: true,
});
await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await cp(
  new URL("../site/", import.meta.url),
  new URL("../dist/", import.meta.url),
  { recursive: true },
);
console.log("Built portable static site in dist/");
