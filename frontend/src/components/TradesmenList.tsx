import { useEffect, useState } from 'react'
import { Tradesman } from '../types'
import { apiClient } from '../api/client'

export function TradesmenList() {
  const [tradesmen, setTradesmen] = useState<Tradesman[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTradesmen()
  }, [])

  async function loadTradesmen() {
    try {
      setIsLoading(true)
      const data = await apiClient.getTradesmen()
      setTradesmen(data)
    } catch (error) {
      console.error('Error loading tradesmen:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">All Tradesmen</h2>

      {isLoading ? (
        <div className="text-slate-500">Loading...</div>
      ) : tradesmen.length === 0 ? (
        <div className="text-slate-500">No tradesmen found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tradesmen.map((tradesman) => (
            <div
              key={tradesman.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow dark:bg-slate-800"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {tradesman.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tradesman.trade}</p>
                </div>
                {tradesman.verified && (
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded dark:bg-blue-900 dark:text-blue-100">
                    Verified
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{tradesman.location}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{'⭐'.repeat(Math.round(tradesman.rating))}</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {tradesman.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {tradesman.reviewCount} reviews
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
