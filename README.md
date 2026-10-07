# Single price grid component

An implementation of the [Frontend Mentor single price grid component challenge](https://www.frontendmentor.io/challenges/single-price-grid-component-5ce41129d0ff452fec5abbbc), using its supplied copy and design references.

The card shows the sample $29 monthly price as presentation text. Sign Up is an honest demo: it says visibly that sign-up isn't connected and nothing is sent. There is no account, payment or network write.

## Development

Node 22.13 or later. Use `npm ci`, `npm run dev`, `npm run lint`, `npm run build`, `npm run typecheck` and `npm test`. Browser tests use installed Chrome and own port 4513.

Next 16.3.6, React 19.2.8, TypeScript 5.9.3 and Tailwind 4.2.1 are pinned to the family baseline. Only the Sign Up button is a client component.

## Sources

Original challenge files are preserved under `reference/`; the favicon moved byte-for-byte to `public/images/`. Panel sizes, padding, colours and shadows follow the decoded Figma Desktop, Tablet and Mobile frames. Karla 400/700 is served through `next/font`.

## Implementation choices

- The Why Us list is 14px in the design; the family 16px floor raises it to 16px.
- The design has no hover state for Sign Up; hover darkens the lime and keyboard focus draws a white ring.
- White on lime (Sign Up) and lime on white (the guarantee line) are the official palette and are kept for fidelity, though their contrast is below WCAG AA.
- One site name, "Single price grid component", appears in the footer, `og:site_name` and `WebSite` JSON-LD. The canonical URL is the planned `single-price-grid-component-fm.royeradames.com` production domain, which isn't attached yet.
- Where the Figma frames and the supplied JPGs disagree, the decoded Figma wins (635px card on tablet and desktop, 311px on mobile, 216px community panel on desktop). The lower panels are taller than Figma's 259px because the 16px list floor adds about 28px.
