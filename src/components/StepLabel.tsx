import { Flex, Text } from "@chakra-ui/react";

export function StepLabel({ num, title, mb = 1 }: { num: number; title: string; mb?: number }) {
  return (
    <Flex align="center" gap={1.5} mb={mb}>
      <Flex
        w="18px" h="18px" borderRadius="full"
        align="center" justify="center"
        bg="#1a1a2e" color="white"
        fontSize="0.55rem" fontWeight={700}
      >
        {num}
      </Flex>
      <Text fontSize="0.65rem" color="#8b8589" textTransform="uppercase" letterSpacing="0.1em" fontWeight="600">
        {title}
      </Text>
    </Flex>
  );
}
