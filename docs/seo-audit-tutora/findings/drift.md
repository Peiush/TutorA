# SEO Drift Monitor — tutora.it.com (2026-08-10)

**Baseline:** captured 2026-08-08 (baseline IDs 6-12, `--skip-cwv` so lab CWV not tracked, only HTML/meta/schema/heading state).

**Comparison run:** 2026-08-10 ~11:23-11:28 UTC, via `claude-seo run drift_compare.py <url>` against each of the 7 baseline pages.

**Result: 0 CRITICAL findings across all 7 pages.** All diffs are consistent with the documented 08-09/08-10 remediation work. No unexpected regressions detected.

## Summary table

| Page | Baseline ID | Triggered rules | Verdict |
|---|---|---|---|
| `/` (home) | 6 | WARNING: schema_modified · INFO: content_hash_changed | Expected |
| `/about` | 7 | WARNING: schema_modified · INFO: h2_structure_changed (6→7) · INFO: content_hash_changed | Expected |
| `/courses` | 8 | WARNING: schema_modified · INFO: content_hash_changed | Expected |
| `/courses/python-ff654450` | 9 | WARNING: schema_modified · INFO: h2_structure_changed (5→6) · INFO: content_hash_changed | Expected |
| `/find-a-tutor` | 10 | WARNING: schema_modified · INFO: content_hash_changed | Expected |
| `/find-a-tutor/sudipto-ffbf5742` | 11 | WARNING: schema_modified · INFO: content_hash_changed | Expected |
| `/subjects/python` | 12 | WARNING: schema_modified · INFO: content_hash_changed | Expected |

All CRITICAL-tier checks (canonical_changed, canonical_removed, noindex_added, h1_removed, h1_changed, title_removed, status_code_error) were **untriggered** on every page — canonical, H1, title, and status code (200) are all unchanged from baseline.

## Diff classification vs. known intentional changes

- **schema_modified (WARNING, all 7 pages):** Expected. Matches the documented HowTo schema removal, `/about` BreadcrumbList addition, `/about` Person schema added to Organization JSON-LD, and `/subjects/[slug]` og:image route addition — all of which alter JSON-LD content/hash without removing schema wholesale. Recommend running `/seo schema` to validate the new JSON-LD is well-formed and that no unintended rich-result types were dropped, since this tool only diffs hashes, not schema validity.
- **content_hash_changed (INFO, all 7 pages):** Expected. Matches FAQ content de-duplication, footer changes (dead `href="#"` social icons removed), homepage stat-flash fix, `/about` founder/team/history content addition, and `/find-a-tutor` pagination/copy generalization.
- **h2_structure_changed (INFO, `/about` 6→7, `/courses/python-ff654450` 5→6):** Expected. Consistent with new `/about` founder/team/history sections and the expanded subject-course link map surfacing on the course detail page. FAQ heading-level fix (h3) does not affect H2 count.

## Tool anomaly noted (not a regression)

On every page, three untriggered rules (`schema_removed`, `schema_added`, `og_tags_removed`) display misleading old/new value pairs in the raw JSON output — e.g. `schema_removed` shows `old_value: "N schema block(s)"` → `new_value: "0 schema blocks"`, and `og_tags_removed` shows the full baseline OG tag list → `new_value: []`, yet both are flagged `triggered: false` with message "unchanged." This pattern is identical across all 7 independently-fetched pages, which points to a display/formatting bug in `drift_compare.py`'s `untriggered_findings` serialization (the rule's actual pass/fail logic is correct — no CRITICAL/WARNING was raised for genuine schema or OG-tag loss — but the printed old/new values for these three untriggered rules should not be trusted at face value). Recommend the drift-monitor skill maintainer fix the value population for untriggered `schema_removed`/`schema_added`/`og_tags_removed` findings so future audits aren't misread. Live pages were not independently re-scraped to confirm actual schema/OG counts since the rule engine itself reported no change.

## Recommendations

- No urgent action required — no unexpected regressions.
- Run `/seo schema https://www.tutora.it.com/about` and `/seo schema https://www.tutora.it.com/courses/python-ff654450` (or a full-site pass) to validate the modified JSON-LD is syntactically correct and still eligible for intended rich results, since `schema_modified` only signals a hash change, not validity.
- Recommend re-capturing a fresh baseline (`drift_baseline.py`) for all 7 pages now that the 08-09/08-10 fixes are live, so the next drift comparison starts from current state rather than the pre-fix 08-08 snapshot.
- Investigate/fix the `drift_compare.py` untriggered-findings value-display bug described above before relying on raw JSON output for future audits.
