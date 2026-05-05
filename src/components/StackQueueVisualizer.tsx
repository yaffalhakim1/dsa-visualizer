import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";

import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";

const INPUT = "({[]})";

const TRACE_STEPS = [
  { label: "Character '(' (Index 0):", text: "Opening bracket. Push onto stack. Stack: ['(']" },
  { label: "Character '{' (Index 1):", text: "Opening bracket. Push onto stack. Stack: ['(', '{']" },
  { label: "Character '[' (Index 2):", text: "Opening bracket. Push onto stack. Stack: ['(', '{', '[']" },
  { label: "Character ']' (Index 3):", text: "Closing bracket. Top of stack is '[' — it matches! Pop '['. Stack: ['(', '{']" },
  { label: "Character '}' (Index 4):", text: "Closing bracket. Top of stack is '{' — it matches! Pop '{'. Stack: ['(']" },
  { label: "Character ')' (Index 5):", text: "Closing bracket. Top of stack is '(' — it matches! Pop '('. Stack: []" },
  { label: "Result:", text: "Stack is empty after processing all characters → Valid!", isAction: true },
];

const TRACE_CODE = `function isValid(s) {
    const pairs = {')': '(', ']': '[', '}': '{'};
    const stack = [];
    for (const ch of s) {
        if (ch in '([{') stack.push(ch);
        else {
            if (!stack.length || stack.at(-1) !== pairs[ch])
                return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}`;

type Action = 'init' | 'push' | 'pop' | 'done';

interface StackStep {
  stack: string[];
  pointer: number;
  action: Action;
  bracket: string;
  explanation: string;
  activeLines: number[];
}

const STATUS_UI_MAP: Record<Action, { color: string, label: string }> = {
  init: { color: "blue.500", label: "Starting" },
  push: { color: "purple.500", label: "Push" },
  pop: { color: "green.500", label: "Pop" },
  done: { color: "green.500", label: "Valid!" },
};

const PAIR_NAMES: Record<string, string> = {
  '(': '(',
  ')': '(',
  '{': '{',
  '}': '{',
  '[': '[',
  ']': '[',
};

const PAIR_COLORS: Record<string, string> = {
  '(': '#8b5cf6',
  ')': '#8b5cf6',
  '{': '#4a7db5',
  '}': '#4a7db5',
  '[': '#c94a6b',
  ']': '#c94a6b',
};

const BRUTE_FORCE = `def is_valid(s):
    while "()" in s or "[]" in s or "{}" in s:
        s = s.replace("()", "")
        s = s.replace("[]", "")
        s = s.replace("{}", "")
    return s == ""`;

const OPTIMIZED = `def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
    return not stack`;

const generateSteps = (): StackStep[] => {
  const steps: StackStep[] = [];
  const stack: string[] = [];

  steps.push({
    stack: [],
    pointer: -1,
    action: 'init',
    bracket: '',
    explanation: "Start with empty stack. Read each bracket one by one.",
    activeLines: [3]
  });

  const openers = new Set(['(', '[', '{']);
  for (let i = 0; i < INPUT.length; i++) {
    const ch = INPUT[i];
    if (openers.has(ch)) {
      stack.push(ch);
      steps.push({
        stack: [...stack],
        pointer: i,
        action: 'push',
        bracket: ch,
        explanation: `"${ch}" is an opening bracket. Push onto stack. Stack now has ${stack.length} item(s).`,
        activeLines: [5, 6]
      });
    } else {
      stack.pop();
      steps.push({
        stack: [...stack],
        pointer: i,
        action: 'pop',
        bracket: ch,
        explanation: `"${ch}" closes "${PAIR_NAMES[ch]}". It matches the top of stack. Pop it off.`,
        activeLines: [7, 8, 9]
      });
    }
  }

  steps.push({
    stack: [],
    pointer: INPUT.length,
    action: 'done',
    bracket: '',
    explanation: "All brackets matched. Stack is empty → valid string!",
    activeLines: [11]
  });

  return steps;
};

const STEPS = generateSteps();

export function StackQueueVisualizer() {
  const { setTotalSteps, reset, setActiveLines, currentStep, isPlaying, playbackSpeed, nextStep } = useAlgorithmStore();
  const currentVisualStep = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);
  const uiConfig = STATUS_UI_MAP[currentVisualStep.action];

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
        <Heading size="md" mb={1}>Valid Parentheses</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 8: Stacks & Queues</Text>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given a string of brackets () {} [], check if every opening bracket has the right closing bracket in the correct order.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Test Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">"()[]{}" → True</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>"(]" → False</Text>
          </Box>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Keep removing matching pairs from the string until nothing changes. Each pass scans the whole string — O(n²) in the worst case.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Push opening brackets onto a stack. When you see a closing bracket, check if it matches the one on top. One pass, O(n).</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">
            Removing matching pairs by string replacement scans the entire string each time. In the worst case (nested brackets like "(((...)))"), only one pair is removed per pass — O(n²) total.
          </Text>
        </Box>

        <StepLabel num={3} title="Example" mb={3} />
        <Flex gap={8} align="flex-start" justify="center" minH="300px" py={4}>
          <VStack gap={2} align="center" flex="1">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Input</Text>
            <Flex gap={2}>
              {INPUT.split('').map((ch, i) => {
                const isCurrent = i === currentVisualStep.pointer;
                const isPast = i < currentVisualStep.pointer;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      scale: isCurrent ? 1.15 : 1,
                      y: isCurrent ? -4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Flex
                      w="48px" h="48px"
                      align="center" justify="center"
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={isCurrent ? "#c9952e" : isPast ? "#e0d8d0" : "#e8e0d6"}
                      bg={isCurrent ? "#faf6f0" : isPast ? "#f5f0eb" : "white"}
                      fontSize="1.25rem"
                      fontWeight={isCurrent ? 700 : 400}
                      color={PAIR_COLORS[ch]}
                      opacity={isPast && !isCurrent ? 0.5 : 1}
                    >
                      {ch}
                    </Flex>
                  </motion.div>
                );
              })}
            </Flex>
            <AnimatePresence mode="wait">
              {currentVisualStep.pointer >= 0 && currentVisualStep.pointer < INPUT.length && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Text fontSize="0.65rem" color="#c9952e" fontWeight={600}>reading</Text>
                </motion.div>
              )}
            </AnimatePresence>
          </VStack>

          <Box w="1px" bg="#e8e0d6" alignSelf="stretch" />

          <VStack gap={2} align="center" flex="1">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Stack (LIFO)</Text>
            <Box
              w="64px"
              minH="200px"
              bg="#faf6f0"
              borderRadius="lg"
              border="2px dashed"
              borderColor="#e0d8d0"
              display="flex"
              flexDirection="column-reverse"
              alignItems="center"
              p={2}
            >
              <AnimatePresence>
                {currentVisualStep.stack.map((ch, i) => (
                  <motion.div
                    key={`${ch}-${i}`}
                    initial={{ opacity: 0, y: -30, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    style={{ marginBottom: '4px' }}
                  >
                    <Flex
                      w="48px" h="48px"
                      align="center" justify="center"
                      borderRadius="lg"
                      bg={PAIR_COLORS[ch]}
                      color="white"
                      fontSize="1.25rem"
                      fontWeight={700}
                      boxShadow="0 2px 8px rgba(0,0,0,0.15)"
                    >
                      {ch}
                    </Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
              {currentVisualStep.stack.length === 0 && (
                <Text fontSize="0.7rem" color="#c0b8b0" fontStyle="italic">empty</Text>
              )}
            </Box>
          </VStack>
        </Flex>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={2}>
              <Text fontSize="sm" color="#8b8589">Stack size:</Text>
              <Badge bg="#1a1a2e" color="white" px={2} py={0.5} borderRadius="md" fontSize="0.7rem">
                {currentVisualStep.stack.length}
              </Badge>
            </Flex>
            <Badge bg={uiConfig.color} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{uiConfig.label}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>
            "{currentVisualStep.explanation}"
          </Text>
        </Flex>
      </Box>

      <SweepTrace
        traceTitle="Sweep & Trace: Valid Parentheses"
        steps={TRACE_STEPS}
        code={TRACE_CODE}
      />

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_FORCE} optimizedCode={OPTIMIZED} activeLines={currentVisualStep.activeLines} />
      </Box>
    </VStack>
  );
}
