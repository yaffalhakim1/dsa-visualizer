import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { InterviewWorkflow } from "./InterviewWorkflow";

const GRID = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];

const ROWS = GRID.length;
const COLS = GRID[0].length;

type CellStatus = 'water' | 'land' | 'visiting' | 'counted';

interface GridStep {
  grid: CellStatus[][];
  islands: number;
  explanation: string;
  activeLines: number[];
}

const BRUTE_FORCE = `def num_islands(grid):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols
            or grid[r][c] != '1' or (r,c) in visited):
            return
        visited.add((r,c))
        dfs(r+1,c); dfs(r-1,c)
        dfs(r,c+1); dfs(r,c-1)
    islands = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1' and (r,c) not in visited:
                islands += 1
                dfs(r,c)
    return islands`;

const COLOR_MAP: Record<CellStatus, string> = {
  water: '#e0d8d0',
  land: '#c0d8c0',
  visiting: '#c9952e',
  counted: '#4a9e6b',
};

function generateSteps(): GridStep[] {
  const steps: GridStep[] = [];
  const status: CellStatus[][] = GRID.map(row => row.map(c => c === 1 ? 'land' : 'water'));

  steps.push({
    grid: status.map(r => [...r]),
    islands: 0,
    explanation: "Start scanning the grid left to right, top to bottom. Find a land cell that has not been visited.",
    activeLines: [9, 10]
  });

  const visited = new Set<string>();
  let islands = 0;

  function dfs(r: number, c: number) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || GRID[r][c] !== 1 || visited.has(`${r},${c}`)) return;
    visited.add(`${r},${c}`);
    status[r][c] = 'visiting';
    status[r][c] = 'counted';
    steps.push({
      grid: status.map(row => [...row]),
      islands,
      explanation: `Mark (${r},${c}) as part of island #${islands}. Explore neighbors.`,
      activeLines: [4, 5, 6]
    });
    dfs(r - 1, c);
    dfs(r + 1, c);
    dfs(r, c - 1);
    dfs(r, c + 1);
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (GRID[r][c] === 1 && !visited.has(`${r},${c}`)) {
        islands++;
        status[r][c] = 'visiting';
        steps.push({
          grid: status.map(row => [...row]),
          islands,
          explanation: `Found new island #${islands} at (${r},${c}). Starting DFS flood fill.`,
          activeLines: [11, 12, 13]
        });
        status[r][c] = 'counted';
        dfs(r, c);
      }
    }
  }

  steps.push({
    grid: status.map(row => [...row]),
    islands,
    explanation: `Done! Found ${islands} island${islands > 1 ? 's' : ''} in total.`,
    activeLines: [15]
  });

  return steps;
}

const STEPS = generateSteps();

export function GraphVisualizer() {
  const { setTotalSteps, reset, setActiveLines, currentStep, isPlaying, playbackSpeed, nextStep } = useAlgorithmStore();
  const step = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);

  useEffect(() => {
    setTotalSteps(STEPS.length);
    return () => reset();
  }, [setTotalSteps, reset]);

  useEffect(() => {
    setActiveLines(step.activeLines);
  }, [currentStep, setActiveLines, step.activeLines]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying && currentStep < STEPS.length - 1) {
      timer = setTimeout(nextStep, playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, nextStep, playbackSpeed]);

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>Number of Islands</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 12: Graphs — DFS Flood Fill</Text>

        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given a 2D grid of 1's (land) and 0's (water), count how many islands exist. An island is land cells connected vertically or horizontally.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Empty grid? All water → 0 islands</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>All land → 1 island</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Diagonal connections do NOT count</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Box py={4}>
          <Flex direction="column" align="center" gap={1}>
            {step.grid.map((row, r) => (
              <Flex key={r} gap={1}>
                {row.map((cell, c) => (
                  <motion.div
                    key={`${r}-${c}`}
                    animate={{ scale: cell === 'visiting' ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Flex
                      w="48px" h="48px"
                      align="center" justify="center"
                      borderRadius="md"
                      bg={COLOR_MAP[cell]}
                      color={cell === 'visiting' ? 'white' : cell === 'counted' ? 'white' : '#6b6350'}
                      fontSize="0.85rem"
                      fontWeight={600}
                      border={cell === 'visiting' ? '3px solid' : '1px solid'}
                      borderColor={cell === 'visiting' ? '#c9952e' : '#e0d8d0'}
                    >
                      {GRID[r][c]}
                    </Flex>
                  </motion.div>
                ))}
              </Flex>
            ))}
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mb={8}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={3}>
              <Text fontSize="sm" color="#8b8589">Islands found:</Text>
              <Badge bg="#1a1a2e" color="white" px={2} py={0.5} borderRadius="md" fontSize="0.8rem">{step.islands}</Badge>
            </Flex>
            <Badge bg={step.islands === 3 ? 'green.500' : 'purple.500'} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">
              {step.islands === 3 ? 'Done' : 'Scanning'}
            </Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#4a7db5" pl={4} py={1}>
            "{step.explanation}"
          </Text>
        </Flex>

        <Flex gap={4} mb={8}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">For each cell, check if its land and unvisited. If so, mark the whole island using recursive DFS visiting all 4 neighbors. O(mn) but recursion depth can be large.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Same DFS, but use iterative stack or BFS to avoid recursion depth issues. Mark visited in-place by changing grid values — no extra visited set needed.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">
            Recursive DFS uses the call stack as the frontier. For large islands (hundreds of thousands of cells), Python's recursion limit can be hit. An iterative approach avoids this entirely.
          </Text>
        </Box>
      </Box>

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_FORCE} optimizedCode={BRUTE_FORCE} activeLines={step.activeLines} />
      </Box>
    </VStack>
  );
}
