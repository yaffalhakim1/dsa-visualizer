import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge, SimpleGrid } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";
import { InterviewWorkflow } from "./InterviewWorkflow";

const MATRIX = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
];
const ROWS = MATRIX.length;
const COLS = MATRIX[0].length;
const TARGET = 3;

interface MStep {
  L: number;
  R: number;
  mid: number;
  r: number;
  c: number;
  val: number;
  found: boolean;
  explanation: string;
  activeLines: number[];
}

const TRACE_STEPS = [
  { label: "Flatten mentally:", text: "Think of the 3×4 matrix as a 12-element sorted array: [1,3,5,7,10,11,16,20,23,30,34,60]. Standard binary search with index→(row,col) mapping." },
  { label: "Step 1:", text: "L=0, R=11. mid=5 → row=1, col=1. matrix[1][1] = 11. 11 > 3 → search left: R=4." },
  { label: "Step 2:", text: "L=0, R=4. mid=2 → row=0, col=2. matrix[0][2] = 5. 5 > 3 → search left: R=1." },
  { label: "Step 3:", text: "L=0, R=1. mid=0 → row=0, col=0. matrix[0][0] = 1. 1 < 3 → search right: L=1." },
  { label: "Step 4:", text: "L=1, R=1. mid=1 → row=0, col=1. matrix[0][1] = 3. 3 === 3 → found!", isAction: true },
  { label: "Key mapping:", text: "For mid index i: row = Math.floor(i / cols), col = i % cols. This maps a 1D binary search onto 2D coordinates in O(log(mn))." },
];

const TRACE_CODE = `function searchMatrix(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let L = 0, R = m * n - 1;
    while (L <= R) {
        const mid = Math.floor((L + R) / 2);
        const r = Math.floor(mid / n);
        const c = mid % n;
        const val = matrix[r][c];
        if (val === target) return true;
        if (val < target) L = mid + 1;
        else R = mid - 1;
    }
    return false;
}`;

const BRUTE_JS = `function searchMatrix(matrix, target) {
    for (let r = 0; r < matrix.length; r++)
        for (let c = 0; c < matrix[0].length; c++)
            if (matrix[r][c] === target) return true;
    return false;
}`;

const BEST_JS = `function searchMatrix(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let L = 0, R = m * n - 1;
    while (L <= R) {
        const mid = Math.floor((L + R) / 2);
        const r = Math.floor(mid / n);
        const c = mid % n;
        const val = matrix[r][c];
        if (val === target) return true;
        if (val < target) L = mid + 1;
        else R = mid - 1;
    }
    return false;
}`;

function generateSteps(): MStep[] {
  const steps: MStep[] = [];
  const total = ROWS * COLS;
  let L = 0, R = total - 1;

  steps.push({ L, R, mid: -1, r: -1, c: -1, val: -1, found: false, explanation: `Flattened: ${total} elements. Binary search on indices 0-${total - 1}.`, activeLines: [3] });

  while (L <= R) {
    const mid = Math.floor((L + R) / 2);
    const r = Math.floor(mid / COLS);
    const c = mid % COLS;
    const val = MATRIX[r][c];

    if (val === TARGET) {
      steps.push({ L, R, mid, r, c, val, found: true, explanation: `mid=${mid} → row=${r}, col=${c}. matrix[${r}][${c}] = ${val} === ${TARGET} → found!`, activeLines: [7, 8] });
      return steps;
    } else if (val < TARGET) {
      steps.push({ L: mid + 1, R, mid, r, c, val, found: false, explanation: `mid=${mid} → row=${r}, col=${c}. ${val} < ${TARGET} → search right. L = ${mid + 1}`, activeLines: [9] });
      L = mid + 1;
    } else {
      steps.push({ L, R: mid - 1, mid, r, c, val, found: false, explanation: `mid=${mid} → row=${r}, col=${c}. ${val} > ${TARGET} → search left. R = ${mid - 1}`, activeLines: [10] });
      R = mid - 1;
    }
  }

  steps.push({ L: -1, R: -1, mid: -1, r: -1, c: -1, val: -1, found: false, explanation: `${TARGET} not found. Return false.`, activeLines: [12] });
  return steps;
}

const STEPS = generateSteps();

export function Search2DMatrixVisualizer() {
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
        <Heading size="md" mb={1}>Search a 2D Matrix</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 13: Sorting & Searching — 1D Binary Search on 2D</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given an m×n matrix where each row is sorted and the first element of each row is greater than the last of the previous row, determine if target exists in the matrix. O(log(mn)) required.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Integers only. Each row sorted asc. Row-to-row strictly increasing.</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Not found → false. 1×1 matrix → direct check.</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Empty matrix / empty rows → false.</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Text fontSize="0.75rem" color="#8b8589" mb={3}>3×4 matrix — target = 3</Text>

        <Box pb={4} overflowX="auto">
          <SimpleGrid columns={COLS} gap={2} w="fit-content" mx="auto">
            {Array.from({ length: ROWS * COLS }, (_, i) => {
              const r = Math.floor(i / COLS);
              const c = i % COLS;
              const val = MATRIX[r][c];
              const isActive = i === s.mid || (i === s.r * COLS + s.c);
              const isFound = s.found && isActive;
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    borderColor: isFound ? "#4a9e6b" : isActive ? "#c9952e" : "#e0d8d0",
                    backgroundColor: isFound ? "#f0faf4" : isActive ? "#faf6f0" : "#ffffff",
                    opacity: 1,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <Flex
                    w="56px" h="56px"
                    align="center" justify="center"
                    borderRadius="8px"
                    border="2px solid #e0d8d0"
                    fontSize="1rem"
                    fontWeight={isActive ? 700 : 500}
                    color="#1a1a2e"
                  >
                    {val}
                  </Flex>
                </motion.div>
              );
            })}
          </SimpleGrid>
          <Flex justify="center" gap={3} mt={2}>
            {Array.from({ length: COLS }, (_, c) => (
              <Text key={`col-${c}`} fontSize="0.65rem" color="#8b8589" w="56px" textAlign="center">col {c}</Text>
            ))}
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4} mb={8}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={4}>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">L: <Box as="span" fontWeight={600} color="#4a7db5">{s.L >= 0 ? s.L : '-'}</Box></Text>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">R: <Box as="span" fontWeight={600} color="#c94a6b">{s.R >= 0 ? s.R : '-'}</Box></Text>
              {s.mid >= 0 && <Text fontFamily="mono" fontSize="sm" color="#8b8589">mid: <Box as="span" fontWeight={600} color="#c9952e">{s.mid} → [{s.r},{s.c}] = {s.val}</Box></Text>}
            </Flex>
            <Badge bg={s.found ? "green.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.found ? 'Found!' : 'Searching'}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={8}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Linear scan every cell, row by row. O(mn).</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Treat the matrix as a flattened sorted array of length m*n. Standard binary search with index → (row, col) mapping: row = mid / n, col = mid % n. O(log(mn)).</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">Linear scan ignores the sorted structure. In the worst case (100×100 matrix, target not present), we check 10,000 cells. Binary search needs only ~14 comparisons.</Text>
        </Box>
      </Box>

      <SweepTrace
        traceTitle="Sweep & Trace: Search 2D Matrix"
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
