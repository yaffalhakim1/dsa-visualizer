import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";

const PATTERNS = [
  { name: "Sliding Window", use: "Contiguous subarray/substring statistics", template: "Expand right, shrink left when condition breaks." },
  { name: "Two Pointers", use: "Sorted array pair search, palindrome check", template: "Move L/R toward each other based on comparison." },
  { name: "Binary Search", use: "Search in sorted space or answer space", template: "Halve the range each step by comparing mid to target." },
  { name: "BFS", use: "Shortest path, level-order, multi-source spread", template: "Queue processes level by level." },
  { name: "DFS", use: "Connectivity, path existence, tree traversal", template: "Recurse or stack, mark visited on entry." },
  { name: "Backtracking", use: "Subsets, permutations, combinations", template: "Choose → explore → unchoose." },
  { name: "DP (Tabulation)", use: "Optimal substructure, overlapping subproblems", template: "Build table bottom-up from base case to target." },
  { name: "Prefix Sum", use: "Multiple range sum queries", template: "prefix[i] = sum up to i-1. Query: prefix[R+1] - prefix[L]." },
  { name: "Heap (Top K)", use: "K largest/smallest, stream median", template: "Min-heap of size k keeps k largest. Root = kth largest." },
  { name: "Monotonic Stack", use: "Next greater/smaller element", template: "Pop while stack breaks monotonic property, then push." },
];

const MISTAKES = [
  { title: "Edge Cases", desc: "Empty input, single element, duplicates, negatives, already-sorted. Check before celebrating." },
  { title: "Off-by-One", desc: "Inclusive vs exclusive bounds. When unsure, concretely write down what L and R mean in English." },
  { title: "Wrong Structure", desc: "Need fast membership? Set. Need min/max? Heap. Need order? Array may not be enough." },
  { title: "Silent Coding", desc: "Interviewers cannot read your mind. Narrate your decisions, even the uncertain ones." },
  { title: "Skipping Examples", desc: "Jumping to code without tracing an example first is the #1 cause of wrong solutions." },
  { title: "Forgetting to Test", desc: "Run through your example after coding. Check the edge cases you identified earlier." },
];

export function PatternsMistakes() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>Common Patterns & Templates</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 21: Pattern Reference</Text>
        <Text color="#6b6350" fontSize="0.85rem" lineHeight="1.7" mb={4}>
          Most coding problems are combinations of familiar building blocks. Learn the pattern, not the exact question.
        </Text>
        <VStack gap={2} align="stretch">
          {PATTERNS.map(p => (
            <Flex key={p.name} p={3.5} bg="#faf6f0" borderRadius="md" align="center" gap={4}>
              <Text fontSize="0.85rem" fontWeight={700} color="#1a1a2e" minW="140px">{p.name}</Text>
              <Box flex="1">
                <Text fontSize="0.75rem" color="#8b8589" fontWeight={500}>Use when:</Text>
                <Text fontSize="0.8rem" color="#6b6350">{p.use}</Text>
              </Box>
              <Box flex="1">
                <Text fontSize="0.75rem" color="#8b8589" fontWeight={500}>Template:</Text>
                <Text fontSize="0.8rem" color="#6b6350" fontStyle="italic">{p.template}</Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>Common Beginner Mistakes</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 22: Mistakes & Recovery</Text>
        <Text color="#6b6350" fontSize="0.85rem" lineHeight="1.7" mb={4}>
          Everyone makes these. The goal is not to avoid every mistake. The goal is to catch them earlier and recover faster.
        </Text>
        <VStack gap={2} align="stretch">
          {MISTAKES.map(m => (
            <Flex key={m.title} p={3.5} bg="#fdf6f5" borderRadius="md" align="flex-start" gap={3}>
              <Text fontSize="0.85rem" fontWeight={700} color="#c94a4a" minW="130px">{m.title}</Text>
              <Text fontSize="0.8rem" color="#6b6350" lineHeight="1.6">{m.desc}</Text>
            </Flex>
          ))}
        </VStack>

        <Box mt={6} p={4} bg="#f0faf4" borderRadius="lg">
          <Heading size="xs" mb={2} color="#4a9e6b">Calm Debugging Checklist</Heading>
          <Text fontSize="0.8rem" color="#6b6350" lineHeight="1.8">
            Restate what each variable means.{'\n'}
            Walk through smallest non-trivial example by hand.{'\n'}
            Check loop boundaries carefully.{'\n'}
            Log intermediate state when logic gets slippery.{'\n'}
            Only optimize after correct version works.
          </Text>
        </Box>
      </Box>
    </VStack>
  );
}
