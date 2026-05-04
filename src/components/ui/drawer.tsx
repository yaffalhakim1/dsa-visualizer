import { Drawer as ChakraDrawer, Portal } from "@chakra-ui/react"
import { CloseButton } from "./close-button"
import * as React from "react"

interface DrawerContentProps extends ChakraDrawer.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  offset?: ChakraDrawer.ContentProps["padding"]
  backdrop?: boolean
}

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(function DrawerContent(props, ref) {
  const {
    children,
    portalled = true,
    portalRef,
    offset,
    backdrop = true,
    ...rest
  } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <ChakraDrawer.Backdrop />}
      <ChakraDrawer.Positioner padding={offset}>
        <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDrawer.Content>
      </ChakraDrawer.Positioner>
    </Portal>
  )
})

export const DrawerCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraDrawer.CloseTriggerProps
>(function DrawerCloseTrigger(props, ref) {
  return (
    <ChakraDrawer.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref} />
    </ChakraDrawer.CloseTrigger>
  )
})

export const DrawerTrigger = (props: ChakraDrawer.TriggerProps) => (
  <ChakraDrawer.Trigger {...props} />
)
export const DrawerRoot = (props: ChakraDrawer.RootProps) => (
  <ChakraDrawer.Root {...props} />
)
export const DrawerFooter = (props: ChakraDrawer.FooterProps) => (
  <ChakraDrawer.Footer {...props} />
)
export const DrawerHeader = (props: ChakraDrawer.HeaderProps) => (
  <ChakraDrawer.Header {...props} />
)
export const DrawerBody = (props: ChakraDrawer.BodyProps) => (
  <ChakraDrawer.Body {...props} />
)
export const DrawerBackdrop = (props: ChakraDrawer.BackdropProps) => (
  <ChakraDrawer.Backdrop {...props} />
)
export const DrawerDescription = (props: ChakraDrawer.DescriptionProps) => (
  <ChakraDrawer.Description {...props} />
)
export const DrawerTitle = (props: ChakraDrawer.TitleProps) => (
  <ChakraDrawer.Title {...props} />
)
export const DrawerActionTrigger = (props: ChakraDrawer.ActionTriggerProps) => (
  <ChakraDrawer.ActionTrigger {...props} />
)
