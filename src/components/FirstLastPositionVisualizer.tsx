import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";
import { InterviewWorkflow } from "./InterviewWorkflow";

const DATA = [5, 7, 7, 8, 8, 10];
const TARGET = 8;

interface FLPStep {
  L: number;
  R: number;
  mid: number;
  phase: "first" | "last" | "done";
  first: number;
  last: number;
  explanation: string;
  activeLines: number[];
}

const TRACE_STEPS = [
  { label: "Find First (pass 1):", text: "L=0, R=5. mid=2 (value 7). 7 < 8 → search right: L=3. L=3, R=5. mid=4 (value 8). 8===8 but check left: R=3. L=3, R=3. mid=3 (value 8). Found first = 3." },
  { label: "Find Last (pass 2):", text: "L=3, R=5. mid=4 (value 8). 8===8 but check right: L=5. L=5, R=5. mid=5 (value 10). 10 > 8 → R=4. L > R. Last = 4." },
  { label: "Result:", text: "First occurrence at index 3, last at index 4. Return [3, 4].", isAction: true },
];

const TRACE_CODE = `function searchRange(nums, target) {
    function findFirst() {
        let L = 0, R = nums.length - 1;
        let ans = -1;
        while (L <= R) {
            const mid = Math.floor((L + R) / 2);
            if (nums[mid] >= target) {
                R = mid - 1;
                if (nums[mid] === target) ans = mid;
            } else L = mid + 1;
        }
        return ans;
    }
    function findLast() {
        let L = 0, R = nums.length - 1;
        let ans = -1;
        while (L <= R) {
            const mid = Math.floor((L + R) / 2);
            if (nums[mid] <= target) {
                L = mid + 1;
                if (nums[mid] === target) ans = mid;
            } else R = mid - 1;
        }
        return ans;
    }
    return [findFirst(), findLast()];
}`;

const BRUTE_JS = `function searchRange(nums, target) {
    let first = -1, last = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            if (first === -1) first = i;
            last = i;
        }
    }
    return [first, last];
}`;

const BEST_JS = `function searchRange(nums, target) {
    function findFirst() {
        let L = 0, R = nums.length - 1, ans = -1;
        while (L <= R) {
            const mid = Math.floor((L + R) / 2);
            if (nums[mid] >= target) {
                R = mid - 1;
                if (nums[mid] === target) ans = mid;
            } else L = mid + 1;
        }
        return ans;
    }
    function findLast() {
        let L = 0, R = nums.length - 1, ans = -1;
        while (L <= R) {
            const mid = Math.floor((L + R) / 2);
            if (nums[mid] <= target) {
                L = mid + 1;
                if (nums[mid] === target) ans = mid;
            } else R = mid - 1;
        }
        return ans;
    }
    return [findFirst(), findLast()];
}`;

function generateSteps(): FLPStep[] {
  const steps: FLPStep[] = [];
  let first = -1, last = -1;

  // Phase 1: find first occurrence
  let L = 0, R = DATA.length - 1;
  steps.push({ L, R, mid: -1, phase: "first", first, last, explanation: "Phase 1: Find first occurrence of 8. L=0, R=5.", activeLines: [3] });
  while (L <= R) {
    const mid = Math.floor((L + R) / 2);
    if (DATA[mid] >= TARGET) {
      if (DATA[mid] === TARGET) first = mid;
      steps.push({ L, R, mid, phase: "first", first, last, explanation: `nums[${mid}]=${DATA[mid]} >= ${TARGET}. Possible first at ${first}. Search left: R=${mid - 1}`, activeLines: [6, 7, 8] });
      R = mid - 1;
    } else {
      steps.push({ L, R, mid, phase: "first", first, last, explanation: `nums[${mid}]=${DATA[mid]} < ${TARGET}. Search right: L=${mid + 1}`, activeLines: [9] });
      L = mid + 1;
    }
  }
  steps.push({ L: -1, R: -1, mid: -1, phase: "first", first, last, explanation: `First occurrence found at index ${first}. Starting Phase 2...`, activeLines: [11] });

  // Phase 2: find last occurrence
  L = 0; R = DATA.length - 1;
  while (L <= R) {
    const mid = Math.floor((L + R) / 2);
    if (DATA[mid] <= TARGET) {
      if (DATA[mid] === TARGET) last = mid;
      steps.push({ L, R, mid, phase: "last", first, last, explanation: `nums[${mid}]=${DATA[mid]} <= ${TARGET}. Possible last at ${last}. Search right: L=${mid + 1}`, activeLines: [15, 16, 17] });
      L = mid + 1;
    } else {
      steps.push({ L, R, mid, phase: "last", first, last, explanation: `nums[${mid}]=${DATA[mid]} > ${TARGET}. Search left: R=${mid - 1}`, activeLines: [18] });
      R = mid - 1;
    }
  }
  steps.push({ L: -1, R: -1, mid: -1, phase: "done", first, last, explanation: `Done. First = ${first}, Last = ${last} → [${first}, ${last}]`, activeLines: [20] });

  return steps;
}

const STEPS = generateSteps();

export function FirstLastPositionVisualizer() {
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
        <Heading size="md" mb={1}>Find First and Last Position</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 13: Sorting & Searching — Boundary Binary Search</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given a sorted array with duplicates, find the starting and ending position of a target value. Return [-1, -1] if not found. O(log n) required.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Duplicates allowed. Target may appear once, many times, or not at all.</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Empty array → [-1, -1]. Single match → [i, i].</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Text fontSize="0.75rem" color="#8b8589" mb={3}>[5, 7, 7, 8, 8, 10] — target = 8 → expect [3, 4]</Text>

        <Box pb={4}>
          <Flex justify="center" align="flex-end" gap={3} position="relative" minH="120px" pt={12}>
            {DATA.map((val, i) => {
              const inRange = s.L >= 0 && s.R >= 0 && i >= s.L && i <= s.R;
              const isMid = i === s.mid;
              const isFirst = s.first >= 0 && i === s.first;
              const isLast = s.last >= 0 && i === s.last;
              const isResult = isFirst || isLast;
              return (
                <Box key={i} position="relative">
                  {i === s.L && s.L >= 0 && (
                    <Text position="absolute" top="-1.75rem" left="50%" transform="translateX(-50%)" color="#4a7db5" fontWeight="700" fontSize="0.75rem">L</Text>
                  )}
                  {i === s.R && s.R >= 0 && (
                    <Text position="absolute" top="-1.75rem" left="50%" transform="translateX(-50%)" color="#c94a6b" fontWeight="700" fontSize="0.75rem">R</Text>
                  )}
                  {isMid && !isResult && (
                    <Text position="absolute" bottom="-1.5rem" left="50%" transform="translateX(-50%)" color="#c9952e" fontWeight="700" fontSize="0.75rem">mid</Text>
                  )}
                  {isFirst && (
                    <Text position="absolute" bottom="-1.5rem" left="50%" transform="translateX(-50%)" color="#4a9e6b" fontWeight="700" fontSize="0.65rem">first</Text>
                  )}
                  {isLast && !isFirst && (
                    <Text position="absolute" bottom="-1.5rem" left="50%" transform="translateX(-50%)" color="#c94a6b" fontWeight="700" fontSize="0.65rem">last</Text>
                  )}
                  <motion.div
                    animate={{
                      scale: isMid ? 1.08 : 1,
                      borderColor: isResult ? "#4a9e6b" : isMid ? "#c9952e" : inRange ? "#4a7db5" : "#e0d8d0",
                      backgroundColor: isResult ? "#f0faf4" : isMid ? "#faf6f0" : inRange ? "#f0f6fd" : "#ffffff",
                      opacity: inRange || isResult ? 1 : 0.3,
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

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={4}>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">First: <Box as="span" fontWeight={600} color={s.first >= 0 ? "#4a9e6b" : "#8b8589"}>{s.first >= 0 ? s.first : '?'}</Box></Text>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">Last: <Box as="span" fontWeight={600} color={s.last >= 0 ? "#c94a6b" : "#8b8589"}>{s.last >= 0 ? s.last : '?'}</Box></Text>
            </Flex>
            <Badge bg={s.phase === "done" ? "green.500" : s.phase === "last" ? "orange.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.phase === "done" ? "Done" : s.phase === "last" ? "Phase 2: Last" : "Phase 1: First"}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Linear scan: track first and last occurrence of target in one pass. O(n).</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Two binary searches — one for the left boundary, one for the right boundary. O(log n) each.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Linear scan wastes the sorted order. Even though we find the target, we don't know if an earlier/later one exists without scanning adjacent elements.</Text>
        </Box>
      </Box>

      <SweepTrace
        traceTitle="Sweep & Trace: First & Last Position"
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
