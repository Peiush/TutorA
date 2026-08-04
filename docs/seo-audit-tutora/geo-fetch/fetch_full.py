import sys, json
sys.path.insert(0, "/Users/piyushsaini/.claude/skills/seo/scripts")
import render_page

urls = sys.argv[1:]
for url in urls:
    res = render_page.render_page(url, mode="auto", extract_content=True)
    out = {
        "url": res.get("url"),
        "status_code": res.get("status_code"),
        "is_spa": res.get("is_spa"),
        "mode_used": res.get("mode_used"),
        "publication_date": res.get("publication_date"),
        "extracted_text": res.get("extracted_text"),
        "error": res.get("error"),
    }
    fname = url.rstrip("/").split("/")[-1] or "home"
    with open(f"/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/81586ca8-c598-4858-b206-5bf40bd7ec1b/scratchpad/tutora.it.com-audit/geo-fetch/full_{fname}.json", "w") as fh:
        json.dump(out, fh, indent=2, ensure_ascii=False)
    print(f"done: {url} -> full_{fname}.json ({len((res.get('extracted_text') or '').split())} words)")
