"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DocumentsWidget } from "@/components/widgets/documents-widget"
import { FunctionsWidget } from "@/components/widgets/functions-widget"
import { WebsitesWidget } from "@/components/widgets/websites-widget"
import { Loader2 } from "lucide-react"

interface KnowledgeSourcesDashboardProps {
  chatbotId: string
}

export function KnowledgeSourcesDashboard({ chatbotId }: KnowledgeSourcesDashboardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleUpdateConfig = () => {
    setIsUpdating(true)
    // Simulate update delay
    setTimeout(() => {
      setIsUpdating(false)
      setShowSuccessDialog(true)
    }, 2000)
  }

  const handleDiscardChanges = () => {
    // In a real app, this would revert changes
    alert("Changes discarded")
  }

  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Knowledge Sources for Chatbot {chatbotId}</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDiscardChanges}>
            Discard Configuration Changes
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleUpdateConfig}>
            Update Configuration
          </Button>
        </div>
      </div>

      {/* Widgets grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DocumentsWidget />
        <WebsitesWidget />
        <FunctionsWidget />
      </div>

      {/* Loading overlay */}
      {isUpdating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-6 shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-lg font-medium">Updating configuration...</p>
          </div>
        </div>
      )}

      {/* Success dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>Your configuration has been updated successfully.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>Dismiss</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

