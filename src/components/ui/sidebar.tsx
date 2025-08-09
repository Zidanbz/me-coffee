"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronsLeft, ChevronsRight, Menu, X, PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarContextProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isCollapsed, setIsCollapsed }}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  )
}

const sidebarVariants = cva(
  "fixed inset-y-0 z-50 flex h-full flex-col border-r bg-sidebar transition-all duration-300 ease-in-out md:relative",
  {
    variants: {
      collapsed: {
        true: "w-14",
        false: "w-64",
      },
      state: {
        open: "translate-x-0",
        closed: "-translate-x-full",
      },
    },
  }
)

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { isCollapsed, isOpen } = useSidebar()
  return (
    <aside
      className={cn(
        sidebarVariants({
          collapsed: isCollapsed,
          state: isOpen ? "open" : "closed",
        }),
        "md:translate-x-0",
        className
      )}
      {...props}
    />
  )
}

export function SidebarOverlay() {
    const { isOpen, setIsOpen } = useSidebar();
    return (
        <div
            className={cn(
                "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out md:hidden",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsOpen(false)}
        />
    )
}

export function SidebarTrigger({ className, ...props }: ButtonProps) {
    const { isOpen, setIsOpen } = useSidebar()
  
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("md:hidden", className)}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {isOpen ? <X /> : <Menu />}
        <span className="sr-only">{isOpen ? "Close sidebar" : "Open sidebar"}</span>
      </Button>
    )
  }

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex h-14 items-center border-b border-sidebar-border", className)} {...props} />
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)} {...props} />
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  
  return (
    <div className={cn("flex h-14 items-center justify-end border-t border-sidebar-border px-4", className)} {...props}>
         <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            <span className="sr-only">{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
        </Button>
    </div>
  )
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <nav className={cn("grid gap-2 p-2", className)} {...props} />
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid", className)} {...props} />
}


interface SidebarMenuButtonProps extends ButtonProps {
  tooltip?: string;
}

export function SidebarMenuButton({ className, tooltip, children, ...props }: SidebarMenuButtonProps) {
    const { isCollapsed } = useSidebar()

    const button = (
        <Button
            variant="ghost"
            className={cn(
                "justify-start gap-3 w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed && "justify-center",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    )

    if (isCollapsed && tooltip) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right">
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        )
    }

    return button
}
