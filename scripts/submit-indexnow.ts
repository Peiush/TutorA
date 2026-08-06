// Submits every URL in the live sitemap to the IndexNow API (api.indexnow.org),
// which fans out to Bing, Yandex, Naver, Seznam, and other participating engines.
// Google does not support IndexNow — GSC/sitemap submission covers Google separately.
//
// Run after a deploy that adds/changes/removes pages:
//   npm run indexnow
const HOST = "www.tutora.it.com";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_KEY = "dc5a65da3b944697466814e2a35baf68";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

async function getSitemapUrls(): Promise<string[]> {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const urlList = await getSitemapUrls();
  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow accepted the submission (HTTP ${res.status}).`);
  } else {
    const body = await res.text().catch(() => "");
    throw new Error(`IndexNow submission failed: HTTP ${res.status} ${body}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
