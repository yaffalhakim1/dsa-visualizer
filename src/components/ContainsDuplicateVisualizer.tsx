import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { InterviewWorkflow } from "./InterviewWorkflow";

const DATA = [1, 2, 3, 1];

interface CDStep {
  idx: number;
  set: number[];
  found: boolean;
  explanation: string;
  activeLines: number[];
}

const BRUTE_JS = `function containsDuplicate(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}`;

const BEST_JS = `function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`;

function genSteps() {
  const steps: CDStep[] = [];
  const seen = new Set<number>();

  steps.push({ idx: -1, set: [], found: false, explanation: "Build a set as we scan. If a number already exists in set, duplicate found.", activeLines: [3] });

  for (let i = 0; i < DATA.length; i++) {
    if (seen.has(DATA[i])) {
      steps.push({ idx: i, set: [...seen], found: true, explanation: `${DATA[i]} is already in the set! Duplicate found → true`, activeLines: [4, 5] });
      return steps;
    }
    seen.add(DATA[i]);
    const isLast = i === DATA.length - 1;
    steps.push({ idx: i, set: [...seen], found: false, explanation: isLast ? `Added ${DATA[i]}. No duplicates found → false` : `${DATA[i]} not in set. Add it. Set now has ${seen.size} item(s).`, activeLines: [6] });
  }
  return steps;
}

const STEPS = genSteps();

export function ContainsDuplicateVisualizer() {
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
        <Heading size="md" mb={1}>Contains Duplicate</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Ch 6: Arrays & Strings — Set Lookup</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Return true if any value appears at least twice in the array. Otherwise false.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Empty array → false</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Single element → false</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Multiple duplicates → true</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Flex gap={6} align="flex-start" justify="center" wrap="wrap">
          <Box>
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Array</Text>
            <Flex gap={2}>
              {DATA.map((val, i) => {
                const isCurr = i === s.idx;
                const isDup = s.found && i === s.idx;
                return (
                  <Box key={i} position="relative">
                    {isCurr && !s.found && <Text position="absolute" top="-1.25rem" left="50%" transform="translateX(-50%)" fontSize="0.6rem" color="#c9952e" fontWeight={700}>i</Text>}
                    <motion.div animate={{ scale: isCurr ? 1.08 : 1 }}>
                      <Flex w="48px" h="48px" align="center" justify="center" borderRadius="md"
                        border="2px solid" borderColor={isDup ? "#c94a4a" : isCurr ? "#c9952e" : "#e8e0d6"}
                        bg={isDup ? "#fdf6f5" : "#ffffff"} fontSize="1rem" fontWeight={isCurr ? 700 : 500} color="#1a1a2e">{val}</Flex>
                    </motion.div>
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box>
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Set</Text>
            <Flex gap={1} wrap="wrap" p={2} bg="#faf6f0" borderRadius="md" minW="100px" minH="60px">
              <AnimatePresence>
                {s.set.map((v) => (
                  <motion.div key={v} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                    <Flex w="36px" h="36px" align="center" justify="center" borderRadius="md" bg="#4a7db5" color="white" fontSize="0.85rem" fontWeight={600}>{v}</Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
              {s.set.length === 0 && <Text fontSize="0.75rem" color="#c0b8b0" fontStyle="italic">empty</Text>}
            </Flex>
          </Box>
        </Flex>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4}>
          <Flex justify="space-between" align="center">
            <Badge bg={s.found ? "red.500" : s.idx === DATA.length - 1 ? "green.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.found ? 'Duplicate!' : s.idx === DATA.length - 1 ? 'No Duplicates' : 'Scanning'}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Check every pair with nested loops. O(n²) — compares each element against every other.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Build a Set as you scan. If current number already in Set, duplicate found. O(n), one pass.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Nested loops compare every pair even though each comparison is the same check. As soon as you see a number twice, the answer is known — no need to compare further.</Text>
        </Box>


      </Box>
      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">JS Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_JS} optimizedCode={BEST_JS} activeLines={s.activeLines} />
      </Box>
    </VStack>
  );
}
