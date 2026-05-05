import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

const STACK_ITEMS = [
  { label: "Definition", desc: "LIFO (Last In, First Out). Like a stack of plates — you take the top one first." },
  { label: "Key Properties", desc: "Push and pop are O(1). Only the top element is accessible. Can be implemented with array or linked list." },
  { label: "When to Use", desc: "Nested structure matching, undo/redo, function calls, DFS traversal, parsing." },
  { label: "Common Patterns", desc: "Monotonic stack (next greater element), bracket matching, reverse polish notation." },
];

const QUEUE_ITEMS = [
  { label: "Definition", desc: "FIFO (First In, First Out). Like a line of people — the first one in gets served first." },
  { label: "Key Properties", desc: "Enqueue (add to back) and dequeue (remove from front) are O(1). Can use array or linked list. Deque supports both ends." },
  { label: "When to Use", desc: "BFS traversal, task scheduling, breadth-first level processing." },
  { label: "Common Patterns", desc: "BFS (queue processes level by level), sliding window with deque, producer-consumer." },
];

export function StacksQueuesConcept() {
  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="lg" mb={1} fontFamily="'Playfair Display', serif" color="#1a1a2e">Chapter 8: Stacks & Queues</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Linear data structures with restricted access patterns for ordered processing</Text>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is a Stack?</Text>
          <Flex direction="column" gap={2.5}>
            {STACK_ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="stack" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Picture a spring-loaded plate dispenser in a cafeteria. You place plates on top (push), and the plate you grab next (pop) is always the one you just put in. In the visualizer, colored bracket boxes stack vertically — the top one disappears when matched.</Text>
            </Flex>
          </Flex>
        </Box>

        <Box mb={6} p={5} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="1rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">What is a Queue?</Text>
          <Flex direction="column" gap={2.5}>
            {QUEUE_ITEMS.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.8rem" fontWeight={600} color="#c9952e" minW="130px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            <Flex gap={2} mt={3} p={3} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
              <Text fontSize="0.8rem" fontWeight={600} color="#4a7db5" mb={2}>Visualizing</Text>
              <Box mb={2}><PrimerVisual topic="queue" /></Box>
              <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">Think of a checkout line at a grocery store. New people join at the back (enqueue). The person at the front gets served and leaves (dequeue). The animated stack in the visualizer is LIFO — picture it reversed for FIFO.</Text>
            </Flex>
          </Flex>
        </Box>

        <Flex gap={4} mt={8}>
          <Box flex="1" p={5} bg="#f5f0eb" borderRadius="lg">
            <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">Stack & Queue Problems</Text>
            <Flex direction="column" gap={1.5}>
              <Text fontSize="0.8rem" color="#6b6350">Valid Parentheses</Text>
              <Text fontSize="0.8rem" color="#6b6350">Min Stack</Text>
              <Text fontSize="0.8rem" color="#6b6350">Daily Temperatures</Text>
              <Text fontSize="0.8rem" color="#6b6350">Evaluate Reverse Polish Notation</Text>
              <Text fontSize="0.8rem" color="#6b6350">Queue Using Stacks</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
