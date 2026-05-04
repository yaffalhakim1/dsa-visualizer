# Design Spec: Prefix Sum Visualizer

**Topic:** Prefix Sums Pattern (Chapter 6)
**Date:** 2026-05-04

## 1. Overview
An interactive visualization for the construction of a Prefix Sum array. It demonstrates how cumulative totals are built in O(n) time, enabling subsequent O(1) range sum queries.

## 2. Architecture & State
- **Component:** `PrefixSumVisualizer.tsx`
- **Global State:** Uses `useAlgorithmStore` (`currentStep`, `isPlaying`, `activeLines`).
- **Data:**
  - `NUMS`: `[3, 1, 4, 1, 5, 9]`
  - `PREFIX`: `[0, 3, 4, 8, 9, 14, 23]`
- **Step Schema:**
  ```typescript
  {
    idx: number; // current nums index being processed
    numsIdx: number;
    prefixIdx: number;
    sumExpression: string;
    activeLines: number[];
    status: 'init' | 'calculating' | 'done';
  }
  ```

## 3. Visual Interface
- **Dual Array Layout (Mafs):**
  - **Top Row (y=0.5):** Original `NUMS` array.
  - **Bottom Row (y=-0.5):** `PREFIX` array (initially shown as empty slots or '?').
- **Logic Animation:**
  - When calculating `prefix[i]`, the visual highlights `prefix[i-1]` and `nums[i-1]`.
  - A connecting line or 'flow' animation shows them combining to fill the `prefix[i]` slot.
- **Status Dashboard:**
  - Formula display: `prefix[i] = prefix[i-1] + nums[i-1]` with real values plugged in.
- **Code Walkthrough:**
  - Shows the standard Python O(n) construction loop.

## 4. Playbook Integration
- **Key Insight:** "Prefix sum `P[i]` stores the sum of all elements *before* index `i` (exclusive). This often requires a leading zero for easier range sum calculations: `P[j+1] - P[i]`."

## 5. Success Criteria
- [ ] Smooth transition between steps via global controls.
- [ ] Accurate highlighting of the operands (prev sum + current element).
- [ ] Clear representation of the "leading zero" offset.
- [ ] Code highlighting syncs with visual construction.
