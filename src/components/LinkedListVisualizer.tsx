import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";

import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";

const DATA = [1, 2, 3, 4, 5];

type StepStatus = 'setup' | 'rewiring' | 'done';

interface ReverseStep {
  prev: number | null;
  curr: number;
  next: number | null;
  reversed: number[];
  remaining: number[];
  status: StepStatus;
  explanation: string;
  activeLines: number[];
}

const STATUS_UI_MAP: Record<StepStatus, { color: string, label: string }> = {
  setup: { color: "blue.500", label: "Setup" },
  rewiring: { color: "purple.500", label: "Rewiring" },
  done: { color: "green.500", label: "Done" },
};

const BRUTE_FORCE = `def reverse_list_bruteforce(head):
    values = []
    while head:
        values.append(head.val)
        head = head.next
    dummy = ListNode(0)
    tail = dummy
    for val in reversed(values):
        tail.next = ListNode(val)
        tail = tail.next
    return dummy.next`;

const OPTIMIZED = `def reverse_list(head):
    prev = None
    current = head
    while current:
        nxt = current.next
        current.next = prev
        prev = current
        current = nxt
    return prev`;

const generateSteps = (): ReverseStep[] => {
  const steps: ReverseStep[] = [];
  const n = DATA.length;

  steps.push({
    prev: null,
    curr: 0,
    next: 1,
    reversed: [],
    remaining: DATA,
    status: 'setup',
    explanation: `prev = None, curr = head (${DATA[0]}), nxt = curr.next (${DATA[1]})`,
    activeLines: [2, 3]
  });

  for (let i = 0; i < n; i++) {
    const nxt = i + 1 < n ? i + 1 : null;
    const done = i === n - 1;
    steps.push({
      prev: i,
      curr: nxt,
      next: nxt !== null && nxt + 1 < n ? nxt + 1 : null,
      reversed: DATA.slice(0, i + 1).reverse(),
      remaining: nxt !== null ? DATA.slice(nxt) : [],
      status: done ? 'done' : 'rewiring',
      explanation: done
        ? `curr.next = prev = ${i > 0 ? DATA[i-1] : 'None'}. List reversed. New head: ${DATA[n-1]}`
        : `curr.next = prev = ${i > 0 ? DATA[i-1] : 'None'}. Advance: prev = ${DATA[i]}, curr = ${DATA[i+1]}`,
      activeLines: [5, 6, 7]
    });
  }
  return steps;
};

const STEPS = generateSteps();

export function LinkedListVisualizer() {
  const { setTotalSteps, reset, setActiveLines, currentStep, isPlaying, playbackSpeed, nextStep } = useAlgorithmStore();
  const currentVisualStep = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);
  const uiConfig = STATUS_UI_MAP[currentVisualStep.status];

  useEffect(() => {
    setTotalSteps(STEPS.length);
    return () => reset();
  }, [setTotalSteps, reset]);

  useEffect(() => {
    setActiveLines(currentVisualStep.activeLines);
  }, [currentStep, setActiveLines, currentVisualStep.activeLines]);

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
        <Heading size="md" mb={1}>Reverse Linked List</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 7: Linked Lists</Text>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given the head of a singly linked list, reverse the list so the tail becomes the new head. Return the new head.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Test Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">1 → 2 → 3 → 4 → 5 → ∅</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">becomes 5 → 4 → 3 → 2 → 1 → ∅</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Empty list → ∅</Text>
          </Box>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Collect all node values into an array, reverse the array, then build a new list from the reversed values — O(n) time and O(n) extra space.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Rewire each nodes next pointer to point backward as you traverse — save the next reference first, then flip. O(n) time, O(1) extra space.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">
            The brute-force copies every value into an array just to reverse it. The values themselves do not change — only the pointers do. That extra array is pure overhead.
          </Text>
        </Box>

        <Box pb={4} minH="200px">
          <StepLabel num={3} title="Example" mb={3} />
          {currentVisualStep.reversed.length > 0 && (
            <Box mb={4}>
              <Flex justify="center" align="center" gap={1}>
                {currentVisualStep.reversed.map((val, i) => (
                  <Flex key={`rev-${i}`} align="center" gap={1}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Flex
                        bg="#f0faf4" border="2px solid" borderColor="#4a9e6b" borderRadius="lg"
                        w="56px" h="56px" align="center" justify="center"
                        fontSize="1.125rem" fontWeight={700} color="#4a9e6b" position="relative"
                      >
                        {val}
                        {i === 0 && currentVisualStep.status !== 'done' && (
                          <Text position="absolute" top="-1.25rem" fontSize="0.6rem" color="#4a9e6b" fontWeight={600}>new</Text>
                        )}
                      </Flex>
                    </motion.div>
                    <Text color="#4a9e6b" fontSize="1.25rem" fontWeight={300}>←</Text>
                  </Flex>
                ))}
                <Text color="#4a9e6b" fontSize="1.25rem" fontWeight={300}>←</Text>
                <Flex bg="#faf6f0" border="2px dashed" borderColor="#c0b8b0" borderRadius="lg"
                  w="56px" h="56px" align="center" justify="center" fontSize="0.7rem" color="#c0b8b0" fontWeight={600}>
                  ∅
                </Flex>
              </Flex>
            </Box>
          )}

          {currentVisualStep.remaining.length > 0 && (
            <Flex justify="center" align="center" gap={1}>
              {currentVisualStep.remaining.map((val, i) => {
                const isCurr = currentVisualStep.curr !== null && DATA.indexOf(val) === currentVisualStep.curr;
                const isNext = currentVisualStep.next !== null && DATA.indexOf(val) === currentVisualStep.next;
                return (
                  <Flex key={`rem-${i}`} align="center" gap={1}>
                    <Box position="relative">
                      {isCurr && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                          <Text position="absolute" top="-1.5rem" left="50%" transform="translateX(-50%)"
                            fontSize="0.65rem" fontWeight={700} color="#c9952e">curr</Text>
                        </motion.div>
                      )}
                      {isNext && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                          <Text position="absolute" top="-1.5rem" left="50%" transform="translateX(-50%)"
                            fontSize="0.65rem" fontWeight={700} color="#4a7db5">nxt</Text>
                        </motion.div>
                      )}
                      <motion.div
                        animate={{
                          scale: isCurr ? 1.08 : 1,
                          borderColor: isCurr ? "#c9952e" : isNext ? "#4a7db5" : "#e8e0d6",
                          backgroundColor: isCurr ? "#faf6f0" : "#ffffff",
                        }}
                        transition={{ duration: 0.25 }}
                        style={{
                          width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center",
                          borderRadius: "10px", border: "2px solid #e8e0d6", fontSize: "1.125rem",
                          fontWeight: isCurr ? 700 : 500, color: "#1a1a2e",
                        }}
                      >
                        {val}
                      </motion.div>
                    </Box>
                    <Text color="#c0b8b0" fontSize="1.25rem" fontWeight={300}>→</Text>
                  </Flex>
                );
              })}
              <Text color="#c0b8b0" fontSize="1.25rem" fontWeight={300}>→</Text>
              <Flex border="2px dashed" borderColor="#e0d8d0" borderRadius="lg"
                w="56px" h="56px" align="center" justify="center" fontSize="0.7rem" color="#c0b8b0">∅</Flex>
            </Flex>
          )}

          {currentVisualStep.status === 'done' && (
            <Flex justify="center" mt={4}>
              <Badge bg="#4a9e6b" color="white" px={4} py={1.5} borderRadius="full" fontSize="0.75rem">
                New Head: {DATA[DATA.length - 1]}
              </Badge>
            </Flex>
          )}
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={3}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={4}>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">
                prev: <Box as="span" fontWeight={600} color="#8b8589">{currentVisualStep.prev !== null ? DATA[currentVisualStep.prev] : 'None'}</Box>
              </Text>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">
                curr: <Box as="span" fontWeight={600} color="#c9952e">{currentVisualStep.curr !== null ? DATA[currentVisualStep.curr] : 'None'}</Box>
              </Text>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">
                nxt: <Box as="span" fontWeight={600} color="#4a7db5">{currentVisualStep.next !== null ? DATA[currentVisualStep.next] : 'None'}</Box>
              </Text>
            </Flex>
            <Badge bg={uiConfig.color} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{uiConfig.label}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>
            "{currentVisualStep.explanation}"
          </Text>
        </Flex>
      </Box>

      <Box>
        <Heading size="sm" mb={4} color="#6b6350">Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_FORCE} optimizedCode={OPTIMIZED} activeLines={currentVisualStep.activeLines} />
      </Box>
    </VStack>
  );
}
