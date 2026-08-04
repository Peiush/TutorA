import sys, json, importlib.util

spec = importlib.util.spec_from_file_location("render_page", "/Users/piyushsaini/.claude/skills/seo/scripts/render_page.py")
rp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rp)

BASE = "/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/81586ca8-c598-4858-b206-5bf40bd7ec1b/scratchpad/tutora.it.com-audit"

urls = sys.argv[1:]
for url in urls:
    res = rp.render_page(url, mode="auto")
    slug = url.rstrip("/").split("/")[-1] or "home"
    outpath = f"{BASE}/full/{slug}.json"
    with open(outpath, "w") as f:
        json.dump(res, f, indent=2, default=str)
    wc = len((res.get("extracted_text") or "").split())
    print(f"{url} -> {outpath} | words={wc} | is_spa={res.get('is_spa')} | pubdate={res.get('publication_date')}")
