# Implementation Plan - DSA Playbook Integration

Review and integrate knowledge from `DSA Playbook.pdf` into the `dsa-visualizer` project.

## 1. Playbook Summary

The `DSA Playbook.pdf` is a comprehensive interview guide that covers:

- **DSA Fundamentals**: Core patterns for Arrays, Strings, Linked Lists, Trees, Graphs, etc.
- **Visuals**: Framer Motion (Transitions) & Mafs (Math-heavy visualizations).
- **UI Framework**: Chakra UI v3 (for layout, navigation, and controls).
- **Python Templates**: Optimized implementations (e.g., Sliding Window, BFS/DFS, Binary Search).
- **Soft Skills**: Interview workflow, behavioral stories (STAR), and negotiation.

## 2. Project Alignment

The current `SlidingWindowVisualizer.tsx` already references **Chapter 14** from the playbook.

### Observation

- The code uses `DATA.slice(...).reduce(...)` to calculate the sum.
- **Playbook Principle (Page 19)**: "Instead of recomputing from scratch, you update the running state as the window moves."
- **Opportunity**: Refactor the visualization logic to demonstrate the incremental update (adding the entering element and subtracting the leaving element).

## 3. The Grand Plan (Visualizing the Playbook)

Our goal is to transform the static PDF into an interactive, step-by-step learning platform.

### Phase 1: Core Visualization Framework (Completed ✅)

- **Navigation**: Sidebar based on the Playbook's Table of Contents (Chapters 6-20).
- **Zustand Store**: Centralized state to control "Step-by-Step" execution.
- **Code Highlighting**: Integrated `react-syntax-highlighter` with active line support.
- **Global Controls**: Fixed control bar for playback and step-through.

### Phase 2: DSA Implementation (Sequential)

- **Arrays & Strings (Ch 6)**: Pointers, Prefix Sums, Kadane's.
- **Linked Lists (Ch 7)**: Rewiring pointers animation.
- **Stacks & Queues (Ch 8)**: Visual LIFO/FIFO mechanics.
- **Trees (Ch 10)** & **Graphs (Ch 12)**: Node-link diagrams with recursive DFS/BFS traversal.
- **Dynamic Programming (Ch 17)**: Visualizing the DP table/memoization grid.

### Phase 3: Interactive Features

- **Input Customization**: Allow users to enter their own arrays/graphs.
- **Complexity Meter**: Real-time Big-O growth visualization as input size changes.
- **Prep Planner**: Digital version of the "Quick prep plans" (1 week/2 weeks/1 month).

## 4. Immediate Setup (Completed ✅)

1. **Install Dependencies**: `@chakra-ui/react`, `@emotion/react`, `vite-tsconfig-paths`.
2. **Configure Paths**: Setup `tsconfig.json` paths and `vite.config.ts` plugin for clean `@/` imports.
3. **Initialize UI Snippets**: Run `npx @chakra-ui/cli snippet add` to get core v3 components.
4. **App Provider**: Wrap `main.tsx` with Chakra's `<Provider>`.

## 5. Next Immediate Steps

1. **Implement Arrays & Strings (Ch 6)**:
   - Visualizing two-pointer techniques.
   - Prefix sum visualization.
2. **Implement Linked Lists (Ch 7)**:
   - Animated pointer changes (Next/Prev).
   - Cycle detection (Floyd's) visualization.
3. **Template Enhancement**: Expand `SolutionCompare` to handle multiple steps/lines more gracefully.
