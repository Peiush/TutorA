import "dotenv/config";
import { google } from "googleapis";

const SITE_URL = "https://www.tutora.it.com/";

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not set (see .env.example).");

  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
}

async function queryTop(webmasters: ReturnType<typeof google.webmasters>, dimension: "query" | "page") {
  // GSC data typically lags 2-3 days behind real time, so the window ends a few days back.
  const end = new Date();
  end.setDate(end.getDate() - 3);
  const start = new Date(end);
  start.setDate(start.getDate() - 28);

  const res = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      dimensions: [dimension],
      rowLimit: 25,
    },
  });
  return res.data.rows ?? [];
}

function printRows(rows: Awaited<ReturnType<typeof queryTop>>, label: string) {
  console.log(`\n${label}:`);
  if (rows.length === 0) {
    console.log("  (no rows — property may be too new, or there's no traffic yet in this window)");
    return;
  }
  for (const row of rows) {
    const key = String(row.keys?.[0] ?? "");
    const clicks = row.clicks ?? 0;
    const impressions = row.impressions ?? 0;
    const ctr = ((row.ctr ?? 0) * 100).toFixed(1);
    const position = (row.position ?? 0).toFixed(1);
    console.log(`  clicks=${String(clicks).padStart(4)}  impr=${String(impressions).padStart(5)}  ctr=${ctr}%  pos=${position}  ${key}`);
  }
}

async function main() {
  const auth = getAuth();
  const webmasters = google.webmasters({ version: "v3", auth });

  console.log(`Search Console report for ${SITE_URL} (last 28 days)`);

  const [queries, pages] = await Promise.all([
    queryTop(webmasters, "query"),
    queryTop(webmasters, "page"),
  ]);

  printRows(queries, "Top queries");
  printRows(pages, "Top pages");
}

main().catch((err) => {
  console.error("Failed to fetch Search Console data:", err instanceof Error ? err.message : err);
  process.exit(1);
});
