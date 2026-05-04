import { Box, Flex, Text } from "@chakra-ui/react";

interface SolutionCompareProps {
  bruteForceCode: string;
  optimizedCode: string;
}

export function SolutionCompare({ bruteForceCode, optimizedCode }: SolutionCompareProps) {
  return (
    <Flex gap={4} mt={6} direction={{ base: "column", lg: "row" }}>
      <Box flex="1" p={4} bg="red.50" borderRadius="md">
        <Text fontWeight="bold" color="red.800" mb={2}>Brute Force</Text>
        <Box as="pre" p={3} bg="white" borderRadius="sm" fontSize="sm" overflowX="auto">
          <code>{bruteForceCode}</code>
        </Box>
      </Box>
      <Box flex="1" p={4} bg="green.50" borderRadius="md">
        <Text fontWeight="bold" color="green.800" mb={2}>Optimized</Text>
        <Box as="pre" p={3} bg="white" borderRadius="sm" fontSize="sm" overflowX="auto">
          <code>{optimizedCode}</code>
        </Box>
      </Box>
    </Flex>
  );
}
