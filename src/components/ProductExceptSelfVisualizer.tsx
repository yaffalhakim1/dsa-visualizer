import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";
import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";

const DATA = [1, 2, 3, 4];

interface PESStep {
  prefixIdx: number;
  suffixIdx: number;
  prefix: number[];
  suffix: number[];
  result: number[];
  stage: 'prefix' | 'suffix' | 'done';
  explanation: string;
  activeLines: number[];
}

const BRUTE_JS = `function productExceptSelf(nums) {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (j !== i) product *= nums[j];
    }
    result.push(product);
  }
  return result;
}`;

const BEST_JS = `function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);
  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}`;

function genSteps() {
  const steps: PESStep[] = [];
  const n = DATA.length;
  steps.push({ prefixIdx: -1, suffixIdx: -1, prefix: [], suffix: [], result: new Array(n).fill(1), stage: 'prefix', explanation: "Two passes: prefix builds product of elements to the left. Suffix multiplies by product to the right.", activeLines: [3, 4] });

  let prefix = 1;
  const prefixArr: number[] = [];
  for (let i = 0; i < n; i++) {
    prefixArr[i] = prefix;
    prefix *= DATA[i];
    steps.push({ prefixIdx: i, suffixIdx: -1, prefix: [...prefixArr], suffix: [], result: [...prefixArr, ...new Array(n - i - 1).fill(1)], stage: 'prefix', explanation: `Prefix pass: result[${i}] = ${prefixArr[i]} (product of everything to left of ${DATA[i]})`, activeLines: [5, 6, 7] });
  }

  let suffix = 1;
  const suffixArr: number[] = [];
  const result = [...prefixArr];
  for (let i = n - 1; i >= 0; i--) {
    suffixArr[i] = suffix;
    result[i] = prefixArr[i] * suffix;
    suffix *= DATA[i];
    const isLast = i === 0;
    steps.push({ prefixIdx: -1, suffixIdx: i, prefix: prefixArr, suffix: suffixArr, result: [...result], stage: isLast ? 'done' : 'suffix', explanation: isLast ? `Done! result[${i}] = ${prefixArr[i]} * ${suffixArr[i]} = ${result[i]}` : `Suffix pass: result[${i}] = ${prefixArr[i]} * ${suffixArr[i]} = ${result[i]}`, activeLines: [9, 10, 11] });
  }
  return steps;
}

const STEPS = genSteps();

export function ProductExceptSelfVisualizer() {
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
        <Heading size="md" mb={1}>Product of Array Except Self</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Ch 6: Arrays & Strings — Prefix/Suffix Product</Text>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Return array where result[i] = product of all elements except nums[i]. Cannot use division. O(n) time.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Contains zeros? Multiple zeros?</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Two zeros → result all zeros</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Minimum array length is 2</Text>
          </Box>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">For each index, loop through all elements except i and multiply. O(n²) — extra nested loop per element.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">Prefix pass: product of all elements to left. Suffix pass: multiply by product of all to right. O(n), no division.</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">For each position, looping through all n-1 other elements means O(n²). The products for positions 0 and 1 share most of the same multiplications — pure waste.</Text>
        </Box>

        <StepLabel num={3} title="Example" mb={3} />
        <Box pb={4}>
          <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Original</Text>
          <Flex justify="center" gap={2} mb={4}>
            {DATA.map((val, i) => (
              <Flex key={i} w="52px" h="48px" align="center" justify="center" borderRadius="md" border="2px solid" borderColor={s.stage === 'prefix' && i <= s.prefixIdx ? "#4a7db5" : s.stage === 'suffix' && i >= s.suffixIdx ? "#c94a6b" : "#e8e0d6"} bg="white" fontSize="1rem" fontWeight={600} color="#1a1a2e">{val}</Flex>
            ))}
          </Flex>
          <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={2}>Result</Text>
          <Flex justify="center" gap={2}>
            {s.result.map((val, i) => (
              <motion.div key={i} animate={{ scale: s.result[i] !== (i === 0 ? 1 : s.result[i-1] !== s.result[i]) ? [1, 1.05, 1] : 1 }}>
                <Flex w="52px" h="48px" align="center" justify="center" borderRadius="md" border="2px solid" borderColor={s.stage === 'done' ? "#4a9e6b" : "#e8e0d6"} bg={s.stage === 'done' ? "#f0faf4" : "white"} fontSize="0.85rem" fontWeight={600} color={s.stage === 'done' ? "#4a9e6b" : "#1a1a2e"}>{val}</Flex>
              </motion.div>
            ))}
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Badge bg={s.stage === 'done' ? "green.500" : s.stage === 'prefix' ? "blue.500" : "purple.500"} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{s.stage === 'prefix' ? 'Prefix Pass' : s.stage === 'suffix' ? 'Suffix Pass' : 'Done'}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>"{s.explanation}"</Text>
        </Flex>
      </Box>
      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">JS Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_JS} optimizedCode={BEST_JS} activeLines={s.activeLines} />
      </Box>
    </VStack>
  );
}
