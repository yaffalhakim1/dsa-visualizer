import { Box, Flex, IconButton, Text, HStack, Stack } from "@chakra-ui/react";
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
    playbackSpeed,
    setPlaybackSpeed
  } = useAlgorithmStore();

  if (totalSteps === 0) return null;

  return (
    <Box
      position="fixed"
      bottom="0"
      left={{ base: "0", md: "260px" }}
      right="0"
      bg="#1a1a2e"
      borderTop="1px solid"
      borderColor="rgba(232,224,214,0.1)"
      p={{ base: 3, md: 4 }}
      zIndex={1000}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        px={{ base: 2, md: 4 }}
        gap={{ base: 4, md: 8 }}
      >
        <Flex justify="space-between" w={{ base: "full", md: "auto" }} align="center">
          <HStack gap={{ base: 2, md: 4 }}>
            <IconButton
              aria-label="Reset"
              size="xs"
              variant="ghost"
              onClick={reset}
              color="#8b8589"
              _hover={{ color: "#e8e0d6", bg: "rgba(232,224,214,0.1)" }}
            >
              <RotateCcw size={16} />
            </IconButton>

            <HStack gap={2}>
              <IconButton
                aria-label="Previous Step"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                color="#8b8589"
                _hover={{ color: "#e8e0d6", bg: "rgba(232,224,214,0.1)" }}
                _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
              >
                <SkipBack size={18} />
              </IconButton>

              <IconButton
                aria-label={isPlaying ? "Pause" : "Play"}
                size="md"
                onClick={togglePlay}
                bg="#c9952e"
                color="#1a1a2e"
                borderRadius="full"
                _hover={{ bg: "#d4a853" }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </IconButton>

              <IconButton
                aria-label="Next Step"
                size="sm"
                onClick={nextStep}
                disabled={currentStep === totalSteps - 1}
                color="#8b8589"
                _hover={{ color: "#e8e0d6", bg: "rgba(232,224,214,0.1)" }}
                _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
              >
                <SkipForward size={18} />
              </IconButton>
            </HStack>
          </HStack>
          
          <Box display={{ base: "block", md: "none" }}>
             <Text fontSize="2xs" color="#8b8589">
               Step {currentStep + 1} / {totalSteps}
             </Text>
          </Box>
        </Flex>

        <Flex align="center" gap={{ base: 4, md: 8 }} flex="1" w="full">
          <Box flex="1">
            <Text fontSize="xs" mb={1} color="#8b8589" textAlign="center" display={{ base: "none", md: "block" }}>
              Step {currentStep + 1} of {totalSteps}
            </Text>
            <Box w="full" h="4px" bg="rgba(232,224,214,0.15)" borderRadius="full" overflow="hidden">
              <Box
                h="full"
                bg="#c9952e"
                w={`${((currentStep + 1) / totalSteps) * 100}%`}
                transition="width 0.2s"
              />
            </Box>
          </Box>
        </Flex>

        <HStack gap={3} w={{ base: "full", md: "200px" }} justify={{ base: "center", md: "flex-end" }}>
          <Text fontSize="xs" color="#8b8589" whiteSpace="nowrap">
            Speed
          </Text>
          <input
            type="range"
            min={200}
            max={3000}
            step={100}
            value={playbackSpeed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaybackSpeed(Number(e.target.value))}
            style={{ width: "80px", height: "4px", accentColor: "#c9952e", cursor: "pointer" }}
          />
          <Text fontSize="xs" color="#8b8589" w="2.5rem" textAlign="right">
            {(playbackSpeed / 1000).toFixed(1)}s
          </Text>
        </HStack>
      </Stack>
    </Box>
  );
}
