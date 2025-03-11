"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Plus, Upload } from "lucide-react"

// Mock data for documents
const mockDocuments = [
  { id: 1, name: "Product Specifications.pdf", size: "2.4 MB", date: "2023-12-10" },
  { id: 2, name: "User Manual.docx", size: "1.8 MB", date: "2023-12-05" },
  { id: 3, name: "Technical Documentation.pdf", size: "4.2 MB", date: "2023-11-28" },
  { id: 4, name: "Research Paper.pdf", size: "3.1 MB", date: "2023-11-15" },
]

export function DocumentsWidget() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)
    // Simulate upload delay
    setTimeout(() => {
      const newDoc = {
        id: documents.length + 1,
        name: `New Document ${documents.length + 1}.pdf`,
        size: "1.5 MB",
        date: new Date().toISOString().split("T")[0],
      }
      setDocuments([...documents, newDoc])
      setIsUploading(false)
    }, 1500)
  }

  return (
    <Card className="h-full relative">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Documents</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Documents</DialogTitle>
                <DialogDescription>Upload documents to be used as knowledge sources.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
                  <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
                  <p className="mb-2 text-sm font-medium">Drag and drop files here</p>
                  <p className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT, and other text formats</p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>Manage document knowledge sources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.size} • {doc.date}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {documents.length} documents • Last updated {documents[documents.length - 1].date}
        </p>
      </CardFooter>

      {/* Coming soon overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
        <div className="text-center p-6">
          <h3 className="text-xl font-bold text-white mb-2">New Functionality Coming Soon...</h3>
          <p className="text-white/80">We're working on enhancing this feature.</p>
        </div>
      </div>
    </Card>
  )
}

