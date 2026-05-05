import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";

function SlideWindowDemo() {
  const [step, setStep] = useState(0);
  const data = [2, 4, 1, 7, 3, 8, 5, 2];
  const size = 3;
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % (data.length - size + 1)), 1800); return () => clearInterval(t); }, []);
  return (
    <Flex gap={1} align="flex-end" minH="56px">
      {data.map((v, i) => {
        const inWin = i >= step && i < step + size;
        const isNew = i === step + size - 1;
        return (
          <motion.div key={i} animate={{ y: isNew && inWin ? -4 : 0 }}>
            <Flex w="36px" h="36px" align="center" justify="center" borderRadius="md" border="2px solid" borderColor={inWin ? "#c9952e" : "#e8e0d6"} bg={inWin ? "#faf6f0" : "#fff"} fontSize="0.85rem" fontWeight={inWin ? 700 : 400} color="#1a1a2e" opacity={inWin ? 1 : 0.35}>{v}</Flex>
          </motion.div>
        );
      })}
    </Flex>
  );
}

function TwoPointersDemo() {
  const [step, setStep] = useState(0);
  const data = [1, 3, 5, 7, 9, 11, 13, 15];
  const total = Math.ceil(data.length / 2);
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % total), 1600); return () => clearInterval(t); }, []);
  const L = step;
  const R = data.length - 1 - step;
  return (
    <Flex gap={1} align="flex-end" minH="56px">
      {data.map((v, i) => (
        <Box key={i} position="relative">
          {(i === L || i === R) && <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}><Text position="absolute" top="-1.1rem" left="50%" transform="translateX(-50%)" fontSize="0.55rem" fontWeight={700} color={i === L ? "#4a7db5" : "#c94a6b"}>{i === L ? "L" : "R"}</Text></motion.div>}
          <motion.div animate={{ scale: i === L || i === R ? 1.1 : 1 }}>
            <Flex w="36px" h="36px" align="center" justify="center" borderRadius="md" border="2px solid" borderColor={i === L || i === R ? "#c9952e" : i < L || i > R ? "#e0d8d0" : "#e8e0d6"} bg={i === L || i === R ? "#faf6f0" : i < L || i > R ? "#f5f0eb" : "#fff"} fontSize="0.85rem" fontWeight={i === L || i === R ? 700 : 400} color="#1a1a2e" opacity={i < L || i > R ? 0.3 : 1}>{v}</Flex>
          </motion.div>
        </Box>
      ))}
    </Flex>
  );
}

function FastSlowDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % 6), 1200); return () => clearInterval(t); }, []);
  const slow = step % 6;
  const fast = (step * 2) % 6;
  const nodes = ["A", "B", "C", "D", "E", "F"];
  return (
    <Flex gap={1.5} align="center" minH="56px" wrap="wrap" justify="center">
      {nodes.map((n, i) => (
        <Box key={i} position="relative">
          {i === slow && <Text position="absolute" top="-1.2rem" left="50%" transform="translateX(-50%)" fontSize="0.55rem" fontWeight={700} color="#4a7db5">slow</Text>}
          {i === fast && <Text position="absolute" bottom="-1.2rem" left="50%" transform="translateX(-50%)" fontSize="0.55rem" fontWeight={700} color="#c94a6b">fast</Text>}
          <motion.div animate={{ scale: i === slow || i === fast ? [1, 1.15, 1] : 1 }} transition={{ repeat: Infinity, duration: 0.6 }}>
            <Flex w="36px" h="36px" align="center" justify="center" borderRadius="full" border="2px solid" borderColor={i === slow ? "#4a7db5" : i === fast ? "#c94a6b" : slow === fast && i === slow ? "#c9952e" : "#e8e0d6"} bg={i === slow ? "#f0f6fd" : i === fast ? "#fdf6f5" : "#fff"} fontSize="0.8rem" fontWeight={i === slow || i === fast ? 700 : 400} color="#1a1a2e">{n}</Flex>
          </motion.div>
          {i < nodes.length - 1 && <Text position="absolute" right="-0.6rem" top="50%" transform="translateY(-50%)" color="#e0d8d0" fontSize="0.7rem">→</Text>}
        </Box>
      ))}
    </Flex>
  );
}

function MergeIntervalsDemo() {
  const [step, setStep] = useState(0);
  const intervals = [[1, 3], [2, 6], [5, 7], [8, 10]];
  useEffect(() => { const t = setInterval(() => setStep(s => Math.min(s + 1, 3)), 1800); return () => clearInterval(t); }, []);
  return (
    <VStack gap={1.5} minH="80px" justify="center">
      {intervals.slice(0, step + 1).map(([s, e], i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Flex align="center" gap={1.5}>
            <Text fontSize="0.6rem" color="#8b8589" w="1.2rem">{s}</Text>
            <Flex h="8px" borderRadius="full" bg={i === 0 && step >= 2 ? "#c9952e" : "#4a7db5"} w={`${(e - s + 1) * 20}px`} minW="30px" />
            <Text fontSize="0.6rem" color="#8b8589">{e}</Text>
            {i < step && step < 3 && <Text fontSize="0.65rem" color="#c9952e" fontWeight={600}>merge</Text>}
          </Flex>
        </motion.div>
      ))}
      {step >= 3 && (
        <Flex align="center" gap={1.5} mt={1}>
          <Text fontSize="0.6rem" color="#4a9e6b" fontWeight={700}>Result:</Text>
          <Flex h="10px" borderRadius="full" bg="#4a9e6b" w="120px" />
          <Text fontSize="0.6rem" color="#4a9e6b">[1, 7] [8, 10]</Text>
        </Flex>
      )}
    </VStack>
  );
}

function CyclicSortDemo() {
  const [step, setStep] = useState(0);
  const data = useMemo(() => [3, 1, 2, 5, 4], []);
  const total = 5;
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % total), 1500); return () => clearInterval(t); }, []);
  return (
    <Flex gap={1} align="flex-end" minH="56px">
      {data.map((v, i) => {
        const correct = v === i + 1;
        const active = i === step;
        return (
          <motion.div key={i} animate={{ y: active && !correct ? -4 : 0 }}>
            <Flex direction="column" align="center">
              <motion.div animate={{ rotate: active && !correct ? [0, 180, 360] : 0 }} transition={{ duration: 0.5 }}>
                <Flex w="36px" h="36px" align="center" justify="center" borderRadius="md" border="2px solid" borderColor={correct ? "#4a9e6b" : active ? "#c9952e" : "#e8e0d6"} bg={correct ? "#f0faf4" : active ? "#faf6f0" : "#fff"} fontSize="0.85rem" fontWeight={700} color={correct ? "#4a9e6b" : "#1a1a2e"}>{v}</Flex>
              </motion.div>
              <Text fontSize="0.55rem" color="#8b8589" mt={0.5}>{i + 1}</Text>
            </Flex>
          </motion.div>
        );
      })}
    </Flex>
  );
}

function ReverseListDemo() {
  const [step, setStep] = useState(0);
  const data = [1, 2, 3, 4, 5];
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % (data.length + 1)), 1500); return () => clearInterval(t); }, []);
  return (
    <Flex gap={0.5} align="center" minH="56px" justify="center">
      {data.map((v, i) => {
        const reversed = i > data.length - 1 - step;
        const current = i === data.length - step;
        return (
          <Flex key={i} align="center" gap={0.5}>
            {i > 0 && <Text color="#e0d8d0" fontSize="0.7rem" fontWeight={300}>{reversed ? "←" : "→"}</Text>}
            <motion.div animate={{ scale: current ? 1.15 : 1 }}>
              <Flex w="32px" h="32px" align="center" justify="center" borderRadius="md" border="2px solid" borderColor={current ? "#c9952e" : reversed ? "#4a9e6b" : "#e8e0d6"} bg={current ? "#faf6f0" : reversed ? "#f0faf4" : "#fff"} fontSize="0.8rem" fontWeight={current || reversed ? 700 : 400} color={reversed ? "#4a9e6b" : "#1a1a2e"} opacity={reversed ? 1 : current ? 1 : 0.5}>{v}</Flex>
            </motion.div>
          </Flex>
        );
      })}
      <Text fontSize="0.6rem" color="#4a9e6b" ml={1.5} fontWeight={600}>{step >= data.length ? "reversed!" : ""}</Text>
    </Flex>
  );
}

function TreeBFSDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % 4), 1800); return () => clearInterval(t); }, []);
  const levels = [
    [{ v: 3, l: [9, 20] }],
    [{ v: 9, l: [] }, { v: 20, l: [15, 7] }],
    [{ v: 15, l: [] }, { v: 7, l: [] }],
  ];
  return (
    <VStack gap={1} minH="80px" justify="center">
      {levels.slice(0, step + 1).map((row, r) => (
        <Flex key={r} gap={2} justify="center">
          {row.map((n, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
              <Flex w="28px" h="28px" align="center" justify="center" borderRadius="md" bg={r < step ? "#4a9e6b" : "#c9952e"} color="white" fontSize="0.7rem" fontWeight={700}>{n.v}</Flex>
            </motion.div>
          ))}
        </Flex>
      ))}
      <Flex gap={1.5} mt={1}>
        {["3", "9", "20", "15", "7"].slice(0, step * 2 + 2).map((v, i) => (
          <Text key={i} fontSize="0.65rem" color="#4a9e6b" fontWeight={600}>{v}{i < step * 2 + 1 ? " →" : ""}</Text>
        ))}
      </Flex>
    </VStack>
  );
}

function TreeDFSDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % 5), 1500); return () => clearInterval(t); }, []);
  const order = [{ v: 3, d: 0 }, { v: 9, d: 1 }, { v: 20, d: 1 }, { v: 15, d: 2 }, { v: 7, d: 2 }];
  return (
    <Flex gap={1} align="center" minH="56px" justify="center">
      {order.slice(0, step + 1).map((n, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Flex align="center" gap={0.5}>
            {i > 0 && <Text color="#c9952e" fontSize="0.6rem">→</Text>}
            <Flex direction="column" align="center">
              <Flex w="28px" h="28px" align="center" justify="center" borderRadius="md" bg={i === step ? "#c9952e" : "#4a9e6b"} color="white" fontSize="0.7rem" fontWeight={700}>{n.v}</Flex>
              <Text fontSize="0.5rem" color="#8b8589">d={n.d}</Text>
            </Flex>
          </Flex>
        </motion.div>
      ))}
    </Flex>
  );
}

function TwoHeapsDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % 6), 1400); return () => clearInterval(t); }, []);
  const incoming = [4, 8, 1, 6, 3, 9];
  const minHeap = incoming.slice(0, Math.ceil((step + 1) / 2)).sort((a, b) => a - b);
  const maxHeap = incoming.slice(Math.ceil((step + 1) / 2), step + 1).sort((a, b) => b - a);
  return (
    <Flex gap={3} align="center" minH="56px" justify="center">
      <Box>
        <Text fontSize="0.55rem" color="#c94a6b" textAlign="center" mb={1}>Max-heap</Text>
        <Flex direction="column-reverse" align="center" gap={0.5}>
          {maxHeap.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              <Flex w="24px" h="24px" align="center" justify="center" borderRadius="sm" bg="#fdf6f5" border="1px solid" borderColor="#f0ddd4" fontSize="0.65rem" fontWeight={600} color="#c94a6b">{v}</Flex>
            </motion.div>
          ))}
        </Flex>
      </Box>
      <Box>
        <Text fontSize="0.55rem" color="#4a9e6b" textAlign="center" mb={1}>Min-heap</Text>
        <Flex direction="column-reverse" align="center" gap={0.5}>
          {minHeap.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              <Flex w="24px" h="24px" align="center" justify="center" borderRadius="sm" bg="#f0faf4" border="1px solid" borderColor="#cce0d4" fontSize="0.65rem" fontWeight={600} color="#4a9e6b">{v}</Flex>
            </motion.div>
          ))}
        </Flex>
      </Box>
      <Flex direction="column" align="center" gap={0.5}>
        <Text fontSize="0.55rem" color="#8b8589">incoming</Text>
        <motion.div key={step} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
          <Flex w="28px" h="28px" align="center" justify="center" borderRadius="md" bg="#faf6f0" border="2px solid" borderColor="#c9952e" fontSize="0.75rem" fontWeight={700} color="#c9952e">{incoming[step]}</Flex>
        </motion.div>
        <Text fontSize="0.5rem" color="#8b8589">median: {step % 2 === 0 ? minHeap[0] ?? incoming[0] : ((minHeap[0] ?? 0) + (maxHeap[0] ?? 0)) / 2}</Text>
      </Flex>
    </Flex>
  );
}

function SubsetDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % 5), 1600); return () => clearInterval(t); }, []);
  const data = [1, 2, 3];
  const levels = [
    { path: [], idx: 0, label: "start" },
    { path: [1], idx: 1, label: "take 1" },
    { path: [1, 2], idx: 2, label: "take 2" },
    { path: [1], idx: 2, label: "skip 3" },
    { path: [], idx: 2, label: "backtrack" },
  ];
  const s = levels[step];
  return (
    <Flex direction="column" align="center" gap={2} minH="56px">
      <Flex gap={1}>
        {data.map((v, i) => (
          <Flex key={i} w="28px" h="28px" align="center" justify="center" borderRadius="md" border="2px solid" borderColor={i === s.idx ? "#c9952e" : "#e8e0d6"} bg={i < s.idx ? "#f5f0eb" : "#fff"} fontSize="0.75rem" fontWeight={i === s.idx ? 700 : 400} color="#1a1a2e" opacity={i >= s.idx ? 1 : 0.4}>{v}</Flex>
        ))}
      </Flex>
      <Flex align="center" gap={1} minH="28px" p={1.5} bg="#faf6f0" borderRadius="md">
        <Text fontSize="0.55rem" color="#8b8589">path:</Text>
        {s.path.length === 0 && <Text fontSize="0.6rem" color="#c0b8b0" fontStyle="italic">[]</Text>}
        {s.path.map((v, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Flex w="20px" h="20px" align="center" justify="center" borderRadius="sm" bg="#4a7db5" color="white" fontSize="0.6rem" fontWeight={700}>{v}</Flex>
          </motion.div>
        ))}
      </Flex>
      <Text fontSize="0.6rem" color={s.label === "backtrack" ? "#c94a4a" : "#4a7db5"} fontWeight={600}>{s.label}</Text>
    </Flex>
  );
}

function ModifiedBSDemo() {
  const [step, setStep] = useState(0);
  const data = [4, 5, 6, 7, 0, 1, 2];
  const total = 4;
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % total), 1600); return () => clearInterval(t); }, []);
  const phases = [
    { L: 0, R: 6, mid: 3, label: "mid=7, left sorted" },
    { L: 4, R: 6, mid: 5, label: "mid=1, right sorted" },
    { L: 4, R: 4, mid: 4, label: "mid=0, found!" },
  ];
  const p = phases[Math.min(step, 2)];
  return (
    <Flex direction="column" align="center" gap={2} minH="56px">
      <Flex gap={1}>
        {data.map((v, i) => {
          const inRange = p && i >= p.L && i <= p.R;
          const isMid = p && i === p.mid;
          return (
            <Box key={i} position="relative">
              {i === p.L && <Text position="absolute" top="-1rem" left="50%" transform="translateX(-50%)" fontSize="0.5rem" color="#4a7db5" fontWeight={700}>L</Text>}
              {i === p.R && <Text position="absolute" top="-1rem" left="50%" transform="translateX(-50%)" fontSize="0.5rem" color="#c94a6b" fontWeight={700}>R</Text>}
              <motion.div animate={{ scale: isMid ? 1.15 : 1 }}>
                <Flex w="32px" h="32px" align="center" justify="center" borderRadius="md" border="2px solid" borderColor={isMid ? "#c9952e" : inRange ? "#4a7db5" : "#e0d8d0"} bg={isMid ? "#faf6f0" : inRange ? "#f0f6fd" : "#fff"} fontSize="0.8rem" fontWeight={isMid ? 700 : 400} color="#1a1a2e" opacity={inRange ? 1 : 0.3}>{v}</Flex>
              </motion.div>
            </Box>
          );
        })}
      </Flex>
      <Text fontSize="0.6rem" color="#c9952e" fontWeight={600}>{p.label}</Text>
    </Flex>
  );
}

function TopKElementsDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % 7), 1300); return () => clearInterval(t); }, []);
  const stream = [5, 3, 8, 1, 7, 2, 6];
  const heap = stream.slice(0, step + 1).sort((a, b) => a - b).slice(0, 3);
  return (
    <Flex direction="column" align="center" gap={2} minH="56px">
      <Flex gap={1}>
        {stream.map((v, i) => (
          <Flex key={i} w="24px" h="24px" align="center" justify="center" borderRadius="sm" border="2px solid" borderColor={i <= step ? "#c9952e" : "#e8e0d6"} bg={i <= step ? "#faf6f0" : "#fff"} fontSize="0.65rem" fontWeight={i <= step ? 600 : 400} color="#1a1a2e" opacity={i <= step ? 1 : 0.2}>{v}</Flex>
        ))}
      </Flex>
      <Box p={1.5} bg="#faf6f0" borderRadius="md" minW="100px">
        <Text fontSize="0.55rem" color="#8b8589" textAlign="center" mb={0.5}>Top-3 heap</Text>
        <Flex gap={1} justify="center">
          {heap.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
              <Flex w="24px" h="24px" align="center" justify="center" borderRadius="sm" bg="#1a1a2e" color="white" fontSize="0.6rem" fontWeight={700}>{v}</Flex>
            </motion.div>
          ))}
          {heap.length < 3 && <Text fontSize="0.6rem" color="#c0b8b0">...</Text>}
        </Flex>
      </Box>
    </Flex>
  );
}

const PATTERNS = [
  {
    num: 1, name: "Sliding Window",
    analogy: "Think of it like a flashlight beam sweeping across a dark wall. The beam (window) shows only a contiguous section at a time. You slide it to examine the next section, reusing most of what you already saw.",
    use: "Contiguous subarray/substring statistics — max sum, longest substring without repeats, min window substring",
    template: "Expand right pointer, shrink left when condition breaks, record result at each valid window.",
    complexity: "O(n)", demo: <SlideWindowDemo />,
    leetCode: "Maximum Sum Subarray of Size K, Longest Substring Without Repeating Characters, Minimum Window Substring",
  },
  {
    num: 2, name: "Two Pointers",
    analogy: "Think of it like two fingers closing a zipper from both ends. L and R start at opposite edges and meet in the middle, narrowing down the search space one comparison at a time.",
    use: "Sorted array pair search, palindrome check, container with most water, three-sum",
    template: "Place L at start, R at end. Move L up or R down based on comparison.",
    complexity: "O(n)", demo: <TwoPointersDemo />,
    leetCode: "Two Sum II, Container With Most Water, 3Sum, Trapping Rain Water",
  },
  {
    num: 3, name: "Fast & Slow Pointers",
    analogy: "Think of it like two runners on a circular track. The fast runner laps the slow one exactly when they meet — proof of a cycle. On a straight track, the fast runner reaches the end first.",
    use: "Cycle detection in linked lists, middle node, happy number, duplicate in array",
    template: "Slow moves 1 step, fast moves 2 steps. If they meet, cycle exists. Fast reaches end = no cycle.",
    complexity: "O(n)", demo: <FastSlowDemo />,
    leetCode: "Linked List Cycle, Middle of Linked List, Happy Number, Find Duplicate Number",
  },
  {
    num: 4, name: "Merge Intervals",
    analogy: "Think of it like merging overlapping meetings on a calendar. If your 10-11 meeting overlaps with 10:30-12, they become one 10-12 block. Sort by start time, merge when overlaps.",
    use: "Overlapping interval problems — meeting rooms, insert interval, interval intersection",
    template: "Sort by start. Iterate: if current overlaps with last, merge (extend end). Else push new interval.",
    complexity: "O(n log n)", demo: <MergeIntervalsDemo />,
    leetCode: "Merge Intervals, Insert Interval, Non-Overlapping Intervals, Meeting Rooms II",
  },
  {
    num: 5, name: "Cyclic Sort",
    analogy: "Think of it like sorting a deck of cards numbered 1 to n that got shuffled. Pick up each card and place it in its correct slot by swapping. Once every number is at (value-1), done.",
    use: "Array of numbers in range [1, n] — find missing/duplicate numbers, first missing positive",
    template: "Place each number at its correct index (nums[i] → nums[nums[i]-1]). Then scan for first mismatch.",
    complexity: "O(n)", demo: <CyclicSortDemo />,
    leetCode: "Missing Number, First Missing Positive, Find All Duplicates, Set Mismatch",
  },
  {
    num: 6, name: "In-place Linked List Reversal",
    analogy: "Think of it like turning a chain of paperclips around. Hold the current link, disconnect its forward connection, and point it backward to the previous link. Then step forward to the next one.",
    use: "Reverse linked list, reverse sub-list, reverse every k-group",
    template: "Save next, flip current.next to prev, advance prev and current. Repeat.",
    complexity: "O(n)", demo: <ReverseListDemo />,
    leetCode: "Reverse Linked List, Reverse Linked List II, Reverse Nodes in k-Group",
  },
  {
    num: 7, name: "Tree BFS (Level Order)",
    analogy: "Think of it like scanning a family portrait row by row. Start with the root row, then visit every child of those nodes before going deeper. A queue ensures FIFO — first in, first out.",
    use: "Level-order traversal, zigzag, right side view, min depth, connect level siblings",
    template: "Queue holds current level. Process all nodes in queue, enqueue their children for next level.",
    complexity: "O(n)", demo: <TreeBFSDemo />,
    leetCode: "Binary Tree Level Order Traversal, Zigzag Traversal, Right Side View, Min Depth",
  },
  {
    num: 8, name: "Tree DFS",
    analogy: "Think of it like exploring a cave system with a single rope. You go as deep as you can down one tunnel before backtracking to try the next branch. Pre-order = record on way down; post-order = on way back.",
    use: "Path sum, max depth, symmetric tree, lowest common ancestor, serialize/deserialize",
    template: "Use recursion: process node, recurse left, recurse right. Pre/in/post-order depending on need.",
    complexity: "O(n)", demo: <TreeDFSDemo />,
    leetCode: "Maximum Depth, Path Sum, Validate BST, Lowest Common Ancestor",
  },
  {
    num: 9, name: "Two Heaps",
    analogy: "Think of it like keeping a balanced seesaw. The max-heap holds the lower half (heaviest on top), and the min-heap holds the upper half (lightest on top). The median is always the top of one of them.",
    use: "Median of stream, sliding window median, find k largest/smallest in dynamic data",
    template: "Max-heap for lower half, min-heap for upper half. Balance sizes. Median = top of larger heap or average of both tops.",
    complexity: "O(log n) per insert", demo: <TwoHeapsDemo />,
    leetCode: "Find Median from Data Stream, Sliding Window Median, IPO",
  },
  {
    num: 10, name: "Subsets / Backtracking",
    analogy: "Think of it like exploring every fork in a labyrinth. At each decision point (take or skip), you go down one path, explore fully, then backtrack to try the other path. The maze is your decision tree.",
    use: "Subsets, permutations, combinations, partition palindromes, generate parentheses, word search",
    template: "Decision tree: for each element, choose to include or exclude. Recurse then undo (backtrack). Prune early with constraints.",
    complexity: "O(2^n)", demo: <SubsetDemo />,
    leetCode: "Subsets, Permutations, Combination Sum, Generate Parentheses, Word Search",
  },
  {
    num: 11, name: "Modified Binary Search",
    analogy: "Think of it like searching for a word in a dictionary that got cut in half and the halves were swapped. You don't know where the cut is, but you can still tell which half is properly ordered and search accordingly.",
    use: "Search in rotated array, find peak, find range, order-agnostic search",
    template: "Standard binary search but the comparison logic adapts: check which half is sorted, narrow accordingly.",
    complexity: "O(log n)", demo: <ModifiedBSDemo />,
    leetCode: "Search Rotated Array, Find Peak Element, First/Last Position, Search 2D Matrix",
  },
  {
    num: 12, name: "Top K Elements",
    analogy: "Think of it like a bouncer at a club keeping a list of only the k tallest people. Each new person is compared to the current kth tallest. Shorter? Ignore. Taller? The shortest on the list gets replaced.",
    use: "K largest/smallest, k closest, k most frequent, kth smallest in sorted matrix",
    template: "Use a min-heap (size k) for k largest. For k smallest, use max-heap or flip signs. Always keep heap size = k.",
    complexity: "O(n log k)", demo: <TopKElementsDemo />,
    leetCode: "Kth Largest Element, Top K Frequent, K Closest Points, Kth Smallest in Matrix",
  },
];

function PatternCard({ p }: { p: typeof PATTERNS[number] }) {
  const [showDemo, setShowDemo] = useState(false);
  return (
    <Box p={3.5} bg="#faf6f0" borderRadius="md" border="1px solid" borderColor="#e8e0d6">
      <Flex align="flex-start" gap={3}>
        <Flex w="28px" h="28px" borderRadius="full" bg="#c9952e" color="white" align="center" justify="center" fontSize="0.7rem" fontWeight={700} flexShrink={0} mt="2px">{p.num}</Flex>
        <Box flex="1">
          <Flex align="center" gap={3} mb={1} wrap="wrap">
            <Text fontSize="0.85rem" fontWeight={700} color="#1a1a2e">{p.name}</Text>
            <Text fontSize="0.6rem" color="#8b8589" bg="#f5f0eb" px={2} py={0.5} borderRadius="full">{p.complexity}</Text>
          </Flex>
          <Text fontSize="0.75rem" color="#8b8589" fontWeight={500}>Use when:</Text>
          <Text fontSize="0.8rem" color="#6b6350" mb={1}>{p.use}</Text>
          <Text fontSize="0.75rem" color="#8b8589" fontWeight={500}>Template:</Text>
          <Text fontSize="0.8rem" color="#6b6350" fontStyle="italic">{p.template}</Text>
          <Box mt={2.5} p={3} bg="white" borderRadius="lg" border="1px solid" borderColor="#e8e0d6">
            <Text fontSize="0.7rem" color="#4a7db5" fontWeight={600} mb={2} cursor="pointer" onClick={() => setShowDemo(!showDemo)}>
              {showDemo ? "Hide demo" : "Show demo"} 
            </Text>
            {showDemo && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <Flex justify="center" mb={2}>
                  {p.demo}
                </Flex>
              </motion.div>
            )}
            <Box p={2.5} bg="#f0f6fd" borderRadius="md">
              <Text fontSize="0.7rem" color="#4a7db5" fontWeight={600} mb={0.5}>Think of it like</Text>
              <Text fontSize="0.8rem" color="#6b6350" lineHeight="1.6">{p.analogy}</Text>
            </Box>
          </Box>
          <Text fontSize="0.65rem" color="#4a7db5" mt={1.5}>{p.leetCode}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export function TwelvePatterns() {
  return (
    <VStack gap={6} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>The 12 Essential Patterns</Heading>
        <Text color="#8b8589" mb={4} fontSize="sm">Pattern Recognition Reference</Text>
        <Text color="#6b6350" fontSize="0.85rem" lineHeight="1.7" mb={6}>
          Most LeetCode problems are combinations of these 12 patterns. Learn the template and the analogy, 
          then apply to the twist. Each demo auto-plays to show the pattern in action.
        </Text>
        <VStack gap={3} align="stretch">
          {PATTERNS.map(p => <PatternCard key={p.num} p={p} />)}
        </VStack>
      </Box>
    </VStack>
  );
}
