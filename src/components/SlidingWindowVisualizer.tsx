import { Mafs, Coordinates, useMovablePoint, Text as MafsText, Polygon, Theme } from "mafs";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Flex, Text, Heading, VStack } from "@chakra-ui/react";
import { SolutionCompare } from "./SolutionCompare";

const DATA = [1, 2, 3, 4, 5, 6, 7];

export function SlidingWindowVisualizer() {
  const left = useMovablePoint([0, 0], {
    constrain: ([x]) => [Math.max(0, Math.min(Math.round(x), right.x)), 0],
    color: Theme.blue,
  });

  const right = useMovablePoint([2, 0], {
    constrain: ([x]) => [Math.max(left.x, Math.min(Math.round(x), DATA.length - 1)), 0],
    color: Theme.red,
  });

  const start = Math.round(left.x);
  const end = Math.round(right.x);
  
  const [sum, setSum] = useState(0);
  const [deltaNodes, setDeltaNodes] = useState<{ id: string, val: number, type: 'add' | 'sub' }[]>([]);
  const prevBounds = useRef({ start, end });

  // Compute initial sum once
  useEffect(() => {
    setSum(DATA.slice(start, end + 1).reduce((a, b) => a + b, 0));
  }, []);

  // Update sum and calculate deltas when bounds change
  useEffect(() => {
    const prev = prevBounds.current;
    if (prev.start === start && prev.end === end) return;

    let newSum = sum;
    const newDeltas: typeof deltaNodes = [];

    // Handle right pointer moving right (adding)
    if (end > prev.end) {
      for (let i = prev.end + 1; i <= end; i++) {
        newSum += DATA[i];
        newDeltas.push({ id: `add-r-${i}-${Date.now()}`, val: DATA[i], type: 'add' });
      }
    }
    // Handle right pointer moving left (subtracting)
    if (end < prev.end) {
      for (let i = prev.end; i > end; i--) {
        newSum -= DATA[i];
        newDeltas.push({ id: `sub-r-${i}-${Date.now()}`, val: DATA[i], type: 'sub' });
      }
    }
    // Handle left pointer moving right (subtracting)
    if (start > prev.start) {
      for (let i = prev.start; i < start; i++) {
        newSum -= DATA[i];
        newDeltas.push({ id: `sub-l-${i}-${Date.now()}`, val: DATA[i], type: 'sub' });
      }
    }
    // Handle left pointer moving left (adding)
    if (start < prev.start) {
      for (let i = prev.start - 1; i >= start; i--) {
        newSum += DATA[i];
        newDeltas.push({ id: `add-l-${i}-${Date.now()}`, val: DATA[i], type: 'add' });
      }
    }

    setSum(newSum);
    setDeltaNodes(newDeltas);
    prevBounds.current = { start, end };
  }, [start, end]);

  const bruteForceCode = `def max_sum(arr, k):
    res = 0
    for i in range(len(arr) - k + 1):
        # Recomputing sum for each window
        res = max(res, sum(arr[i : i+k]))
    return res`;

  const optimizedCode = `def max_sum(arr, k):
    curr_sum = sum(arr[:k])
    res = curr_sum
    for i in range(k, len(arr)):
        # Incremental update (O(1))
        curr_sum += arr[i] - arr[i-k]
        res = max(res, curr_sum)
    return res`;

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={6} borderWidth="1px" borderRadius="xl" bg="white" shadow="md" display="flex" flexDirection="column" alignItems="center" gap={4}>
        <Heading size="md">Sliding Window (Chapter 14)</Heading>
        
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

          {left.element}
          {right.element}

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
        
        <Text fontSize="sm" color="gray.500" fontStyle="italic">
          Drag handles to see O(1) incremental update animation.
        </Text>
      </Box>

      <Box>
        <Heading size="sm" mb={4}>Mental Model Comparison</Heading>
        <SolutionCompare bruteForceCode={bruteForceCode} optimizedCode={optimizedCode} />
      </Box>
    </VStack>
  );
}
