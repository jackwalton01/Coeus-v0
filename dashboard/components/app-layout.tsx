"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { LogOut, User } from "lucide-react"
import { ChatbotEmbeddable } from "./chatbot-embeddable"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const chatbotId = params.id as string;

  // FIXME: also why is authentication being handled by the app layout lol
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check authentication status on client side
    const authStatus = localStorage.getItem("isAuthenticated") === "true"
    const email = localStorage.getItem("userEmail") || ""

    setIsAuthenticated(authStatus)
    setUserEmail(email)

    if (!authStatus) {
      router.push("/login")
    }
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return null // Don't render anything until auth check completes
  }

  return (
    <SidebarProvider>
      {chatbotId && <AppSidebar chatbotId={chatbotId} />}
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-6">
          <h1 className="text-xl font-semibold">Coeus</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
       { chatbotId && <ChatbotEmbeddable /> }
      </SidebarInset>
    </SidebarProvider>
  )
}

