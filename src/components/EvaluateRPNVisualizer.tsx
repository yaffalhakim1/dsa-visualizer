import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";
import { InterviewWorkflow } from "./InterviewWorkflow";

const TOKENS = ["2", "1", "+", "3", "*"];
const OPERATORS = new Set(["+", "-", "*", "/"]);

const TRACE_STEPS = [
  { label: "Token '2':", text: "Operand. Push 2 onto stack. Stack: [2]" },
  { label: "Token '1':", text: "Operand. Push 1 onto stack. Stack: [2, 1]" },
  { label: "Token '+':", text: "Operator. Pop 1, pop 2. Compute 2 + 1 = 3. Push 3. Stack: [3]" },
  { label: "Token '3':", text: "Operand. Push 3 onto stack. Stack: [3, 3]" },
  { label: "Token '*':", text: "Operator. Pop 3, pop 3. Compute 3 * 3 = 9. Push 9. Stack: [9]" },
  { label: "Result:", text: "Stack has one element: 9. Return 9.", isAction: true },
];

const TRACE_CODE = `function evalRPN(tokens) {
    const stack = [];
    for (const t of tokens) {
        if (!isNaN(t)) {
            stack.push(Number(t));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            if (t === '+') stack.push(a + b);
            else if (t === '-') stack.push(a - b);
            else if (t === '*') stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        }
    }
    return stack[0];
}`;

interface RPNStep {
  idx: number;
  stack: number[];
  token: string;
  isOperator: boolean;
  result: number | null;
  explanation: string;
  activeLines: number[];
}

const BRUTE_JS = `// Brute/Naive: recursively parse
// No clean brute for RPN — it's naturally O(n)
// The "brute" is misunderstanding Reverse
// Polish Notation and trying infix parsing.

function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (!isNaN(t)) stack.push(+t);
    else {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(compute(a, b, t));
    }
  }
  return stack[0];
}`;

const BEST_JS = `// RPN: stack-based O(n) evaluation
function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (t === "+") stack.push(stack.pop() + stack.pop());
    else if (t === "-") {
      const b = stack.pop(), a = stack.pop();
      stack.push(a - b);
    }
    else if (t === "*") stack.push(stack.pop() * stack.pop());
    else if (t === "/") {
      const b = stack.pop(), a = stack.pop();
      stack.push(Math.trunc(a / b));
    }
    else stack.push(Number(t));
  }
  return stack[0];
}`;

function compute(a: number, b: number, op: string): number {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return Math.trunc(a / b);
    default: return 0;
  }
}

function generateSteps(): RPNStep[] {
  const steps: RPNStep[] = [];
  const stack: number[] = [];

  steps.push({
    idx: -1, stack: [], token: "", isOperator: false, result: null,
    explanation: "RPN: operands first, then operator. When you see an operator, pop the last two operands, compute, push result.",
    activeLines: [3],
  });

  for (let i = 0; i < TOKENS.length; i++) {
    const t = TOKENS[i];
    if (OPERATORS.has(t)) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      const res = compute(a, b, t);
      stack.push(res);
      steps.push({
        idx: i, stack: [...stack], token: t, isOperator: true, result: res,
        explanation: `Operator "${t}": pop ${b}, pop ${a} → ${a} ${t} ${b} = ${res}. Push ${res} back.`,
        activeLines: [6, 7, 8, 17],
      });
    } else {
      stack.push(Number(t));
      steps.push({
        idx: i, stack: [...stack], token: t, isOperator: false, result: null,
        explanation: `Operand ${t}: push onto stack. Stack now has ${stack.length} value(s).`,
        activeLines: [5],
      });
    }
  }

  steps.push({
    idx: TOKENS.length, stack: [...stack], token: "", isOperator: false, result: stack[0],
    explanation: `Done. Final result is ${stack[0]}.`,
    activeLines: [10],
  });

  return steps;
}

const STEPS = generateSteps();

export function EvaluateRPNVisualizer() {
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
        <Heading size="md" mb={1}>Evaluate Reverse Polish Notation</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 8: Stacks & Queues — Postfix Evaluation</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Evaluate an arithmetic expression in Reverse Polish Notation (postfix). Valid operators are +, -, *, /. Division truncates toward zero.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Division truncates toward zero. No division by zero. Input always valid.</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Text fontSize="0.75rem" color="#8b8589" mb={3}>"{TOKENS.join(" ")}" = ((2 + 1) * 3) = 9</Text>

        <Flex gap={6} align="flex-start" justify="center">
          <VStack align="center">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Tokens</Text>
            <Flex gap={2}>
              {TOKENS.map((t, i) => {
                const isCurrent = i === s.idx;
                const isPast = i < s.idx;
                const isOp = OPERATORS.has(t);
                return (
                  <motion.div key={i} animate={{ scale: isCurrent ? 1.12 : 1, y: isCurrent ? -4 : 0 }} transition={{ duration: 0.2 }}>
                    <Flex w="52px" h="52px" align="center" justify="center" borderRadius="lg" border="2px solid" borderColor={isCurrent ? "#c9952e" : isPast ? "#e0d8d0" : "#e8e0d6"} bg={isOp ? "#faf6f0" : isCurrent ? "#faf6f0" : isPast ? "#f5f0eb" : "white"} fontSize="1.1rem" fontWeight={isCurrent ? 700 : 500} color={isOp ? "#c9952e" : "#1a1a2e"} opacity={isPast && !isCurrent ? 0.4 : 1}>{t}</Flex>
                  </motion.div>
                );
              })}
            </Flex>
          </VStack>

          <Box w="1px" bg="#e8e0d6" alignSelf="stretch" />

          <VStack align="center" minW="120px">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Stack</Text>
            <Box w="80px" minH="180px" bg="#faf6f0" borderRadius="lg" border="2px dashed" borderColor="#e0d8d0" display="flex" flexDirection="column-reverse" alignItems="center" p={2}>
              <AnimatePresence>
                {s.stack.map((val, i) => (
                  <motion.div key={`${val}-${i}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.25 }} style={{ marginBottom: "4px" }}>
                    <Flex w="56px" h="40px" align="center" justify="center" borderRadius="md" bg="#1a1a2e" color="white" fontSize="0.9rem" fontWeight={700}>{val}</Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
              {s.stack.length === 0 && <Text fontSize="0.7rem" color="#c0b8b0" fontStyle="italic">empty</Text>}
            </Box>
          </VStack>
        </Flex>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4} mb={8}>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="#8b8589">Stack size: <Box as="span" fontWeight={700} color="#1a1a2e">{s.stack.length}</Box></Text>
            <Badge bg={s.isOperator ? "orange.500" : s.idx < TOKENS.length ? "purple.500" : "green.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.isOperator ? "Compute" : s.idx < TOKENS.length ? "Push" : "Done"}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={8}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Could recursively parse the postfix expression into a tree, then evaluate bottom-up. More complex, still O(n) but extra memory for the tree.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Stack-based: push numbers, pop two for operators, push result. One pass, O(n).</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">The recursive tree approach uses extra O(n) memory for nodes. Stack-based evaluation is more memory-efficient and simpler.</Text>
        </Box>
      </Box>

      <SweepTrace
        traceTitle="Sweep & Trace: Evaluate RPN"
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
