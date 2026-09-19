import { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { TradesmenList } from './components/TradesmenList'
import { ReviewForm } from './components/ReviewForm'
import { BlockchainTab } from './components/BlockchainTab'
import { RelationshipsGraph } from './components/RelationshipsGraph'

type TabName = 'dashboard' | 'tradesmen' | 'submit-review' | 'blockchain' | 'graph'

function App() {
  const [activeTab, setActiveTab] = useState<TabName>('dashboard')

  const tabs: { name: TabName; label: string }[] = [
    { name: 'dashboard', label: 'Dashboard' },
    { name: 'tradesmen', label: 'Tradesmen' },
    { name: 'submit-review', label: 'Submit Review' },
    { name: 'blockchain', label: 'Blockchain' },
    { name: 'graph', label: 'Relationships' },
  ]

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <header className="bg-surface border-b border-divider py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-strong">Trade Trace</h1>
          <p className="text-secondary mt-2">Transparent tradesman reviews with blockchain immutability</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-panel border-b border-divider sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.name
                    ? 'border-semantic-up text-semantic-up'
                    : 'border-transparent text-muted hover:text-secondary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tradesmen' && <TradesmenList />}
        {activeTab === 'submit-review' && <ReviewForm />}
        {activeTab === 'blockchain' && <BlockchainTab />}
        {activeTab === 'graph' && <RelationshipsGraph />}
      </main>
    </div>
  )
}

export default App
