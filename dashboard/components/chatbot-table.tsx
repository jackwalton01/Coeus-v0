"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Settings, Trash2 } from "lucide-react"

type Chatbot = {
  id: string
  name: string
  createdAt: string
  status: "active" | "inactive"
}

export function ChatbotTable() {
  const router = useRouter()
  const [chatbots, setChatbots] = useState<Chatbot[]>([
    {
      id: "1",
      name: "kainos-chat-assistant",
      createdAt: "2023-05-15",
      status: "active",
    },
  ])

  const handleAddChatbot = () => {
    alert("Add chatbot functionality coming soon")
  }

  const handleEditChatbot = (id: string) => {
    alert(`Edit chatbot ${id} functionality coming soon`)
  }

  const handleDeleteChatbot = (id: string) => {
    alert(`Delete chatbot ${id} functionality coming soon`)
  }

  const handleRowClick = (id: string) => {
    router.push(`/chatbot/${id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Chatbots</h2>
        <Button onClick={handleAddChatbot}>
          <Plus className="mr-2 h-4 w-4" /> Add Chatbot
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chatbots.map((chatbot) => (
            <TableRow key={chatbot.id} className="cursor-pointer" onClick={() => handleRowClick(chatbot.id)}>
              <TableCell className="font-medium">{chatbot.name}</TableCell>
              <TableCell>{chatbot.createdAt}</TableCell>
              <TableCell>{chatbot.status}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditChatbot(chatbot.id)
                  }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteChatbot(chatbot.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

