import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { InterviewWorkflow } from "./InterviewWorkflow";

const DATA = [1, 2, 3];

interface SubsetStep {
  path: number[];
  idx: number;
  done: boolean;
  explanation: string;
  activeLines: number[];
}

const BRUTE_FORCE = `def subsets(nums):
    result = []
    for mask in range(1 << len(nums)):
        subset = []
        for i in range(len(nums)):
            if mask & (1 << i):
                subset.append(nums[i])
        result.append(subset)
    return result`;

const OPTIMIZED = `def subsets(nums):
    result = []
    path = []
    def backtrack(idx):
        if idx == len(nums):
            result.append(path[:])
            return
        backtrack(idx + 1)
        path.append(nums[idx])
        backtrack(idx + 1)
        path.pop()
    backtrack(0)
    return result`;

function generateSteps(): SubsetStep[] {
  const steps: SubsetStep[] = [];
  steps.push({ path: [], idx: 0, done: false, explanation: "Start with empty path at index 0. Two choices: skip nums[0] or take nums[0].", activeLines: [4, 5] });
  steps.push({ path: [], idx: 1, done: false, explanation: "Skip 1. Move to index 1. Two choices: skip or take nums[1].", activeLines: [6, 7] });
  steps.push({ path: [], idx: 2, done: false, explanation: "Skip 2. Move to index 2. Two choices: skip or take nums[2].", activeLines: [6, 7] });
  steps.push({ path: [], idx: 3, done: true, explanation: "Reached end. Add [] to result.", activeLines: [5, 6] });

  steps.push({ path: [3], idx: 3, done: true, explanation: "Backtrack. Take 3. Add [3] to result.", activeLines: [7, 8, 9] });

  steps.push({ path: [], idx: 2, done: false, explanation: "Back to index 2. Now take nums[2] = 3.", activeLines: [] });
  steps.push({ path: [3], idx: 3, done: true, explanation: "Take 3. Add [3] to result.", activeLines: [5, 6] });

  steps.push({ path: [], idx: 1, done: false, explanation: "Back to index 1. Take nums[1] = 2.", activeLines: [7, 8] });
  steps.push({ path: [2], idx: 2, done: false, explanation: "At index 2. Skip nums[2] = 3.", activeLines: [6, 7] });
  steps.push({ path: [2], idx: 3, done: true, explanation: "Add [2] to result.", activeLines: [5, 6] });
  steps.push({ path: [2, 3], idx: 3, done: true, explanation: "Take 3. Add [2, 3] to result.", activeLines: [7, 8, 9] });

  steps.push({ path: [], idx: 0, done: false, explanation: "Back to index 0. Take nums[0] = 1.", activeLines: [7, 8] });
  steps.push({ path: [1], idx: 1, done: false, explanation: "At index 1. Skip nums[1] = 2.", activeLines: [6, 7] });
  steps.push({ path: [1], idx: 2, done: false, explanation: "Skip nums[2] = 3. Add [1].", activeLines: [6, 7] });
  steps.push({ path: [1], idx: 3, done: true, explanation: "Add [1] to result.", activeLines: [5, 6] });
  steps.push({ path: [1, 3], idx: 3, done: true, explanation: "Take 3. Add [1, 3].", activeLines: [7, 8, 9] });

  steps.push({ path: [1], idx: 1, done: false, explanation: "Back. Take nums[1] = 2.", activeLines: [7, 8] });
  steps.push({ path: [1, 2], idx: 2, done: false, explanation: "Skip nums[2] = 3.", activeLines: [6, 7] });
  steps.push({ path: [1, 2], idx: 3, done: true, explanation: "Add [1, 2].", activeLines: [5, 6] });
  steps.push({ path: [1, 2, 3], idx: 3, done: true, explanation: "Take 3. Add [1, 2, 3]. All subsets generated!", activeLines: [7, 8, 9] });

  return steps;
}

const STEPS = generateSteps();

export function BacktrackingVisualizer() {
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
        <Heading size="md" mb={1}>Subsets (Backtracking)</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 15: Recursion & Backtracking</Text>

        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given an array of unique numbers, return all possible subsets (the power set).</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Empty array → [[]]</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Single element → [[], [1]]</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Duplicates need extra handling</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Box pb={4}>
          <Flex direction="column" align="center" gap={4}>
            <Flex align="center" gap={2}>
              <Text fontSize="0.7rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600">Index:</Text>
              {DATA.map((_, i) => (
                <Box key={i} w="48px" textAlign="center">
                  <Text fontSize="0.75rem" color={i === s.idx && !s.done ? "#c9952e" : "#8b8589"} fontWeight={i === s.idx ? 700 : 400}>{i}</Text>
                </Box>
              ))}
            </Flex>
            <Flex align="center" gap={2}>
              <Text fontSize="0.7rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600">Array:</Text>
              {DATA.map((val, i) => (
                <motion.div key={i} animate={{ scale: i === s.idx && !s.done ? 1.1 : 1 }}>
                  <Flex w="48px" h="48px" align="center" justify="center" borderRadius="md"
                    bg={i === s.idx && !s.done ? "#faf6f0" : "white"}
                    border="2px solid" borderColor={i === s.idx && !s.done ? "#c9952e" : "#e8e0d6"}
                    fontSize="1rem" fontWeight={i === s.idx ? 700 : 500} color="#1a1a2e"
                  >{val}</Flex>
                </motion.div>
              ))}
            </Flex>
            <Box mt={2}>
              <Text fontSize="0.7rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Current Path:</Text>
              <Flex align="center" gap={1} minH="36px" wrap="wrap" p={2} bg="#faf6f0" borderRadius="md">
                <AnimatePresence>
                  {s.path.map((val, i) => (
                    <motion.div key={`${val}-${i}`} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                      <Flex w="32px" h="32px" align="center" justify="center" borderRadius="md" bg="#4a7db5" color="white" fontSize="0.8rem" fontWeight={600}>{val}</Flex>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {s.path.length === 0 && <Text fontSize="0.75rem" color="#c0b8b0" fontStyle="italic">empty path</Text>}
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Badge bg={s.done ? "green.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.done ? 'Subset Saved' : 'Exploring'}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Bitmask approach: iterate 0 to 2^n - 1, decode each mask into a subset.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Backtracking: choose/take current element, recurse to next index, undo the choice. Cleaner pattern that generalizes to harder problems.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Bitmask approach works for subsets but does not extend to permutations, combinations, or constraint-based problems. Backtracking is the reusable pattern.</Text>
        </Box>
      </Box>

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_FORCE} optimizedCode={OPTIMIZED} activeLines={s.activeLines} />
      </Box>
    </VStack>
  );
}
