import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

const ITEMS = [
  { label: "Definition", desc: "Algorithms that manipulate numbers mathematically — digit extraction, modulus, division, bit manipulation — without converting to strings." },
  { label: "Key Properties", desc: "Digit-by-digit operations use x % 10 (get last digit) and Math.floor(x / 10) (remove last digit). Overflow handling is critical (JS safe integers up to 2^53-1)." },
  { label: "When to Use", desc: "Number reversal, palindrome checking, prime detection, power of N, base conversion." },
  { label: "Common Patterns", desc: "Build result while truncating input. Check overflow before multiplying. Use modulo to extract digits. Bit operations for powers of 2." },
];

export function MathConcept() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="lg" mb={1} fontFamily="'Playfair Display', serif" color="#1a1a2e">Chapter 20: Math & Number Manipulation</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Digit extraction, overflow handling, and number theory fundamentals</Text>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is Math Manipulation?</Text>
          <Flex direction="column" gap={2.5}>
            {ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="math" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Picture peeling digits off a number like peeling layers of an onion. 1234 % 10 gives you the rightmost digit (4). 1234 / 10 (floored) gives you the rest (123). Keep peeling until nothing remains. The trick is building the reversed number digit by digit while checking for overflow.</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex gap={4} mt={8}>
          <Box flex="1" p={5} bg="#f5f0eb" borderRadius="lg">
            <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">Math Problems</Text>
            <Flex direction="column" gap={1.5}>
              <Text fontSize="0.8rem" color="#6b6350">Reverse Integer</Text>
              <Text fontSize="0.8rem" color="#6b6350">Palindrome Number</Text>
              <Text fontSize="0.8rem" color="#6b6350">Plus One</Text>
              <Text fontSize="0.8rem" color="#6b6350">Power of Two</Text>
              <Text fontSize="0.8rem" color="#6b6350">Count Primes</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
