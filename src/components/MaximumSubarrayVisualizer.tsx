import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";
import { InterviewWorkflow } from "./InterviewWorkflow";

/**
 * CONSTANTS & CONFIGURATION
 */
const DATA = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

const BRUTE_JS = `function maxSubarray(nums) {
  let best = nums[0];
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      best = Math.max(best, sum);
    }
  }
  return best;
}`;

const BEST_JS = `function maxSubarray(nums) {
  let current = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}`;

const PROBLEM_CONFIG = {
  title: "Maximum Subarray (Kadane's)",
  subtitle: "Ch 6: Arrays & Strings — Kadane's Algorithm",
  restate: "Find the contiguous subarray with the largest sum. Return the sum.",
  baseline: "Try every start index, extend to the right. O(n²) — each subarray sum recomputed from scratch.",
  refine: "Kadane's: at each element, decide to extend current subarray or start fresh. Track best seen. O(n), one pass.",
  bottleneck: "Nested loops recompute sums from scratch for each start position. Subarrays starting at index 0 and index 1 share almost all elements — repeated work.",
  edgeCases: [
    "All negative → largest single element",
    "Single element → that element",
  ]
};

const UI_CONFIG = {
  window: {
    active: {
      borderColor: "#c9952e",
      bg: "#faf6f0",
      fontWeight: 700,
      color: "#c9952e",
    },
    inactive: {
      borderColor: "#e0d8d0",
      bg: "white",
      fontWeight: 400,
      color: "#8b8589",
    }
  },
  status: {
    done: { label: "Done", bg: "green.500" },
    scanning: { label: "Scanning", bg: "purple.500" }
  }
};

const TRACE_STEPS = [
  { label: "Index 0 (-2):", text: "runningSum = -2. maxSum = -2." },
  { label: "Index 1 (1):", text: "Is 1 > (-2 + 1)? Yes. Start fresh. runningSum = 1. maxSum = 1." },
  { label: "Index 2 (-3):", text: "Is -3 > (1 - 3)? No. Keep streak. runningSum = -2. maxSum = 1." },
  { label: "Index 3 (4):", text: "Is 4 > (-2 + 4)? Yes. Start fresh. runningSum = 4. maxSum = 4." },
  { label: "Index 4 (-1):", text: "Is -1 > (4 - 1)? No. Keep streak. runningSum = 3. maxSum = 4." },
  { label: "Index 5 (2):", text: "Is 2 > (3 + 2)? No. Keep streak. runningSum = 5. maxSum = 5." },
];

const TRACE_CODE = `function maxSubArray(nums) {
    let runningSum = nums[0];
    let maxSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        runningSum = Math.max(nums[i], runningSum + nums[i]);
        maxSum = Math.max(maxSum, runningSum);
    }
    return maxSum;
}`;

/**
 * TYPES
 */
interface KStep {
  idx: number;
  current: number;
  best: number;
  window: [number, number];
  done: boolean;
  explanation: string;
  activeLines: number[];
}

/**
 * STEP GENERATOR
 */
function genSteps(): KStep[] {
  const steps: KStep[] = [];
  let current = DATA[0],
    best = DATA[0],
    start = 0,
    end = 0;

  steps.push({
    idx: 0,
    current,
    best,
    window: [start, end],
    done: false,
    explanation: `Start at index 0. current = best = ${DATA[0]}`,
    activeLines: [3, 4],
  });

  for (let i = 1; i < DATA.length; i++) {
    const restart = DATA[i] > current + DATA[i];
    if (restart) {
      current = DATA[i];
      start = i;
    } else {
      current = current + DATA[i];
    }
    end = i;
    if (current > best) best = current;
    const isLast = i === DATA.length - 1;

    steps.push({
      idx: i,
      current,
      best,
      window: [start, end],
      done: isLast,
      explanation: isLast
        ? `Done! Best subarray sum = ${best}`
        : restart
          ? `Start fresh at ${DATA[i]}. current=${current}, best=${best}`
          : `Extend with ${DATA[i]}. current=${current}, best=${best}`,
      activeLines: [5, 6, 7],
    });
  }
  return steps;
}

const STEPS = genSteps();

/**
 * SUB-COMPONENTS
 */
const ProblemContext = ({ step }: { step: KStep }) => (
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
        {PROBLEM_CONFIG.edgeCases.map((text, i) => (
          <Text key={i} fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={i > 0 ? 1 : 0}>
            {text}
          </Text>
        ))}
      </Box>
    </Flex>

    <Box mt={8}>
      <StepLabel num={3} title="Example" mb={3} />
      <Box pb={4}>
        <Flex justify="center" align="center" gap={1} wrap="wrap">
          {DATA.map((val, i) => {
            const inWindow = i >= step.window[0] && i <= step.window[1];
            const isCurr = i === step.idx;
            const style = inWindow ? UI_CONFIG.window.active : UI_CONFIG.window.inactive;

            return (
              <Box key={i} position="relative">
                {isCurr && (
                  <Text position="absolute" top="-1.25rem" left="50%" transform="translateX(-50%)" fontSize="0.55rem" color="#c9952e" fontWeight={700}>
                    i
                  </Text>
                )}
                <motion.div animate={{ scale: isCurr ? 1.08 : 1 }}>
                  <Flex
                    w="40px"
                    h="44px"
                    align="center"
                    justify="center"
                    borderRadius="md"
                    border="2px solid"
                    {...style}
                  >
                    {val}
                  </Flex>
                </motion.div>
              </Box>
            );
          })}
        </Flex>

        <Flex justify="center" gap={6} mt={3} p={3} bg="#faf6f0" borderRadius="md">
          <Text fontSize="0.8rem" color="#6b6350">
            current:{" "}
            <Box as="span" fontWeight={700} color={step.current <= 0 ? "#c94a4a" : "#4a9e6b"}>
              {step.current}
            </Box>
          </Text>
          <Text fontSize="0.8rem" color="#6b6350">
            best: <Box as="span" fontWeight={700} color="#c9952e">{step.best}</Box>
          </Text>
          <Text fontSize="0.8rem" color="#6b6350">
            window: <Box as="span" fontWeight={600} color="#8b8589">[{step.window[0]}..{step.window[1]}]</Box>
          </Text>
        </Flex>
      </Box>

      <Flex mt={4} p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mb={8}>
        <Flex justify="space-between" align="center">
          <Badge
            bg={step.done ? UI_CONFIG.status.done.bg : UI_CONFIG.status.scanning.bg}
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="0.65rem"
          >
            {step.done ? UI_CONFIG.status.done.label : UI_CONFIG.status.scanning.label}
          </Badge>
        </Flex>
        <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>
          "{step.explanation}"
        </Text>
      </Flex>
    </Box>

    <Flex gap={4} mb={8}>
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
export function MaximumSubarrayVisualizer() {
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

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>
          {PROBLEM_CONFIG.title}
        </Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">
          {PROBLEM_CONFIG.subtitle}
        </Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <ProblemContext step={step} />
      </Box>

      <SweepTrace
        traceTitle="The Trace (Example: nums = [-2, 1, -3, 4, -1, 2])"
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
