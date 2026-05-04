import { useState } from "react";
import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { ChevronDown, ChevronRight } from "lucide-react";

const STEPS = [
  {
    num: 1,
    title: "Restate the Problem",
    book: "Restate the problem in your own words.",
    why: "Interviewers want to confirm you understood the prompt before you start solving. Many candidates dive into code and realize later they solved the wrong problem.",
    say: '"Let me restate the problem to make sure I understand it correctly. We have a sorted array and need to find two numbers that add up to a target..."',
    connect: "Each visualizer starts with a Problem box. Read it and say it back to yourself before looking at anything else."
  },
  {
    num: 2,
    title: "Clarify Constraints",
    book: "Ask clarifying questions about input, output, constraints, and edge cases.",
    why: "Hidden constraints change the best approach. Is the array sorted? Can numbers be negative? What about empty input? These answers rule out wrong approaches immediately.",
    say: '"Before I code, I want to confirm: are duplicates allowed? What should I return if no solution exists?"',
    connect: "Check the Test Cases box on each visualizer. Those are the edge cases you should ask about."
  },
  {
    num: 3,
    title: "Walk Through an Example",
    book: "Walk through a tiny example out loud.",
    why: "Tracing a concrete example forces you to understand the mechanics. It also shows the interviewer you think methodically, not just pattern-match.",
    say: '"Let me trace through [2, 7, 11, 15] with target 9. I will start with two pointers at both ends..."',
    connect: "Click Play on the visualizer. Watch each step and follow the highlighted pointers. Pause and predict the next move."
  },
  {
    num: 4,
    title: "Propose a Baseline",
    book: "Propose a simple baseline solution.",
    why: "Starting with brute force is not weakness — it is structure. A working baseline proves you can solve it. Then you improve. Interviewers respect this progression.",
    say: '"The simplest approach is to check every pair with nested loops. It works, but it is O(n²) which is too slow for large inputs."',
    connect: "The pink box on each visualizer shows the brute-force approach. Read the idea and the code."
  },
  {
    num: 5,
    title: "Find the Bottleneck",
    book: "Identify what makes that baseline too slow or too messy.",
    why: "This is where you show you can analyze algorithms, not just write them. Name the repeated work: scanning the same elements, recomputing from scratch, extra memory allocations.",
    say: '"The repeated work here is scanning the same values again and again. Each window recomputes the sum from scratch even though most elements carry over."',
    connect: "Look at the brute-force complexity label. The bottleneck is what makes it O(n²) instead of O(n)."
  },
  {
    num: 6,
    title: "Refine the Approach",
    book: "Refine to a better approach and explain why it is better.",
    why: "This is your main solution. Explain the insight that removes the bottleneck — a better data structure, a different traversal order, or an entirely new angle.",
    say: '"Instead of recomputing from scratch, I can keep a running sum and just update the two elements that change. That is O(1) per step instead of O(k)."',
    connect: "The green box shows the optimized approach. Compare it with brute-force. What changed? That change is the interview insight."
  },
  {
    num: 7,
    title: "Implement and Test",
    book: "Implement carefully, then test before you declare victory.",
    why: "Clean code with proper variable names and early returns shows experience. Walk through your code with the example and check edge cases before saying you are done.",
    say: '"Let me implement this now. I will use two pointers, starting L at 0 and R at the end. I will test with the example and an empty case."',
    connect: "The code comparison shows both approaches side by side. The highlighted lines match the current animation step."
  }
];

export function InterviewGuide() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <VStack gap={6} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>The 7-Step Interview Workflow</Heading>
        <Text color="#8b8589" mb={2} fontSize="sm">From Chapter 2: How to Crack the Coding Interview</Text>
        <Text color="#6b6350" fontSize="0.85rem" lineHeight="1.7" maxW="700px">
          When you see a new problem, do not ask "Have I seen this before?" Ask "What smaller ideas 
          in here do I recognize?" This workflow helps you stay structured and show the interviewer 
          how you think.
        </Text>
      </Box>

      <Box p={6} bg="#faf6f0" borderRadius="xl">
        <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Quick Recap</Text>
        <Flex gap={2} wrap="wrap">
          {STEPS.map(s => (
            <Flex key={s.num} align="center" gap={1.5} px={2.5} py={1.5} borderRadius="full" bg="white" border="1px solid" borderColor="#e8e0d6">
              <Flex w="18px" h="18px" borderRadius="full" align="center" justify="center" bg="#c9952e" color="white" fontSize="0.6rem" fontWeight={700}>{s.num}</Flex>
              <Text fontSize="0.75rem" color="#1a1a2e" fontWeight={500}>{s.title}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>

      {STEPS.map((step) => {
        const isOpen = openStep === step.num;
        return (
          <Box
            key={step.num}
            p={5}
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor={isOpen ? "#c9952e" : "#e8e0d6"}
            cursor="pointer"
            onClick={() => setOpenStep(isOpen ? null : step.num)}
            transition="border-color 0.15s"
          >
            <Flex align="center" gap={3} mb={isOpen ? 4 : 0}>
              <Flex w="28px" h="28px" borderRadius="full" align="center" justify="center" bg={isOpen ? "#c9952e" : "#f5f0eb"} color={isOpen ? "white" : "#8b8589"} fontSize="0.75rem" fontWeight={700}>{step.num}</Flex>
              <Text fontWeight={600} color="#1a1a2e" fontSize="1rem">{step.title}</Text>
              <Box ml="auto">{isOpen ? <ChevronDown size={18} color="#8b8589" /> : <ChevronRight size={18} color="#8b8589" />}</Box>
            </Flex>

            {isOpen && (
              <VStack align="stretch" gap={3}>
                <Box p={3} bg="#f5f0eb" borderRadius="md">
                  <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>From the Book</Text>
                  <Text fontSize="0.85rem" color="#6b6350" fontStyle="italic">"{step.book}"</Text>
                </Box>

                <Box>
                  <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Why This Matters</Text>
                  <Text fontSize="0.85rem" color="#6b6350" lineHeight="1.7">{step.why}</Text>
                </Box>

                <Box p={3} bg="#faf6f0" borderRadius="md" borderLeft="3px solid" borderColor="#c9952e">
                  <Text fontSize="0.65rem" color="#c9952e" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>What to Say</Text>
                  <Text fontSize="0.85rem" color="#6b6350" fontStyle="italic">{step.say}</Text>
                </Box>

                <Box p={3} bg="#f0faf4" borderRadius="md">
                  <Text fontSize="0.65rem" color="#4a9e6b" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>In This Visualizer</Text>
                  <Text fontSize="0.85rem" color="#6b6350">{step.connect}</Text>
                </Box>
              </VStack>
            )}
          </Box>
        );
      })}

      <Box p={6} bg="white" borderRadius="xl" border="1px solid" borderColor="#e8e0d6">
        <Flex align="center" gap={2} mb={2}>
          <Box w="3px" h="1.25rem" bg="#c9952e" borderRadius="full" />
          <Text fontFamily="'Playfair Display', serif" fontSize="1rem" fontWeight={600} color="#1a1a2e">45-Minute Interview Rhythm</Text>
        </Flex>
        <Text color="#8b8589" fontSize="0.85rem" lineHeight="1.7" mb={3}>from the book: a good coding round is not just about the middle twenty minutes when you are typing.</Text>
        <Flex gap={2} wrap="wrap">
          {[
            { time: "0-3 min", label: "Intros", color: "#8b8589" },
            { time: "3-8 min", label: "Clarify + Examples", color: "#4a7db5" },
            { time: "8-14 min", label: "Baseline + Refine", color: "#8b5cf6" },
            { time: "14-30 min", label: "Code", color: "#c9952e" },
            { time: "30-38 min", label: "Test + Edge Cases", color: "#4a9e6b" },
            { time: "38-45 min", label: "Trade-offs + Wrap", color: "#c94a6b" },
          ].map(p => (
            <Flex key={p.time} align="center" gap={2} p={2.5} bg="#faf6f0" borderRadius="md" flex="1" minW="150px">
              <Text fontSize="0.65rem" fontWeight={700} color={p.color}>{p.time}</Text>
              <Text fontSize="0.75rem" color="#6b6350">{p.label}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
}
