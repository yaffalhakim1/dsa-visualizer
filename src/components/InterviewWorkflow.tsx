import { Flex, Text } from "@chakra-ui/react";

const STEPS = [
  "Restate",
  "Clarify",
  "Example",
  "Baseline",
  "Bottleneck",
  "Refine",
  "Implement",
];

interface InterviewWorkflowProps {
  current?: number;
}

export function InterviewWorkflow({ current = 0 }: InterviewWorkflowProps) {
  return (
    <Flex gap={1.5} wrap="wrap" mb={5}>
      {STEPS.map((step, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <Flex
            key={step}
            align="center"
            gap={1.5}
            px={2.5}
            py={1.5}
            borderRadius="full"
            bg={isActive ? "#c9952e" : isDone ? "#f0faf4" : "white"}
            border="1.5px solid"
            borderColor={isActive ? "#c9952e" : isDone ? "#4a9e6b" : "#e0d8d0"}
          >
            <Flex
              w="18px" h="18px" borderRadius="full"
              align="center" justify="center"
              bg={isActive ? "white" : isDone ? "#4a9e6b" : "#c0b8b0"}
              fontSize="0.6rem"
              fontWeight={700}
              color={isActive ? "#c9952e" : "white"}
            >
              {isDone ? "✓" : i + 1}
            </Flex>
            <Text
              fontSize="0.75rem"
              fontWeight={isActive ? 600 : isDone ? 500 : 400}
              color={isActive ? "white" : isDone ? "#4a9e6b" : "#8b8589"}
            >
              {step}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}
