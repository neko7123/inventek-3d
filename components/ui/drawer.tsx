"use client"

import * as React from "react"
import * as DrawerPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

export function Drawer({ children, ...props }: DrawerPrimitive.DialogProps) {
  return (
    <DrawerPrimitive.Root {...props}>
      {children}
    </DrawerPrimitive.Root>
  )
}

export function DrawerTrigger({ ...props }: DrawerPrimitive.DialogTriggerProps) {
  return <DrawerPrimitive.Trigger {...props} />
}

export function DrawerContent({
  children,
  className,
  ...props
}: DrawerPrimitive.DialogContentProps) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <DrawerPrimitive.Content
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-xl p-6 shadow-xl animate-slide-up",
          className
        )}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

export function DrawerClose(props: DrawerPrimitive.DialogCloseProps) {
  return <DrawerPrimitive.Close {...props} />
}

export function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-3 text-center", className)} {...props} />
  )
}

export function DrawerTitle({ className, ...props }: DrawerPrimitive.DialogTitleProps) {
  return (
    <DrawerPrimitive.Title
      className={cn("font-bold text-lg", className)}
      {...props}
    />
  )
}

export function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.DialogDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-sm text-gray-600", className)}
      {...props}
    />
  )
}

export function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4", className)} {...props} />
}