# Dependency remediation — November 1, 2026

The November 1 audit found 2 critical, 5 high and 3 moderate affected-package entries, concentrated in test/build tooling. Vite 5.4.21 has no patched same-major release; use 6.4.5. Vitest 3 is outside the mocker advisory's patched range; use 4.1.12, which also removes the vulnerable Tinypool dependency. These are the smallest compatible patched major lines, avoiding Vite 8/Vitest 5. The existing React 18, React plugin 4, jsdom and visualization stack stay in place.

The [Vite 5→6 migration](https://v6.vite.dev/guide/migration) and [Vitest 3→4 migration](https://v4.vitest.dev/guide/migration.html) were reviewed for Node requirements, plugin peers, resolve/environment options, pools, mocks and coverage. The project does not use removed advanced settings. The CI Node setting now reads .nvmrc (22.23.0), matching the existing runtime used locally; its deployment trigger remains main-only.

After: zero findings. Before and after, all 6 unit tests and production build passed. Chromium production-preview smoke passed on desktop 1440×1000 and phone 390×844: navigation to Exercises and a real search returned exactly the expected exercise, with no application console errors/warnings or framework overlays. No lint or typecheck command is configured; neither was invented or reported as passed. A harmless pre-existing empty React chunk build warning remains. The first lockfile solve hit an npm 10 internal edgesOut error; repeating the local solve with npm 12 succeeded, then the normal npm clean install/tests/build passed. No force/legacy-peer-deps was used.

These findings are not proof of an exploit in the deployed static application. Recharts 2 has a maintenance/deprecation notice; its major migration is intentionally deferred to avoid unrelated rendering changes. No deployment or merge was performed.

## Complete affected-package inventory

Baseline: `a5aa1e87f5d1f7adffed22a8b30b30c5e0d09888`. All affected package entries from the audit are listed, including downstream packages flagged only through a dependency.

| Package | Before resolved versions | After resolved versions | Severity; direct dependency |
| --- | --- | --- | --- |
| @vitest/mocker | 3.2.6 | 4.1.12 | moderate; no |
| baseline-browser-mapping | 2.10.37 | 2.11.34 | moderate; no |
| browserslist | 4.28.2 | 4.29.5 | high; no |
| esbuild | 0.21.5 | 0.25.12 | moderate; no |
| nanoid | 3.3.12 | 3.3.20 | high; no |
| postcss | 8.5.15 | 8.5.32 | high; no |
| source-map-js | 1.2.1 | 1.2.2 | high; no |
| tinypool | 1.1.1 | removed | critical; no |
| vite | 5.4.21 | 6.4.5 | high; yes |
| vitest | 3.2.6 | 4.1.12 | critical; yes |

Underlying advisories:

- [nanoid: non-secure generators can loop indefinitely with negative size](https://github.com/advisories/GHSA-28wg-ghj8-5hjv)
- [nanoid: custom generators can loop indefinitely when size is zero](https://github.com/advisories/GHSA-2v37-7h3g-55p8)
- [Vite Vulnerable to Path Traversal in Optimized Deps `.map` Handling](https://github.com/advisories/GHSA-4w7w-66w2-5vf9)
- [launch-editor: `fs.existsSync()` existence check can be bypassed on Windows](https://github.com/advisories/GHSA-587h-7wmj-h5pm)
- [Tinypool: Prototype Pollution gadget in worker options leads to Remote Code Execution](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3)
- [esbuild enables any website to send any requests to the development server and read the response](https://github.com/advisories/GHSA-67mh-4wv8-2f99)
- [source-map-js allows event-loop denial of service through indexed source-map section offsets](https://github.com/advisories/GHSA-68fv-2mgg-jv7q)
- [launch-editor: escapeCmdArgs() omits % escaping on Windows](https://github.com/advisories/GHSA-698v-4r3x-3vcv)
- [Browserslist: Uncaught crash / prototype write via untrusted browserslist-stats.json custom stats (normalizeStats)](https://github.com/advisories/GHSA-73wf-gq98-2v4g)
- [Vitest: Path Traversal / Arbitrary File Read via @vitest/mocker Redirect Mock](https://github.com/advisories/GHSA-82fw-gwwq-j7x9)
- [Tinypool: Prototype Pollution Gadget to RCE in run() options](https://github.com/advisories/GHSA-85c8-ppgw-ccpr)
- [Vite: Cross origin script execution through Vite custom middleware](https://github.com/advisories/GHSA-9jrq-w75r-8gcw)
- [Browserslist: Unbounded memory growth (no cache eviction) via distinct query results, leading to eventual OOM](https://github.com/advisories/GHSA-c83g-rgw3-j3cx)
- [vite: `server.fs.deny` bypass on Windows alternate paths](https://github.com/advisories/GHSA-fx2h-pf6j-xcff)
- [PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappingURL reads arbitrary .map files when `from` is unset](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp)
- [Vitest: Code injection via unauthenticated manual mock registration](https://github.com/advisories/GHSA-qxg6-89mg-rqv8)
- [PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) leads to Arbitrary .map File Disclosure](https://github.com/advisories/GHSA-r28c-9q8g-f849)
- [launch-editor: Editor CLI flag misinterpretation causing arbitrary command execution for some editors](https://github.com/advisories/GHSA-r825-w8mm-5pxw)
- [Vite: Files outside `server.fs.allow` could be served when project paths match system paths on non-Windows machine](https://github.com/advisories/GHSA-rq7h-c2jc-7f22)
- [launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows](https://github.com/advisories/GHSA-v6wh-96g9-6wx3)
- [baseline-browser-mapping process termination on invalid input causes denial of service](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv)
