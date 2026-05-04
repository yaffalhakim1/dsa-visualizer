import { Box, Flex, Text } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SolutionCompareProps {
  bruteForceCode: string;
  optimizedCode: string;
  activeLines?: number[];
}

export function SolutionCompare({ bruteForceCode, optimizedCode, activeLines = [] }: SolutionCompareProps) {
  return (
    <Flex gap={4} mt={6} direction={{ base: "column", lg: "row" }}>
      <Box flex="1" p={4} bg="red.50" borderRadius="md" border="1px solid" borderColor="red.100">
        <Text fontWeight="bold" color="red.800" mb={2}>Brute Force</Text>
        <Box borderRadius="sm" overflow="hidden" fontSize="sm">
          <SyntaxHighlighter 
            language="python" 
            style={oneLight}
            customStyle={{ margin: 0, padding: '12px', background: 'white' }}
          >
            {bruteForceCode}
          </SyntaxHighlighter>
        </Box>
      </Box>
      <Box flex="1" p={4} bg="green.50" borderRadius="md" border="1px solid" borderColor="green.100">
        <Text fontWeight="bold" color="green.800" mb={2}>Optimized (Active Highlight)</Text>
        <Box borderRadius="sm" overflow="hidden" fontSize="sm">
          <SyntaxHighlighter 
            language="python" 
            style={oneLight}
            wrapLines={true}
            lineProps={(lineNumber) => ({
              style: {
                display: "block",
                backgroundColor: activeLines.includes(lineNumber) ? "#c6f6d5" : "transparent",
                transition: "background-color 0.2s"
              }
            })}
            customStyle={{ margin: 0, padding: '12px', background: 'white' }}
          >
            {optimizedCode}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Flex>
  );
}
