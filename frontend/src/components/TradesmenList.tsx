import { useEffect, useState } from "react"
import { apiClient } from "../api/client"
import type { Tradesman } from "../types"

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
    } catch {
      console.error("Error loading tradesmen")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-strong mb-2">Verified Tradesmen</h2>
        <p className="text-secondary">Browse our network of trusted professionals</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-muted">Loading tradesmen...</div>
        </div>
      ) : tradesmen.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted">No tradesmen found</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tradesmen.map((tradesman) => (
            <div key={tradesman.id} className="card overflow-hidden group cursor-pointer">
              {/* Header with name and badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-strong group-hover:text-semantic-up transition-colors">
                    {tradesman.name}
                  </h3>
                  <p className="text-sm text-muted">{tradesman.trade}</p>
                </div>
                {tradesman.verified && (
                  <div className="badge-info ml-2 flex-shrink-0">✓ Verified</div>
                )}
              </div>

              {/* Location */}
              <p className="text-xs text-muted mb-4">📍 {tradesman.location}</p>

              {/* Rating Section */}
              <div className="flex items-center justify-between py-4 border-t border-b border-divider">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="text-lg font-bold text-strong">
                      {tradesman.rating.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted">
                      {tradesman.reviewCount} {tradesman.reviewCount === 1 ? "review" : "reviews"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-semantic-up/10 text-semantic-up hover:bg-semantic-up/20 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
