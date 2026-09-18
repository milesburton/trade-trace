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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Trade Trace</h1>
          <p className="text-blue-100 mt-2">Transparent tradesman reviews with blockchain immutability</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.name
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
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
