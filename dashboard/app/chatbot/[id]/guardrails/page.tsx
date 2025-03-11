import { AppLayout } from "@/components/app-layout"

export default function GuardRailsPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <div className="relative h-full">
        <h2 className="text-2xl font-bold mb-6">Guard Rails for Chatbot {params.id}</h2>

        {/* Placeholder content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-lg bg-muted"></div>
          ))}
        </div>

        {/* Coming soon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="text-center p-6">
            <h3 className="text-3xl font-bold text-white mb-4">New Functionality Coming Soon...</h3>
            <p className="text-xl text-white/80">We're working on enhancing this feature.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

