import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

const ITEMS = [
  { label: "Definition", desc: "Technique that maintains a window (subarray/substring) sliding across the input. Instead of recomputing from scratch, update by subtracting what leaves the window and adding what enters." },
  { label: "Key Properties", desc: "Fixed-size window: slide one element at a time, O(n). Variable-size window: expand/contract based on a condition. Two pointers (left/right) define window bounds." },
  { label: "When to Use", desc: "Subarray/substring problems, maximum/minimum in a range, longest substring meeting a condition, constrained sums." },
  { label: "Common Patterns", desc: "Fixed window (max sum of k elements), dynamic window (longest without repeats, minimum window substring), sliding window maximum with deque." },
];

export function SlidingWindowConcept() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="lg" mb={1} fontFamily="'Playfair Display', serif" color="#1a1a2e">Chapter 14: Sliding Window</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Efficient technique for processing continguous subarrays in linear time</Text>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is a Sliding Window?</Text>
          <Flex direction="column" gap={2.5}>
            {ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="slidingwindow" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Picture a magnifying glass sliding across a row of numbers. The glass shows a subset at a time. As it slides right, one number drops off the left edge and a new one appears on the right. You never recalculate from scratch — just adjust the edges.</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex gap={4} mt={8}>
          <Box flex="1" p={5} bg="#f5f0eb" borderRadius="lg">
            <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">Sliding Window Problems</Text>
            <Flex direction="column" gap={1.5}>
              <Text fontSize="0.8rem" color="#6b6350">Max Sum Subarray</Text>
              <Text fontSize="0.8rem" color="#6b6350">Longest Substring Without Repeating Characters</Text>
              <Text fontSize="0.8rem" color="#6b6350">Minimum Window Substring</Text>
              <Text fontSize="0.8rem" color="#6b6350">Permutation in String</Text>
              <Text fontSize="0.8rem" color="#6b6350">Sliding Window Maximum</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
