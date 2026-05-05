import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

const ARRAY_ITEMS = [
  { label: "Definition", desc: "Contiguous block of memory storing elements of the same type. Each element accessed by index in O(1)." },
  { label: "Key Properties", desc: "Fixed size (static) or dynamic (resizable). Insert/delete at end is O(1), at arbitrary position is O(n)." },
  { label: "When to Use", desc: "Need fast random access by index. Data size known or changes infrequently." },
  { label: "Common Patterns", desc: "Two pointers, prefix sums, sliding window, Kadane's algorithm." },
];

const STRING_ITEMS = [
  { label: "Definition", desc: "Sequence of characters. Usually immutable in JS — operations create a new string." },
  { label: "Key Properties", desc: "Access by index O(1). Concatenation, slicing create new copies O(n). Can treat as character array." },
  { label: "When to Use", desc: "Text processing, pattern matching, encoding/decoding." },
  { label: "Common Patterns", desc: "Two pointers (palindrome), sliding window (substring), hash map (anagrams)." },
];

export function ArraysStringsConcept() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="lg" mb={1} fontFamily="'Playfair Display', serif" color="#1a1a2e">Chapter 6: Arrays & Strings</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Fundamental data structures for sequential data storage and text manipulation</Text>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is an Array?</Text>
          <Flex direction="column" gap={2.5}>
            {ARRAY_ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="array" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Picture a row of numbered lockers. Each locker holds one value. Opening locker at index i gives you the value inside instantly. The animated boxes in the visualizers are these lockers — colored borders show which ones are active.</Text>
            </Flex>
          </Flex>
        </Box>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is a String?</Text>
          <Flex direction="column" gap={2.5}>
            {STRING_ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="string" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Think of a string as beads on a fixed thread. You can look at any bead by position, but to add or remove beads you must retie the whole thread. The characters move left to right across the screen as the algorithm processes each one.</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex gap={4} mt={8}>
          <Box flex="1" p={5} bg="#f5f0eb" borderRadius="lg">
            <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">Array Problems</Text>
            <Flex direction="column" gap={1.5}>
              <Text fontSize="0.8rem" color="#6b6350">Two Sum</Text>
              <Text fontSize="0.8rem" color="#6b6350">Best Time to Buy & Sell Stock</Text>
              <Text fontSize="0.8rem" color="#6b6350">Product of Array Except Self</Text>
              <Text fontSize="0.8rem" color="#6b6350">Maximum Subarray</Text>
              <Text fontSize="0.8rem" color="#6b6350">Contains Duplicate</Text>
              <Text fontSize="0.8rem" color="#6b6350">Next Permutation</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
