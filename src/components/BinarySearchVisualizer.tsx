import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";
import { InterviewWorkflow } from "./InterviewWorkflow";


const DATA = [-1, 0, 3, 5, 9, 12];
const TARGET = 9;

interface BSStep {
  L: number;
  R: number;
  mid: number;
  found: boolean;
  explanation: string;
  activeLines: number[];
}

const TRACE_STEPS = [
  { label: "Step 1:", text: "L=0, R=5. mid = 2 (value 3). 3 < 9 → search right half. New L=3, R=5." },
  { label: "Step 2:", text: "L=3, R=5. mid = 4 (value 9). 9 === 9 → found at index 4!", isAction: true },
  { label: "Analogy:", text: "Like looking up a word in a dictionary — open to the middle, see which half your word falls in, repeat. Each step cuts the search space in half." },
];

const TRACE_CODE = `function search(nums, target) {
    let L = 0, R = nums.length - 1;
    while (L <= R) {
        const mid = Math.floor((L + R) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) L = mid + 1;
        else R = mid - 1;
    }
    return -1;
}`;

const BRUTE_JS = `function linearSearch(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1;
}`;

const BEST_JS = `function binarySearch(nums, target) {
    let L = 0, R = nums.length - 1;
    while (L <= R) {
        const mid = Math.floor((L + R) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) L = mid + 1;
        else R = mid - 1;
    }
    return -1;
}`;

function generateSteps(): BSStep[] {
  const steps: BSStep[] = [];
  let L = 0, R = DATA.length - 1;
  steps.push({ L, R, mid: -1, found: false, explanation: "Start with the full array. L=0, R=5.", activeLines: [2] });
  while (L <= R) {
    const mid = Math.floor((L + R) / 2);
    if (DATA[mid] === TARGET) {
      steps.push({ L, R, mid, found: true, explanation: `Found ${TARGET} at index ${mid}!`, activeLines: [5, 6] });
      return steps;
    }
    if (DATA[mid] < TARGET) {
      steps.push({ L, R, mid, found: false, explanation: `${DATA[mid]} < ${TARGET}, search right half. L = ${mid + 1}`, activeLines: [7, 8] });
      L = mid + 1;
    } else {
      steps.push({ L, R, mid, found: false, explanation: `${DATA[mid]} > ${TARGET}, search left half. R = ${mid - 1}`, activeLines: [9, 10] });
      R = mid - 1;
    }
  }
  steps.push({ L: -1, R: -1, mid: -1, found: false, explanation: `${TARGET} not in array. Return -1.`, activeLines: [11] });
  return steps;
}

const STEPS = generateSteps();

export function BinarySearchVisualizer() {
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
        <Heading size="md" mb={1}>Binary Search</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 13: Sorting & Searching</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given a sorted array and a target, find the targets index. Return -1 if not found.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Sorted in ascending order? Duplicates?</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Target at start, end, or not present</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Empty array → -1</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Box pb={4}>
          <Flex justify="center" align="flex-end" gap={3} position="relative" minH="120px" pt={12}>
            {DATA.map((val, i) => {
              const inRange = s.L >= 0 && s.R >= 0 && i >= s.L && i <= s.R;
              const isMid = i === s.mid;
              const isFound = s.found && isMid;
              return (
                <Box key={i} position="relative">
                  {i === s.L && s.L >= 0 && (
                    <Text position="absolute" top="-1.75rem" left="50%" transform="translateX(-50%)" color="#4a7db5" fontWeight="700" fontSize="0.75rem">L</Text>
                  )}
                  {i === s.R && s.R >= 0 && (
                    <Text position="absolute" top="-1.75rem" left="50%" transform="translateX(-50%)" color="#c94a6b" fontWeight="700" fontSize="0.75rem">R</Text>
                  )}
                  {isMid && (
                    <Text position="absolute" bottom="-1.5rem" left="50%" transform="translateX(-50%)" color="#c9952e" fontWeight="700" fontSize="0.75rem">mid</Text>
                  )}
                  <motion.div
                    animate={{
                      scale: isMid ? 1.1 : 1,
                      borderColor: isFound ? "#4a9e6b" : isMid ? "#c9952e" : inRange ? "#4a7db5" : "#e0d8d0",
                      backgroundColor: isFound ? "#f0faf4" : isMid ? "#faf6f0" : inRange ? "#f0f6fd" : "#ffffff",
                      opacity: inRange || isFound ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: "10px", border: "2px solid #e0d8d0", fontSize: "1.125rem",
                      fontWeight: isMid ? 700 : 500, color: "#1a1a2e",
                    }}
                  >
                    {val}
                  </motion.div>
                </Box>
              );
            })}
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mb={8}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={4}>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">L: <Box as="span" fontWeight={600} color="#4a7db5">{s.L >= 0 ? s.L : '-'}</Box></Text>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">R: <Box as="span" fontWeight={600} color="#c94a6b">{s.R >= 0 ? s.R : '-'}</Box></Text>
              {s.mid >= 0 && <Text fontFamily="mono" fontSize="sm" color="#8b8589">mid: <Box as="span" fontWeight={600} color="#c9952e">{s.mid}</Box></Text>}
            </Flex>
            <Badge bg={s.found ? "green.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.found ? 'Found!' : 'Searching'}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={8}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Scan left to right. O(n). Simple, but ignores the sorted order entirely.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Check the middle. If target is smaller, discard the right half. If larger, discard the left half. Halves the search space each step — O(log n).</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Linear scan checks every element even though the sorted order tells us exactly which half to skip. Every unchecked element that cannot possibly contain the target is wasted work.</Text>
        </Box>


      </Box>

      <SweepTrace
        traceTitle="Sweep & Trace: Binary Search"
        steps={TRACE_STEPS}
        code={TRACE_CODE}
      />

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">JS Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_JS} optimizedCode={BEST_JS} activeLines={s.activeLines} />
      </Box>
    </VStack>
  );
}
