import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";

const DATA = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

interface KStep {
  idx: number;
  current: number;
  best: number;
  window: [number, number];
  done: boolean;
  explanation: string;
  activeLines: number[];
}

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

function genSteps() {
  const steps: KStep[] = [];
  let current = DATA[0], best = DATA[0], start = 0, end = 0;
  steps.push({ idx: 0, current, best, window: [0, 0], done: false, explanation: `Start at index 0. current = best = ${DATA[0]}`, activeLines: [3, 4] });
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
    steps.push({ idx: i, current, best, window: [start, end], done: isLast, explanation: isLast ? `Done! Best subarray sum = ${best}` : restart ? `Start fresh at ${DATA[i]}. current=${current}, best=${best}` : `Extend with ${DATA[i]}. current=${current}, best=${best}`, activeLines: [5, 6, 7] });
  }
  return steps;
}

const STEPS = genSteps();

export function MaximumSubarrayVisualizer() {
  const { setTotalSteps, reset, setActiveLines, currentStep, isPlaying, playbackSpeed, nextStep } = useAlgorithmStore();
  const s = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);

  useEffect(() => { setTotalSteps(STEPS.length); return () => reset(); }, [setTotalSteps, reset]);
  useEffect(() => { setActiveLines(s.activeLines); }, [currentStep, setActiveLines, s.activeLines]);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (isPlaying && currentStep < STEPS.length - 1) t = setTimeout(nextStep, playbackSpeed);
    return () => clearTimeout(t);
  }, [isPlaying, currentStep, nextStep, playbackSpeed]);

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>Maximum Subarray (Kadane's)</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Ch 6: Arrays & Strings — Kadane's Algorithm</Text>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Find the contiguous subarray with the largest sum. Return the sum.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">All negative → largest single element</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Single element → that element</Text>
          </Box>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Try every start index, extend to the right. O(n²) — each subarray sum recomputed from scratch.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Kadane's: at each element, decide to extend current subarray or start fresh. Track best seen. O(n), one pass.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Nested loops recompute sums from scratch for each start position. Subarrays starting at index 0 and index 1 share almost all elements — repeated work.</Text>
        </Box>

        <StepLabel num={3} title="Example" mb={3} />
        <Box pb={4}>
          <Flex justify="center" align="center" gap={1} wrap="wrap">
            {DATA.map((val, i) => {
              const inWindow = i >= s.window[0] && i <= s.window[1];
              const isCurr = i === s.idx;
              return (
                <Box key={i} position="relative">
                  {isCurr && <Text position="absolute" top="-1.25rem" left="50%" transform="translateX(-50%)" fontSize="0.55rem" color="#c9952e" fontWeight={700}>i</Text>}
                  <motion.div animate={{ scale: isCurr ? 1.08 : 1 }}>
                    <Flex w="40px" h="44px" align="center" justify="center" borderRadius="md" border="2px solid"
                      borderColor={inWindow ? "#c9952e" : "#e0d8d0"}
                      bg={inWindow ? "#faf6f0" : "white"} fontSize="0.8rem" fontWeight={inWindow ? 700 : 400} color={inWindow ? "#c9952e" : "#8b8589"}>{val}</Flex>
                  </motion.div>
                </Box>
              );
            })}
          </Flex>
          <Flex justify="center" gap={6} mt={3} p={3} bg="#faf6f0" borderRadius="md">
            <Text fontSize="0.8rem" color="#6b6350">current: <Box as="span" fontWeight={700} color={s.current <= 0 ? '#c94a4a' : '#4a9e6b'}>{s.current}</Box></Text>
            <Text fontSize="0.8rem" color="#6b6350">best: <Box as="span" fontWeight={700} color="#c9952e">{s.best}</Box></Text>
            <Text fontSize="0.8rem" color="#6b6350">window: <Box as="span" fontWeight={600} color="#8b8589">[{s.window[0]}..{s.window[1]}]</Box></Text>
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Badge bg={s.done ? "green.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.done ? 'Done' : 'Scanning'}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>
      </Box>
      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">JS Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_JS} optimizedCode={BEST_JS} activeLines={s.activeLines} />
      </Box>
    </VStack>
  );
}
