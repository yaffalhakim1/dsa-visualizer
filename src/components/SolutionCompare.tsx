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
      <Box flex="1" p={4} bg="#fdf6f5" borderRadius="md" border="1px solid" borderColor="#f0ddd4">
        <Text fontWeight="600" color="#8b3a2a" mb={2} fontSize="sm" letterSpacing="0.02em">Brute Force</Text>
        <Box borderRadius="sm" overflow="hidden" fontSize="sm">
          <SyntaxHighlighter
            language="javascript"
            style={oneLight}
            customStyle={{ margin: 0, padding: "12px", background: "#ffffff" }}
          >
            {bruteForceCode}
          </SyntaxHighlighter>
        </Box>
      </Box>
      <Box flex="1" p={4} bg="#f0faf4" borderRadius="md" border="1px solid" borderColor="#cce0d4">
        <Text fontWeight="600" color="#2a6b4a" mb={2} fontSize="sm" letterSpacing="0.02em">Optimized</Text>
        <Box borderRadius="sm" overflow="hidden" fontSize="sm">
          <SyntaxHighlighter
            language="javascript"
            style={oneLight}
            wrapLines={true}
            lineProps={(lineNumber) => ({
              style: {
                display: "block",
                backgroundColor: activeLines.includes(lineNumber) ? "#d4e8d4" : "transparent",
                transition: "background-color 0.2s"
              }
            })}
            customStyle={{ margin: 0, padding: "12px", background: "#ffffff" }}
          >
            {optimizedCode}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Flex>
  );
}
