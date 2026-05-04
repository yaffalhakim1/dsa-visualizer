import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { ChapterPrimer } from "./ChapterPrimer";

const DATA = [2, 7, 11, 15];
const TARGET = 9;

interface TSUStep {
  idx: number;
  map: Record<number, number>;
  found: boolean;
  explanation: string;
  activeLines: number[];
}

const BRUTE_JS = `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target)
        return [i, j];
    }
  }
  return [];
}`;

const BEST_JS = `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need))
      return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`;

function genSteps() {
  const steps: TSUStep[] = [];
  const map: Record<number, number> = {};

  steps.push({ idx: -1, map: {}, found: false, explanation: "Start with empty map. For each number, check if its complement exists.", activeLines: [3] });

  for (let i = 0; i < DATA.length; i++) {
    const need = TARGET - DATA[i];
    if (map[need] !== undefined) {
      steps.push({ idx: i, map: { ...map }, found: true, explanation: `nums[${i}]=${DATA[i]}, complement=${need} found at index ${map[need]}! Return [${map[need]}, ${i}]`, activeLines: [5, 6] });
      return steps;
    }
    map[DATA[i]] = i;
    steps.push({ idx: i, map: { ...map }, found: false, explanation: `nums[${i}]=${DATA[i]}, need=${need}. Not in map yet. Store {${DATA[i]}: ${i}}.`, activeLines: [4, 7] });
  }
  return steps;
}

const STEPS = genSteps();

export function TwoSumHashMap() {
  const { setTotalSteps, reset, setActiveLines, currentStep, isPlaying, playbackSpeed, nextStep } = useAlgorithmStore();
  const s = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);

  useEffect(() => { setTotalSteps(STEPS.length); return () => reset(); }, [setTotalSteps, reset]);
  useEffect(() => { setActiveLines(s.activeLines); }, [currentStep, setActiveLines, s.activeLines]);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (isPlaying && currentStep < STEPS.length - 1) t = setTimeout(nextStep, playbackSpeed);
    return () => clearTimeout(t);
  }, [isPlaying, currentStep, nextStep, playbackSpeed]);

  const mapEntries = Object.entries(s.map);

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>Two Sum (Unsorted)</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Ch 6: Arrays & Strings — Hash Map Pattern</Text>

        <ChapterPrimer topics={["array", "string"]} visualizing />

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Find two numbers that add up to target. Return their indices. Exactly one solution exists.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Exactly one answer. Cannot reuse same element.</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Negative numbers and zeros allowed.</Text>
          </Box>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Check every pair with nested loops. O(n²) — honest but slow.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Hash map stores each num as you go. For each num, check if complement (target - num) already seen. O(n), one pass.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Nested loops check every pair. For each i, j loops from i+1 to n — lots of redundant comparisons as i moves forward.</Text>
        </Box>

        <StepLabel num={3} title="Example" mb={3} />
        <Flex gap={6} align="flex-start" justify="center" wrap="wrap">
          <Box>
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Array</Text>
            <Flex gap={2}>
              {DATA.map((val, i) => (
                <Box key={i} position="relative">
                  {i === s.idx && !s.found && <Text position="absolute" top="-1.25rem" left="50%" transform="translateX(-50%)" fontSize="0.6rem" color="#c9952e" fontWeight={700}>i</Text>}
                  <motion.div animate={{ scale: i === s.idx ? 1.08 : 1 }}>
                    <Flex w="52px" h="52px" align="center" justify="center" borderRadius="md" border="2px solid" borderColor={s.found && i === s.idx ? "#4a9e6b" : i === s.idx ? "#c9952e" : "#e8e0d6"} bg={s.found && i === s.idx ? "#f0faf4" : "#ffffff"} fontSize="1rem" fontWeight={i === s.idx ? 700 : 500} color="#1a1a2e">{val}</Flex>
                  </motion.div>
                </Box>
              ))}
            </Flex>
          </Box>
          <Box>
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Hash Map</Text>
            <VStack gap={1} minW="120px" p={2} bg="#faf6f0" borderRadius="md" minH="100px">
              {mapEntries.length === 0 && <Text fontSize="0.75rem" color="#c0b8b0" fontStyle="italic">empty map</Text>}
              <AnimatePresence>
                {mapEntries.map(([k, v]) => (
                  <motion.div key={k} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                    <Flex gap={2} align="center" p={1.5} bg="white" borderRadius="sm" border="1px solid" borderColor="#e0d8d0">
                      <Text fontSize="0.75rem" fontWeight={600} color="#c9952e">{k}</Text>
                      <Text fontSize="0.7rem" color="#8b8589">→</Text>
                      <Text fontSize="0.75rem" fontWeight={600} color="#4a7db5">{v}</Text>
                    </Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
            </VStack>
          </Box>
        </Flex>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4}>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="#8b8589">Target: <Box as="span" fontWeight={700} color="#c9952e">{TARGET}</Box></Text>
            <Badge bg={s.found ? "green.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.found ? 'Found!' : 'Iterating'}</Badge>
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
