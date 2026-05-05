import { Box, Flex, VStack, Heading, Text, IconButton, Link as ChakraLink } from "@chakra-ui/react";
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

/**
 * CONFIGURATION & CONSTANTS
 */
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
      { name: "Product of Array Except Self", route: "/ch6/product-except-self" },
      { name: "Maximum Subarray (Kadane's)", route: "/ch6/maximum-subarray" },
      { name: "Contains Duplicate", route: "/ch6/contains-duplicate" },
      { name: "Next Permutation", route: "/ch6/next-permutation" },
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
      { name: "Remove Nth Node From End", url: `${LC}/remove-nth-node-from-end-of-list/` },
      { name: "Middle of Linked List", url: `${LC}/middle-of-the-linked-list/` },
    ],
  },
  {
    id: 8,
    name: "Stacks & Queues",
    problems: [
      { name: "Valid Parentheses", route: "/ch8/valid-parentheses" },
      { name: "Min Stack", route: "/ch8/min-stack" },
      { name: "Daily Temperatures", route: "/ch8/daily-temperatures" },
      { name: "Evaluate RPN", route: "/ch8/evaluate-rpn" },
      { name: "Queue Using Stacks", route: "/ch8/queue-using-stacks" },
    ],
  },
  {
    id: 10,
    name: "Trees",
    path: "/trees",
    problems: [
      { name: "Max Depth of Binary Tree", url: `${LC}/maximum-depth-of-binary-tree/` },
      { name: "Invert Binary Tree", url: `${LC}/invert-binary-tree/` },
      { name: "Validate BST", url: `${LC}/validate-binary-search-tree/` },
      { name: "Level Order Traversal", url: `${LC}/binary-tree-level-order-traversal/` },
      { name: "Same Tree", url: `${LC}/same-tree/` },
    ],
  },
  {
    id: 13,
    name: "Binary Search",
    path: "/binary-search",
    problems: [
      { name: "Binary Search", route: "/binary-search" },
      { name: "Search Rotated Array", url: `${LC}/search-in-rotated-sorted-array/` },
      { name: "First & Last Position", url: `${LC}/find-first-and-last-position-of-element-in-sorted-array/` },
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
      { name: "Longest Substring (Repeat)", url: `${LC}/longest-substring-without-repeating-characters/` },
      { name: "Minimum Window Substring", url: `${LC}/minimum-window-substring/` },
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

/**
 * SUB-COMPONENTS
 */
interface NavLinkProps {
  to?: string;
  url?: string | null;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

const NavLink = ({ to, url, children, active, disabled }: NavLinkProps) => {
  const content = (
    <Flex
      align="center"
      gap="0.5rem"
      p="0.5rem"
      borderRadius="0.25rem"
      transition="all 0.15s"
      bg={active ? "rgba(201,149,46,0.1)" : "transparent"}
      opacity={disabled ? 0.35 : 1}
      _hover={disabled ? {} : { bg: "rgba(232,224,214,0.05)" }}
      cursor={disabled ? "default" : "pointer"}
    >
      <Box
        w="3px"
        h="1rem"
        borderRadius="full"
        bg={active ? "#c9952e" : "transparent"}
        flexShrink={0}
      />
      {children}
    </Flex>
  );

  if (disabled) return content;
  if (to) return <Link to={to} style={{ textDecoration: "none" }}>{content}</Link>;
  if (url) return (
    <ChakraLink href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      {content}
    </ChakraLink>
  );
  return content;
};

const ProblemItem = ({ problem, index, isActive }: { problem: Problem; index: number; isActive: (p: string) => boolean }) => {
  const active = problem.route ? isActive(problem.route) : false;
  const content = (
    <Flex
      align="center"
      gap="0.5rem"
      p="0.375rem 0.5rem"
      borderRadius="0.25rem"
      fontSize="0.75rem"
      color={active ? "#c9952e" : "#8b8589"}
      bg={active ? "rgba(201,149,46,0.1)" : "transparent"}
      transition="all 0.15s"
      _hover={problem.route || problem.url ? { bg: active ? "rgba(201,149,46,0.1)" : "rgba(232,224,214,0.05)", color: active ? "#c9952e" : "#e8e0d6" } : {}}
    >
      <Text fontSize="0.55rem" color="#5c5660" minW="14px">
        {index + 1}.
      </Text>
      <Text fontWeight={active ? 500 : 400}>{problem.name}</Text>
    </Flex>
  );

  if (problem.route) return <Link to={problem.route} style={{ textDecoration: "none" }}>{content}</Link>;
  if (problem.url) return (
    <ChakraLink href={problem.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      {content}
    </ChakraLink>
  );
  return <Box opacity={0.35}>{content}</Box>;
};

const ChapterGroup = ({ chapter, isActive, pathname }: { chapter: Chapter; isActive: (p: string) => boolean; pathname: string }) => {
  const hasActiveProblem = chapter.problems?.some(p => p.route && isActive(p.route));
  const prefixDir = chapter.path ? chapter.path.replace(/\/[^/]+$/, "") : "";
  const prefixMatch = !!prefixDir && pathname.startsWith(prefixDir + "/");
  const active = chapter.path ? isActive(chapter.path) || prefixMatch : !!hasActiveProblem;
  const isDisabled = !chapter.path && !chapter.problems;

  return (
    <Box>
      <NavLink to={chapter.path} active={active} disabled={isDisabled}>
        <Text
          fontSize="0.875rem"
          color={active ? "#e8e0d6" : "#8b8589"}
          fontWeight={active ? 600 : 400}
          fontFamily="'Playfair Display', serif"
          flex="1"
        >
          Ch {chapter.id}: {chapter.name}
        </Text>
        {isDisabled && (
          <Text fontSize="0.6rem" color="#5c5660" letterSpacing="0.1em">
            Soon
          </Text>
        )}
      </NavLink>
      {chapter.problems && (
        <VStack align="stretch" pl="1.5rem" gap="0" mt="0.125rem">
          {chapter.problems.map((p, i) => (
            <ProblemItem key={i} problem={p} index={i} isActive={isActive} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

const SidebarContent = ({ isActive, pathname }: { isActive: (path: string) => boolean; pathname: string }) => {
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
        <Text fontSize="0.7rem" color="#8b8589" mt="0.25rem" textTransform="uppercase" letterSpacing="0.15em" fontWeight="500">
          Interactive Edition
        </Text>
      </Box>

      <VStack align="stretch" gap="0.25rem" flex="1">
        <Text fontSize="0.65rem" color="#5c5660" textTransform="uppercase" letterSpacing="0.15em" fontWeight="500" mb="0.25rem">
          Chapters
        </Text>

        <NavLink to="/" active={isActive("/")}>
          <Text fontSize="0.8125rem" color={isActive("/") ? "#e8e0d6" : "#8b8589"} fontWeight={isActive("/") ? 500 : 400}>
            Home
          </Text>
        </NavLink>

        <NavLink to="/interview-workflow" active={isActive("/interview-workflow")}>
          <Text fontSize="0.8125rem" color={isActive("/interview-workflow") ? "#e8e0d6" : "#8b8589"} fontWeight={isActive("/interview-workflow") ? 500 : 400}>
            7-Step Workflow
          </Text>
        </NavLink>

        {CHAPTERS.map((ch) => (
          <ChapterGroup key={ch.id} chapter={ch} isActive={isActive} pathname={pathname} />
        ))}

        <NavLink to="/patterns-mistakes" active={isActive("/patterns-mistakes")}>
          <Text fontSize="0.8125rem" color={isActive("/patterns-mistakes") ? "#e8e0d6" : "#8b8589"} fontWeight={isActive("/patterns-mistakes") ? 500 : 400}>
            Patterns & Mistakes
          </Text>
        </NavLink>
      </VStack>
    </VStack>
  );
};

/**
 * MAIN COMPONENT
 */
export function MainLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Flex h="100vh" direction="column" bg="#f5f0eb">
      <Flex flex="1" overflow="hidden">
        <Box display={{ base: "none", md: "block" }} w="16.25rem" flexShrink={0}>
                  <SidebarContent isActive={isActive} pathname={location.pathname} />
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
          <SidebarContent isActive={isActive} pathname={location.pathname} />
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
