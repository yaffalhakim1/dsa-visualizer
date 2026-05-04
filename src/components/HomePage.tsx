import { Box, Flex, Text, VStack, Heading, Badge, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";

const CHAPTERS = [
  { id: 6, title: "Arrays & Strings", color: "#4a7db5", desc: "Two pointers, prefix sums, Kadane's algorithm. Converging pointers on sorted arrays.", problems: ["Two Sum (Sorted)", "Prefix Sum Construction"], icon: "[]" },
  { id: 7, title: "Linked Lists", color: "#7b5ea7", desc: "Pointer rewiring, cycle detection with Floyd's algorithm, in-place reversal.", problems: ["Reverse Linked List"], icon: "↔" },
  { id: 8, title: "Stacks & Queues", color: "#c94a6b", desc: "LIFO/FIFO mechanics, monotonic stacks, queue-based BFS patterns.", problems: ["Valid Parentheses"], icon: "▯" },
  { id: 10, title: "Trees", color: "#4a9e6b", desc: "DFS/BFS traversals, recursion trees, balanced BST validation.", problems: ["Max Depth"], icon: "🌳" },
  { id: 12, title: "Graphs", color: "#c9952e", desc: "DFS/BFS flood fill, connected components, topological sorting.", problems: [], icon: "◉" },
  { id: 13, title: "Binary Search", color: "#4a7db5", desc: "Divide search space in half each step. Works on sorted arrays and answer spaces.", problems: ["Binary Search"], icon: "⊘" },
  { id: 14, title: "Sliding Window", color: "#8b5cf6", desc: "O(1) incremental updates instead of O(k) recomputation. Fixed and variable windows.", problems: ["Maximum Sum Subarray"], icon: "▨" },
  { id: 15, title: "Backtracking", color: "#e67e22", desc: "Choose, explore, unchoose. Subsets, permutations, combination problems.", problems: ["Subsets"], icon: "↩" },
  { id: 17, title: "Dynamic Programming", color: "#e67e22", desc: "Tabulation, memoization, interval DP, subset sum patterns.", problems: [], icon: "⊞" },
  { id: 20, title: "Reverse Integer", color: "#7b5ea7", desc: "Arithmetic digit manipulation, overflow handling, modular arithmetic.", problems: ["Reverse Integer"], icon: "↔" },
];

const HIGHLIGHTS = [
  { label: "Chapters Covered", value: "7" },
  { label: "Interactive Visualizers", value: "9" },
  { label: "Python Templates", value: "18+" },
  { label: "Deep Dive Sections", value: "9" },
];

export function HomePage() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box p={10} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
          <VStack align="flex-start" gap={3}>
            <Badge px={3} py={1} borderRadius="full" bg="#c9952e" color="white" fontSize="0.65rem" letterSpacing="0.1em" textTransform="uppercase">
              Interactive Edition
            </Badge>
            <Heading size="xl" color="#1a1a2e" letterSpacing="-0.02em">
              DSA Playbook
            </Heading>
            <Text color="#8b8589" fontSize="md" maxW="600px" lineHeight="1.7">
              Visualize data structures and algorithms step-by-step. Each chapter pairs 
              brute-force and optimized solutions with animated explanations — turning 
              abstract patterns into something you can see.
            </Text>
            <SimpleGrid columns={4} gap={6} w="full" pt={4}>
              {HIGHLIGHTS.map(h => (
                <Box key={h.label} textAlign="center" p={4} bg="#faf6f0" borderRadius="lg">
                  <Text fontSize="1.5rem" fontWeight="700" color="#c9952e">{h.value}</Text>
                  <Text fontSize="0.75rem" color="#8b8589" mt={1}>{h.label}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Heading size="sm" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" mb={4}>Chapters</Heading>
        <SimpleGrid columns={2} gap={4}>
          {CHAPTERS.map((ch, i) => {
            const available = ch.problems.length > 0;
            return (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
              >
                <Box
                  p={5}
                  bg="white"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={available ? "#e8e0d6" : "#f0ece4"}
                  opacity={available ? 1 : 0.5}
                  position="relative"
                  overflow="hidden"
                  _hover={available ? { shadow: "md", borderColor: "#c9952e" } : {}}
                  transition="all 0.2s"
                >
                  <Flex align="flex-start" justify="space-between">
                    <Box>
                      <Flex align="center" gap={2} mb={1}>
                        <Text fontSize="1.1rem">{ch.icon}</Text>
                        <Text fontFamily="'Playfair Display', serif" fontSize="1.05rem" fontWeight={600} color="#1a1a2e">
                          Ch {ch.id}: {ch.title}
                        </Text>
                      </Flex>
                      <Text fontSize="0.8rem" color="#8b8589" lineHeight="1.6" mt={1}>{ch.desc}</Text>
                      {ch.problems.length > 0 && (
                        <Flex gap={2} mt={3} wrap="wrap">
                          {ch.problems.map(p => (
                            <Badge key={p} bg="#faf6f0" color="#c9952e" fontWeight={500} px={2} py={0.5} borderRadius="md" fontSize="0.7rem">
                              {p}
                            </Badge>
                          ))}
                        </Flex>
                      )}
                    </Box>
                    <Flex align="center" gap={2}>
                      {available && (
                        <Badge bg="#c9952e" color="white" borderRadius="full" px={2} py={0.5} fontSize="0.6rem" textTransform="uppercase">
                          Live
                        </Badge>
                      )}
                      {!available && (
                        <Text fontSize="0.6rem" color="#c0b8b0" letterSpacing="0.1em">Soon</Text>
                      )}
                    </Flex>
                  </Flex>
                </Box>
              </motion.div>
            );
          })}
        </SimpleGrid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Box p={6} bg="white" borderRadius="xl" border="1px solid" borderColor="#e8e0d6">
          <Flex align="center" gap={3} mb={3}>
            <Box w="3px" h="1.25rem" bg="#c9952e" borderRadius="full" />
            <Text fontFamily="'Playfair Display', serif" fontSize="1rem" fontWeight={600} color="#1a1a2e">
              How to Use
            </Text>
          </Flex>
          <Text color="#8b8589" fontSize="0.875rem" lineHeight="1.8">
            Navigate to any chapter from the sidebar. Each visualizer walks through the algorithm 
            step-by-step — use the control bar at the bottom to play, pause, or step through. 
            Speed slider adjusts the playback rate. The code panel compares brute-force and optimized 
            approaches side by side.
          </Text>
        </Box>
      </motion.div>
    </VStack>
  );
}
