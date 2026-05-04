# DSA Playbook — Interactive Visualizer

Step-by-step animated visualizations for Data Structures & Algorithms. Companion to the DSA Playbook interview guide — each problem follows the book's 7-step interview workflow with animated box-based graphics.

**Live demo:** [yaffalhakim1.github.io/dsa-visualizer](https://yaffalhakim1.github.io/dsa-visualizer/)

## Features

- **13 animated visualizers** covering Arrays, Linked Lists, Stacks, Trees, Binary Search, Sliding Window, Backtracking, and more
- **7-step interview workflow** on every page: Restate → Clarify → Example → Baseline → Bottleneck → Refine → Implement
- **JavaScript code comparison** — brute force vs optimized side by side with active line highlighting
- **Playback controls** — play/pause, step forward/back, speed slider, progress bar
- **DS primers** — plain-English definitions with mini animations for each data structure
- **Interview workflow guide** — expanded 7-step guide with what-to-say phrases and 45-minute rhythm
- **Patterns & Mistakes reference** — 10 common patterns with templates, 6 beginner pitfalls with debugging checklist

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19, TypeScript 6 |
| Build | Vite 8 |
| UI | Chakra UI v3 (Editorial Textbook theme) |
| Animations | Framer Motion |
| State | Zustand |
| Routing | React Router v7 (HashRouter) |
| Code Display | react-syntax-highlighter (Prism oneLight) |
| Icons | lucide-react |
| Deploy | GitHub Pages (gh-pages) |

## Chapters & Visualizers

| Ch | Topic | Visualizers |
|----|-------|-------------|
| 6 | Arrays & Strings | Two Sum (HashMap), Best Time to Buy/Sell, Product Except Self, Maximum Subarray (Kadane's), Contains Duplicate |
| 7 | Linked Lists | Reverse Linked List |
| 8 | Stacks & Queues | Valid Parentheses, Daily Temperatures, Min Stack, Evaluate RPN, Queue Using Stacks |
| 10 | Trees | Maximum Depth of Binary Tree |
| 13 | Binary Search | Binary Search |
| 14 | Two Pointers & Sliding Window | Two Sum II (Sorted), Fixed-Size Sliding Window |
| 15 | Backtracking | Subsets |
| 20 | Math | Reverse Integer |

## Visualizer Format

Every visualizer follows the same layout:

1. **Primer** — What this data structure is (with animated visual)
2. **Restate** — Problem statement in plain English
3. **Clarify** — Edge cases and constraint questions
4. **Example** — Animated step-by-step visualization using Framer Motion
5. **Baseline** — Brute force approach with complexity
6. **Bottleneck** — What makes the baseline slow
7. **Refine** — Optimized approach with complexity
8. **Implement** — JavaScript code comparison (brute vs optimized)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check only (fast)
npx tsc --noEmit

# Full build
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── *Visualizer.tsx      # 13 animated visualizers
│   ├── ChapterPrimer.tsx     # DS definitions with animations
│   ├── PrimerVisual.tsx      # Mini Framer Motion animations
│   ├── StepLabel.tsx         # 7-step workflow badge
│   ├── SolutionCompare.tsx   # Side-by-side code comparison
│   ├── GlobalControlBar.tsx  # Playback controls + speed slider
│   ├── InterviewGuide.tsx    # 7-step workflow guide
│   ├── PatternsMistakes.tsx  # Ch 21 + Ch 22 reference
│   └── HomePage.tsx          # Landing page with chapter grid
├── layouts/
│   └── MainLayout.tsx        # Sidebar + content + control bar
├── store/
│   └── useAlgorithmStore.ts  # Zustand playback state
├── App.tsx                   # HashRouter route config
├── theme.ts                  # Chakra v3 system config
└── index.css                 # Global styles + Mafs overrides
```

## Based On

**DSA Playbook** — Interview preparation guide covering DSA patterns, coding strategies, behavioral questions, system design basics, and negotiation. Each visualizer follows the book's chapter structure and 7-step interview workflow.
