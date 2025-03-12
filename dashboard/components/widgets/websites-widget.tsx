"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Loader2, Plus, Settings } from "lucide-react"

// Enhanced website type with selected pages
type Website = {
  id: number
  domain: string
  pages: number
  lastCrawled: string
  selectedPages: string[]
  includePattern?: string
  excludePattern?: string
}

// Mock subpages for kainos.com
const mockSubpages = [
  { url: "https://www.kainos.com/", title: "Home" },
  { url: "https://www.kainos.com/about-us", title: "About Us" },
  { url: "https://www.kainos.com/digital-services", title: "Digital Services" },
  { url: "https://www.kainos.com/workday", title: "Workday" },
  { url: "https://www.kainos.com/industries", title: "Industries" },
  { url: "https://www.kainos.com/insights", title: "Insights" },
  { url: "https://www.kainos.com/about-us/our-approach", title: "Our Approach" },
  { url: "https://www.kainos.com/about-us/diversity-and-inclusion", title: "Diversity And Inclusion" },
  { url: "https://www.kainos.com/about-us/sustainability", title: "Sustainability" },
  { url: "https://www.kainos.com/investor-relations", title: "Investor Relations" },
  { url: "https://www.kainos.com/investor-relations/investor-tools", title: "Investor Tools" },
  { url: "https://www.kainos.com/investor-relations/results-and-presentations", title: "Results And Presentations" },
  { url: "https://www.kainos.com/information/recruitment-notice", title: "Recruitment Notice" },
  { url: "https://www.kainos.com/digital-services/services/ai-and-data", title: "AI and Data" },
  { url: "https://www.kainos.com/digital-services/expertise/generative-ai", title: "Generative AI" },
  { url: "https://www.kainos.com/digital-services/services/cloud-and-engineering", title: "Cloud And Engineering" },
]

export function WebsitesWidget() {
  // Start with an empty websites array
  const [websites, setWebsites] = useState<Website[]>([])
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [allSubpages, setAllSubpages] = useState<typeof mockSubpages>([])
  const [filteredSubpages, setFilteredSubpages] = useState<typeof mockSubpages>([])
  const [selectedPages, setSelectedPages] = useState<string[]>([])
  const [dialogStep, setDialogStep] = useState<"url" | "pages">("url")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingWebsiteId, setEditingWebsiteId] = useState<number | null>(null)
  const [includePattern, setIncludePattern] = useState("")
  const [excludePattern, setExcludePattern] = useState("")
  const [activeTab, setActiveTab] = useState("pages")

  // Apply regex filters when patterns or subpages change
  useEffect(() => {
    if (allSubpages.length === 0) return

    let filtered = [...allSubpages]

    // Apply include pattern if it exists
    if (includePattern) {
      try {
        const includeRegex = new RegExp(includePattern)
        filtered = filtered.filter((page) => includeRegex.test(page.url))
      } catch (e) {
        // Invalid regex, don't filter
      }
    }

    // Apply exclude pattern if it exists
    if (excludePattern) {
      try {
        const excludeRegex = new RegExp(excludePattern)
        filtered = filtered.filter((page) => !excludeRegex.test(page.url))
      } catch (e) {
        // Invalid regex, don't filter
      }
    }

    setFilteredSubpages(filtered)
  }, [includePattern, excludePattern, allSubpages])

  const handleUrlSubmit = () => {
    if (!url) return

    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      // Always use the mockSubpages for kainos.com
      const pages = mockSubpages
      setAllSubpages(pages)
      setFilteredSubpages(pages)
      setIsLoading(false)
      setDialogStep("pages")
    }, 1500)
  }

  const handleSelectAll = () => {
    if (selectedPages.length === filteredSubpages.length) {
      setSelectedPages([])
    } else {
      setSelectedPages(filteredSubpages.map((page) => page.url))
    }
  }

  const handlePageSelect = (url: string) => {
    if (selectedPages.includes(url)) {
      setSelectedPages(selectedPages.filter((p) => p !== url))
    } else {
      setSelectedPages([...selectedPages, url])
    }
  }

  const handleAddWebsite = () => {
    if (editingWebsiteId) {
      // Update existing website
      setWebsites(
        websites.map((site) =>
          site.id === editingWebsiteId
            ? {
                ...site,
                pages: selectedPages.length,
                lastCrawled: new Date().toISOString().split("T")[0],
                selectedPages: [...selectedPages],
                includePattern: includePattern || undefined,
                excludePattern: excludePattern || undefined,
              }
            : site,
        ),
      )
    } else {
      // Add new website
      // Extract domain from URL, handling both with and without protocol
      let domain = url
      if (url.startsWith("http")) {
        try {
          domain = new URL(url).hostname
        } catch (e) {
          // If URL parsing fails, use the input as is
        }
      }

      // Remove www. prefix if present
      domain = domain.replace(/^www\./, "")

      const newWebsite: Website = {
        id: Date.now(), // Use timestamp for unique ID
        domain,
        pages: selectedPages.length,
        lastCrawled: new Date().toLocaleString("en-GB").replace(/\//g, "-").split(",")[0],
        selectedPages: [...selectedPages],
        includePattern: includePattern || undefined,
        excludePattern: excludePattern || undefined,
      }
      setWebsites([...websites, newWebsite])
    }

    // Reset state and close dialog
    setDialogOpen(false)
    resetDialogState()
  }

  const resetDialogState = () => {
    setUrl("")
    setAllSubpages([])
    setFilteredSubpages([])
    setSelectedPages([])
    setDialogStep("url")
    setEditingWebsiteId(null)
    setIncludePattern("")
    setExcludePattern("")
    setActiveTab("pages")
  }

  const handleEditWebsite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()

    // Find the website being edited
    const website = websites.find((site) => site.id === id)
    if (!website) return

    // Set editing state
    setEditingWebsiteId(id)

    // Load appropriate subpages based on domain
    const pages = mockSubpages

    // Set the previously selected pages
    setAllSubpages(pages)
    setFilteredSubpages(pages)
    setSelectedPages(website.selectedPages || [])

    // Set patterns if they exist
    setIncludePattern(website.includePattern || "")
    setExcludePattern(website.excludePattern || "")

    setDialogStep("pages")
    setDialogOpen(true)
  }

  const getDialogTitle = () => {
    if (editingWebsiteId) {
      const website = websites.find((site) => site.id === editingWebsiteId)
      return `Edit Website: ${website?.domain}`
    }
    return "Add Website"
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Websites</span>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open)
              if (!open) {
                resetDialogState()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingWebsiteId(null)
                  setDialogStep("url")
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{getDialogTitle()}</DialogTitle>
                <DialogDescription>
                  {editingWebsiteId
                    ? "Edit which pages to include from this website."
                    : "Add a website to crawl for knowledge sources."}
                </DialogDescription>
              </DialogHeader>

              {dialogStep === "url" ? (
                <>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="url">Website URL</Label>
                      <Input
                        id="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleUrlSubmit} disabled={isLoading || !url}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        "Scan Website"
                      )}
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <Tabs defaultValue="pages" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="pages">Pages</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pages" className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <p className="text-sm font-medium">
                          Found {filteredSubpages.length} pages
                          {filteredSubpages.length !== allSubpages.length && ` (filtered from ${allSubpages.length})`}
                        </p>
                        <Button variant="outline" size="sm" onClick={handleSelectAll}>
                          {selectedPages.length === filteredSubpages.length ? "Deselect All" : "Select All"}
                        </Button>
                      </div>
                      <div className="max-h-60 space-y-2 overflow-y-auto rounded border p-2">
                        {filteredSubpages.length > 0 ? (
                          filteredSubpages.map((page) => (
                            <div key={page.url} className="flex items-center space-x-2 rounded p-2 hover:bg-muted">
                              <Checkbox
                                id={page.url}
                                checked={selectedPages.includes(page.url)}
                                onCheckedChange={() => handlePageSelect(page.url)}
                              />
                              <Label htmlFor={page.url} className="flex-1 cursor-pointer text-sm">
                                {page.title}
                                <span className="block text-xs text-muted-foreground">{page.url}</span>
                              </Label>
                            </div>
                          ))
                        ) : (
                          <div className="py-4 text-center text-muted-foreground">No pages match your filters</div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="advanced">
                      <div className="space-y-4 py-2">
                        <div className="grid gap-2">
                          <Label htmlFor="include">Include Pattern</Label>
                          <Input
                            id="include"
                            placeholder="e.g., /blog/.*"
                            value={includePattern}
                            onChange={(e) => setIncludePattern(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">Regular expression to include pages</p>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="exclude">Exclude Pattern</Label>
                          <Input
                            id="exclude"
                            placeholder="e.g., /admin/.*"
                            value={excludePattern}
                            onChange={(e) => setExcludePattern(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">Regular expression to exclude pages</p>
                        </div>
                        <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("pages")}>
                          View Filtered Pages
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    {!editingWebsiteId && (
                      <Button variant="outline" onClick={() => setDialogStep("url")}>
                        Back
                      </Button>
                    )}
                    <Button onClick={handleAddWebsite} disabled={selectedPages.length === 0}>
                      {editingWebsiteId ? "Update Website" : "Add Website"}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>Manage website knowledge sources</CardDescription>
      </CardHeader>
      <CardContent>
        {websites.length > 0 ? (
          <div className="space-y-2">
            {websites.map((site) => (
              <div key={site.id} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">{site.domain}</p>
                    <p className="text-xs text-muted-foreground">
                      {site.pages} pages • Last crawled {site.lastCrawled}
                      {(site.includePattern || site.excludePattern) && <span className="ml-1">(filtered)</span>}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={(e) => handleEditWebsite(site.id, e)}>
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <Globe className="mb-2 h-10 w-10 text-muted-foreground" />
            <h3 className="mb-1 text-sm font-medium">No websites added</h3>
            <p className="text-xs text-muted-foreground">Add websites to integrate them into your bot's knowledge base</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {websites.length} websites • {websites.reduce((acc, site) => acc + site.pages, 0)} total pages
        </p>
      </CardFooter>
    </Card>
  )
}

