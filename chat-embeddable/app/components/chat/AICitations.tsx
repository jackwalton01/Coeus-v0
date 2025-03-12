"use client";

import { Search, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Context } from "@/models/context.model";

export function AICitations({
  searchTerm,
  citations,
}: {
  searchTerm: string;
  citations: Context[];
}) {
  const citationMap = citations.reduce((acc, citation) => {
    if (acc[citation.source]) {
      acc[citation.source].count += 1;
    } else {
      acc[citation.source] = { ...citation, count: 1 };
    }
    return acc;
  }, {} as Record<string, Context & { count: number }>);

  const formatUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const paths = urlObj.pathname.split("/");
      return paths[paths.length - 1] || paths[paths.length - 2];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error("Invalid URL:", url);
      return url;
    }
  };
  return (
    <Card className="tw:border tw:border-[#7FDBFF] tw:shadow-sm tw:my-2">
      <CardHeader>
        <div className="tw:flex tw:items-center tw:justify-between">
          <div>
            <CardTitle className="tw:flex tw:items-center tw:gap-2">
              <Search className="tw:h-4 tw:w-4" />
              <Badge variant="secondary">{searchTerm}</Badge>
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="tw:mt-0 tw:px-4">
        <p className="tw:text-secondary-foreground tw:mb-2">Check sources on the MIC site here:</p>
        <div className="tw:flex tw:flex-row tw:flex-wrap tw:gap-2">
          {Object.values(citationMap).map((citation, index) => (
            <Badge key={index} variant="outline" className="tw:flex tw:items-center tw:gap-2 tw:w-fit tw:h-8">
              <ExternalLink className="tw:h-4 tw:w-4" />

              <a
                target="_blank"
                href={citation.source}
                className="tw:flex tw:items-center tw:gap-1 tw:hover:underline"
              >
                {formatUrl(citation.source)}
              </a>
              {citation.count > 1 && (
                <Badge variant="secondary" className="tw:ml-2">
                  {citation.count}
                </Badge>
              )}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
