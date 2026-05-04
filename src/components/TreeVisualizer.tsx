import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Text, VStack, Flex, Heading, Badge } from "@chakra-ui/react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";

import { SolutionCompare } from "./SolutionCompare";
import { StepLabel } from "./StepLabel";

interface TreeNode {
  id: number;
  val: number;
  left?: TreeNode;
  right?: TreeNode;
}

const tree: TreeNode = {
  id: 1,
  val: 3,
  left: { id: 2, val: 9 },
  right: {
    id: 3,
    val: 20,
    left: { id: 4, val: 15 },
    right: { id: 5, val: 7 },
  },
};

interface StepInfo {
  nodeId: number;
  depth: number;
  explanation: string;
  activeLines: number[];
}

const BRUTE_FORCE = `def height(node):
    if not node:
        return 0
    return 1 + max(height(node.left), height(node.right))

def max_depth_bruteforce(root):
    if not root:
        return 0
    left = height(root.left)
    right = height(root.right)
    return 1 + max(left, right)`;

const OPTIMIZED = `def max_depth(root):
    if not root:
        return 0
    return 1 + max(
        max_depth(root.left),
        max_depth(root.right)
    )`;

function collectPreorder(node: TreeNode, order: TreeNode[]): TreeNode[] {
  order.push(node);
  if (node.left) collectPreorder(node.left, order);
  if (node.right) collectPreorder(node.right, order);
  return order;
}

function computeDepth(node: TreeNode, depths: Map<number, number>): number {
  if (depths.has(node.id)) return depths.get(node.id)!;
  const left = node.left ? computeDepth(node.left, depths) : 0;
  const right = node.right ? computeDepth(node.right, depths) : 0;
  const d = 1 + Math.max(left, right);
  depths.set(node.id, d);
  return d;
}

const generateSteps = () => {
  const allNodes: TreeNode[] = [];
  collectPreorder(tree, allNodes);
  const postOrder: TreeNode[] = [];
  function post(node: TreeNode) {
    if (node.left) post(node.left);
    if (node.right) post(node.right);
    postOrder.push(node);
  }
  post(tree);

  const steps: StepInfo[] = [];
  const depths = new Map<number, number>();

  steps.push({
    nodeId: -1,
    depth: 0,
    explanation: "Start at root. DFS visits left subtree first, then right, then the node itself (post-order).",
    activeLines: [2]
  });

  for (const node of postOrder) {
    let d = 1;
    if (node.left || node.right) {
      const ld = node.left ? computeDepth(node.left, depths) : 0;
      const rd = node.right ? computeDepth(node.right, depths) : 0;
      d = 1 + Math.max(ld, rd);
    }
    depths.set(node.id, d);
    const ld = node.left ? depths.get(node.left.id) ?? 0 : 0;
    const rd = node.right ? depths.get(node.right.id) ?? 0 : 0;
    steps.push({
      nodeId: node.id,
      depth: d,
      explanation: `Visit node ${node.val}. left=${ld}, right=${rd}. depth = 1 + max(${ld}, ${rd}) = ${d}`,
      activeLines: [4, 5]
    });
  }

  steps.push({
    nodeId: -2,
    depth: depths.get(tree.id) ?? 0,
    explanation: `Done! Max depth = ${depths.get(tree.id)}`,
    activeLines: [7]
  });

  return steps;
};

const STEPS = generateSteps();

function TreeNodeBox({
  node,
  visited,
  currentNode,
}: {
  node: TreeNode;
  visited: Map<number, number>;
  currentNode: number | null;
}) {
  const isCurrent = node.id === currentNode;
  const isVisited = visited.has(node.id);
  const depth = visited.get(node.id);

  return (
    <Flex direction="column" align="center" gap={2}>
      <motion.div
        animate={{
          scale: isCurrent ? 1.1 : 1,
          borderColor: isCurrent ? "#c9952e" : isVisited ? "#4a9e6b" : "#e8e0d6",
          backgroundColor: isCurrent ? "#faf6f0" : isVisited ? "#f0faf4" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: "60px",
          height: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          border: "2px solid",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: isCurrent ? "#c9952e" : isVisited ? "#4a9e6b" : "#1a1a2e",
          position: "relative",
        }}
      >
        {node.val}
        {isVisited && depth !== undefined && (
          <Text
            position="absolute"
            bottom="-4px"
            right="-4px"
            bg="#4a9e6b"
            color="white"
            borderRadius="full"
            w="20px"
            h="20px"
            fontSize="0.65rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight={700}
          >
            {depth}
          </Text>
        )}
      </motion.div>
      {(node.left || node.right) && (
        <Flex gap={6} justify="center" position="relative">
          <Flex direction="column" align="center" position="relative">
            <Box w="1px" h="16px" bg={isVisited ? "#c0d8c0" : "#e0d8d0"} />
            {node.left && <TreeNodeBox node={node.left} visited={visited} currentNode={currentNode} />}
          </Flex>
          <Flex direction="column" align="center" position="relative">
            <Box w="1px" h="16px" bg={isVisited ? "#c0d8c0" : "#e0d8d0"} />
            {node.right && <TreeNodeBox node={node.right} visited={visited} currentNode={currentNode} />}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export function TreeVisualizer() {
  const { setTotalSteps, reset, setActiveLines, currentStep, isPlaying, playbackSpeed, nextStep } = useAlgorithmStore();
  const stepInfo = useMemo(() => STEPS[currentStep] || STEPS[0], [currentStep]);
  const uiConfig = { color: stepInfo.nodeId === -2 ? "green.500" : stepInfo.nodeId === -1 ? "blue.500" : "purple.500", label: stepInfo.nodeId === -2 ? "Done" : stepInfo.nodeId === -1 ? "Starting" : "Visiting" };

  useEffect(() => {
    setTotalSteps(STEPS.length);
    return () => reset();
  }, [setTotalSteps, reset]);

  useEffect(() => {
    setActiveLines(stepInfo.activeLines);
  }, [currentStep, setActiveLines, stepInfo.activeLines]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying && currentStep < STEPS.length - 1) {
      timer = setTimeout(nextStep, playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, nextStep, playbackSpeed]);

  const visited = useMemo(() => {
    const map = new Map<number, number>();
    if (stepInfo.nodeId === -2) {
      const allSteps = STEPS.slice(1, -1);
      for (const s of allSteps) {
        if (s.nodeId > 0) map.set(s.nodeId, s.depth);
      }
    } else if (stepInfo.nodeId > 0) {
      for (const s of STEPS) {
        if (s.nodeId === stepInfo.nodeId) break;
        if (s.nodeId > 0) map.set(s.nodeId, s.depth);
      }
    }
    return map;
  }, [currentStep]);

  return (
    <VStack gap={8} align="stretch" w="full">
      <Box p={8} bg="white" borderRadius="2xl" border="1px solid" borderColor="#e8e0d6" shadow="lg">
        <Heading size="md" mb={1}>Maximum Depth of Binary Tree</Heading>
        <Text color="#8b8589" mb={6} fontSize="sm">Chapter 10: Trees & Recursion</Text>

        <Box p={4} bg="#f5f0eb" borderRadius="lg" mb={4}>
          <StepLabel num={1} title="Restate" />
          <Text fontSize="0.9rem" color="#1a1a2e">Given a binary tree, find its maximum depth — the number of nodes along the longest path from root down to farthest leaf.</Text>
        </Box>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Test Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Tree [3,9,20,null,null,15,7] → depth 3</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Empty tree → depth 0</Text>
          </Box>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={3} bg="#faf6f0" borderRadius="lg">
            <StepLabel num={2} title="Clarify" />
            <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600" mb={1}>Edge Cases</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono">Empty tree → depth 0</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Single node → depth 1</Text>
            <Text fontSize="0.8rem" color="#6b6350" fontFamily="mono" mt={1}>Skewed tree → depth = n</Text>
          </Box>
        </Flex>

        <Flex gap={4} mb={3}>
          <Box flex="1" p={4} bg="#fdf6f5" borderRadius="lg" border="1px solid" borderColor="#f0ddd4">
            <StepLabel num={4} title="Baseline" />
            <Text fontSize="0.85rem" color="#6b6350">For each node, compute the height of its left and right subtrees separately, then take the max. Repeats the same recursive work — O(n²) for skewed trees.</Text>
          </Box>
          <Box flex="1" p={4} bg="#f0faf4" borderRadius="lg" border="1px solid" borderColor="#cce0d4">
            <StepLabel num={6} title="Refine" />
            <Text fontSize="0.85rem" color="#6b6350">One post-order DFS: each node returns 1 + max(depth(left), depth(right)). The recursion naturally computes each subtree depth exactly once — O(n).</Text>
          </Box>
        </Flex>

        <Box p={3} bg="#fdf6f5" borderRadius="lg" mb={4} borderLeft="3px solid" borderColor="#c94a4a">
          <StepLabel num={5} title="Bottleneck" mb={0.5} />
          <Text fontSize="0.8rem" color="#6b6350">
            The brute force calls a separate height() function for each node, which recurses down the entire subtree every time. A leaf's height gets recomputed by every ancestor above it — the same work done over and over.
          </Text>
        </Box>

        <Box py={4} overflowX="auto">
          <StepLabel num={3} title="Example" mb={3} />
          <Flex justify="center" minW="400px">
            <TreeNodeBox node={tree} visited={visited} currentNode={stepInfo.nodeId > 0 ? stepInfo.nodeId : null} />
          </Flex>
        </Box>

        <Flex p={6} bg="#f5f0eb" borderRadius="xl" direction="column" gap={2} mt={4}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={3}>
              <Badge bg="#1a1a2e" color="white" px={2} py={0.5} borderRadius="md" fontSize="0.7rem">
                max depth: {stepInfo.depth}
              </Badge>
            </Flex>
            <Badge bg={uiConfig.color} color="white" px={3} py={1} borderRadius="full" fontSize="0.65rem">{uiConfig.label}</Badge>
          </Flex>
          <Text color="#6b6350" fontSize="md" fontStyle="italic" borderLeft="4px solid" borderColor="#c9952e" pl={4} py={1}>
            "{stepInfo.explanation}"
          </Text>
        </Flex>
      </Box>

      <Box>
        <StepLabel num={7} title="Implement" mb={2} />
        <Heading size="sm" mb={4} color="#6b6350">Code</Heading>
        <SolutionCompare bruteForceCode={BRUTE_FORCE} optimizedCode={OPTIMIZED} activeLines={stepInfo.activeLines} />
      </Box>
    </VStack>
  );
}
