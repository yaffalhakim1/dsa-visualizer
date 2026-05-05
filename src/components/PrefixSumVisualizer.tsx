import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";

import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";
import { InterviewWorkflow } from "./InterviewWorkflow";

const NUMS = [3, 1, 4, 1, 5, 9];

type StepStatus = 'init' | 'calculating' | 'done';

interface PrefixStep {
  P: (number | null)[];
  currIdx: number;
  status: StepStatus;
  explanation: string;
  activeLines: number[];
}

const STATUS_UI_MAP: Record<StepStatus, { color: string, label: string }> = {
  init: { color: "blue.500", label: "Initialize" },
  calculating: { color: "purple.500", label: "Building" },
  done: { color: "green.500", label: "Ready" },
};

const PYTHON_CODE = `def build_prefix(nums):
    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)
    return prefix

def range_sum(prefix, left, right):
    return prefix[right + 1] - prefix[left]`;

const generateSteps = (): PrefixStep[] => {
  const steps: PrefixStep[] = [];
  const P = new Array(NUMS.length + 1).fill(null);
  P[0] = 0;
  steps.push({
    P: [...P],
    currIdx: -1,
    status: 'init',
    explanation: "Start with leading zero: prefix = [0]",
    activeLines: [2]
  });
  for (let i = 0; i < NUMS.length; i++) {
    P[i + 1] = (P[i] || 0) + NUMS[i];
    steps.push({
      P: [...P],
      currIdx: i,
      status: 'calculating',
      explanation: `prefix[${i+1}] = prefix[${i}] + nums[${i}] = ${P[i]} + ${NUMS[i]} = ${P[i+1]}`,
      activeLines: [3, 4]
    });
  }
  steps[steps.length - 1].status = 'done';
  return steps;
};

const STEPS = generateSteps();

export function PrefixSumVisualizer() {
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
        <Heading size="md" mb={1}>Prefix Sum</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 6: Arrays & Strings</Text>
        <Box mb={6}><InterviewWorkflow current={6} /></Box>

        <Box p={3} bg="#faf6f0" borderRadius="lg" mb={6}>
          <Text fontSize="0.8rem" color="#6b6350">
            Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.
          </Text>
        </Box>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Build an array where each element stores the cumulative sum up to that point. Then any subarray sum can be computed in O(1) with a single subtraction.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Empty array? Single element? Negative numbers?</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Leading zero handles sum(0, i) uniformly.</Text>
          </Box>
        </Flex>

        <Box py={4}>
          <StepLabel num={3} title="Example" mb={3} />
          <Flex direction="column" align="center" gap={6}>
            <Box w="full">
              <Text fontSize="0.7rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" mb={3} textAlign="center" fontWeight="600">nums</Text>
              <Flex justify="center" align="center" gap={2}>
                {NUMS.map((val, i) => (
                  <motion.div
                    key={`n-${i}`}
                    animate={{
                      scale: i === currentVisualStep.currIdx ? 1.08 : 1,
                      borderColor: i === currentVisualStep.currIdx ? "#4a7db5" : "#e8e0d6",
                      backgroundColor: i === currentVisualStep.currIdx ? "#f0f6fd" : "#ffffff",
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: "10px", border: "2px solid #e8e0d6", fontSize: "1.125rem",
                      fontWeight: i === currentVisualStep.currIdx ? 700 : 500, color: "#1a1a2e",
                    }}
                  >
                    {val}
                  </motion.div>
                ))}
              </Flex>
            </Box>

            {currentVisualStep.status === 'calculating' && (
              <Box py={2} px={4} bg="#faf6f0" borderRadius="lg" fontSize="0.85rem" color="#6b6350" fontFamily="mono" textAlign="center">
                prefix[{currentVisualStep.currIdx + 1}] = prefix[{currentVisualStep.currIdx}] + nums[{currentVisualStep.currIdx}]
              </Box>
            )}

            <Box w="full">
              <Text fontSize="0.7rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" mb={3} textAlign="center" fontWeight="600">prefix</Text>
              <Flex justify="center" align="center" gap={2}>
                {currentVisualStep.P.map((val, i) => {
                  const isResult = i === currentVisualStep.currIdx + 1 && currentVisualStep.status === 'calculating';
                  const isSource = i === currentVisualStep.currIdx && currentVisualStep.status === 'calculating';
                  return (
                    <motion.div
                      key={`p-${i}`}
                      animate={{
                        scale: isResult ? 1.08 : 1,
                        borderColor: isResult ? "#4a9e6b" : isSource ? "#8b5cf6" : "#e8e0d6",
                        backgroundColor: isResult ? "#f0faf4" : isSource ? "#f5f0fd" : "#ffffff",
                      }}
                      transition={{ duration: 0.25 }}
                      style={{
                        width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: "10px", border: "2px solid #e8e0d6", fontSize: "1.125rem",
                        fontWeight: isResult ? 700 : isSource ? 600 : 500,
                        color: isResult ? "#4a9e6b" : isSource ? "#8b5cf6" : val === null ? "#c0b8b0" : "#1a1a2e",
                      }}
                    >
                      {val === null ? "?" : val}
                    </motion.div>
                  );
                })}
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={3}>
          <Flex justify="space-between" align="center">
            <Heading size="xs" textTransform="uppercase" color="#8b8589" letterSpacing="0.1em">Step</Heading>
            <Badge bg={uiConfig.color} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{uiConfig.label}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#4a7db5" pl={4}>
            "{currentVisualStep.explanation}"
          </Text>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">Loop from left to right each time you need a sum — O(n) per query. For m queries on n elements, thats O(m·n).</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Precompute cumulative sums once (O(n)). Then any range sum is just <Text as="span" fontFamily="mono" fontSize="0.8rem">prefix[R+1] - prefix[L]</Text> (O(1)).</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">
            Without prefix sums, every range sum query loops from L to R. For m queries, the same elements get summed over and over — each query duplicates work other queries already did.
          </Text>
        </Box>


      </Box>

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">Code</Heading>
        <SolutionCompare bruteForceCode={"# For sum(L, R):\n#   total = 0\n#   for i in range(L, R+1):\n#     total += nums[i]"} optimizedCode={PYTHON_CODE} activeLines={currentVisualStep.activeLines} />
      </Box>
    </VStack>
  );
}
