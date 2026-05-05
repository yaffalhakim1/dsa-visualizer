import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { ChapterPrimer } from "./ChapterPrimer";
import { SweepTrace } from "./SweepTrace";

const DATA = [7, 1, 5, 3, 6, 4];

const TRACE_STEPS = [
  { label: "Day 0 (Price 7):", text: "minPrice is 7. Profit is 0." },
  { label: "Day 1 (Price 1):", text: "minPrice drops to 1. Profit is 0." },
  { label: "Day 2 (Price 5):", text: "minPrice is 1. If we sell today: $5 - 1 = 4$. bestProfit = 4." },
  { label: "Day 3 (Price 3):", text: "minPrice is 1. If we sell today: $3 - 1 = 2$. bestProfit stays 4." },
  { label: "Day 4 (Price 6):", text: "minPrice is 1. If we sell today: $6 - 1 = 5$. bestProfit = 5." },
  { label: "Day 5 (Price 4):", text: "minPrice is 1. If we sell today: $4 - 1 = 3$. bestProfit stays 5." },
  { label: "Final Answer:", text: "5", isAction: true },
];

const TRACE_CODE = `function maxProfit(prices) {
    let minPrice = Infinity;
    let best = 0;
    for (let i = 0; i < prices.length; i++) {
        minPrice = Math.min(minPrice, prices[i]);
        best = Math.max(best, prices[i] - minPrice);
    }
    return best;
}`;

interface StockStep {
  idx: number;
  minPrice: number;
  maxProfit: number;
  minIdx: number;
  done: boolean;
  explanation: string;
  activeLines: number[];
}

const BRUTE_JS = `function maxProfit(prices) {
  let best = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      best = Math.max(best, prices[j] - prices[i]);
    }
  }
  return best;
}`;

const BEST_JS = `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`;

function genSteps() {
  const steps: StockStep[] = [];
  steps.push({ idx: -1, minPrice: Infinity, maxProfit: 0, minIdx: -1, done: false, explanation: "Track the lowest price seen so far and the max profit possible. Update both as we scan.", activeLines: [3, 4] });
  let minPrice = Infinity, maxProfit = 0, minIdx = -1;
  for (let i = 0; i < DATA.length; i++) {
    if (DATA[i] < minPrice) { minPrice = DATA[i]; minIdx = i; }
    const profit = DATA[i] - minPrice;
    if (profit > maxProfit) maxProfit = profit;
    const isLast = i === DATA.length - 1;
    steps.push({ idx: i, minPrice, maxProfit, minIdx, done: isLast, explanation: isLast ? `Done! Buy at ${minPrice} (day ${minIdx+1}), sell at peak. Max profit: ${maxProfit}` : `Day ${i+1}: price=${DATA[i]}, min=${minPrice}, profit=${profit}${profit > 0 ? `, best=${maxProfit}` : ''}`, activeLines: [5, 6, 7] });
  }
  return steps;
}

const STEPS = genSteps();

export function StockProfitVisualizer() {
  const { setTotalSteps, reset, setActiveLines, currentStep, isPlaying, playbackSpeed, nextStep } = useAlgorithmStore();
  const s = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);

  useEffect(() => { setTotalSteps(STEPS.length); return () => reset(); }, [setTotalSteps, reset]);
  useEffect(() => { setActiveLines(s.activeLines); }, [currentStep, setActiveLines, s.activeLines]);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (isPlaying && currentStep < STEPS.length - 1) t = setTimeout(nextStep, playbackSpeed);
    return () => clearTimeout(t);
  }, [isPlaying, currentStep, nextStep, playbackSpeed]);

  const minPrice = s.minPrice === Infinity ? '∞' : s.minPrice;

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>Best Time to Buy & Sell Stock</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Ch 6: Arrays & Strings — Single Pass</Text>

        <ChapterPrimer topics={["array", "string"]} visualizing />

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Pick one day to buy and a later day to sell for max profit. If no profit possible, return 0.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Decreasing prices → profit 0</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Single day → profit 0</Text>
          </Box>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Check every buy/sell pair. O(n²) — compares every day against every later day.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Track lowest price as you scan. For each day, compute profit selling today. Keep max. O(n), one pass, O(1) memory.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Nested loops repeat the same scan. For each buy day, every later sell day is checked — even though we only need the highest price after each buy.</Text>
        </Box>

        <StepLabel num={3} title="Example" mb={3} />
        <Box pb={4}>
          <Flex justify="center" align="flex-end" gap={2} position="relative" pt={10} minH="160px">
            {DATA.map((val, i) => {
              const isCurrent = i === s.idx;
              const isMin = i === s.minIdx;
              return (
                <Box key={i} position="relative">
                  {isCurrent && !s.done && <Text position="absolute" top="-1.5rem" left="50%" transform="translateX(-50%)" fontSize="0.6rem" color="#c9952e" fontWeight={700}>now</Text>}
                  {isMin && <Text position="absolute" top="-1.25rem" left={isCurrent ? "70%" : "50%"} transform="translateX(-50%)" fontSize="0.6rem" color="#4a7db5" fontWeight={700}>min</Text>}
                  <motion.div animate={{ y: s.done ? 0 : isCurrent ? -4 : 0 }}>
                    <Flex direction="column" align="center" gap={1}>
                      <Flex w="48px" h="48px" align="center" justify="center" borderRadius="md"
                        border="2px solid"
                        borderColor={isMin ? "#4a7db5" : isCurrent ? "#c9952e" : "#e8e0d6"}
                        bg={isMin ? "#f0f6fd" : isCurrent ? "#faf6f0" : "white"}
                        fontSize="1rem" fontWeight={isCurrent || isMin ? 700 : 500} color="#1a1a2e"
                      >{val}</Flex>
                      <Text fontSize="0.6rem" color="#8b8589">Day {i+1}</Text>
                    </Flex>
                  </motion.div>
                </Box>
              );
            })}
          </Flex>
          <Flex justify="center" gap={8} mt={4} p={3} bg="#faf6f0" borderRadius="md">
            <Text fontSize="0.8rem" color="#6b6350">Min: <Box as="span" fontWeight={700} color="#4a7db5">{minPrice}</Box></Text>
            <Text fontSize="0.8rem" color="#6b6350">Profit: <Box as="span" fontWeight={700} color="#4a9e6b">{s.maxProfit}</Box></Text>
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Badge bg={s.done ? "green.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.done ? 'Done' : 'Scanning'}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>
      </Box>

      <SweepTrace
        traceTitle="The Trace (Example: prices = [7, 1, 5, 3, 6, 4])"
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
