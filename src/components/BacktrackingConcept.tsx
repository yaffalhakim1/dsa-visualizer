import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

const ITEMS = [
  { label: "Definition", desc: "Recursive algorithm that explores all possible solutions by building candidates incrementally. If a candidate fails, backtrack (undo the last step) and try the next option." },
  { label: "Key Properties", desc: "Explores a decision tree. Uses a temporary path that grows/shrinks. Prunes invalid branches early (constraint satisfaction). Exponential O(2^n) worst case but pruning makes it practical." },
  { label: "When to Use", desc: "Combinatorial problems (subsets, permutations, combinations), constraint satisfaction (N-Queens, Sudoku), path finding (Word Search)." },
  { label: "Common Patterns", desc: "Choose-explore-unchoose pattern. Sort input to skip duplicates. Use start index for combinations, visited array for permutations." },
];

export function BacktrackingConcept() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="lg" mb={1} fontFamily="'Playfair Display', serif" color="#1a1a2e">Chapter 15: Backtracking</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Systematic exploration of decision trees with early pruning of invalid paths</Text>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is Backtracking?</Text>
          <Flex direction="column" gap={2.5}>
            {ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="backtracking" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Imagine navigating a maze. You walk down a path. If you hit a dead end, you retrace your steps to the last fork and try a different direction. Backtracking is this maze-walking approach applied to decision trees: choose, explore, unchoose, repeat.</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex gap={4} mt={8}>
          <Box flex="1" p={5} bg="#f5f0eb" borderRadius="lg">
            <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">Backtracking Problems</Text>
            <Flex direction="column" gap={1.5}>
              <Text fontSize="0.8rem" color="#6b6350">Subsets</Text>
              <Text fontSize="0.8rem" color="#6b6350">Permutations</Text>
              <Text fontSize="0.8rem" color="#6b6350">Combination Sum</Text>
              <Text fontSize="0.8rem" color="#6b6350">N-Queens</Text>
              <Text fontSize="0.8rem" color="#6b6350">Word Search</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
