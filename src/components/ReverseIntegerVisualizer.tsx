import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { InterviewWorkflow } from "./InterviewWorkflow";

const INPUT = 123;

interface MathStep {
  digit: number;
  result: number;
  remaining: number;
  done: boolean;
  explanation: string;
  activeLines: number[];
}

const BRUTE_FORCE = `def reverse(x):
    sign = -1 if x < 0 else 1
    rev = int(str(abs(x))[::-1])
    return sign * rev if -(2**31) <= rev <= 2**31-1 else 0`;

const OPTIMIZED = `def reverse(x):
    sign = -1 if x < 0 else 1
    x = abs(x)
    res = 0
    while x:
        res = res * 10 + (x % 10)
        x //= 10
    res *= sign
    return res if -(2**31) <= res <= 2**31-1 else 0`;

function generateSteps(): MathStep[] {
  const steps: MathStep[] = [];
  let x = Math.abs(INPUT);
  let res = 0;
  steps.push({ digit: -1, result: res, remaining: x, done: false, explanation: "Start with input 123. Extract digits from right to left.", activeLines: [4, 5] });
  while (x > 0) {
    const d = x % 10;
    res = res * 10 + d;
    x = Math.floor(x / 10);
    steps.push({ digit: d, result: res, remaining: x, done: false, explanation: `Pop ${d} off the right. Push into result. result = ${res}, remaining = ${x}`, activeLines: [6, 7, 8] });
  }
  steps.push({ digit: -1, result: res, remaining: 0, done: true, explanation: `Done! Reversed: ${res}${INPUT < 0 ? ' (sign restored)' : ''}`, activeLines: [9, 10] });
  return steps;
}

const STEPS = generateSteps();

export function ReverseIntegerVisualizer() {
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
        <Heading size="md" mb={1}>Reverse Integer</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 20: Math & Numbers</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given a 32-bit integer, reverse its digits. If overflow occurs, return 0.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Negative numbers → preserve sign</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Trailing zeros → 120 → 21</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Overflow → return 0</Text>
          </Box>
        </Flex>

        <StepLabel num={3} title="Example" mb={3} />
        <Box pb={4}>
          <Flex direction="column" align="center" gap={6}>
            <Flex align="center" gap={4}>
              <Box textAlign="center">
                <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Input</Text>
                <Flex w="80px" h="60px" align="center" justify="center" borderRadius="lg" bg="#f5f0eb" border="2px solid" borderColor="#e8e0d6" fontSize="1.25rem" fontWeight={700} color="#1a1a2e">{INPUT}</Flex>
              </Box>
              {s.digit >= 0 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <Box textAlign="center">
                    <Text fontSize="0.65rem" color="#c94a6b" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Popped</Text>
                    <Flex w="60px" h="60px" align="center" justify="center" borderRadius="lg" bg="#fdf6f5" border="2px solid" borderColor="#c94a6b" fontSize="1.25rem" fontWeight={700} color="#c94a6b">{s.digit}</Flex>
                  </Box>
                </motion.div>
              )}
              <motion.div animate={{ scale: s.result !== 0 ? [1, 1.05, 1] : 1 }} transition={{ duration: 0.3 }}>
                <Box textAlign="center">
                  <Text fontSize="0.65rem" color="#4a9e6b" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Result</Text>
                  <Flex w="100px" h="60px" align="center" justify="center" borderRadius="lg" bg={s.done ? "#f0faf4" : "white"} border="2px solid" borderColor={s.done ? "#4a9e6b" : "#e8e0d6"} fontSize="1.25rem" fontWeight={700} color={s.done ? "#4a9e6b" : "#1a1a2e"}>{s.result}</Flex>
                </Box>
              </motion.div>
            </Flex>
            {s.remaining > 0 && (
              <Box textAlign="center">
                <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Remaining</Text>
                <Text fontFamily="mono" fontSize="1.5rem" fontWeight={700} color="#8b8589">{s.remaining}</Text>
              </Box>
            )}
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={4}>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">result: <Box as="span" fontWeight={600} color="#4a9e6b">{s.result}</Box></Text>
              <Text fontFamily="mono" fontSize="sm" color="#8b8589">remaining: <Box as="span" fontWeight={600} color="#8b8589">{s.remaining}</Box></Text>
            </Flex>
            <Badge bg={s.done ? "green.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.done ? 'Done' : 'Extracting'}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Convert to string, reverse, convert back. Simple but dodges the arithmetic exercise.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Pop digits with modulo 10, push into result by multiplying by 10 and adding. Pure arithmetic, O(d) time, O(1) space.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">String conversion works but does not teach the core arithmetic pattern. Real interview value is showing you can manipulate digits mathematically.</Text>
        </Box>


      </Box>

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_FORCE} optimizedCode={OPTIMIZED} activeLines={s.activeLines} />
      </Box>
    </VStack>
  );
}
