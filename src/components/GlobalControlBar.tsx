import { Box, Flex, IconButton, Text, HStack } from "@chakra-ui/react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import { useAlgorithmStore } from "@/store/useAlgorithmStore";

export function GlobalControlBar() {
  const { 
    isPlaying, 
    togglePlay, 
    currentStep, 
    totalSteps, 
    nextStep, 
    prevStep, 
    reset,
    playbackSpeed
  } = useAlgorithmStore();

  if (totalSteps === 0) return null;

  return (
    <Box 
      position="fixed" 
      bottom="0" 
      left="250px" 
      right="0" 
      bg="white" 
      borderTop="1px solid" 
      borderColor="gray.200" 
      p={4} 
      boxShadow="0 -4px 12px rgba(0,0,0,0.05)"
      zIndex={1000}
    >
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto" px={4}>
        <HStack gap={4}>
          <IconButton 
            aria-label="Reset" 
            size="sm" 
            variant="ghost" 
            onClick={reset}
          >
            <RotateCcw size={18} />
          </IconButton>
          
          <HStack gap={2}>
            <IconButton 
              aria-label="Previous Step" 
              size="md" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <SkipBack size={20} />
            </IconButton>
            
            <IconButton 
              aria-label={isPlaying ? "Pause" : "Play"} 
              size="lg" 
              colorScheme="purple"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </IconButton>
            
            <IconButton 
              aria-label="Next Step" 
              size="md" 
              onClick={nextStep}
              disabled={currentStep === totalSteps - 1}
            >
              <SkipForward size={20} />
            </IconButton>
          </HStack>
        </HStack>

        <Flex align="center" gap={8} flex="1" mx={12}>
          <Box flex="1">
            <Text fontSize="xs" mb={1} color="gray.500" textAlign="center">
              Step {currentStep + 1} of {totalSteps}
            </Text>
            {/* Simple Progress Bar since Chakra Slider v3 might need more setup */}
            <Box w="full" h="4px" bg="gray.100" borderRadius="full" overflow="hidden">
              <Box 
                h="full" 
                bg="purple.500" 
                w={`${((currentStep + 1) / totalSteps) * 100}%`} 
                transition="width 0.2s"
              />
            </Box>
          </Box>
        </Flex>

        <HStack gap={4} w="200px">
          <Text fontSize="xs" color="gray.500" whiteSpace="nowrap">Speed: {playbackSpeed}ms</Text>
          {/* Note: In a real app we'd use a Slider here, but for brevity we'll stick to text for now */}
        </HStack>
      </Flex>
    </Box>
  );
}
