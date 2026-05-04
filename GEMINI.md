# Project Overview
**dsa-visualizer** is a React-based single-page application (SPA) designed to provide interactive, step-by-step visualizations for Data Structures and Algorithms (DSA). It is specifically built to transform the concepts in "DSA Playbook.pdf" into a digital, interactive learning platform.

## Tech Stack
- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **UI Library**: Chakra UI v3 (Custom system in `src/theme.ts`)
- **State Management**: Zustand (`src/store/useAlgorithmStore.ts`)
- **Routing**: React Router DOM v7
- **Visuals**: Framer Motion (animations), Mafs (mathematical drawings)
- **Code Display**: `react-syntax-highlighter`

# Building and Running
### Development
- `npm run dev`: Starts the Vite development server.
- `npm run chakra:typegen`: Generates types for Chakra UI system (run after theme changes).

### Production
- `npm run build`: Type-checks and builds the application for production.
- `npm run preview`: Locally previews the production build.

### Maintenance
- `npm run lint`: Runs ESLint for code quality checks.

# Project Structure
- `src/components/`: Individual visualizers (e.g., `TwoSumVisualizer.tsx`) and shared UI components.
- `src/layouts/`: Structural components like `MainLayout.tsx` which defines the navigation sidebar.
- `src/store/`: Zustand stores for global state (e.g., `useAlgorithmStore.ts`).
- `src/theme.ts`: Chakra UI v3 system configuration and design tokens.
- `src/App.tsx`: Central routing configuration mapping chapters to visualizer components.

# Development Conventions
### 1. Algorithm Visualization Pattern
Most visualizers should sync with the **Global Algorithm Store**.
- **Playback Control**: Use `useAlgorithmStore` to manage `isPlaying`, `currentStep`, and `totalSteps`.
- **Active Lines**: Sync the currently executing code line with `activeLines` in the store to highlight it in the UI.
- **Local State**: Complex visualizations may maintain local animation state but should react to `currentStep` changes from the store.

### 2. Styling and Theme
- **Chakra UI v3**: Always use the Chakra system for styling. Avoid direct CSS where possible.
- **Design Tokens**:
  - **Gold**: `#c9952e` (Primary brand color)
  - **Dark Navy**: `#1a1a2e` (Sidebar background)
  - **Cream/Beige**: `#f5f0eb` (Main content background)
- **Fonts**:
  - `Playfair Display`: Used for headings and branding.
  - `DM Sans`: Standard body font.
  - `JetBrains Mono`: Used for code snippets.

### 3. Navigation
- Chapters are organized according to the DSA Playbook (e.g., Ch 6: Arrays & Strings).
- Update `src/layouts/MainLayout.tsx` when adding new chapters or problems to the sidebar.

### 4. Imports
- Use the `@/` path alias for clean imports from the `src` directory (configured in `vite.config.ts` and `tsconfig.json`).
