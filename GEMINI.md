# DSA Visualizer

A React application for visualizing data structures and algorithms, built with TypeScript and Vite.

## Project Overview

- **Core Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **State Management:** Zustand
- **Animation & Visuals:** 
  - Framer Motion (Transitions and animations)
  - Mafs (Mathematical visualizations)
  - Lucide React (Icons)
- **Styling:** Vanilla CSS (Global variables in `src/index.css`)

## Architecture

- `src/main.tsx`: Application entry point.
- `src/App.tsx`: Root component, currently contains template landing page.
- `src/assets/`: Static assets including logos and icons.
- `index.html`: Entry HTML file.

## Key Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles TypeScript and builds the production bundle.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run preview`: Previews the production build locally.

## Development Conventions

- **State:** Use Zustand for global state management.
- **Visuals:** Leverage `mafs` for math-heavy visualizations and `framer-motion` for UI animations.
- **Icons:** Use `lucide-react` for consistent iconography.
- **Styling:** Follow the existing CSS variable pattern in `index.css` for theme consistency (light/dark mode support).
- **Types:** Strict TypeScript is enforced via `tsconfig.json`.

## Goals
- [ ] Implement data structure visualizations (e.g., Arrays, Linked Lists, Trees, Graphs).
- [ ] Implement algorithm walkthroughs (e.g., Sorting, Pathfinding).
- [ ] Create interactive controls for visualization speed and step-through.
