# Task: Fix 7-Step Workflow Order and UX

## High Priority
1. Reorder 24 visualizers: move step 3 (Example) between step 2 (Clarify) and step 4 (Baseline)
2. Add `<InterviewWorkflow current={n}>` progress bar to every visualizer
3. Add onboarding callout explaining layout

## Medium Priority
4. Add SweepTrace to visualizers missing it for consistency

## Files to modify
- `src/components/*Visualizer.tsx` (24 files)
- `src/components/TwoSumHashMap.tsx`

## Verification
- `npm run build` passes
- `npm run lint` passes
- Visual inspection: each visualizer shows steps in order 1-7
- Progress bar matches current workflow section
