import { Box, Flex, Text } from "@chakra-ui/react";
import { PrimerVisual } from "./PrimerVisual";

interface PrimerSection {
  title: string;
  items: { label: string; desc: string }[];
  visualize?: string;
}

const PRIMERS: Record<string, PrimerSection> = {
  array: {
    title: "What is an Array?",
    items: [
      { label: "Definition", desc: "Contiguous block of memory storing elements of the same type. Each element accessed by index in O(1)." },
      { label: "Key Properties", desc: "Fixed size (static) or dynamic (resizable). Insert/delete at end is O(1), at arbitrary position is O(n)." },
      { label: "When to Use", desc: "Need fast random access by index. Data size known or changes infrequently." },
      { label: "Common Patterns", desc: "Two pointers, prefix sums, sliding window, Kadane's algorithm." },
    ],
    visualize: "Picture a row of numbered lockers. Each locker holds one value. Opening locker at index i gives you the value inside instantly. The animated boxes in the visualizer are these lockers — colored borders show which ones are active.",
  },
  string: {
    title: "What is a String?",
    items: [
      { label: "Definition", desc: "Sequence of characters. Usually immutable in JS — operations create a new string." },
      { label: "Key Properties", desc: "Access by index O(1). Concatenation, slicing create new copies O(n). Can treat as character array." },
      { label: "When to Use", desc: "Text processing, pattern matching, encoding/decoding." },
      { label: "Common Patterns", desc: "Two pointers (palindrome), sliding window (substring), hash map (anagrams)." },
    ],
    visualize: "Think of a string as beads on a fixed thread. You can look at any bead by position, but to add or remove beads you must retie the whole thread. The characters move left to right across the screen as the algorithm processes each one.",
  },
  linkedlist: {
    title: "What is a Linked List?",
    items: [
      { label: "Definition", desc: "Nodes connected by pointers. Each node stores a value and a reference to the next node (singly) or next + prev (doubly)." },
      { label: "Key Properties", desc: "Insert/delete at head is O(1). Access by index is O(n) — no random access. No memory fragmentation." },
      { label: "When to Use", desc: "Frequent insert/delete at ends. Unknown size. Implementing stacks, queues, adjacency lists." },
      { label: "Common Patterns", desc: "Two pointers (cycle detection, middle), dummy node, reversal." },
    ],
    visualize: "Imagine a treasure hunt where each clue tells you where the next clue is. To find clue #5, you must start at #1 and follow each pointer. In the visualizer, boxes are connected by arrows — rewiring those arrows reverses the list.",
  },
  stack: {
    title: "What is a Stack?",
    items: [
      { label: "Definition", desc: "LIFO (Last In, First Out). Like a stack of plates — you take the top one first." },
      { label: "Key Properties", desc: "Push and pop are O(1). Only the top element is accessible. Can be implemented with array or linked list." },
      { label: "When to Use", desc: "Nested structure matching, undo/redo, function calls, DFS traversal, parsing." },
      { label: "Common Patterns", desc: "Monotonic stack (next greater element), bracket matching, reverse polish notation." },
    ],
    visualize: "Picture a spring-loaded plate dispenser in a cafeteria. You place plates on top (push), and the plate you grab next (pop) is always the one you just put in. In the visualizer, colored bracket boxes stack vertically — the top one disappears when matched.",
  },
  queue: {
    title: "What is a Queue?",
    items: [
      { label: "Definition", desc: "FIFO (First In, First Out). Like a line of people — the first one in gets served first." },
      { label: "Key Properties", desc: "Enqueue (add to back) and dequeue (remove from front) are O(1). Can use array or linked list. Deque supports both ends." },
      { label: "When to Use", desc: "BFS traversal, task scheduling, breadth-first level processing." },
      { label: "Common Patterns", desc: "BFS (queue processes level by level), sliding window with deque, producer-consumer." },
    ],
    visualize: "Think of a checkout line at a grocery store. New people join at the back (enqueue). The person at the front gets served and leaves (dequeue). The animated stack in the visualizer is LIFO — picture it reversed for FIFO.",
  },
  binarysearch: {
    title: "What is Binary Search?",
    items: [
      { label: "Definition", desc: "Search algorithm on sorted data. Repeatedly divide the search interval in half — compare the middle element to the target, then discard the half that cannot contain it." },
      { label: "Key Properties", desc: "O(log n) time. Works only on sorted data. Uses three pointers: L (left bound), R (right bound), mid (middle). Each step narrows the window by half." },
      { label: "When to Use", desc: "Searching sorted arrays, finding boundaries (first/last occurrence), optimization problems where the answer space is monotonic (binary search on answer)." },
      { label: "Common Patterns", desc: "Classic search, lower/upper bound, search rotated array, binary search on answer (Koko eating bananas, min capacity)." },
    ],
    visualize: "Picture a dictionary. You want the word 'mountain' — you open to the middle. If you see 'lake', you know 'mountain' must be in the back half. Toss the front half. Open to the middle of what's left. Repeat. Each step you throw away half the book. That's binary search — 1 billion items takes only 30 comparisons.",
  },
};

interface ChapterPrimerProps {
  topics: string[];
  visualizing?: boolean;
}

export function ChapterPrimer({ topics, visualizing }: ChapterPrimerProps) {
  const sections = topics.map(t => ({ key: t, ...PRIMERS[t] } as { key: string } & PrimerSection)).filter(s => s.title);
  if (sections.length === 0) return null;

  return (
    <Box mb={6}>
      {sections.map(section => (
        <Box key={section.title} mb={4} p={4} bg="#faf6f0" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
          <Text fontSize="0.9rem" fontWeight={700} color="#1a1a2e" mb={3} fontFamily="'Playfair Display', serif">{section.title}</Text>
          <Flex direction="column" gap={2}>
            {section.items.map(item => (
              <Flex key={item.label} gap={2}>
                <Text fontSize="0.75rem" fontWeight={600} color="#c9952e" minW="110px" flexShrink={0}>{item.label}</Text>
                <Text fontSize="0.8rem" color="#6b6350" lineHeight="1.5">{item.desc}</Text>
              </Flex>
            ))}
            {visualizing && section.visualize && (
              <Flex gap={2} mt={2} p={2.5} bg="white" borderRadius="md" borderLeft="3px solid" borderColor="#4a7db5" direction="column">
                <Text fontSize="0.75rem" fontWeight={600} color="#4a7db5" mb={1}>Visualizing</Text>
                <Box mb={2}>
                  <PrimerVisual topic={section.key} />
                </Box>
                <Text fontSize="0.8rem" color="#6b6350" lineHeight="1.5" fontStyle="italic">{section.visualize}</Text>
              </Flex>
            )}
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
