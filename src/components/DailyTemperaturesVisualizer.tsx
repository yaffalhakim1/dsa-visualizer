import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";
import { InterviewWorkflow } from "./InterviewWorkflow";

const TEMPS = [73, 74, 75, 71, 69, 72, 76, 73];

const TRACE_STEPS = [
  { label: "Day 0 (73°):", text: "Stack empty. Push index 0. Stack: [0], Answer: [—, —, —, —, —, —, —, —]" },
  { label: "Day 1 (74°):", text: "74° > 73° (stack top)! Pop index 0: answer[0] = 1. Push index 1. Stack: [1], Answer: [1, —, —, —, —, —, —, —]" },
  { label: "Day 2 (75°):", text: "75° > 74° (stack top)! Pop index 1: answer[1] = 1. Push index 2. Stack: [2], Answer: [1, 1, —, —, —, —, —, —]" },
  { label: "Day 3 (71°):", text: "71° < 75° (stack top). Push index 3. Stack: [2, 3], Answer: [1, 1, —, —, —, —, —, —]" },
  { label: "Day 4 (69°):", text: "69° < 71° (stack top). Push index 4. Stack: [2, 3, 4], Answer: [1, 1, —, —, —, —, —, —]" },
  { label: "Day 5 (72°):", text: "72° > 69°! Pop 4: ans[4] = 1. 72° > 71°! Pop 3: ans[3] = 2. 72° < 75°. Push 5. Stack: [2, 5], Answer: [1, 1, —, 2, 1, —, —, —]" },
  { label: "Day 6 (76°):", text: "76° > 72°! Pop 5: ans[5] = 1. 76° > 75°! Pop 2: ans[2] = 4. Push 6. Stack: [6], Answer: [1, 1, 4, 2, 1, 1, —, —]" },
  { label: "Day 7 (73°):", text: "73° < 76° (stack top). Push index 7. Stack: [6, 7]" },
  { label: "Done:", text: "Remaining indices 6, 7 have 0 warmer days. Final: [1, 1, 4, 2, 1, 1, 0, 0]", isAction: true },
];

const TRACE_CODE = `function dailyTemperatures(temps) {
    const ans = new Array(temps.length).fill(0);
    const stack = [];  // monotonic decreasing
    for (let i = 0; i < temps.length; i++) {
        while (stack.length &&
               temps[i] > temps[stack.at(-1)]) {
            const prev = stack.pop();
            ans[prev] = i - prev;
        }
        stack.push(i);
    }
    return ans;
}`;

interface DTStep {
  idx: number;
  stack: number[];
  answer: (number | null)[];
  action: string;
  explanation: string;
  activeLines: number[];
}

const BRUTE_JS = `function dailyTemperatures(temps) {
  const ans = new Array(temps.length).fill(0);
  for (let i = 0; i < temps.length; i++) {
    for (let j = i + 1; j < temps.length; j++) {
      if (temps[j] > temps[i]) {
        ans[i] = j - i;
        break;
      }
    }
  }
  return ans;
}`;

const BEST_JS = `function dailyTemperatures(temps) {
  const ans = new Array(temps.length).fill(0);
  const stack = [];
  for (let i = 0; i < temps.length; i++) {
    while (stack.length &&
           temps[i] > temps[stack.at(-1)]) {
      const prev = stack.pop();
      ans[prev] = i - prev;
    }
    stack.push(i);
  }
  return ans;
}`;

function generateSteps(): DTStep[] {
  const steps: DTStep[] = [];
  const stack: number[] = [];
  const answer: (number | null)[] = new Array(TEMPS.length).fill(null);

  steps.push({
    idx: -1, stack: [], answer: [...answer],
    action: "init",
    explanation: "Start with an empty monotonic decreasing stack. For each day, pop indices of cooler days that finally have a warmer answer.",
    activeLines: [3],
  });

  for (let i = 0; i < TEMPS.length; i++) {
    const popped: number[] = [];
    while (stack.length > 0 && TEMPS[i] > TEMPS[stack[stack.length - 1]]) {
      const prev = stack.pop()!;
      answer[prev] = i - prev;
      popped.push(prev);
    }

    stack.push(i);
    const action = popped.length > 0 ? "pop" : "push";

    steps.push({
      idx: i, stack: [...stack], answer: [...answer],
      action,
      explanation: popped.length > 0
        ? `Day ${i} (${TEMPS[i]}°). Warmer! Pop ${popped.map(p => `day ${p} (${TEMPS[p]}°) → ${answer[p]} days`).join(", ")}. Push day ${i}.`
        : `Day ${i} (${TEMPS[i]}°). Push index ${i} onto stack.`,
      activeLines: popped.length > 0 ? [5, 6, 7, 8] : [4, 10],
    });
  }

  steps.push({
    idx: TEMPS.length, stack: [...stack], answer: [...answer],
    action: "done",
    explanation: "All days processed. Remaining days in stack have 0 warmer days ahead.",
    activeLines: [11],
  });

  return steps;
}

const STEPS = generateSteps();

export function DailyTemperaturesVisualizer() {
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
        <Heading size="md" mb={1}>Daily Temperatures</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 8: Stacks & Queues — Monotonic Stack</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given a list of daily temperatures, return an array where answer[i] is the number of days to wait for a warmer temperature.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">If no warmer day, answer = 0. Single element → [0].</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Flex gap={6} align="flex-start" justify="center" wrap="wrap">
          <VStack align="center">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Temps</Text>
            <Flex gap={2}>
              {TEMPS.map((t, i) => {
                const isCurrent = i === s.idx;
                const isPast = i < s.idx;
                return (
                  <Box key={i} position="relative">
                    {isCurrent && <Text position="absolute" top="-1.25rem" left="50%" transform="translateX(-50%)" fontSize="0.6rem" color="#c9952e" fontWeight={700}>i</Text>}
                    <motion.div animate={{ scale: isCurrent ? 1.08 : 1 }}>
                      <Flex w="52px" h="52px" align="center" justify="center" borderRadius="lg" border="2px solid" borderColor={isCurrent ? "#c9952e" : isPast ? "#e0d8d0" : "#e8e0d6"} bg={isCurrent ? "#faf6f0" : isPast ? "#f5f0eb" : "white"} fontSize="1rem" fontWeight={isCurrent ? 700 : 500} color="#1a1a2e" opacity={isPast && !isCurrent ? 0.5 : 1}>{t}°</Flex>
                    </motion.div>
                  </Box>
                );
              })}
            </Flex>
          </VStack>

          <VStack align="center" minW="180px">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Answer</Text>
            <Flex gap={2}>
              {s.answer.map((v, i) => (
                <Flex key={i} w="52px" h="40px" align="center" justify="center" borderRadius="md" bg={v !== null ? "#f0faf4" : "#f5f0eb"} border="1px solid" borderColor="#e0d8d0" fontSize="0.85rem" fontWeight={600} color={v !== null ? "#2a6b4a" : "#c0b8b0"}>{v !== null ? v : "—"}</Flex>
              ))}
            </Flex>
          </VStack>
        </Flex>

        <VStack align="center" mt={4}>
          <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Stack (indices)</Text>
          <Flex gap={2} minH="48px" align="center">
            <AnimatePresence>
              {s.stack.map((idx) => (
                <motion.div key={`s-${idx}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                  <Flex w="52px" h="40px" align="center" justify="center" borderRadius="md" bg="#1a1a2e" color="white" fontSize="0.8rem" fontWeight={600}>{idx}</Flex>
                </motion.div>
              ))}
            </AnimatePresence>
            {s.stack.length === 0 && <Text fontSize="0.7rem" color="#c0b8b0" fontStyle="italic">empty stack</Text>}
          </Flex>
        </VStack>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4}>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="#8b8589">Current day: <Box as="span" fontWeight={700} color="#1a1a2e">{s.idx >= 0 && s.idx < TEMPS.length ? `${s.idx} (${TEMPS[s.idx]}°)` : "—"}</Box></Text>
            <Badge bg={s.action === "pop" ? "green.500" : s.action === "done" ? "green.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.action === "pop" ? "Resolving" : s.action === "done" ? "Done" : "Scanning"}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">For each day, scan all future days until a warmer temp is found. O(n²) worst case.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Monotonic decreasing stack of indices. When a warmer day arrives, pop all cooler days and record answer. O(n) one pass.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Nested loops re-scan future days for every index. In a decreasing sequence, each day scans all remaining days — O(n²).</Text>
        </Box>
      </Box>

      <SweepTrace
        traceTitle="Sweep & Trace: Daily Temperatures (Monotonic Stack)"
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
