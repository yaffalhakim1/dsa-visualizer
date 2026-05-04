import { Box, Flex, VStack, Heading, Text, IconButton } from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GlobalControlBar } from "@/components/GlobalControlBar";
import { Menu } from "lucide-react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";

const LC = "https://leetcode.com/problems";

interface Problem {
  name: string;
  route?: string;
  url?: string | null;
}

interface Chapter {
  id: number;
  name: string;
  path?: string;
  problems?: Problem[];
}

const CHAPTERS: Chapter[] = [
  {
    id: 6,
    name: "Arrays & Strings",
    problems: [
      { name: "Two Sum", route: "/ch6/two-sum" },
      { name: "Best Time to Buy & Sell Stock", route: "/ch6/best-time" },
      {
        name: "Product of Array Except Self",
        route: "/ch6/product-except-self",
      },
      { name: "Maximum Subarray (Kadane's)", route: "/ch6/maximum-subarray" },
      { name: "Contains Duplicate", route: "/ch6/contains-duplicate" },
    ],
  },
  {
    id: 7,
    name: "Linked Lists",
    path: "/linked-lists",
    problems: [
      { name: "Reverse Linked List", url: `${LC}/reverse-linked-list/` },
      { name: "Merge Two Sorted Lists", url: `${LC}/merge-two-sorted-lists/` },
      { name: "Linked List Cycle", url: `${LC}/linked-list-cycle/` },
      {
        name: "Remove Nth Node From End",
        url: `${LC}/remove-nth-node-from-end-of-list/`,
      },
      {
        name: "Middle of Linked List",
        url: `${LC}/middle-of-the-linked-list/`,
      },
    ],
  },
  {
    id: 8,
    name: "Stacks & Queues",
    path: "/stacks-queues",
    problems: [
      { name: "Valid Parentheses", url: `${LC}/valid-parentheses/` },
      { name: "Min Stack", url: `${LC}/min-stack/` },
      { name: "Daily Temperatures", url: `${LC}/daily-temperatures/` },
      { name: "Evaluate RPN", url: `${LC}/evaluate-reverse-polish-notation/` },
      {
        name: "Queue Using Stacks",
        url: `${LC}/implement-queue-using-stacks/`,
      },
    ],
  },
  {
    id: 10,
    name: "Trees",
    path: "/trees",
    problems: [
      {
        name: "Max Depth of Binary Tree",
        url: `${LC}/maximum-depth-of-binary-tree/`,
      },
      { name: "Invert Binary Tree", url: `${LC}/invert-binary-tree/` },
      { name: "Validate BST", url: `${LC}/validate-binary-search-tree/` },
      {
        name: "Level Order Traversal",
        url: `${LC}/binary-tree-level-order-traversal/`,
      },
      { name: "Same Tree", url: `${LC}/same-tree/` },
    ],
  },
  {
    id: 13,
    name: "Binary Search",
    path: "/binary-search",
    problems: [
      { name: "Binary Search", url: `${LC}/binary-search/` },
      {
        name: "Search Rotated Array",
        url: `${LC}/search-in-rotated-sorted-array/`,
      },
      {
        name: "First & Last Position",
        url: `${LC}/find-first-and-last-position-of-element-in-sorted-array/`,
      },
      { name: "Koko Eating Bananas", url: `${LC}/koko-eating-bananas/` },
      { name: "Search 2D Matrix", url: `${LC}/search-a-2d-matrix/` },
    ],
  },
  {
    id: 14,
    name: "Sliding Window",
    path: "/sliding-window",
    problems: [
      { name: "Max Sum Subarray", url: null },
      {
        name: "Longest Substring (Repeat)",
        url: `${LC}/longest-substring-without-repeating-characters/`,
      },
      {
        name: "Minimum Window Substring",
        url: `${LC}/minimum-window-substring/`,
      },
      { name: "Permutation in String", url: `${LC}/permutation-in-string/` },
      { name: "Sliding Window Maximum", url: `${LC}/sliding-window-maximum/` },
    ],
  },
  {
    id: 15,
    name: "Backtracking",
    path: "/backtracking",
    problems: [
      { name: "Subsets", url: `${LC}/subsets/` },
      { name: "Permutations", url: `${LC}/permutations/` },
      { name: "Combination Sum", url: `${LC}/combination-sum/` },
      { name: "N-Queens", url: `${LC}/n-queens/` },
      { name: "Word Search", url: `${LC}/word-search/` },
    ],
  },
  { id: 17, name: "Dynamic Programming" },
  {
    id: 20,
    name: "Reverse Integer",
    path: "/reverse-integer",
    problems: [
      { name: "Reverse Integer", url: `${LC}/reverse-integer/` },
      { name: "Palindrome Number", url: `${LC}/palindrome-number/` },
      { name: "Plus One", url: `${LC}/plus-one/` },
      { name: "Power of Two", url: `${LC}/power-of-two/` },
      { name: "Count Primes", url: `${LC}/count-primes/` },
    ],
  },
];

function SidebarContent({ isActive }: { isActive: (path: string) => boolean }) {
  return (
    <VStack
      bg="#1a1a2e"
      p="1.5rem"
      align="stretch"
      gap="1.5rem"
      flexShrink={0}
      h="full"
      overflowY="auto"
    >
      <Box borderBottom="1px solid" borderColor="rgba(232,224,214,0.12)" pb="1rem">
        <Heading color="#c9952e" size="md" letterSpacing="0.02em">
          DSA Playbook
        </Heading>
        <Text
          fontSize="0.7rem"
          color="#8b8589"
          mt="0.25rem"
          textTransform="uppercase"
          letterSpacing="0.15em"
          fontWeight="500"
        >
          Interactive Edition
        </Text>
      </Box>

      <VStack align="stretch" gap="0.25rem" flex="1">
        <Text
          fontSize="0.65rem"
          color="#5c5660"
          textTransform="uppercase"
          letterSpacing="0.15em"
          fontWeight="500"
          mb="0.25rem"
        >
          Chapters
        </Text>

        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex
            align="center"
            gap="0.5rem"
            p="0.5rem"
            borderRadius="0.25rem"
            transition="all 0.15s"
            bg={isActive("/") ? "rgba(201,149,46,0.1)" : "transparent"}
            _hover={{ bg: "rgba(232,224,214,0.05)" }}
          >
            <Box
              w="3px"
              h="1rem"
              borderRadius="full"
              bg={isActive("/") ? "#c9952e" : "transparent"}
              flexShrink={0}
            />
            <Text
              fontSize="0.8125rem"
              color={isActive("/") ? "#e8e0d6" : "#8b8589"}
              fontWeight={isActive("/") ? 500 : 400}
            >
              Home
            </Text>
          </Flex>
        </Link>

        <Link to="/interview-workflow" style={{ textDecoration: "none" }}>
          <Flex
            align="center"
            gap="0.5rem"
            p="0.5rem"
            borderRadius="0.25rem"
            transition="all 0.15s"
            bg={isActive("/interview-workflow") ? "rgba(201,149,46,0.1)" : "transparent"}
            _hover={{ bg: "rgba(232,224,214,0.05)" }}
          >
            <Box
              w="3px"
              h="1rem"
              borderRadius="full"
              bg={isActive("/interview-workflow") ? "#c9952e" : "transparent"}
              flexShrink={0}
            />
            <Text
              fontSize="0.8125rem"
              color={isActive("/interview-workflow") ? "#e8e0d6" : "#8b8589"}
              fontWeight={isActive("/interview-workflow") ? 500 : 400}
            >
              7-Step Workflow
            </Text>
          </Flex>
        </Link>

        {CHAPTERS.map((ch) => {
          const active = ch.path ? isActive(ch.path) : false;
          const isDisabled = !ch.path && !ch.problems;
          const isItemActive = active;

          const chapterFlex = (
            <Flex
              align="center"
              gap="0.5rem"
              p="0.5rem"
              borderRadius="0.25rem"
              opacity={isDisabled ? 0.35 : 1}
              _hover={isDisabled ? {} : { bg: "rgba(232,224,214,0.05)" }}
            >
              <Box
                w="3px"
                h="1rem"
                borderRadius="full"
                bg={isItemActive ? "#c9952e" : "transparent"}
                flexShrink={0}
              />
              <Text
                fontSize="0.875rem"
                color={isItemActive ? "#e8e0d6" : "#8b8589"}
                fontWeight={isItemActive ? 600 : 400}
                fontFamily="'Playfair Display', serif"
                flex="1"
              >
                Ch {ch.id}: {ch.name}
              </Text>
              {isDisabled && (
                <Text fontSize="0.6rem" color="#5c5660" letterSpacing="0.1em">
                  Soon
                </Text>
              )}
            </Flex>
          );

          return (
            <Box key={ch.id}>
              {ch.path ? (
                <Link to={ch.path} style={{ textDecoration: "none" }}>
                  {chapterFlex}
                </Link>
              ) : (
                chapterFlex
              )}
              {ch.problems && (
                <VStack align="stretch" pl="1.5rem" gap="0" mt="0.125rem">
                  {ch.problems.map((p, i) => {
                    const inner = (
                      <Flex
                        align="center"
                        gap="0.5rem"
                        p="0.375rem 0.5rem"
                        borderRadius="0.25rem"
                        fontSize="0.75rem"
                        color="#8b8589"
                        transition="all 0.15s"
                        cursor="pointer"
                        _hover={{
                          bg: "rgba(232,224,214,0.05)",
                          color: "#e8e0d6",
                        }}
                      >
                        <Text fontSize="0.55rem" color="#5c5660" minW="14px">
                          {i + 1}.
                        </Text>
                        <Text>{p.name}</Text>
                      </Flex>
                    );
                    if (p.route)
                      return (
                        <Link key={p.route} to={p.route} style={{ textDecoration: "none" }}>
                          {inner}
                        </Link>
                      );
                    if (p.url)
                      return (
                        <Box
                          key={i}
                          as="a"
                          //@ts-ignore
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          {inner}
                        </Box>
                      );
                    return (
                      <Box key={i} opacity={0.35}>
                        {inner}
                      </Box>
                    );
                  })}
                </VStack>
              )}
            </Box>
          );
        })}

        <Link to="/patterns-mistakes" style={{ textDecoration: "none" }}>
          <Flex
            align="center"
            gap="0.5rem"
            p="0.5rem"
            borderRadius="0.25rem"
            transition="all 0.15s"
            mt={1}
            bg={isActive("/patterns-mistakes") ? "rgba(201,149,46,0.1)" : "transparent"}
            _hover={{ bg: "rgba(232,224,214,0.05)" }}
          >
            <Box
              w="3px"
              h="1rem"
              borderRadius="full"
              bg={isActive("/patterns-mistakes") ? "#c9952e" : "transparent"}
              flexShrink={0}
            />
            <Text
              fontSize="0.8125rem"
              color={isActive("/patterns-mistakes") ? "#e8e0d6" : "#8b8589"}
              fontWeight={isActive("/patterns-mistakes") ? 500 : 400}
            >
              Patterns & Mistakes
            </Text>
          </Flex>
        </Link>
      </VStack>
    </VStack>
  );
}

export function MainLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Flex h="100vh" direction="column" bg="#f5f0eb">
      <Flex flex="1" overflow="hidden">
        {/* Desktop Sidebar */}
        <Box display={{ base: "none", md: "block" }} w="16.25rem" flexShrink={0}>
          <SidebarContent isActive={isActive} />
        </Box>

        {/* Mobile Header */}
        <Box
          display={{ base: "block", md: "none" }}
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={100}
          bg="#1a1a2e"
          p={3}
          borderBottom="1px solid"
          borderColor="rgba(232,224,214,0.1)"
        >
          <Flex align="center" justify="space-between">
            <Heading color="#c9952e" size="sm" letterSpacing="0.02em">
              DSA Playbook
            </Heading>
            <DrawerRoot placement="start">
              <DrawerBackdrop />
              <DrawerTrigger asChild>
                <IconButton aria-label="Open Menu" variant="ghost" color="#c9952e" size="sm">
                  <Menu size={20} />
                </IconButton>
              </DrawerTrigger>
              <DrawerContent bg="#1a1a2e" p={0}>
                <DrawerCloseTrigger color="white" top={4} right={4} />
                <DrawerBody p={0}>
                  <SidebarContent isActive={isActive} />
                </DrawerBody>
              </DrawerContent>
            </DrawerRoot>
          </Flex>
        </Box>

        <Box
          flex="1"
          p={{ base: "1rem", md: "2rem" }}
          pt={{ base: "4.5rem", md: "2rem" }}
          overflowY="auto"
          pb="8rem"
          bg="#f5f0eb"
        >
          <Box maxW="1000px" mx="auto">
            <Outlet />
          </Box>
        </Box>
      </Flex>

      <GlobalControlBar />
    </Flex>
  );
}
