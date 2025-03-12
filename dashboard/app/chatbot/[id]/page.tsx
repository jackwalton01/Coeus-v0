import { KnowledgeSourcesDashboard } from "@/components/knowledge-sources-dashboard"
import { AppLayout } from "@/components/app-layout"
import webscraperService from "@/lib/webscraper.service";


export default function ChatbotPage({ params }: { params: { id: string } }) {

  // FIXME: CORS error when trying to scrape?
  console.log('scraping:');
  console.log(
    JSON.stringify(webscraperService.scrapeWebsite("https://www.kainos.com")),
  );

  return (
    <AppLayout>
      <KnowledgeSourcesDashboard chatbotId={params.id} />
    </AppLayout>
  )
}

