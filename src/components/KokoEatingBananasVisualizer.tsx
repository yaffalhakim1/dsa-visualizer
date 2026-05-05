import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";
import { InterviewWorkflow } from "./InterviewWorkflow";

const PILES = [3, 6, 7, 11];
const H = 8;

interface KokoStep {
  speed: number;
  hours: number;
  L: number;
  R: number;
  mid: number;
  phase: "init" | "test" | "adjust" | "done";
  explanation: string;
  activeLines: number[];
}

const TRACE_STEPS = [
  { label: "Setup:", text: "Piles = [3, 6, 7, 11], H = 8 hours. Search space: speed 1 to max(piles)=11." },
  { label: "Test speed=6:", text: "Pile 3 → 1h, 6 → 1h, 7 → 2h, 11 → 2h. Total = 6h <= 8h → can finish! Try slower: R=5." },
  { label: "Test speed=3:", text: "Pile 3 → 1h, 6 → 2h, 7 → 3h, 11 → 4h. Total = 10h > 8h → too slow! Need faster: L=4." },
  { label: "Test speed=4:", text: "Pile 3 → 1h, 6 → 2h, 7 → 2h, 11 → 3h. Total = 8h <= 8h → can finish! L=4, R=4.", isAction: true },
  { label: "Result:", text: "Minimum speed = 4. Koko needs to eat at least 4 bananas/hour to finish in 8 hours.", isAction: true },
];

const TRACE_CODE = `function minEatingSpeed(piles, h) {
    let L = 1, R = Math.max(...piles);
    while (L < R) {
        const mid = Math.floor((L + R) / 2);
        let hours = 0;
        for (const p of piles)
            hours += Math.ceil(p / mid);
        if (hours <= h) R = mid;
        else L = mid + 1;
    }
    return L;
}`;

const BRUTE_JS = `function minEatingSpeed(piles, h) {
    for (let speed = 1; speed <= Math.max(...piles); speed++) {
        let hours = 0;
        for (const p of piles)
            hours += Math.ceil(p / speed);
        if (hours <= h) return speed;
    }
    return Math.max(...piles);
}`;

const BEST_JS = `function minEatingSpeed(piles, h) {
    let L = 1, R = Math.max(...piles);
    while (L < R) {
        const mid = Math.floor((L + R) / 2);
        let hours = 0;
        for (const p of piles)
            hours += Math.ceil(p / mid);
        if (hours <= h) R = mid;
        else L = mid + 1;
    }
    return L;
}`;

function hoursNeeded(speed: number): number {
  return PILES.reduce((sum, p) => sum + Math.ceil(p / speed), 0);
}

function generateSteps(): KokoStep[] {
  const steps: KokoStep[] = [];
  const maxP = Math.max(...PILES);
  let L = 1, R = maxP;

  steps.push({ speed: -1, hours: -1, L, R, mid: -1, phase: "init", explanation: `Binary search on answer space [1, ${maxP}]. Koko eats k bananas/hour. Can she finish in ${H}h?`, activeLines: [2] });

  while (L < R) {
    const mid = Math.floor((L + R) / 2);
    const hrs = hoursNeeded(mid);
    if (hrs <= H) {
      steps.push({ speed: mid, hours: hrs, L, R: mid, mid, phase: "test", explanation: `Speed ${mid}: ${hrs}h <= ${H}h. Koko can finish! Try slower speed. R = ${mid}`, activeLines: [8] });
      R = mid;
    } else {
      steps.push({ speed: mid, hours: hrs, L: mid + 1, R, mid, phase: "adjust", explanation: `Speed ${mid}: ${hrs}h > ${H}h. Too slow! Need faster. L = ${mid + 1}`, activeLines: [9] });
      L = mid + 1;
    }
  }

  steps.push({ speed: L, hours: hoursNeeded(L), L, R, mid: L, phase: "done", explanation: `Minimum speed = ${L}. At ${L} bananas/hour, Koko finishes in exactly ${hoursNeeded(L)}h <= ${H}h.`, activeLines: [10] });
  return steps;
}

const STEPS = generateSteps();

export function KokoEatingBananasVisualizer() {
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
        <Heading size="md" mb={1}>Koko Eating Bananas</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 13: Sorting & Searching — Binary Search on Answer</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Koko eats k bananas per hour. Each pile takes ceil(pile/k) hours. Given an array of piles and a deadline H, find the minimum integer k such that Koko finishes all piles within H hours.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">k must be an integer. H &gt;= piles.length (at least 1h per pile).</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>max(piles) = upper bound. k=1 = lower bound.</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>One pile, any H → answer = ceil(pile/H).</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Text fontSize="0.75rem" color="#8b8589" mb={3}>Piles: [3, 6, 7, 11] — Deadline: H = 8h — Find min speed k</Text>

        <Flex gap={6} align="flex-start" justify="center" minH="220px">
          <VStack align="center">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Piles (bananas)</Text>
            <Flex gap={2}>
              {PILES.map((p, i) => {
                const isActive = s.speed > 0 && s.phase !== "init";
                return (
                  <motion.div
                    key={i}
                    animate={{ scale: isActive ? 1.05 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Flex
                      w="64px" h="64px"
                      align="center" justify="center"
                      borderRadius="lg"
                      bg={isActive ? "#faf6f0" : "#f5f0eb"}
                      border="2px solid"
                      borderColor={isActive ? "#c9952e" : "#e0d8d0"}
                      direction="column"
                    >
                      <Text fontSize="1.1rem" fontWeight={700} color="#1a1a2e">{p}</Text>
                      {isActive && (
                        <Text fontSize="0.6rem" color="#8b8589">⌈{p}/{s.speed}⌉ = {Math.ceil(p / s.speed)}h</Text>
                      )}
                    </Flex>
                  </motion.div>
                );
              })}
            </Flex>
          </VStack>

          <Box w="1px" bg="#e8e0d6" alignSelf="stretch" />

          <VStack align="center" minW="160px" gap={3}>
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Speed Test</Text>
            <Flex direction="column" align="center" gap={2}>
              <Flex align="center" gap={3}>
                <Text fontSize="0.75rem" color="#8b8589">Speed k:</Text>
                <Badge bg="#1a1a2e" color="white" px={3} py={1} borderRadius="md" fontSize="0.85rem">{s.speed > 0 ? s.speed : '?'}</Badge>
              </Flex>
              <Flex align="center" gap={3}>
                <Text fontSize="0.75rem" color="#8b8589">Total hours:</Text>
                <Badge bg={s.hours > 0 && s.hours <= H ? "green.500" : s.hours > 0 ? "red.500" : "gray.500"} color="white" px={3} py={1} borderRadius="md" fontSize="0.85rem">{s.hours > 0 ? s.hours : '?'}</Badge>
              </Flex>
              <Flex align="center" gap={3}>
                <Text fontSize="0.75rem" color="#8b8589">Deadline:</Text>
                <Text fontSize="0.85rem" fontWeight={600} color="#1a1a2e">{H}h</Text>
              </Flex>
            </Flex>
            <Flex p={3} bg="#faf6f0" borderRadius="md" borderLeft="3px solid" borderColor="#c9952e" direction="column" gap={1}>
              <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600">Search Space</Text>
              <Flex gap={3}>
                <Text fontFamily="mono" fontSize="sm" color="#8b8589">L: <Box as="span" fontWeight={600} color="#4a7db5">{s.L}</Box></Text>
                <Text fontFamily="mono" fontSize="sm" color="#8b8589">R: <Box as="span" fontWeight={600} color="#c94a6b">{s.R}</Box></Text>
                {s.mid > 0 && <Text fontFamily="mono" fontSize="sm" color="#8b8589">mid: <Box as="span" fontWeight={600} color="#c9952e">{s.mid}</Box></Text>}
              </Flex>
            </Flex>
          </VStack>
        </Flex>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4} mb={8}>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="#8b8589">
              {s.phase === "done" ? `Answer: k = ${s.speed}` : s.phase === "test" ? `Speed ${s.speed} works — try slower` : s.phase === "adjust" ? `Speed ${s.speed} too slow — go faster` : "Searching..."}
            </Text>
            <Badge bg={s.phase === "done" ? "green.500" : s.phase === "test" ? "blue.500" : s.phase === "adjust" ? "orange.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.phase === "done" ? "Done" : s.phase === "test" ? "Can Finish" : s.phase === "adjust" ? "Too Slow" : "Init"}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={8}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Try k = 1, 2, 3, ... up to max(piles). For each speed, sum ceil(pile/k) for all piles. O(n * maxP).</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Binary search on the answer k in [1, max(piles)]. Test the middle speed — if it works, try slower; if not, go faster. O(n log maxP).</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Trying every speed linearly means O(n * maxP) — maxP can be 10^9. Binary search reduces the speed tests from maxP to log(maxP).</Text>
        </Box>
      </Box>

      <SweepTrace
        traceTitle="Sweep & Trace: Koko Eating Bananas"
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
