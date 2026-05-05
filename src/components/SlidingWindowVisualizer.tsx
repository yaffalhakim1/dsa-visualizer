import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Flex, Text, Heading, VStack, Badge } from "@chakra-ui/react";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { InterviewWorkflow } from "./InterviewWorkflow";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";

const DATA = [1, 2, 3, 4, 5, 6, 7];
const K = 3;

type StepStatus = 'init' | 'sliding' | 'done';

interface WindowStep {
  window: [number, number];
  activeLines: number[];
  status: StepStatus;
  explanation: string;
  entering?: number;
  leaving?: number;
}

const STATUS_UI_MAP: Record<StepStatus, { color: string, label: string }> = {
  init: { color: "blue.500", label: "Initial Window" },
  sliding: { color: "purple.500", label: "Sliding Window" },
  done: { color: "green.500", label: "Completed" },
};

const BRUTE_FORCE = `def max_sum(arr, k):
    res = 0
    for i in range(len(arr) - k + 1):
        res = max(res, sum(arr[i : i+k]))
    return res`;

const OPTIMIZED = `def max_sum(arr, k):
    curr_sum = sum(arr[:k])
    res = curr_sum
    for i in range(k, len(arr)):
        curr_sum += arr[i] - arr[i-k]
        res = max(res, curr_sum)
    return res`;

const generateSteps = (): WindowStep[] => {
  const steps: WindowStep[] = [];
  steps.push({
    window: [0, K - 1],
    activeLines: [2, 3],
    status: 'init',
    explanation: `Initializing first window [0...${K-1}]. Initial Sum = ${DATA.slice(0, K).reduce((a,b)=>a+b,0)}.`
  });
  for (let i = K; i < DATA.length; i++) {
    const start = i - K + 1;
    const end = i;
    const leaving = DATA[i - K];
    const entering = DATA[i];
    steps.push({
      window: [start, end],
      activeLines: [5, 6],
      status: 'sliding',
      entering,
      leaving,
      explanation: `Slide right: Add entering ${entering}, subtract leaving ${leaving}.`
    });
  }
  steps[steps.length - 1].status = 'done';
  return steps;
};

const STEPS = generateSteps();

export function SlidingWindowVisualizer() {
  const {
    currentStep, setTotalSteps, isPlaying, nextStep, playbackSpeed,
    activeLines, setActiveLines, reset
  } = useAlgorithmStore();

  const currentVisualStep = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);
  const uiConfig = STATUS_UI_MAP[currentVisualStep.status];

  useEffect(() => {
    setTotalSteps(STEPS.length);
    return () => reset();
  }, [setTotalSteps, reset]);

  useEffect(() => {
    setActiveLines(currentVisualStep.activeLines);
  }, [currentStep, setActiveLines, currentVisualStep.activeLines]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying && currentStep < STEPS.length - 1) {
      timer = setTimeout(nextStep, playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, nextStep, playbackSpeed]);

  const [sum, setSum] = useState(0);
  const [deltaNodes, setDeltaNodes] = useState<{ id: string, val: number, type: 'add' | 'sub' }[]>([]);
  const prevBounds = useRef(currentVisualStep.window);

  useEffect(() => {
    const [start, end] = currentVisualStep.window;
    const [prevStart, prevEnd] = prevBounds.current;
    if (start === prevStart && end === prevEnd) {
      setSum(DATA.slice(start, end + 1).reduce((a, b) => a + b, 0));
      return;
    }
    let newSum = sum;
    const newDeltas: typeof deltaNodes = [];
    if (end > prevEnd) {
      newSum += DATA[end];
      newDeltas.push({ id: `add-${end}-${Date.now()}`, val: DATA[end], type: 'add' });
    }
    if (start > prevStart) {
      newSum -= DATA[prevStart];
      newDeltas.push({ id: `sub-${prevStart}-${Date.now()}`, val: DATA[prevStart], type: 'sub' });
    }
    setSum(newSum);
    setDeltaNodes(newDeltas);
    prevBounds.current = [start, end];
  }, [currentVisualStep]);

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>Fixed-Size Sliding Window</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 14: Two Pointers & Sliding Window</Text>

        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given an array, find the maximum sum of any k consecutive elements. Slide one position at a time and update efficiently.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">k larger than array? k = 1? k = n?</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Negative numbers allowed? Empty array?</Text>
          </Box>
        </Flex>

        <Box pb={4}>
          <StepLabel num={3} title="Example" mb={3} />
          <Flex justify="center" align="flex-end" gap={3} position="relative" minH="100px" pt={4}>
            {DATA.map((val, i) => {
              const inWindow = i >= currentVisualStep.window[0] && i <= currentVisualStep.window[1];
              const isLeftEdge = i === currentVisualStep.window[0];
              const isRightEdge = i === currentVisualStep.window[1];
              return (
                <Box key={i} position="relative">
                  {isLeftEdge && <Text position="absolute" top="-1.5rem" left="50%" transform="translateX(-50%)" color="#c9952e" fontWeight="700" fontSize="0.75rem">L</Text>}
                  {isRightEdge && <Text position="absolute" top="-1.5rem" left="50%" transform="translateX(-50%)" color="#c9952e" fontWeight="700" fontSize="0.75rem">R</Text>}
                  <motion.div
                    animate={{
                      scale: inWindow ? 1.08 : 0.92,
                      borderColor: inWindow ? "#c9952e" : "#e0d8d0",
                      backgroundColor: inWindow ? "#faf6f0" : "#ffffff",
                      opacity: inWindow ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: "10px", border: "2px solid #e0d8d0", fontSize: "1.25rem", fontWeight: 600, color: "#1a1a2e",
                    }}
                  >
                    {val}
                  </motion.div>
                </Box>
              );
            })}
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={3} mb={8}>
          <Flex justify="space-between" align="center">
            <Text fontFamily="mono" fontSize="xl" fontWeight="bold" color="#1a1a2e">
              Window: <Box as="span" color="#c9952e">[{currentVisualStep.window[0]}...{currentVisualStep.window[1]}]</Box>
            </Text>
            <Badge bg={uiConfig.color} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{uiConfig.label}</Badge>
          </Flex>
          <Flex align="center" gap={3} wrap="wrap">
            <AnimatePresence mode="popLayout">
              {deltaNodes.map((node) => (
                <motion.div key={node.id}
                  initial={{ opacity: 0, y: -20, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  <Text color={node.type === 'add' ? '#4a9e6b' : '#c94a4a'} fontWeight="bold" fontSize="lg">
                    {node.type === 'add' ? '+' : '-'}{node.val}
                  </Text>
                </motion.div>
              ))}
            </AnimatePresence>
            <Text fontFamily="mono" fontSize="2xl" fontWeight="bold" color="#c9952e" ml={2}>Current Sum: {sum}</Text>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>
            "{currentVisualStep.explanation}"
          </Text>
        </Flex>

        <Flex gap={4} mb={8}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">For each window position, recompute the sum from scratch by adding all k elements — O(n·k). Simple and correct, but slow.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Keep a running sum. When the window slides, subtract the leaving element and add the entering one — O(1) per step instead of O(k).</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">
            Consecutive windows share k-1 elements. Recomputation adds the same k-1 values each time. Only 2 elements actually change per step — adding the other k-1 over and over is pure waste.
          </Text>
        </Box>
      </Box>

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_FORCE} optimizedCode={OPTIMIZED} activeLines={activeLines} />
      </Box>
    </VStack>
  );
}
