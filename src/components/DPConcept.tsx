import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

const ITEMS = [
  { label: "Definition", desc: "Optimization technique that breaks a problem into overlapping subproblems. Results are stored (memoized) so each subproblem is solved only once." },
  { label: "Key Properties", desc: "Overlapping subproblems (same subproblem appears many times) + optimal substructure (optimal solution built from optimal sub-solutions). Top-down (recursion + memo) or bottom-up (tabular DP)." },
  { label: "When to Use", desc: "Problems asking for min/max/count/total ways. Sequences (LIS, LCS), grid paths, knapsack, partition. Clue words: 'maximum', 'minimum', 'number of ways'." },
  { label: "Common Patterns", desc: "1D table (Fibonacci, climbing stairs, house robber), 2D table (edit distance, LCS, grid paths), state machine DP (stock trading with cooldown)." },
];

export function DPConcept() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="lg" mb={1} fontFamily="'Playfair Display', serif" color="#1a1a2e">Chapter 17: Dynamic Programming</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Solve complex problems by breaking them into simpler overlapping subproblems</Text>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is Dynamic Programming?</Text>
          <Flex direction="column" gap={2.5}>
            {ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="dp" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Think of filling out a spreadsheet where each cell depends on previously filled cells. You fill row by row, left to right. When you reach a cell, all the information you need is already computed. Fibonacci is the classic example: F[n] = F[n-1] + F[n-2] — just two previous cells.</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex gap={4} mt={8}>
          <Box flex="1" p={5} bg="#f5f0eb" borderRadius="lg">
            <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">DP Problems</Text>
            <Flex direction="column" gap={1.5}>
              <Text fontSize="0.8rem" color="#6b6350">Climbing Stairs</Text>
              <Text fontSize="0.8rem" color="#6b6350">House Robber</Text>
              <Text fontSize="0.8rem" color="#6b6350">Coin Change</Text>
              <Text fontSize="0.8rem" color="#6b6350">Longest Increasing Subsequence</Text>
              <Text fontSize="0.8rem" color="#6b6350">Edit Distance</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
