import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";

/**
 * CONSTANTS & CONFIGURATION
 */
const DATA = [1, 3, 5, 4, 2];

const BRUTE_JS = `function nextPermutation(nums) {
  const perms = [];
  function permute(arr, start) {
    if (start === arr.length) {
      perms.push([...arr]); return;
    }
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }
  permute([...nums].sort(), 0);
  for (let i = 0; i < perms.length; i++) {
    if (perms[i].join() === nums.join())
      return perms[(i + 1) % perms.length];
  }
}`;

const BEST_JS = `function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let left = i + 1, right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++; right--;
  }
  return nums;
}`;

const PROBLEM_CONFIG = {
  title: "Next Permutation",
  subtitle: "Ch 6: Arrays & Strings — Pivot and Swap",
  restate: "Rearrange nums into the next lexicographically greater permutation. If no greater arrangement exists, return the lowest possible order (sorted ascending).",
  baseline: "Generate all permutations, sort them, find the current one, return the next. O(n!) — impossible for n > 10.",
  refine: "Find pivot from right, swap with next larger element, reverse suffix. O(n), O(1) space.",
  bottleneck: "Generating n! permutations wastes enormous time. We only need the next one — a single swap and reverse achieves it in O(n) without generating anything else.",
  edgeCases: [
    "Already the largest permutation → return sorted ascending",
    "Single element → return same array",
  ]
};

const TRACE_STEPS = [
  { label: "Step 1: Find the Pivot.", text: "Sweep from right to left. 5 > 4 > 2 is increasing. The first drop is at 3 (Index 1). This is our pivot." },
  { label: "Step 2: Find the Successor.", text: "Sweep from right to left again to find the smallest number larger than our pivot (3). That number is 4." },
  { label: "Step 3: Swap.", text: "Swap the pivot (3) with the successor (4)." },
  { label: "", text: "Current Array: [1, 4, 5, 3, 2]", isAction: true },
  { label: "Step 4: Reverse.", text: "The section to the right of our old pivot index (the 5, 3, 2 part) is currently in decreasing order. Reverse it to get the smallest possible order." },
  { label: "", text: "Reversed: [1, 4, 2, 3, 5]", isAction: true },
  { label: "Final Answer:", text: "[1, 4, 2, 3, 5]", isAction: true },
];

const TRACE_CODE = `function nextPermutation(nums) {
    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        let j = nums.length - 1;
        while (nums[j] <= nums[i]) j--;
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++; right--;
    }
    return nums;
}`;

/**
 * TYPES
 */
type NPPhase = "initial" | "findPivot" | "findSuccessor" | "swap" | "reverse" | "done";

interface NPStep {
  phase: NPPhase;
  array: number[];
  pivotIdx: number;
  successorIdx: number;
  leftRev: number;
  rightRev: number;
  explanation: string;
  activeLines: number[];
}

/**
 * STEP GENERATOR
 */
function genSteps(): NPStep[] {
  const steps: NPStep[] = [];
  const nums = [...DATA];
  const n = nums.length;

  steps.push({
    phase: "initial",
    array: [...nums],
    pivotIdx: -1,
    successorIdx: -1,
    leftRev: -1,
    rightRev: -1,
    explanation: "Starting array: [1, 3, 5, 4, 2]. We need the next lexicographical permutation.",
    activeLines: [1, 2],
  });

  // Find pivot
  let i = n - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;

  steps.push({
    phase: "findPivot",
    array: [...nums],
    pivotIdx: i,
    successorIdx: -1,
    leftRev: -1,
    rightRev: -1,
    explanation: i >= 0 ? `Pivot found at index ${i} (value ${nums[i]}). First element from the right that is smaller than its right neighbor.` : "No pivot — array is the largest permutation.",
    activeLines: [2, 3],
  });

  // Find successor
  if (i >= 0) {
    let j = n - 1;
    while (nums[j] <= nums[i]) j--;

    steps.push({
      phase: "findSuccessor",
      array: [...nums],
      pivotIdx: i,
      successorIdx: j,
      leftRev: -1,
      rightRev: -1,
      explanation: `Successor found at index ${j} (value ${nums[j]}). Smallest element to the right that is larger than pivot (${nums[i]}).`,
      activeLines: [5, 6],
    });

    // Swap
    [nums[i], nums[j]] = [nums[j], nums[i]];

    steps.push({
      phase: "swap",
      array: [...nums],
      pivotIdx: i,
      successorIdx: -1,
      leftRev: -1,
      rightRev: -1,
      explanation: `Swapped pivot (${nums[j]}) with successor (${nums[i]}) at indices ${i} and original ${j}.`,
      activeLines: [7],
    });
  }

  // Reverse suffix
  let left = i + 1;
  let right = n - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }

  steps.push({
    phase: "reverse",
    array: [...nums],
    pivotIdx: i,
    successorIdx: -1,
    leftRev: i + 1,
    rightRev: n - 1,
    explanation: "Reversed the suffix (elements after the original pivot position) to get the smallest lexicographical order.",
    activeLines: [9, 10, 11, 12, 13],
  });

  steps.push({
    phase: "done",
    array: [...nums],
    pivotIdx: -1,
    successorIdx: -1,
    leftRev: -1,
    rightRev: -1,
    explanation: `Done! Next permutation is [${nums.join(", ")}].`,
    activeLines: [14],
  });

  return steps;
}

const STEPS = genSteps();

const PHASE_CONFIG: Record<NPPhase, { label: string; bg: string }> = {
  initial: { label: "Starting", bg: "gray.500" },
  findPivot: { label: "Finding Pivot", bg: "blue.500" },
  findSuccessor: { label: "Finding Successor", bg: "teal.500" },
  swap: { label: "Swapping", bg: "orange.500" },
  reverse: { label: "Reversing Suffix", bg: "purple.500" },
  done: { label: "Done", bg: "green.500" },
};

/**
 * SUB-COMPONENTS
 */
const ProblemContext = () => (
  <VStack align="stretch" gap={4}>
    <Box p={4} bg="#f5f0eb" borderRadius="lg">
      <StepLabel num={1} title="Restate" />
      <Text fontSize="0.9rem" color="#1a1a2e">
        {PROBLEM_CONFIG.restate}
      </Text>
    </Box>

    <Flex gap={4}>
      <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
        <StepLabel num={2} title="Clarify" />
        <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>
          Edge Cases
        </Text>
        {PROBLEM_CONFIG.edgeCases.map((text, j) => (
          <Text key={j} fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={j > 0 ? 1 : 0}>
            {text}
          </Text>
        ))}
      </Box>
    </Flex>

    <Flex gap={4}>
      <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
        <StepLabel num={4} title="Baseline" />
        <Text fontSize="0.85rem" color="#6b6350">
          {PROBLEM_CONFIG.baseline}
        </Text>
      </Box>
      <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
        <StepLabel num={6} title="Refine" />
        <Text fontSize="0.85rem" color="#6b6350">
          {PROBLEM_CONFIG.refine}
        </Text>
      </Box>
    </Flex>

    <Box p={3} bg="#fdf6f5" borderRadius="lg" borderLeft="3px solid" borderColor="#c94a4a">
      <StepLabel num={5} title="Bottleneck" mb={0.5} />
      <Text fontSize="0.8rem" color="#6b6350">
        {PROBLEM_CONFIG.bottleneck}
      </Text>
    </Box>
  </VStack>
);

/**
 * MAIN COMPONENT
 */
export function NextPermutationVisualizer() {
  const {
    setTotalSteps,
    reset,
    setActiveLines,
    currentStep,
    isPlaying,
    playbackSpeed,
    nextStep,
  } = useAlgorithmStore();

  const step = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);

  useEffect(() => {
    setTotalSteps(STEPS.length);
    return () => reset();
  }, [setTotalSteps, reset]);

  useEffect(() => {
    setActiveLines(step.activeLines);
  }, [currentStep, setActiveLines, step.activeLines]);

  useEffect(() => {
    if (!isPlaying || currentStep >= STEPS.length - 1) return;
    const t = setTimeout(nextStep, playbackSpeed);
    return () => clearTimeout(t);
  }, [isPlaying, currentStep, nextStep, playbackSpeed]);

  const phaseCfg = PHASE_CONFIG[step.phase];

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>
          {PROBLEM_CONFIG.title}
        </Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">
          {PROBLEM_CONFIG.subtitle}
        </Text>

        <ProblemContext />

        <Box mt={8}>
          <StepLabel num={3} title="Example" mb={3} />
          <Box pb={4}>
            <Flex justify="center" align="center" gap={2} wrap="wrap">
              {step.array.map((val, idx) => {
                const isPivot = idx === step.pivotIdx;
                const isSuccessor = idx === step.successorIdx;
                const inReverse = idx >= step.leftRev && idx <= step.rightRev;

                let borderColor = "#e8e0d6";
                let bg = "white";
                let label = "";

                if (isPivot) {
                  borderColor = "#4a7db5";
                  bg = "#f0f6fd";
                  label = "pivot";
                } else if (isSuccessor) {
                  borderColor = "#c94a6b";
                  bg = "#fdf6f5";
                  label = "succ";
                } else if (inReverse) {
                  borderColor = "#8b5cf6";
                  bg = "#f5f0fa";
                }

                return (
                  <Box key={idx} position="relative">
                    {label && (
                      <Text position="absolute" top="-1.1rem" left="50%" transform="translateX(-50%)" fontSize="0.55rem" color={borderColor} fontWeight={700}>
                        {label}
                      </Text>
                    )}
                    <motion.div animate={{ scale: isPivot || isSuccessor ? 1.08 : 1 }}>
                      <Flex
                        w="52px"
                        h="52px"
                        align="center"
                        justify="center"
                        borderRadius="md"
                        border="2px solid"
                        borderColor={borderColor}
                        bg={bg}
                        fontSize="1rem"
                        fontWeight={isPivot || isSuccessor ? 700 : 500}
                        color="#1a1a2e"
                      >
                        {val}
                      </Flex>
                    </motion.div>
                    <Text fontSize="0.6rem" color="#8b8589" textAlign="center" mt={1}>
                      {idx}
                    </Text>
                  </Box>
                );
              })}
            </Flex>
          </Box>

          <Flex mt={4} p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2}>
            <Flex justify="space-between" align="center">
              <Badge
                bg={phaseCfg.bg}
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="0.65rem"
              >
                {phaseCfg.label}
              </Badge>
            </Flex>
            <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>
              "{step.explanation}"
            </Text>
          </Flex>
        </Box>
      </Box>

      <SweepTrace
        traceTitle="The Trace (Example: nums = [1, 3, 5, 4, 2])"
        steps={TRACE_STEPS}
        code={TRACE_CODE}
      />

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">JS Code</Heading>
        <SolutionCompare
          bruteForceCode={BRUTE_JS}
          optimizedCode={BEST_JS}
          activeLines={step.activeLines}
        />
      </Box>
    </VStack>
  );
}
