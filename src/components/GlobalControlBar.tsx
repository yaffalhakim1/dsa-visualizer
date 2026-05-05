import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
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
      pointerEvents="none"
      zIndex={1000}
    >
      <Flex
        justify="center"
        pointerEvents="auto"
        px={{ base: 2, md: 4 }}
        pb={{ base: 2, md: 3 }}
      >
        <Flex
          align="center"
          gap={{ base: 1.5, md: 3 }}
          bg="rgba(26,26,46,0.95)"
          border="1px solid"
          borderColor="rgba(232,224,214,0.12)"
          borderRadius={{ base: "lg", md: "xl" }}
          px={{ base: 2.5, md: 4 }}
          py={2}
          boxShadow="0 4px 24px rgba(0,0,0,0.3)"
          backdropFilter="blur(8px)"
          maxW={{ base: "full", md: "600px" }}
          w="full"
          justify="center"
        >
          <IconButton
            aria-label="Reset"
            size="2xs"
            variant="ghost"
            onClick={reset}
            color="#8b8589"
            _hover={{ color: "#e8e0d6", bg: "rgba(232,224,214,0.1)" }}
          >
            <RotateCcw size={13} />
          </IconButton>

          <IconButton
            aria-label="Previous Step"
            size="2xs"
            onClick={prevStep}
            disabled={currentStep === 0}
            color="#8b8589"
            _hover={{ color: "#e8e0d6", bg: "rgba(232,224,214,0.1)" }}
            _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
          >
            <SkipBack size={15} />
          </IconButton>

          <IconButton
            aria-label={isPlaying ? "Pause" : "Play"}
            size="xs"
            onClick={togglePlay}
            bg="#c9952e"
            color="#1a1a2e"
            borderRadius="full"
            _hover={{ bg: "#d4a853" }}
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} />}
          </IconButton>

          <IconButton
            aria-label="Next Step"
            size="2xs"
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            color="#8b8589"
            _hover={{ color: "#e8e0d6", bg: "rgba(232,224,214,0.1)" }}
            _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
          >
            <SkipForward size={15} />
          </IconButton>

          <Box w="1px" h="18px" bg="rgba(232,224,214,0.12)" />

          <Box w={{ base: "80px", md: "120px" }}>
            <Text fontSize="0.55rem" mb={0.5} color="#8b8589" textAlign="center">
              Step {currentStep + 1} / {totalSteps}
            </Text>
            <Box w="full" h="3px" bg="rgba(232,224,214,0.15)" borderRadius="full" overflow="hidden">
              <Box
                h="full"
                bg="#c9952e"
                w={`${((currentStep + 1) / totalSteps) * 100}%`}
                transition="width 0.2s"
              />
            </Box>
          </Box>

          <Box w="1px" h="18px" bg="rgba(232,224,214,0.12)" display={{ base: "none", md: "block" }} />

          <Flex align="center" gap={2} display={{ base: "none", md: "flex" }}>
            <Text fontSize="0.6rem" color="#8b8589" whiteSpace="nowrap">
              Speed
            </Text>
            <input
              type="range"
              min={200}
              max={3000}
              step={100}
              value={playbackSpeed}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaybackSpeed(Number(e.target.value))}
              style={{ width: "3.75rem", height: "0.1875rem", accentColor: "#c9952e", cursor: "pointer" }}
            />
            <Text fontSize="0.6rem" color="#8b8589" w="1.8rem" textAlign="right">
              {(playbackSpeed / 1000).toFixed(1)}s
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
