import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

const ITEMS = [
  { label: "Definition", desc: "Nodes connected by pointers. Each node stores a value and a reference to the next node (singly) or next + prev (doubly)." },
  { label: "Key Properties", desc: "Insert/delete at head is O(1). Access by index is O(n) — no random access. No memory fragmentation." },
  { label: "When to Use", desc: "Frequent insert/delete at ends. Unknown size. Implementing stacks, queues, adjacency lists." },
  { label: "Common Patterns", desc: "Two pointers (cycle detection, middle), dummy node, reversal." },
];

export function LinkedListsConcept() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="lg" mb={1} fontFamily="'Playfair Display', serif" color="#1a1a2e">Chapter 7: Linked Lists</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Pointer-based dynamic data structure for sequential access and efficient insertion/deletion</Text>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is a Linked List?</Text>
          <Flex direction="column" gap={2.5}>
            {ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="linkedlist" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Imagine a treasure hunt where each clue tells you where the next clue is. To find clue #5, you must start at #1 and follow each pointer. In the visualizer, boxes are connected by arrows — rewiring those arrows reverses the list.</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex gap={4} mt={8}>
          <Box flex="1" p={5} bg="#f5f0eb" borderRadius="lg">
            <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">Linked List Problems</Text>
            <Flex direction="column" gap={1.5}>
              <Text fontSize="0.8rem" color="#6b6350">Reverse Linked List</Text>
              <Text fontSize="0.8rem" color="#6b6350">Merge Two Sorted Lists</Text>
              <Text fontSize="0.8rem" color="#6b6350">Linked List Cycle</Text>
              <Text fontSize="0.8rem" color="#6b6350">Remove Nth Node From End</Text>
              <Text fontSize="0.8rem" color="#6b6350">Middle of Linked List</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
