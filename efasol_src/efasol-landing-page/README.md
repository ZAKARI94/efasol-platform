# EFASOL Landing Page

A landing page for **EFASOL (Eureka Farm Solutions)**.

## Running it

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (defaults to `http://localhost:3000`).

Build for production with `npm run build`, preview that build with `npm run preview`.

## What this is

The zip you exported only contained the page/component source files, not a runnable
project — no `package.json`, no build config, and several files the app imports
(`main.tsx`, the shadcn UI primitives, `ThemeContext`, `ErrorBoundary`, the `Contact`
and `NotFound` pages) weren't included. I rebuilt that missing scaffolding so the app
runs as-is. Two things worth knowing about what I filled in:

1. **`ErrorBoundary`, `ThemeContext`, `NotFound`** — standard boilerplate, safe to
   leave as-is or restyle.
2. **`Contact.tsx`** — I built this using the `contact.*` translation keys that were
   already sitting unused in `LanguageContext.tsx`, styled to match the rest of the
   site. The submit handler is stubbed (shows a success toast after a fake delay) —
   there's no backend in this export, so wire it up to a real endpoint or email
   service before relying on it.
3. **Images** — `HeroSection.tsx` and `AboutSection.tsx` originally pointed at
   `/manus-storage/...` image paths, which only resolve inside the Manus platform.
   I swapped both to the farm photo you had included in the zip
   (`public/efasol-farm-photo.png`) as a placeholder, and used your logo file
   (`public/efasol-logo.png`) in the nav bar instead of the plain text placeholder
   that was there. Swap in your real hero/portrait photography whenever you have it.

I also fixed one real bug in the original `App.tsx`: the route paths were written as
`path={\"\"}` with a literal backslash before each quote, which is invalid JS and
would have failed to compile.

## Stack

React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Vite · Wouter (routing)

## Structure

```
src/
├── main.tsx              # entry point
├── App.tsx                # router + providers
├── index.css               # Tailwind v4 theme + EFASOL brand tokens
├── pages/                  # Home, Contact, NotFound
├── components/              # Navigation, HeroSection, ServicesSection, AboutSection, Footer
│   └── ui/                    # shadcn primitives (button, tooltip, sonner)
└── contexts/                 # LanguageContext (FR/EN), ThemeContext (light/dark)
```

---

## Update: bilingual + polish pass

### Fixed
- **Logo mix-up**: `efasol-logo.png` was actually a full-page screenshot mockup, and
  the file being used as the hero/about "photo" was your real wordmark logo, stretched
  full-bleed. Re-cropped the real logo from the source file (trimmed to its actual
  content bounding box, 3.8MB → 29KB) and now use it correctly in the nav and footer.
- **Broken nav/footer links**: `#impact`, `#blog`, and `#contact` pointed at sections
  that don't exist. `Impact` now points at the About section's stats block (the
  closest existing content); `Blog` was removed since there's nothing to link to yet;
  `Contact Us` and both `Get Started` buttons now route to the real `/contact` page.
- **Mismatched contact info**: the footer had a Lagos, Nigeria address/phone
  hardcoded, while `LanguageContext.tsx` had a different Abidjan, Côte d'Ivoire
  address/phone. Footer now pulls from the translations (Abidjan version) so there's
  one source of truth — double-check `footer.address` / `footer.phone` / `footer.email`
  / `footer.website` in `LanguageContext.tsx` are your real details (the address is
  country-level only, no street address was ever provided).

### Added
- **FR/EN toggle**: a language switcher in the nav (desktop + mobile) now actually
  works. Navigation, Hero, Services, About, and Footer are all wired to the `t()`
  translations that were already sitting unused in `LanguageContext.tsx`. `NotFound.tsx`
  is still English-only (low priority, no translation keys existed for it).
- **Floating WhatsApp button** (`src/components/WhatsAppButton.tsx`), pre-filled with
  the localized greeting. **Update `WHATSAPP_NUMBER` in that file with your real
  WhatsApp Business number** — it's currently just parsed from the placeholder phone
  number in the translations.
- **Scroll-reveal animation** (`src/components/Reveal.tsx`) on the Services and About
  sections — fade/slide-up on scroll, no new dependency, respects
  `prefers-reduced-motion`.

### Known placeholder / still needed
- Hero background and About section image are brand-color gradient panels, not
  photos — there was no real farm/team photography in the export. Swap the `style`
  block in `HeroSection.tsx` and the placeholder `<div>` in `AboutSection.tsx` for
  real `<img>`s once you have them.
- Favicon is the wide wordmark logo, which browsers will letterbox in the tab —
  looks fine but a proper square icon mark would look sharper if you have one.
- Privacy Policy / Terms of Service footer links still go to `#` — no legal pages
  exist yet.
- Contact form still has no backend (unchanged from before).

### Still open from the brand-direction question
This build is still on the green/gold, Playfair Display look — the Power Red /
EFASOL Navy / Oswald ExtraBold direction wasn't addressed in this pass.

---
**Note:** if you're actively iterating on this in Manus, next time use its "download
full project" / export option rather than copying individual files, and you'll get
all of this scaffolding automatically.
