# Implementation Plan - DSA Playbook Integration

Interactive step-by-step visualizer for `DSA Playbook.pdf`. Each problem follows the book's 7-step interview workflow with animated box-based visualizations.

## Tech Stack
- **React 19** + **TypeScript 6** + **Vite 8**
- **Chakra UI v3** (Editorial Textbook theme: navy/cream/gold)
- **Framer Motion** (all animations — Mafs removed)
- **Zustand** (playback state via useAlgorithmStore)
- **react-syntax-highlighter** (JS code comparison)
- **HashRouter** (GitHub Pages deployment)
- **lucide-react** (icons)

## Completed Visualizers (13)

| Ch | Problem | Route | Animation |
|----|---------|-------|-----------|
| 6 | Two Sum (HashMap) | `/ch6/two-sum` | Array scan + hash map build, complement lookup |
| 6 | Best Time to Buy/Sell | `/ch6/best-time` | Price bars, min/profit counters |
| 6 | Product Except Self | `/ch6/product-except-self` | Two-pass prefix/suffix |
| 6 | Maximum Subarray (Kadane's) | `/ch6/maximum-subarray` | Window expand/reset, current vs best |
| 6 | Contains Duplicate | `/ch6/contains-duplicate` | Set population, duplicate detection |
| 7 | Reverse Linked List | `/linked-lists` | Pointer rewiring, prev/curr/nxt labels |
| 8 | Valid Parentheses | `/stacks-queues` | LIFO stack push/pop with AnimatePresence |
| 10 | Max Depth of Binary Tree | `/trees` | Recursive DFS, depth badge propagation |
| 13 | Binary Search | `/binary-search` | L/M/R pointers, range shrinking |
| 14 | Two Sum II (Sorted) | `/arrays-strings` | Converging L/R pointer boxes |
| 14 | Sliding Window (Fixed) | `/sliding-window` | Window slide, entering/leaving + delta nodes |
| 15 | Subsets (Backtracking) | `/backtracking` | Recursion path + choice tree |
| 20 | Reverse Integer | `/reverse-integer` | Digit pop/push with overflow check |

## Reference Pages (3)
- **Chapter 21**: Common Patterns & Templates (10 patterns with use-case + template)
- **Chapter 22**: Common Beginner Mistakes (6 pitfalls + debugging checklist)
- **Chapter 2**: 7-Step Interview Workflow (expandable guide with what-to-say phrases)

## Design
- **Editorial Textbook** theme: navy `#1a1a2e` sidebar, cream `#f5f0eb` content, gold `#c9952e` accents
- **Typography**: Playfair Display (headings), DM Sans (body), JetBrains Mono (code)
- **Mafs removed** — all visualizations use Framer Motion animated Chakra Box/Flex components
- **7-Step workflow labels** on every visualizer (Restate → Clarify → Example → Baseline → Bottleneck → Refine → Implement) via `<StepLabel>` component
- **JS code** in SolutionCompare panels (converted from Python)
- **Active route highlighting** with gold accent bar in sidebar
- **Scrollbar**: custom thin warm-gray webkit scrollbar

## Sidebar Structure
```
Chapters (label)
├── Home
├── 7-Step Workflow
├── Ch 6: Arrays & Strings
│   ├── Two Sum
│   ├── Best Time to Buy/Sell
│   ├── Product Except Self
│   ├── Maximum Subarray (Kadane's)
│   └── Contains Duplicate
├── Ch 7: Linked Lists (5 LC problems)
├── Ch 8: Stacks & Queues (5 LC problems)
├── Ch 10: Trees (5 LC problems)
├── Ch 13: Binary Search (5 LC problems)
├── Ch 14: Sliding Window (5 LC problems)
├── Ch 15: Backtracking (5 LC problems)
├── Ch 17: DP (grayed out)
└── Ch 20: Reverse Integer (5 LC problems)
└── Patterns & Mistakes
```
- First problem in each chapter links to visualizer; others link to LeetCode (external)

## Remaining Chapters (Not Done Yet)
- Ch 12: Graphs — Number of Islands, Clone Graph, Course Schedule, etc.
- Ch 17: Dynamic Programming — Climbing Stairs, House Robber, Coin Change, etc.

## Still Missing From Sidebar
- Ch 9: Hash Maps & Sets
- Ch 11: Heaps & Priority Queues
- Ch 16: Greedy Algorithms
- Ch 18: Tries & Advanced Structures
- Ch 19: Bit Manipulation

## Phase 3 Features (Not Started)
- Input customization (user-entered arrays/graphs)
- Complexity meter (real-time Big-O visualization)
- Prep planner (1-week/2-week/1-month plans)
- Interactive code editing in browser
- Responsive layout improvements

## Build
- `npm run dev` — development server
- `npx tsc --noEmit` — type check only (fast)
- `npm run build` — full type check + Vite build
- `npm run preview` — preview production build locally
