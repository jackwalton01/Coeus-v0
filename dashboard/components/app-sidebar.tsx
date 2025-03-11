"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Database, FileText, Play, Shield, ArrowLeft } from "lucide-react"
import { EmbeddingScriptModal } from "./embedding-script-modal"

interface AppSidebarProps {
  chatbotId: string
}

export function AppSidebar({ chatbotId }: AppSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isEmbeddingScriptModalOpen, setIsEmbeddingScriptModalOpen] = useState(false)

  const handleGenerateScript = () => {
    setIsEmbeddingScriptModalOpen(true)
  }

  const handleBackToChatbots = () => {
    router.push("/")
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" onClick={handleBackToChatbots}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Chatbots
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === `/chatbot/${chatbotId}`}>
                <a href={`/chatbot/${chatbotId}`}>
                  <Database className="size-4" />
                  <span>Knowledge Sources</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === `/chatbot/${chatbotId}/guardrails`}>
                <a href={`/chatbot/${chatbotId}/guardrails`}>
                  <Shield className="size-4" />
                  <span>Guard Rails</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === `/chatbot/${chatbotId}/audit-logging`}>
                <a href={`/chatbot/${chatbotId}/audit-logging`}>
                  <FileText className="size-4" />
                  <span>Audit Logging</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === `/chatbot/${chatbotId}/testing`}>
                <a href={`/chatbot/${chatbotId}/testing`}>
                  <Play className="size-4" />
                  <span>Testing</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleGenerateScript}>
            Generate Embedding Script
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <EmbeddingScriptModal
        isOpen={isEmbeddingScriptModalOpen}
        onClose={() => setIsEmbeddingScriptModalOpen(false)}
        chatbotId={chatbotId}
      />
    </>
  )
}

