import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

const BINARY_SEARCH_ITEMS = [
  { label: "Definition", desc: "Search algorithm on sorted data. Repeatedly divide the search interval in half — compare the middle element to the target, then discard the half that cannot contain it." },
  { label: "Key Properties", desc: "O(log n) time. Works only on sorted data. Uses three pointers: L (left bound), R (right bound), mid (middle). Each step narrows the window by half." },
  { label: "When to Use", desc: "Searching sorted arrays, finding boundaries (first/last occurrence), optimization problems where the answer space is monotonic (binary search on answer)." },
  { label: "Common Patterns", desc: "Classic search, lower/upper bound, search rotated array, binary search on answer (Koko eating bananas, min capacity)." },
];

export function BinarySearchConcept() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="lg" mb={1} fontFamily="'Playfair Display', serif" color="#1a1a2e">Chapter 13: Binary Search</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Divide-and-conquer search algorithm for ordered data — eliminates half the search space at each step</Text>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is Binary Search?</Text>
          <Flex direction="column" gap={2.5}>
            {BINARY_SEARCH_ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="binarysearch" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Picture a dictionary. You want the word 'mountain' — you open to the middle. If you see 'lake', you know 'mountain' must be in the back half. Toss the front half. Open to the middle of what's left. Repeat. Each step you throw away half the book. That's binary search — 1 billion items takes only 30 comparisons.</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex gap={4} mt={8}>
          <Box flex="1" p={5} bg="#f5f0eb" borderRadius="lg">
            <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">Binary Search Problems</Text>
            <Flex direction="column" gap={1.5}>
              <Text fontSize="0.8rem" color="#6b6350">Binary Search (Classic)</Text>
              <Text fontSize="0.8rem" color="#6b6350">Search in Rotated Sorted Array</Text>
              <Text fontSize="0.8rem" color="#6b6350">Find First and Last Position</Text>
              <Text fontSize="0.8rem" color="#6b6350">Koko Eating Bananas</Text>
              <Text fontSize="0.8rem" color="#6b6350">Search a 2D Matrix</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
