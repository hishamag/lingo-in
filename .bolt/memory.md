# Project memory

## Product intent & audience

- Arabic-first language learning center website (clone/rebuild of lisancenter.com)
- Offers courses in English, French, and German
- Includes teacher guidance, exam preparation, and educational articles
- Audience: Arabic-speaking students seeking foreign language education

## Brand personality & voice

- Premium, educational, trustworthy
- Arabic-first identity with multilingual course offerings
- Professional but approachable

## Visual design & UX direction

- Concept 1 palette: navy, cyan, teal, amber (amber used for CTAs)
- Navy/teal as primary identity; amber as accent for calls to action
- Arabic-first layout (RTL expected)
- Sections: responsive navigation, hero with learning progress visual, course cards, learning methodology, article library, contact/signup CTA, footer with social/contact links
- Responsive mobile menu
- Fully featured, production-worthy; not cookie-cutter

## Decisions, constraints & rationale

- Built on Vite + React with Tailwind CSS, React hooks, Lucide React icons
- `@/` path alias maps to `src/`
- No extra UI/icon packages installed beyond template defaults
- Single landing page implementation; multi-page expansion not yet requested
- Build, type-check, and lint quality checks must pass (unused imports and CSS ordering warnings were cleaned up)

## Open questions & assumptions

- Exact Concept 1 layout details inferred from assistant response; original attached image not directly accessible
- RTL implementation depth (full RTL vs. Arabic content in LTR layout) not confirmed
- Whether additional pages (course detail, article detail, teacher bios) are needed beyond the landing page
- Whether authentic content/copy from lisancenter.com should be used or placeholder content is acceptable