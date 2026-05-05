import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";
import { InterviewWorkflow } from "./InterviewWorkflow";

const OPS = [
  { op: "push", val: -2 },
  { op: "push", val: 0 },
  { op: "push", val: -3 },
  { op: "getMin", val: undefined },
  { op: "pop", val: undefined },
  { op: "top", val: undefined },
  { op: "getMin", val: undefined },
];

const TRACE_STEPS = [
  { label: "push(-2):", text: "Main push -2. minStack is empty → also push -2. Main: [-2], Min: [-2]" },
  { label: "push(0):", text: "Main push 0. 0 > minStack top (-2) → minStack stays. Main: [-2, 0], Min: [-2]" },
  { label: "push(-3):", text: "Main push -3. -3 <= minStack top (-2) → also push -3. Main: [-2, 0, -3], Min: [-2, -3]" },
  { label: "getMin():", text: "Top of minStack is -3. Return -3. O(1)!", isAction: true },
  { label: "pop():", text: "Pop top of main (-3). -3 equals minStack top (-3) → pop minStack too. Main: [-2, 0], Min: [-2]" },
  { label: "top():", text: "Top of main stack is 0. Return 0. O(1)." },
  { label: "getMin():", text: "Top of minStack is -2. Return -2. O(1)!", isAction: true },
];

const TRACE_CODE = `class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    push(x) {
        this.stack.push(x);
        if (!this.minStack.length ||
            x <= this.minStack.at(-1))
            this.minStack.push(x);
    }
    pop() {
        if (this.stack.pop() ===
            this.minStack.at(-1))
            this.minStack.pop();
    }
    top() { return this.stack.at(-1); }
    getMin() { return this.minStack.at(-1); }
}`;

type Action = "init" | "push" | "pop" | "top" | "getMin" | "done";

interface MinStackStep {
  stack: number[];
  minStack: number[];
  opIdx: number;
  action: Action;
  topVal: number | undefined;
  minVal: number | undefined;
  explanation: string;
  activeLines: number[];
}

const STATUS_MAP: Record<Action, { color: string; label: string }> = {
  init: { color: "blue.500", label: "Start" },
  push: { color: "purple.500", label: "Push" },
  pop: { color: "orange.500", label: "Pop" },
  top: { color: "teal.500", label: "Top" },
  getMin: { color: "green.500", label: "getMin" },
  done: { color: "green.500", label: "Done" },
};

const BRUTE_JS = `// Brute: scan whole stack for min
class MinStack {
  constructor() { this.stack = []; }
  push(x) { this.stack.push(x); }
  pop() { this.stack.pop(); }
  top() { return this.stack.at(-1); }
  getMin() {
    let min = Infinity;
    for (let v of this.stack)
      min = Math.min(min, v);
    return min;
  }
}`;

const BEST_JS = `// Optimized: dual-stack O(1) getMin
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(x) {
    this.stack.push(x);
    if (!this.minStack.length ||
        x <= this.minStack.at(-1))
      this.minStack.push(x);
  }
  pop() {
    if (this.stack.pop() ===
        this.minStack.at(-1))
      this.minStack.pop();
  }
  top() { return this.stack.at(-1); }
  getMin() { return this.minStack.at(-1); }
}`;

function generateSteps(): MinStackStep[] {
  const steps: MinStackStep[] = [];
  const stack: number[] = [];
  const minStack: number[] = [];

  steps.push({
    stack: [], minStack: [],
    opIdx: -1, action: "init",
    topVal: undefined, minVal: undefined,
    explanation: "Start with two empty stacks: main stack and minStack. Every push also pushes to minStack if the value <= current min.",
    activeLines: [4, 5],
  });

  for (let i = 0; i < OPS.length; i++) {
    const { op, val } = OPS[i];

    if (op === "push" && val !== undefined) {
      stack.push(val);
      if (minStack.length === 0 || val <= minStack[minStack.length - 1]) {
        minStack.push(val);
      }
      steps.push({
        stack: [...stack],
        minStack: [...minStack],
        opIdx: i, action: "push",
        topVal: val, minVal: minStack[minStack.length - 1],
        explanation: `Push ${val}. Main stack gets ${val}. Min stack ${val <= (minStack.length > 0 ? minStack[minStack.length - 1] : Infinity) ? `also gets ${val} (new min)` : `stays at ${minStack[minStack.length - 1]}` }.`,
        activeLines: [9, 10, 11, 12],
      });
    } else if (op === "pop") {
      const popped = stack.pop();
      if (popped !== undefined && minStack.length > 0 && popped === minStack[minStack.length - 1]) {
        minStack.pop();
      }
      steps.push({
        stack: [...stack],
        minStack: [...minStack],
        opIdx: i, action: "pop",
        topVal: stack.length > 0 ? stack[stack.length - 1] : undefined,
        minVal: minStack.length > 0 ? minStack[minStack.length - 1] : undefined,
        explanation: `Pop ${popped}. Main stack removes top. ${popped === (minStack.length > 0 ? minStack[minStack.length - 1] : undefined) ? "Same as current min, so minStack pops too." : "MinStack unchanged."}`,
        activeLines: [14, 15, 16, 17],
      });
    } else if (op === "top") {
      steps.push({
        stack: [...stack],
        minStack: [...minStack],
        opIdx: i, action: "top",
        topVal: stack.length > 0 ? stack[stack.length - 1] : undefined,
        minVal: minStack.length > 0 ? minStack[minStack.length - 1] : undefined,
        explanation: `Top of stack is ${stack.length > 0 ? stack[stack.length - 1] : "undefined"}. O(1).`,
        activeLines: [18],
      });
    } else if (op === "getMin") {
      steps.push({
        stack: [...stack],
        minStack: [...minStack],
        opIdx: i, action: "getMin",
        topVal: stack.length > 0 ? stack[stack.length - 1] : undefined,
        minVal: minStack.length > 0 ? minStack[minStack.length - 1] : undefined,
        explanation: `getMin() = ${minStack.length > 0 ? minStack[minStack.length - 1] : "undefined"}. Top of minStack. O(1).`,
        activeLines: [19],
      });
    }
  }

  steps.push({
    stack: [...stack],
    minStack: [...minStack],
    opIdx: OPS.length, action: "done",
    topVal: undefined, minVal: undefined,
    explanation: "All operations complete. Dual-stack design gives O(1) push, pop, top, and getMin.",
    activeLines: [9, 14, 18, 19],
  });

  return steps;
}

const STEPS = generateSteps();

export function MinStackVisualizer() {
  const { setTotalSteps, reset, setActiveLines, currentStep, isPlaying, playbackSpeed, nextStep } = useAlgorithmStore();
  const s = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);
  const ui = STATUS_MAP[s.action];

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
        <Heading size="md" mb={1}>Min Stack</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 8: Stacks & Queues — Dual-Stack Pattern</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Design a stack that supports push, pop, top, and getMin — all in O(1) time.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Duplicate values allowed. pop/top/getMin on empty stack undefined.</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Text fontSize="0.75rem" color="#8b8589" mb={2}>Operations: push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()</Text>

        <Flex gap={6} justify="center" minH="280px">
          <VStack align="center">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Main Stack</Text>
            <Box w="80px" minH="200px" bg="#faf6f0" borderRadius="lg" border="2px dashed" borderColor="#e0d8d0" display="flex" flexDirection="column-reverse" alignItems="center" p={2}>
              <AnimatePresence>
                {s.stack.map((val, i) => (
                  <motion.div key={`main-${i}-${val}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.25 }} style={{ marginBottom: "4px" }}>
                    <Flex w="56px" h="40px" align="center" justify="center" borderRadius="md" bg="#1a1a2e" color="white" fontSize="0.9rem" fontWeight={700}>{val}</Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
              {s.stack.length === 0 && <Text fontSize="0.7rem" color="#c0b8b0" fontStyle="italic">empty</Text>}
            </Box>
          </VStack>

          <VStack align="center">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Min Stack</Text>
            <Box w="80px" minH="200px" bg="#f0faf4" borderRadius="lg" border="2px dashed" borderColor="#cce0d4" display="flex" flexDirection="column-reverse" alignItems="center" p={2}>
              <AnimatePresence>
                {s.minStack.map((val, i) => (
                  <motion.div key={`min-${i}-${val}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.25 }} style={{ marginBottom: "4px" }}>
                    <Flex w="56px" h="40px" align="center" justify="center" borderRadius="md" bg="#2a6b4a" color="white" fontSize="0.9rem" fontWeight={700}>{val}</Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
              {s.minStack.length === 0 && <Text fontSize="0.7rem" color="#c0b8b0" fontStyle="italic">empty</Text>}
            </Box>
          </VStack>
        </Flex>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4}>
          <Flex justify="space-between" align="center">
            <Flex gap={4}>
              <Text fontSize="sm" color="#8b8589">Top: <Box as="span" fontWeight={700} color="#1a1a2e">{s.topVal ?? "—"}</Box></Text>
              <Text fontSize="sm" color="#8b8589">Min: <Box as="span" fontWeight={700} color="#2a6b4a">{s.minVal ?? "—"}</Box></Text>
            </Flex>
            <Badge bg={ui.color} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{ui.label}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Scan entire stack for min on every getMin(). O(n) per call, push/pop/top are O(1).</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Maintain a second minStack. Push to it whenever new val &lt;= current min. Pop from it when main stack pops the min. getMin is O(1).</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">getMin scans all n elements — O(n). Cannot improve without tracking minimums alongside stack operations.</Text>
        </Box>
      </Box>

      <SweepTrace
        traceTitle="Sweep & Trace: Min Stack"
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
