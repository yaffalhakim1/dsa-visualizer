import { Box, Flex, VStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <Flex h="100vh">
      <VStack w="250px" bg="gray.100" p={4} align="start" borderRight="1px solid" borderColor="gray.200">
        <Box fontWeight="bold" mb={4}>DSA Playbook</Box>
        <Link to="/">Home</Link>
        <Link to="/sliding-window">Sliding Window (Ch 14)</Link>
      </VStack>
      <Box flex="1" p={8} overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
}
