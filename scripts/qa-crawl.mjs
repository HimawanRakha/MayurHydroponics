// Crawl a running site and check SEO/a11y basics on every internal page.
// Usage: node scripts/qa-crawl.mjs http://localhost:3100
const base = process.argv[2] ?? "http://localhost:3000";
const seen = new Set();
const queue = ["/"];
const problems = [];
const titles = new Map();
const descriptions = new Map();
const assets = new Set();

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status !== 200) { problems.push(`${path}: HTTP ${res.status}`); continue; }
  const html = await res.text();

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) problems.push(`${path}: ${h1} <h1>`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!title) problems.push(`${path}: no title`); else titles.set(title, [...(titles.get(title) ?? []), path]);
  if (!desc) problems.push(`${path}: no meta description`); else descriptions.set(desc, [...(descriptions.get(desc) ?? []), path]);
  if (canonical !== base + (path === "/" ? "" : path) && canonical !== base + path) problems.push(`${path}: canonical ${canonical}`);
  if (!/<meta property="og:image"/.test(html)) problems.push(`${path}: no og:image`);
  if (/noindex/.test(html)) problems.push(`${path}: contains noindex`);

  for (const img of html.match(/<img [^>]*>/g) ?? []) {
    if (!/ alt="/.test(img)) problems.push(`${path}: img without alt ${img.slice(0, 80)}`);
    const src = attr(img, "src");
    if (src?.startsWith("/")) assets.add(src.replace(/&amp;/g, "&"));
  }
  for (const json of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json[1]); } catch { problems.push(`${path}: invalid JSON-LD`); }
  }
  for (const a of html.match(/<a [^>]*>/g) ?? []) {
    const href = attr(a, "href")?.replace(/&amp;/g, "&");
    if (!href || href === "#") { problems.push(`${path}: empty/# link ${a.slice(0, 80)}`); continue; }
    if (href.startsWith("http") && !href.startsWith(base)) {
      if (!/target="_blank"/.test(a) || !/noopener/.test(a)) problems.push(`${path}: external link without target/rel ${href}`);
      continue;
    }
    if (href.startsWith("/") && !href.startsWith("/_next")) {
      const clean = href.split("#")[0].split("?")[0] || "/";
      if (!seen.has(clean)) queue.push(clean);
    } else if (href.startsWith("/_next")) assets.add(href);
  }
}

for (const [t, paths] of titles) if (paths.length > 1) problems.push(`duplicate title "${t}" on ${paths}`);
for (const paths of descriptions.values()) if (paths.length > 1) problems.push(`duplicate description on ${paths}`);
for (const src of assets) {
  const r = await fetch(base + src);
  if (r.status !== 200) problems.push(`asset ${src}: HTTP ${r.status}`);
}
for (const extra of ["/robots.txt", "/sitemap.xml", "/opengraph-image.jpg", "/icon.png", "/logo/mayur-hydroponics-logo.png"]) {
  const r = await fetch(base + extra);
  if (r.status !== 200) problems.push(`${extra}: HTTP ${r.status}`);
}
// Unknown URLs must be a 404, or (for streamed dynamic routes) carry a noindex robots tag.
for (const path of [`/publikasi/tidak-ada-${Date.now()}`, "/halaman-tidak-ada"]) {
  const r = await fetch(base + path);
  const body = await r.text();
  const ok = r.status === 404 || /<meta name="robots" content="noindex"/.test(body);
  if (!ok) problems.push(`${path}: HTTP ${r.status} without noindex`);
  else console.log(`${path}: HTTP ${r.status}${r.status === 200 ? " + noindex" : ""}`);
}

console.log(`Crawled ${seen.size} pages, checked ${assets.size} assets.`);
console.log([...seen].join("\n"));
console.log(problems.length ? `\nPROBLEMS:\n${problems.join("\n")}` : "\nNo problems found.");
process.exitCode = problems.length ? 1 : 0;
