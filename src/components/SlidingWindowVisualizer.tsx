import { Mafs, Coordinates, Text as MafsText, Polygon, Theme } from "mafs";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Flex, Text, Heading, VStack } from "@chakra-ui/react";
import { SolutionCompare } from "./SolutionCompare";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";

const DATA = [1, 2, 3, 4, 5, 6, 7];
const K = 3;

// Defined steps for the "Step-by-Step" simulation
const STEPS = DATA.map((_, i) => {
  if (i > DATA.length - K) return null;
  return {
    window: [i, i + K - 1],
    activeLines: [5, 6, 7, 8],
    description: `Calculating sum for window [${i}...${i+K-1}]`
  };
}).filter(Boolean) as { window: [number, number], activeLines: number[], description: string }[];

export function SlidingWindowVisualizer() {
  const { 
    currentStep, 
    setTotalSteps, 
    isPlaying, 
    nextStep, 
    playbackSpeed, 
    activeLines, 
    setActiveLines,
    reset
  } = useAlgorithmStore();

  // Initialize store for this component
  useEffect(() => {
    setTotalSteps(STEPS.length);
    setActiveLines(STEPS[0].activeLines);
    return () => reset(); // Cleanup on unmount
  }, []);

  // Handle auto-playback
  useEffect(() => {
    let timer: any;
    if (isPlaying && currentStep < STEPS.length - 1) {
      timer = setTimeout(() => {
        nextStep();
      }, playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, nextStep, playbackSpeed]);

  // Sync component state with global store
  const stepData = STEPS[currentStep];
  const start = stepData.window[0];
  const end = stepData.window[1];

  const [sum, setSum] = useState(0);
  const [deltaNodes, setDeltaNodes] = useState<{ id: string, val: number, type: 'add' | 'sub' }[]>([]);
  const prevBounds = useRef({ start, end });

  // Update sum and calculate deltas
  useEffect(() => {
    const prev = prevBounds.current;
    if (prev.start === start && prev.end === end) {
       // Initial load or no change
       setSum(DATA.slice(start, end + 1).reduce((a, b) => a + b, 0));
       return;
    }

    let newSum = sum;
    const newDeltas: typeof deltaNodes = [];

    // Simple incremental logic for visualization
    if (end > prev.end) {
      newSum += DATA[end];
      newDeltas.push({ id: `add-${end}-${Date.now()}`, val: DATA[end], type: 'add' });
    }
    if (start > prev.start) {
      newSum -= DATA[prev.start];
      newDeltas.push({ id: `sub-${prev.start}-${Date.now()}`, val: DATA[prev.start], type: 'sub' });
    }

    setSum(newSum);
    setDeltaNodes(newDeltas);
    setActiveLines(stepData.activeLines);
    prevBounds.current = { start, end };
  }, [start, end]);

  const bruteForceCode = `def max_sum(arr, k):
    res = 0
    for i in range(len(arr) - k + 1):
        # Recomputing sum for each window
        res = max(res, sum(arr[i : i+k]))
    return res`;

  const optimizedCode = `def max_sum(arr, k):
    curr_sum = sum(arr[:k]) # 1
    res = curr_sum          # 2
    for i in range(k, len(arr)):
        # Incremental update (O(1))
        curr_sum += arr[i] - arr[i-k] # 5
        res = max(res, curr_sum)      # 6
    return res`;

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={6} borderWidth="1px" borderRadius="xl" bg="white" shadow="md" display="flex" flexDirection="column" alignItems="center" gap={4}>
        <Heading size="md">Sliding Window (Chapter 14)</Heading>
        <Text fontSize="sm" color="gray.600">{stepData.description}</Text>
        
        <Mafs height={300} width={600} viewBox={{ x: [-1, DATA.length], y: [-1, 1] }}>
          <Coordinates.Cartesian subdivisions={false} />
          
          {DATA.map((val, i) => (
            <MafsText key={i} x={i} y={0.3} attach="n">{val}</MafsText>
          ))}

          <Polygon
            points={[[start - 0.5, -0.5], [end + 0.5, -0.5], [end + 0.5, 0.5], [start - 0.5, 0.5]]}
            color={Theme.violet}
            fillOpacity={0.2}
          />

          <MafsText x={start} y={-0.6} attach="s" color={Theme.blue}>Left</MafsText>
          <MafsText x={end} y={-0.6} attach="s" color={Theme.red}>Right</MafsText>
        </Mafs>

        <Flex p={4} bg="gray.50" borderRadius="lg" w="full" maxW="500px" justify="space-between" align="center" border="1px solid" borderColor="gray.100">
          <Text fontFamily="mono" fontSize="lg">
            Window: <Box as="span" color="blue.600" fontWeight="bold">[{start}</Box>...<Box as="span" color="red.600" fontWeight="bold">{end}]</Box>
          </Text>
          
          <Flex align="center" gap={3}>
            <AnimatePresence mode="popLayout">
              {deltaNodes.map((node) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: -20, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  <Text color={node.type === 'add' ? 'green.600' : 'red.600'} fontWeight="bold" fontSize="lg">
                    {node.type === 'add' ? '+' : '-'}{node.val}
                  </Text>
                </motion.div>
              ))}
            </AnimatePresence>
            <Text fontFamily="mono" fontSize="2xl" fontWeight="bold" color="purple.600" ml={2}>
              Sum: {sum}
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Box>
        <Heading size="sm" mb={4}>Mental Model Comparison</Heading>
        <SolutionCompare 
          bruteForceCode={bruteForceCode} 
          optimizedCode={optimizedCode} 
          activeLines={activeLines}
        />
      </Box>
    </VStack>
  );
}
