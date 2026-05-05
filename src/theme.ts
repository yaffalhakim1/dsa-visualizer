import { createSystem, defaultConfig, defineSemanticTokens } from "@chakra-ui/react"

const semanticTokens = defineSemanticTokens({
  colors: {
    gold: { value: "#c9952e" },
    "gold.dark": { value: "#d4a853" },
    navy: { value: "#1a1a2e" },
    cream: { value: "#f5f0eb" },
    "cream.dark": { value: "#e8e0d6" },
    border: { value: "#e8e0d6" },
    muted: { value: "#8b8589" },
    body: { value: "#6b6350" },
    success: { value: "#4a9e6b" },
    "success.bg": { value: "#f0faf4" },
    error: { value: "#c94a4a" },
    "error.bg": { value: "#fdf6f5" },
    info: { value: "#4a7db5" },
    "info.bg": { value: "#f0f6fd" },
    active: { value: "#faf6f0" },
  },
})

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Playfair Display', serif" },
        body: { value: "'DM Sans', sans-serif" },
        mono: { value: "'JetBrains Mono', monospace" },
      },
    },
    semanticTokens,
  },
})

export default system
