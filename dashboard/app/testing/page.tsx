import { AppLayout } from "@/components/app-layout"

export default function TestingPage() {
  return (
    <AppLayout>
      <div className="relative h-full">
        <h2 className="text-2xl font-bold mb-6">Testing</h2>

        {/* Placeholder content */}
        <div className="grid gap-4 grid-cols-2">
          <div className="h-60 rounded-lg bg-muted"></div>
          <div className="h-60 rounded-lg bg-muted"></div>
          <div className="col-span-2 h-40 rounded-lg bg-muted"></div>
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

