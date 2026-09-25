# Terra website

A single-page Astro website for Terra, an open-source, self-hostable Termius alternative. Uses the existing React integration, Tailwind v4, Geist, and Phosphor packages.

## Development

```sh
pnpm exec astro dev --background
pnpm exec astro dev status
pnpm exec astro dev logs
pnpm exec astro dev stop
```

## Verification

```sh
pnpm build
pnpm check
```

## Content

- `src/pages/index.astro`: nine landing sections and navigation.
- `src/components/landing/WorkspaceDemo.tsx`: local terminal simulation. Only sample data, no SSH or network access.
- `src/components/landing/PlanSelector.tsx`: accessible deployment plan tabs.
- `src/styles/global.css`: locked dark theme and responsive rules.
- `docs/asset-provenance.md`: generated imagery prompts and provenance.
- `docs/landing-audit.md`: design and verification results.

Cloud prices and signup endpoints were not supplied. Cloud actions intentionally link to project discussions; update them when the actual destinations are available. No testimonials, customer claims, or benchmarks are fabricated.
