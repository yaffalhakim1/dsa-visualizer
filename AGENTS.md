# Memory

## Project Overview
**dsa-visualizer** is a React 19 SPA providing interactive step-by-step visualizations for DSA algorithms, based on "DSA Playbook.pdf". Each problem follows the book's 7-step interview workflow with Framer Motion animated box components.

## Tech Stack
- **Framework**: React 19 (TypeScript 6)
- **Build Tool**: Vite 8
- **UI Library**: Chakra UI v3 (custom system in `src/theme.ts`)
- **State Management**: Zustand (`src/store/useAlgorithmStore.ts`)
- **Routing**: React Router DOM v7 (HashRouter for GitHub Pages)
- **Animations**: Framer Motion (Mafs removed from all components)
- **Code Display**: `react-syntax-highlighter` (Prism oneLight style, JS code)
- **Icons**: `lucide-react`

## Building and Running
### Development
- `npm run dev`: Starts Vite dev server.
- `npm run chakra:typegen`: Regenerate Chakra UI types after theme changes.

### Production
- `npm run build`: Full type-check + Vite production build.
- `npm run preview`: Preview production build locally.
- `npm run deploy`: Build + deploy to GitHub Pages (`gh-pages`).

### Maintenance
- `npm run lint`: ESLint for code quality.
- `npx tsc --noEmit`: Quick type check without building.

## Project Structure
- `src/components/`: 13 animated visualizers + shared UI components (StepLabel, SolutionCompare, GlobalControlBar, InterviewWorkflow)
- `src/layouts/`: `MainLayout.tsx` — navy sidebar (260px) + cream content + fixed bottom control bar
- `src/store/`: `useAlgorithmStore.ts` — Zustand store for playback (currentStep, totalSteps, isPlaying, activeLines, playbackSpeed)
- `src/theme.ts`: Chakra v3 system config with font tokens (Playfair Display, DM Sans, JetBrains Mono)
- `src/App.tsx`: HashRouter with 16 routes — 13 visualizer routes + 3 reference routes (patterns-mistakes, interview-workflow, index)

## Visualizer Convention
Every visualizer follows the same pattern:
1. **Data constants** at top (array + target)
2. **State types** (discriminated union for step states)
3. **Code strings** (JS) for SolutionCompare
4. **generateSteps()** — returns array of step objects
5. **Component** — uses `useAlgorithmStore` for playback, maps `currentStep` to visual step
6. **7-step layout**: Restate → Clarify (edge cases) → Example (animated viz) → Baseline (brute) → Bottleneck (new) → Refine (optimized) → Implement (code)
7. SPA layout (not designed for mobile yet)

## Styling and Theme
- **Chakra UI v3**: Component props for styling; avoid raw CSS.
- **Design Palette**:
  - Gold `#c9952e` — Primary brand, accents
  - Dark Navy `#1a1a2e` — Sidebar, control bar
  - Cream `#f5f0eb` — Main content background
  - Warm Border `#e8e0d6` — Card borders
  - Text Muted `#8b8589` — Secondary text
  - Text `#6b6350` — Body text on cream
- **Fonts** (via Google Fonts in index.html):
  - `Playfair Display` — Headings (Chakra `Heading` uses this via theme tokens)
  - `DM Sans` — Body text
  - `JetBrains Mono` — Code snippets
- **No emojis** in code (user preference)
- **rem units** for spacing/fonts, px only for borders/shadows

## Visualizer Box Pattern (Replacement for Mafs)
Instead of Mafs coordinate planes, render algorithm state as colored Chakra Box/Flex elements:
- Array elements = `56-60px` square boxes with `borderRadius="lg"`, `border="2px solid"`
- Active state = gold border `#c9952e`, warm bg `#faf6f0`, `scale: 1.08`
- Inactive state = `opacity: 0.3-0.5`, gray border `#e0d8d0`
- Entering = green tint `bg="#f0faf4"`, leaving = red tint `bg="#fdf6f5"`
- Pointers/labels positioned absolutely above/below boxes using `position="absolute"`
- Framer Motion `motion.div` with `animate` prop for transitions (duration 0.25-0.3s)
- `AnimatePresence` for add/remove animations (push/pop, set membership)

## StepLabel Component
```tsx
<StepLabel num={1} title="Restate" />
```
- Renders dark circle with number + uppercase label
- Used as section header in every visualizer for the 7-step workflow

## SolutionCompare Component
- Side-by-side code panels using `react-syntax-highlighter`
- Left: Brute Force (warm red bg), Right: Optimized (warm green bg)
- Props: `bruteForceCode`, `optimizedCode`, `activeLines` (highlights matching lines green)

## Layout (MainLayout.tsx)
- Reference pages (Home, 12 Patterns, 7-Step Workflow, Patterns & Mistakes, concept pages) get the sidebar (260px) + mobile header
- Visualizer pages are **standalone** — no sidebar, no mobile header. Full-width content area (maxW=1200px)
- `isSidebarPage` check in MainLayout: `["/", "/interview-workflow", "/12-patterns", "/patterns-mistakes"].includes(path) || path.includes("/concept")`
- GlobalControlBar (floating pill) appears on all pages with algorithm steps

## Sidebar (MainLayout.tsx)
- `CHAPTERS` array defines all chapters with `path` (visualizer link) and/or `problems[]`
- Each problem has `name` + `route` (internal visualizer) or `url` (external LeetCode)
- Active route highlighted with gold bar + gold bg tint
- Disabled chapters (no path, no problems) shown at 35% opacity with "Soon" badge
- Sub-items rendered as `<Link>` (internal) or `<a target="_blank">` (external LeetCode)

## Navigation
- Chapters organized per DSA Playbook (Ch 6-20)
- Add new routes in `src/App.tsx`, sidebar entries in `MainLayout.tsx`
- Use `/ch{N}/{slug}` pattern for chapter problem routes (e.g., `/ch6/two-sum`)

## Imports
- Use `@/` path alias (configured in vite.config.ts + tsconfig paths)

## Code Style
- Descriptive variable names
- Follow existing visualizer patterns
- Extract complex conditions into meaningful boolean variables
- JS code (not Python) for syntax highlighting examples
