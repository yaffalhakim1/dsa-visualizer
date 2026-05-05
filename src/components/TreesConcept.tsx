import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

const ITEMS = [
  { label: "Definition", desc: "Hierarchical structure of nodes. Each node has a value and references to child nodes. A binary tree has at most 2 children per node (left and right)." },
  { label: "Key Properties", desc: "Root is the top node. Leaves have no children. Height determines O(h) operations. Balanced trees give O(log n). Traversals: DFS (pre/in/post-order) and BFS (level-order)." },
  { label: "When to Use", desc: "Hierarchical data (file systems, DOM), sorted collections (BST), priority queues (heap), expression parsing." },
  { label: "Common Patterns", desc: "Recursive DFS (max depth, inversion, validation), iterative BFS with queue (level order), divide and conquer." },
];

export function TreesConcept() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="lg" mb={1} fontFamily="'Playfair Display', serif" color="#1a1a2e">Chapter 10: Trees</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Recursive hierarchical data structure with parent-child relationships</Text>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is a Tree?</Text>
          <Flex direction="column" gap={2.5}>
            {ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="tree" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Picture an upside-down family tree. The root sits at the top. Each node branches down to its children. The leaves at the bottom have no children. DFS explores one branch all the way down before backtracking. BFS explores level by level like ripples in water.</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex gap={4} mt={8}>
          <Box flex="1" p={5} bg="#f5f0eb" borderRadius="lg">
            <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">Tree Problems</Text>
            <Flex direction="column" gap={1.5}>
              <Text fontSize="0.8rem" color="#6b6350">Max Depth of Binary Tree</Text>
              <Text fontSize="0.8rem" color="#6b6350">Invert Binary Tree</Text>
              <Text fontSize="0.8rem" color="#6b6350">Validate BST</Text>
              <Text fontSize="0.8rem" color="#6b6350">Level Order Traversal</Text>
              <Text fontSize="0.8rem" color="#6b6350">Same Tree</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
