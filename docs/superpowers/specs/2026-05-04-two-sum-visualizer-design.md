# Design Spec: Two Sum (Sorted) Visualizer

**Topic:** Two Pointers Pattern (Chapter 6)
**Date:** 2026-05-04

## 1. Overview
An interactive visualization for the Two Sum problem on a sorted array using the Two Pointers pattern. This component demonstrates how two pointers converge from both ends of an array to find a target sum in O(n) time.

## 2. Architecture & State
- **Component:** `TwoSumVisualizer.tsx`
- **Global State:** Uses `useAlgorithmStore` to track `currentStep`, `isPlaying`, and `activeLines`.
- **Local Logic:**
  - `DATA`: A sorted array (e.g., `[1, 2, 4, 6, 8, 9, 14, 15]`).
  - `TARGET`: A target sum (e.g., `13`).
  - `STEPS`: An array of pre-calculated states for each iteration of the `while` loop.
    ```typescript
    {
      L: number,
      R: number,
      sum: number,
      status: string,
      activeLines: number[],
      found: boolean
    }
    ```

## 3. Visual Interface
- **Array Display (Mafs):**
  - Horizontal axis showing array indices.
  - Text labels for values above the axis.
  - Color-coding for elements at `L` (blue) and `R` (red).
- **Pointers (Mafs):**
  - Animated `L` and `R` labels sliding under the array.
- **Status Indicator (Chakra UI):**
  - A persistent box showing the current calculation: `DATA[L] + DATA[R] = SUM`.
  - Explanatory text: "Sum is too small, incrementing Left."
- **Code Walkthrough (SolutionCompare):**
  - Displays the Python implementation.
  - Highlights active lines as pointers move.

## 4. User Interaction
- **Playback:** Global Play/Pause controls drive the steps.
- **Manual Navigation:** User can step forward/backward to trace the logic.
- **Highlighting:** The "found" state will highlight the two contributing elements in green.

## 5. Success Criteria
- [ ] Correctly identifies the two elements summing to target.
- [ ] Pointers move smoothly with Framer Motion.
- [ ] Global controls correctly synchronize with visual state.
- [ ] Code highlighting accurately reflects the current step in the algorithm.
