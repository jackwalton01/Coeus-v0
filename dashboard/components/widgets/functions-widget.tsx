"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Code, Plus } from "lucide-react"

export function FunctionsWidget() {
  return (
    <Card className="h-full relative">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Functions</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Link Azure Functions to add custom data integrations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>Custom function integrations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <Code className="mb-2 h-10 w-10 text-muted-foreground" />
          <h3 className="mb-1 text-sm font-medium">No functions added</h3>
          <p className="text-xs text-muted-foreground">Add Azure Functions to create custom data integrations</p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Functions enable custom data processing and integration</p>
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

