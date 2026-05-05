import { motion, AnimatePresence } from "framer-motion";
import { Flex, Text, Box } from "@chakra-ui/react";

function ArrayAnim() {
  const items = [5, 2, 8, 1, 9];
  return (
    <Flex gap={1.5} align="center">
      {items.map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Flex
            w="36px"
            h="36px"
            align="center"
            justify="center"
            borderRadius="md"
            border="2px solid"
            borderColor="#c9952e"
            bg="white"
            fontSize="0.75rem"
            fontWeight={600}
            color="#1a1a2e"
          >
            {v}
          </Flex>
        </motion.div>
      ))}
      <Flex
        w="36px"
        h="36px"
        align="center"
        justify="center"
        fontSize="0.7rem"
        color="#8b8589"
      >
        ...
      </Flex>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      >
        <Flex
          w="36px"
          h="36px"
          align="center"
          justify="center"
          borderRadius="md"
          border="2px dashed"
          borderColor="#4a7db5"
          bg="#f0f6fd"
          fontSize="0.7rem"
          fontWeight={600}
          color="#4a7db5"
        >
          O(1)
        </Flex>
      </motion.div>
    </Flex>
  );
}

function StringAnim() {
  const chars = ["H", "e", "l", "l", "o"];
  return (
    <Flex gap={1} align="center">
      {chars.map((c, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
        >
          <Flex
            w="28px"
            h="34px"
            align="center"
            justify="center"
            borderRadius="sm"
            bg="#f5f0eb"
            border="1px solid"
            borderColor="#e0d8d0"
            fontSize="0.85rem"
            fontWeight={600}
            fontFamily="mono"
            color="#1a1a2e"
          >
            {c}
          </Flex>
        </motion.div>
      ))}
    </Flex>
  );
}

function LinkedListAnim() {
  const nodes = [
    <Flex
      key="n1"
      w="32px"
      h="32px"
      align="center"
      justify="center"
      borderRadius="md"
      bg="#4a7db5"
      color="white"
      fontSize="0.75rem"
      fontWeight={600}
    >
      1
    </Flex>,
    <Flex
      key="n2"
      w="32px"
      h="32px"
      align="center"
      justify="center"
      borderRadius="md"
      bg="#4a7db5"
      color="white"
      fontSize="0.75rem"
      fontWeight={600}
    >
      2
    </Flex>,
    <Flex
      key="n3"
      w="32px"
      h="32px"
      align="center"
      justify="center"
      borderRadius="md"
      bg="#4a7db5"
      color="white"
      fontSize="0.75rem"
      fontWeight={600}
    >
      3
    </Flex>,
  ];
  return (
    <Flex gap={1} align="center">
      {nodes.map((node, i) => (
        <Flex key={i} align="center" gap={1}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            {node}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.2 + 0.1 }}
            >
              <Text fontSize="0.8rem" color="#c9952e" fontWeight={300}>
                →
              </Text>
            </motion.div>
          )}
        </Flex>
      ))}
      <Text fontSize="0.8rem" color="#c0b8b0">
        → ∅
      </Text>
    </Flex>
  );
}

function StackAnim() {
  const items = ["(", "{", "["];
  return (
    <Flex align="center" gap={3}>
      <Flex
        direction="column-reverse"
        gap={1}
        p={2}
        bg="#faf6f0"
        borderRadius="md"
        minH="100px"
        w="44px"
      >
        <AnimatePresence>
          {items.map((ch, i) => (
            <motion.div
              key={`${ch}-${i}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: i * 0.15 }}
            >
              <Flex
                w="32px"
                h="28px"
                align="center"
                justify="center"
                borderRadius="sm"
                bg="#8b5cf6"
                color="white"
                fontSize="0.75rem"
                fontWeight={700}
              >
                {ch}
              </Flex>
            </motion.div>
          ))}
        </AnimatePresence>
      </Flex>
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Text fontSize="0.7rem" color="#c9952e" fontWeight={600}>
          push/pop
        </Text>
      </motion.div>
    </Flex>
  );
}

function QueueAnim() {
  const items = ["A", "B", "C"];
  return (
    <Flex align="center" gap={2}>
      <motion.div
        animate={{ x: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Flex
          w="28px"
          h="28px"
          align="center"
          justify="center"
          borderRadius="md"
          bg="#c94a6b"
          color="white"
          fontSize="0.65rem"
          fontWeight={700}
        >
          out
        </Flex>
      </motion.div>
      <Flex gap={1}>
        {items.map((ch, i) => (
          <motion.div
            key={ch}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <Flex
              w="28px"
              h="28px"
              align="center"
              justify="center"
              borderRadius="md"
              bg="#4a7db5"
              color="white"
              fontSize="0.65rem"
              fontWeight={600}
            >
              {ch}
            </Flex>
          </motion.div>
        ))}
      </Flex>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Text fontSize="0.65rem" color="#4a9e6b" fontWeight={600}>
          +in
        </Text>
      </motion.div>
    </Flex>
  );
}

function BinarySearchAnim() {
  const items = [2, 5, 8, 12, 16, 23, 38];
  const [midIdx] = [3];
  return (
    <Flex gap={1} align="center" position="relative">
      {items.map((v, i) => (
        <Flex key={i} direction="column" align="center" gap={0.5}>
          {i === 0 && (
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Text fontSize="0.55rem" color="#4a7db5" fontWeight={700}>L</Text>
            </motion.div>
          )}
          {i === items.length - 1 && (
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
              <Text fontSize="0.55rem" color="#c94a6b" fontWeight={700}>R</Text>
            </motion.div>
          )}
          {i < items.length && i !== 0 && i !== items.length - 1 && (
            <Box h="12px" />
          )}
          <motion.div
            animate={{ scale: i === midIdx ? 1.08 : 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Flex
              w="28px"
              h="28px"
              align="center"
              justify="center"
              borderRadius="md"
              border="2px solid"
              borderColor={i === midIdx ? "#c9952e" : "#e0d8d0"}
              bg={i === midIdx ? "#faf6f0" : "white"}
              fontSize="0.65rem"
              fontWeight={600}
              color="#1a1a2e"
            >
              {v}
            </Flex>
          </motion.div>
          {i === midIdx && (
            <motion.div animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Text fontSize="0.55rem" color="#c9952e" fontWeight={700}>mid</Text>
            </motion.div>
          )}
          {i !== midIdx && (
            <Box h="12px" />
          )}
        </Flex>
      ))}
    </Flex>
  );
}

function TreeAnim() {
  return (
    <Flex align="center" gap={2}>
      <Flex direction="column" align="center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <Flex w="28px" h="28px" align="center" justify="center" borderRadius="full" bg="#c9952e" color="white" fontSize="0.65rem" fontWeight={700}>R</Flex>
        </motion.div>
        <Flex gap={3} mt={1.5}>
          <Text fontSize="0.5rem" color="#c9952e">/</Text>
          <Text fontSize="0.5rem" color="#c9952e">\</Text>
        </Flex>
        <Flex gap={2}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Flex w="24px" h="24px" align="center" justify="center" borderRadius="full" bg="#4a7db5" color="white" fontSize="0.6rem" fontWeight={600}>L</Flex>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Flex w="24px" h="24px" align="center" justify="center" borderRadius="full" bg="#4a7db5" color="white" fontSize="0.6rem" fontWeight={600}>R</Flex>
          </motion.div>
        </Flex>
      </Flex>
      <Flex direction="column" gap={1.5}>
        <Text fontSize="0.55rem" color="#8b8589">root</Text>
        <Text fontSize="0.55rem" color="#8b8589">children</Text>
      </Flex>
    </Flex>
  );
}

function SlidingWindowAnim() {
  const items = [3, 7, 1, 8, 2, 6];
  return (
    <Flex gap={1} align="center" position="relative">
      {items.map((v, i) => (
        <Flex
          key={i}
          w="28px"
          h="28px"
          align="center"
          justify="center"
          borderRadius="md"
          border="2px solid"
          borderColor={i >= 1 && i <= 3 ? "#c9952e" : "#e0d8d0"}
          bg={i >= 1 && i <= 3 ? "#faf6f0" : "white"}
          fontSize="0.65rem"
          fontWeight={600}
          color="#1a1a2e"
        >
          {v}
        </Flex>
      ))}
      <motion.div
        animate={{ x: [0, 32, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        style={{ position: "absolute", top: "-14px", left: "34px" }}
      >
        <Flex w="84px" h="2px" bg="#c9952e" />
      </motion.div>
    </Flex>
  );
}

function BacktrackingAnim() {
  const branches = [
    { level: 0, label: "[]" },
    { level: 1, label: "[1]" },
    { level: 2, label: "[1,2]" },
    { level: 2, label: "[1,3]" },
  ];
  return (
    <Flex direction="column" align="center" gap={1}>
      {branches.map((b, i) => (
        <motion.div
          key={`${b.label}-${i}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <Flex
            px={2}
            py={0.5}
            borderRadius="md"
            bg={i === 0 ? "#f5f0eb" : "#faf6f0"}
            border="1px solid"
            borderColor={i === branches.length - 1 ? "#4a9e6b" : "#e0d8d0"}
            fontSize="0.65rem"
            fontWeight={600}
            color={i === branches.length - 1 ? "#4a9e6b" : "#1a1a2e"}
          >
            {b.label}
          </Flex>
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Text fontSize="0.55rem" color="#8b8589" mt={1}>choose → explore ↺ unchoose</Text>
      </motion.div>
    </Flex>
  );
}

function DPAnim() {
  const fib = [0, 1, 1, 2, 3, 5];
  return (
    <Flex gap={1} align="center">
      {fib.map((v, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.15, type: "spring" }}
        >
          <Flex direction="column" align="center" gap={0.5}>
            <Flex
              w="28px"
              h="28px"
              align="center"
              justify="center"
              borderRadius="md"
              border="2px solid"
              borderColor={i >= 2 ? "#c9952e" : "#e0d8d0"}
              bg={i >= 2 ? "#faf6f0" : "white"}
              fontSize="0.65rem"
              fontWeight={600}
              color="#1a1a2e"
            >
              {v}
            </Flex>
            {i >= 2 && (
              <Text fontSize="0.45rem" color="#8b8589">prev[i-1]+[i-2]</Text>
            )}
          </Flex>
        </motion.div>
      ))}
    </Flex>
  );
}

function MathAnim() {
  const digits = [1, 2, 3, 4];
  return (
    <Flex gap={1.5} align="center">
      <Flex gap={1}>
        {digits.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1 }}
            animate={
              i === digits.length - 1
                ? { opacity: [1, 0.3, 0.3, 0.3, 1, 1], scale: [1, 1.15, 1, 1, 1, 1] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 3, delay: i * 0 }}
          >
            <Flex
              w="24px"
              h="28px"
              align="center"
              justify="center"
              borderRadius="md"
              bg={i === digits.length - 1 ? "#c9952e" : "#f5f0eb"}
              color={i === digits.length - 1 ? "white" : "#1a1a2e"}
              fontSize="0.65rem"
              fontWeight={600}
            >
              {d}
            </Flex>
          </motion.div>
        ))}
      </Flex>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Text fontSize="0.55rem" color="#c9952e" fontWeight={700}>%10</Text>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Flex
          w="24px"
          h="28px"
          align="center"
          justify="center"
          borderRadius="md"
          bg="#4a9e6b"
          color="white"
          fontSize="0.65rem"
          fontWeight={600}
        >
          4
        </Flex>
      </motion.div>
    </Flex>
  );
}

const ANIMS: Record<string, React.ReactNode> = {
  array: <ArrayAnim />,
  string: <StringAnim />,
  linkedlist: <LinkedListAnim />,
  stack: <StackAnim />,
  queue: <QueueAnim />,
  binarysearch: <BinarySearchAnim />,
  tree: <TreeAnim />,
  slidingwindow: <SlidingWindowAnim />,
  backtracking: <BacktrackingAnim />,
  dp: <DPAnim />,
  math: <MathAnim />,
};

export function PrimerVisual({ topic }: { topic: string }) {
  return ANIMS[topic] || null;
}
