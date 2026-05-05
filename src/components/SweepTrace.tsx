import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface TraceStep {
  label: string;
  text: string;
  isAction?: boolean;
}

interface SweepTraceProps {
  traceTitle: string;
  steps: TraceStep[];
  code?: string;
}

export function SweepTrace({ traceTitle, steps, code }: SweepTraceProps) {
  return (
    <Box mt={6} p={6} bg="#faf6f0" borderRadius="xl" border="1px solid" borderColor="#e8e0d6" borderLeft="4px solid" borderLeftColor="#c9952e">
      <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>
        Sweep & Trace
      </Text>
      <Text fontSize="0.85rem" fontWeight={600} color="#1a1a2e" mb={4}>
        {traceTitle}
      </Text>
      <VStack gap={2.5} align="stretch">
        {steps.map((step, i) => (
          <Flex key={i} gap={2} align="flex-start">
            <Text fontSize="0.85rem" color="#c9952e" fontWeight={700} minW="8px" mt="1px">
              *
            </Text>
            <Box>
              <Text fontSize="0.82rem" color="#1a1a2e" as="span" fontWeight={600}>
                {step.label}
              </Text>
              <Text fontSize="0.82rem" color={step.isAction ? "#4a9e6b" : "#6b6350"} as="span">
                {step.label && step.text ? " " : ""}{step.text}
              </Text>
              {step.isAction && (
                <Text fontSize="0.78rem" color="#4a9e6b" fontStyle="italic" mt={0.5}>
                  {step.text}
                </Text>
              )}
            </Box>
          </Flex>
        ))}
      </VStack>
      {code && (
        <Box mt={5} borderRadius="md" overflow="hidden" border="1px solid" borderColor="#e8e0d6">
          <SyntaxHighlighter
            language="javascript"
            style={oneLight}
            customStyle={{ margin: 0, padding: "14px", background: "#ffffff", fontSize: "0.8rem" }}
          >
            {code}
          </SyntaxHighlighter>
        </Box>
      )}
    </Box>
  );
}
