import { useState } from "react"
import { BlockchainTab } from "./components/BlockchainTab"
import { Dashboard } from "./components/Dashboard"
import { Header } from "./components/Header"
import { Navigation } from "./components/Navigation"
import { RelationshipsGraph } from "./components/RelationshipsGraph"
import { ReviewForm } from "./components/ReviewForm"
import { TradesmenList } from "./components/TradesmenList"

type TabName = "dashboard" | "tradesmen" | "submit-review" | "blockchain" | "graph"

function App() {
  const [activeTab, setActiveTab] = useState<TabName>("dashboard")

  const tabs: { name: TabName; label: string; icon?: string }[] = [
    { name: "dashboard", label: "Dashboard", icon: "📊" },
    { name: "tradesmen", label: "Tradesmen", icon: "👷" },
    { name: "submit-review", label: "Submit Review", icon: "⭐" },
    { name: "blockchain", label: "Blockchain", icon: "⛓️" },
    { name: "graph", label: "Network", icon: "🔗" },
  ]

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <Navigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "tradesmen" && <TradesmenList />}
        {activeTab === "submit-review" && <ReviewForm />}
        {activeTab === "blockchain" && <BlockchainTab />}
        {activeTab === "graph" && <RelationshipsGraph />}
      </main>
    </div>
  )
}

export default App
