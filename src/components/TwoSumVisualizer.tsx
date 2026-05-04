import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";

import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";

const DATA = [2, 7, 11, 15];
const TARGET = 9;

type StepStatus = 'searching' | 'too-small' | 'too-large' | 'found';

interface VisualStep {
  L: number;
  R: number;
  sum: number;
  status: StepStatus;
  explanation: string;
  activeLines: number[];
}

const STATUS_UI_MAP: Record<StepStatus, { color: string, label: string }> = {
  searching: { color: "gray.500", label: "Searching..." },
  'too-small': { color: "blue.500", label: "Sum too small" },
  'too-large': { color: "red.500", label: "Sum too large" },
  found: { color: "green.500", label: "Found!" },
};

const BRUTE_FORCE = `def twoSum(numbers, target):
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return [i + 1, j + 1]`;

const OPTIMIZED = `def twoSum(numbers, target):
    L, R = 0, len(numbers) - 1
    while L < R:
        curr = numbers[L] + numbers[R]
        if curr == target:
            return [L + 1, R + 1]
        if curr < target:
            L += 1
        else:
            R -= 1`;

const generateSteps = (): VisualStep[] => {
  const steps: VisualStep[] = [];
  let L = 0;
  let R = DATA.length - 1;
  while (L < R) {
    const sum = DATA[L] + DATA[R];
    const isFound = sum === TARGET;
    const status: StepStatus = isFound ? 'found' : sum < TARGET ? 'too-small' : 'too-large';
    steps.push({
      L, R, sum, status,
      activeLines: isFound ? [5, 6] : sum < TARGET ? [7, 8] : [9, 10],
      explanation: isFound
        ? `${DATA[L]} + ${DATA[R]} = ${TARGET}. Found!`
        : sum < TARGET
          ? `${sum} < ${TARGET}. Move L forward.`
          : `${sum} > ${TARGET}. Move R backward.`
    });
    if (isFound) break;
    if (sum < TARGET) L++;
    else R--;
  }
  return steps;
};

const STEPS = generateSteps();

export function TwoSumVisualizer() {
  const { setTotalSteps, reset, setActiveLines, currentStep, isPlaying, playbackSpeed, nextStep } = useAlgorithmStore();
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

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>Two Sum II — Input Array Is Sorted</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 14: Two Pointers & Sliding Window</Text>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given a 1-indexed sorted array, find two numbers such that they add up to target and return their indices.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">numbers = [2,7,11,15], target = 9 → [1,2]</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>numbers = [2,3,4], target = 6 → [1,3]</Text>
          </Box>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">A baseline checks every pair with nested loops. It works on any array but takes O(n²) — each element gets paired with every other element.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Because the array is sorted, use two pointers and move the side that makes the sum too small or too large — O(n), one pass.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">
            Nested loops check every possible pair — O(n²). Most comparisons are wasted because the sorted order tells us which direction to move. Once we know <Text as="span" fontFamily="mono" fontSize="0.8rem">nums[L] + nums[R] &lt; target</Text>, every pair with the same L and a smaller R is also too small.
          </Text>
        </Box>

        <Box pb={4}>
          <StepLabel num={3} title="Example" mb={3} />
          <Flex justify="center" align="flex-end" gap={3} position="relative" minH="100px" pt={8}>
            {DATA.map((val, i) => {
              const isL = i === currentVisualStep.L;
              const isR = i === currentVisualStep.R;
              const isActive = isL || isR;
              const isFound = currentVisualStep.status === 'found' && isActive;
              return (
                <Box key={i} position="relative">
                  {isL && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                      <Text position="absolute" top="-2rem" left="50%" transform="translateX(-50%)" color="#4a7db5" fontWeight="700" fontSize="0.875rem">L</Text>
                    </motion.div>
                  )}
                  {isR && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                      <Text position="absolute" top="-2rem" left="50%" transform="translateX(-50%)" color="#c94a6b" fontWeight="700" fontSize="0.875rem">R</Text>
                    </motion.div>
                  )}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.08 : 1,
                      borderColor: isFound ? "#4a9e6b" : isL ? "#4a7db5" : isR ? "#c94a6b" : "#e8e0d6",
                      backgroundColor: isFound ? "#f0faf4" : isActive ? "#faf6f0" : "#ffffff",
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: "10px", border: "2px solid #e8e0d6", fontSize: "1.25rem", fontWeight: isActive ? 700 : 500, color: "#1a1a2e",
                    }}
                  >
                    {val}
                  </motion.div>
                </Box>
              );
            })}
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Text fontFamily="mono" fontSize="xl" fontWeight="bold" color="#1a1a2e">
              <Box as="span" color="#4a7db5">{DATA[currentVisualStep.L]}</Box>
              {" + "}
              <Box as="span" color="#c94a6b">{DATA[currentVisualStep.R]}</Box>
              {" = "}
              <Box as="span" color="#c9952e">{currentVisualStep.sum}</Box>
              {"  "}
              <Box as="span" color="#8b8589" fontSize="sm" fontWeight={400}>target: {TARGET}</Box>
            </Text>
            <Box px={3} py={1} borderRadius="full" bg={uiConfig.color} color="white" fontSize="0.65rem" fontWeight="600">{uiConfig.label}</Box>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic">"{currentVisualStep.explanation}"</Text>
        </Flex>
      </Box>

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_FORCE} optimizedCode={OPTIMIZED} activeLines={currentVisualStep.activeLines} />
      </Box>
    </VStack>
  );
}
