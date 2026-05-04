import { Box, Flex, VStack, Heading, Text } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { GlobalControlBar } from "@/components/GlobalControlBar";

const CHAPTERS = [
  { id: 6, name: "Arrays & Strings" },
  { id: 7, name: "Linked Lists" },
  { id: 8, name: "Stacks & Queues" },
  { id: 10, name: "Trees" },
  { id: 12, name: "Graphs" },
  { id: 14, name: "Sliding Window" },
  { id: 17, name: "Dynamic Programming" },
];

export function MainLayout() {
  return (
    <Flex h="100vh" direction="column">
      <Flex flex="1" overflow="hidden">
        {/* Sidebar */}
        <VStack 
          w="250px" 
          bg="gray.50" 
          p={6} 
          align="stretch" 
          borderRight="1px solid" 
          borderColor="gray.200"
          gap={4}
        >
          <Heading size="md" mb={4} color="purple.600">DSA Playbook</Heading>
          
          <VStack align="stretch" gap={1}>
            <Text fontWeight="bold" fontSize="xs" color="gray.400" mb={2}>CHAPTERS</Text>
            <Link to="/" style={{ padding: '8px', borderRadius: '4px' }}>🏠 Home</Link>
            {CHAPTERS.map(ch => (
              <Link 
                key={ch.id} 
                to={ch.id === 14 ? "/sliding-window" : "#"} 
                style={{ 
                  padding: '8px', 
                  borderRadius: '4px',
                  opacity: ch.id === 14 ? 1 : 0.5,
                  cursor: ch.id === 14 ? 'pointer' : 'not-allowed'
                }}
              >
                Ch {ch.id}: {ch.name}
              </Link>
            ))}
          </VStack>
        </VStack>

        {/* Content */}
        <Box flex="1" p={8} overflowY="auto" pb="100px" bg="white">
          <Outlet />
        </Box>
      </Flex>

      <GlobalControlBar />
    </Flex>
  );
}
