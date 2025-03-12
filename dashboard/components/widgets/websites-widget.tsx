"use client"

import { useState } from "react"
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

// Mock website data
const mockWebsites = [
  { id: 1, domain: "kainos.com", pages: 304, lastCrawled: "12-03-2025:15:52" },
]

// Mock subpages for a domain
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
  const [websites, setWebsites] = useState(mockWebsites)
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [subpages, setSubpages] = useState<typeof mockSubpages>([])
  const [selectedPages, setSelectedPages] = useState<string[]>([])
  const [dialogStep, setDialogStep] = useState<"url" | "pages">("url")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleUrlSubmit = () => {
    if (!url) return

    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setSubpages(mockSubpages)
      setIsLoading(false)
      setDialogStep("pages")
    }, 1500)
  }

  const handleSelectAll = () => {
    if (selectedPages.length === subpages.length) {
      setSelectedPages([])
    } else {
      setSelectedPages(subpages.map((page) => page.url))
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
    const domain = new URL(url).hostname
    const newWebsite = {
      id: websites.length + 1,
      domain,
      pages: selectedPages.length,
      lastCrawled: new Date().toISOString().split("T")[0],
    }
    setWebsites([...websites, newWebsite])
    setDialogOpen(false)
    // Reset for next time
    setUrl("")
    setSubpages([])
    setSelectedPages([])
    setDialogStep("url")
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Websites</span>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Website</DialogTitle>
                <DialogDescription>Add a website to crawl for knowledge sources.</DialogDescription>
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
                  <Tabs defaultValue="pages">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="pages">Pages</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pages" className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <p className="text-sm font-medium">Found {subpages.length} pages</p>
                        <Button variant="outline" size="sm" onClick={handleSelectAll}>
                          {selectedPages.length === subpages.length ? "Deselect All" : "Select All"}
                        </Button>
                      </div>
                      <div className="max-h-60 space-y-2 overflow-y-auto rounded border p-2">
                        {subpages.map((page) => (
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
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="advanced">
                      <div className="space-y-4 py-2">
                        <div className="grid gap-2">
                          <Label htmlFor="include">Include Pattern</Label>
                          <Input id="include" placeholder="e.g., /blog/.*" />
                          <p className="text-xs text-muted-foreground">Regular expression to include pages</p>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="exclude">Exclude Pattern</Label>
                          <Input id="exclude" placeholder="e.g., /admin/.*" />
                          <p className="text-xs text-muted-foreground">Regular expression to exclude pages</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogStep("url")}>
                      Back
                    </Button>
                    <Button onClick={handleAddWebsite} disabled={selectedPages.length === 0}>
                      Add Website
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
        <div className="space-y-2">
          {websites.map((site) => (
            <div key={site.id} className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">{site.domain}</p>
                  <p className="text-xs text-muted-foreground">
                    {site.pages} pages • Last crawled {site.lastCrawled}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {websites.length} websites • {websites.reduce((acc, site) => acc + site.pages, 0)} total pages
        </p>
      </CardFooter>
    </Card>
  )
}

