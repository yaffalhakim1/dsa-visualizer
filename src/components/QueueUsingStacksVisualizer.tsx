import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { SweepTrace } from "./SweepTrace";
import { InterviewWorkflow } from "./InterviewWorkflow";

const OPS = [
  { op: "push", val: 1 },
  { op: "push", val: 2 },
  { op: "peek", val: undefined },
  { op: "pop", val: undefined },
  { op: "empty", val: undefined },
];

const TRACE_STEPS = [
  { label: "push(1):", text: "Push 1 onto inStack. inStack: [1], outStack: []" },
  { label: "push(2):", text: "Push 2 onto inStack. inStack: [1, 2], outStack: []" },
  { label: "peek():", text: "outStack is empty → drain inStack into outStack (pop from inStack, push to outStack). inStack: [], outStack: [2, 1]. Peek = top of outStack = 1." },
  { label: "pop():", text: "outStack has values → pop directly. Pop 1 from outStack. inStack: [], outStack: [2]." },
  { label: "empty():", text: "inStack is empty, outStack has [2] → not empty. Return false." },
  { label: "Key insight:", text: "Each element moves from inStack → outStack at most once per lifetime. Amortized O(1) for all operations.", isAction: true },
];

const TRACE_CODE = `class MyQueue {
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }
    push(x) { this.inStack.push(x); }
    pop() {
        this._shiftStacks();
        return this.outStack.pop();
    }
    peek() {
        this._shiftStacks();
        return this.outStack.at(-1);
    }
    empty() {
        return !this.inStack.length &&
               !this.outStack.length;
    }
    _shiftStacks() {
        if (!this.outStack.length) {
            while (this.inStack.length)
                this.outStack.push(this.inStack.pop());
        }
    }
}`;

type Action = "init" | "push" | "peek" | "pop" | "empty" | "done";

interface QueueStep {
  inStack: number[];
  outStack: number[];
  opIdx: number;
  action: Action;
  frontVal: number | undefined;
  explanation: string;
  activeLines: number[];
}

const STATUS_MAP: Record<Action, { color: string; label: string }> = {
  init: { color: "blue.500", label: "Start" },
  push: { color: "purple.500", label: "Push" },
  peek: { color: "teal.500", label: "Peek" },
  pop: { color: "orange.500", label: "Pop" },
  empty: { color: "gray.500", label: "empty?" },
  done: { color: "green.500", label: "Done" },
};

const BRUTE_JS = `// Brute: one-stack, shift-on-push
class MyQueue {
  constructor() { this.s = []; }
  push(x) {
    const t = [];
    while (this.s.length) t.push(this.s.pop());
    t.push(x);
    while (t.length) this.s.push(t.pop());
  }
  pop() { return this.s.pop(); }
  peek() { return this.s.at(-1); }
  empty() { return !this.s.length; }
}`;

const BEST_JS = `// Optimized: two-stack amortized O(1)
class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  push(x) { this.inStack.push(x); }
  pop() {
    this._shiftStacks();
    return this.outStack.pop();
  }
  peek() {
    this._shiftStacks();
    return this.outStack.at(-1);
  }
  empty() {
    return !this.inStack.length &&
           !this.outStack.length;
  }
  _shiftStacks() {
    if (!this.outStack.length) {
      while (this.inStack.length)
        this.outStack.push(this.inStack.pop());
    }
  }
}`;

function generateSteps(): QueueStep[] {
  const steps: QueueStep[] = [];
  const inStack: number[] = [];
  const outStack: number[] = [];

  const shiftStacks = () => {
    if (outStack.length === 0) {
      while (inStack.length > 0) {
        outStack.push(inStack.pop()!);
      }
    }
  };

  steps.push({
    inStack: [], outStack: [],
    opIdx: -1, action: "init",
    frontVal: undefined,
    explanation: "Use two stacks. Push goes to inStack. Pop/peek drain inStack into outStack once (amortized O(1)).",
    activeLines: [3, 4],
  });

  for (let i = 0; i < OPS.length; i++) {
    const { op, val } = OPS[i];

    if (op === "push" && val !== undefined) {
      inStack.push(val);
      steps.push({
        inStack: [...inStack], outStack: [...outStack],
        opIdx: i, action: "push",
        frontVal: outStack.length > 0 ? outStack[outStack.length - 1] : inStack[0],
        explanation: `Push ${val} onto inStack. O(1).`,
        activeLines: [7],
      });
    } else if (op === "peek") {
      const wasShifted = outStack.length === 0 && inStack.length > 0;
      shiftStacks();
      const front = outStack.length > 0 ? outStack[outStack.length - 1] : undefined;
      steps.push({
        inStack: [...inStack], outStack: [...outStack],
        opIdx: i, action: "peek",
        frontVal: front,
        explanation: wasShifted
          ? `Peek: outStack empty → drain inStack into outStack. Front = ${front}.`
          : `Peek: outStack already has values. Front = ${front}.`,
        activeLines: [12, 13],
      });
    } else if (op === "pop") {
      const wasShifted = outStack.length === 0 && inStack.length > 0;
      shiftStacks();
      const popped = outStack.length > 0 ? outStack.pop()! : undefined;
      steps.push({
        inStack: [...inStack], outStack: [...outStack],
        opIdx: i, action: "pop",
        frontVal: outStack.length > 0 ? outStack[outStack.length - 1] : (inStack.length > 0 ? inStack[0] : undefined),
        explanation: wasShifted
          ? `Pop: shift stacks, then pop ${popped} from outStack.`
          : `Pop: pop ${popped} from outStack directly.`,
        activeLines: [9, 10, 11],
      });
    } else if (op === "empty") {
      steps.push({
        inStack: [...inStack], outStack: [...outStack],
        opIdx: i, action: "empty",
        frontVal: outStack.length > 0 ? outStack[outStack.length - 1] : (inStack.length > 0 ? inStack[0] : undefined),
        explanation: `empty? → ${inStack.length === 0 && outStack.length === 0}.`,
        activeLines: [15, 16, 17],
      });
    }
  }

  steps.push({
    inStack: [...inStack], outStack: [...outStack],
    opIdx: OPS.length, action: "done",
    frontVal: undefined,
    explanation: "Two stacks give amortized O(1) push, pop, and peek. Each element moves from inStack to outStack at most once.",
    activeLines: [7, 9, 12, 20, 21, 22],
  });

  return steps;
}

const STEPS = generateSteps();

export function QueueUsingStacksVisualizer() {
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
        <Heading size="md" mb={1}>Implement Queue Using Stacks</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 8: Stacks & Queues — Two-Stack Queue</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Implement a FIFO queue using only stack operations. Support push, pop, peek, and empty in amortized O(1).</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">pop/peek on empty queue → undefined. Only use push and pop from arrays.</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Text fontSize="0.75rem" color="#8b8589" mb={2}>Operations: push(1), push(2), peek(), pop(), empty()</Text>

        <Flex gap={6} justify="center" minH="280px">
          <VStack align="center">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>inStack (push here)</Text>
            <Box w="80px" minH="200px" bg="#f5f0eb" borderRadius="lg" border="2px dashed" borderColor="#e0d8d0" display="flex" flexDirection="column-reverse" alignItems="center" p={2}>
              <AnimatePresence>
                {s.inStack.map((val, i) => (
                  <motion.div key={`in-${i}-${val}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.25 }} style={{ marginBottom: "4px" }}>
                    <Flex w="56px" h="40px" align="center" justify="center" borderRadius="md" bg="#8b5cf6" color="white" fontSize="0.9rem" fontWeight={700}>{val}</Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
              {s.inStack.length === 0 && <Text fontSize="0.7rem" color="#c0b8b0" fontStyle="italic">empty</Text>}
            </Box>
          </VStack>

          <VStack align="center">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>outStack (pop from here)</Text>
            <Box w="80px" minH="200px" bg="#f0faf4" borderRadius="lg" border="2px dashed" borderColor="#cce0d4" display="flex" flexDirection="column-reverse" alignItems="center" p={2}>
              <AnimatePresence>
                {s.outStack.map((val, i) => (
                  <motion.div key={`out-${i}-${val}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.25 }} style={{ marginBottom: "4px" }}>
                    <Flex w="56px" h="40px" align="center" justify="center" borderRadius="md" bg="#4a7db5" color="white" fontSize="0.9rem" fontWeight={700}>{val}</Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
              {s.outStack.length === 0 && <Text fontSize="0.7rem" color="#c0b8b0" fontStyle="italic">empty</Text>}
            </Box>
          </VStack>
        </Flex>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4} mb={8}>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="#8b8589">Front: <Box as="span" fontWeight={700} color="#1a1a2e">{s.frontVal ?? "—"}</Box></Text>
            <Badge bg={ui.color} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{ui.label}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={8}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Use one stack: to push, reverse the entire stack with a temp stack. O(n) per push.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Two stacks: inStack for pushes, outStack for pops. Drain inStack into outStack only when outStack is empty. Amortized O(1) for all operations.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">The one-stack approach reverses the whole stack on every push — O(n) per operation. Must amortize the cost.</Text>
        </Box>
      </Box>

      <SweepTrace
        traceTitle="Sweep & Trace: Queue Using Stacks"
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
