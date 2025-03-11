import { KnowledgeSourcesDashboard } from "@/components/knowledge-sources-dashboard"
import { AppLayout } from "@/components/app-layout"

export default function ChatbotPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <KnowledgeSourcesDashboard chatbotId={params.id} />
    </AppLayout>
  )
}

