import { useEffect, useState } from "react"
import { apiClient } from "../api/client"
import type { Review } from "../types"

interface DashboardStats {
  totalTradesmen: number
  totalReviews: number
  blockchainStatus: string
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTradesmen: 0,
    totalReviews: 0,
    blockchainStatus: "Verified",
  })
  const [recentReviews, setRecentReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setIsLoading(true)
      const [tradesmen, reviews] = await Promise.all([
        apiClient.getTradesmen(),
        apiClient.getReviews(),
      ])

      setStats({
        totalTradesmen: tradesmen.length,
        totalReviews: reviews.length,
        blockchainStatus: "Verified",
      })

      setRecentReviews(reviews.slice(0, 5))
    } catch {
      console.error("Error loading dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-strong mb-2">Dashboard</h1>
        <p className="text-secondary">Overview of verified reviews and tradesmen</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-sm font-semibold text-label">👷 Total Tradesmen</div>
          <div className="text-4xl font-bold text-semantic-up mt-3">
            {isLoading ? "-" : stats.totalTradesmen}
          </div>
        </div>

        <div className="card">
          <div className="text-sm font-semibold text-label">⭐ Total Reviews</div>
          <div className="text-4xl font-bold text-semantic-maker mt-3">
            {isLoading ? "-" : stats.totalReviews}
          </div>
        </div>

        <div className="card">
          <div className="text-sm font-semibold text-label">✓ Blockchain Status</div>
          <div className="text-4xl font-bold text-semantic-status-success mt-3">Verified</div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div>
        <h2 className="text-2xl font-bold text-strong mb-6">Recent Reviews</h2>
        <div className="space-y-3">
          {recentReviews.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-muted">No reviews yet. Be the first to leave one!</p>
            </div>
          ) : (
            recentReviews.map((review) => (
              <div key={review.id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-primary text-lg">{review.reviewer_name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg">{"⭐".repeat(review.rating)}</span>
                      <span className="text-sm text-muted">{review.rating}/5</span>
                    </div>
                  </div>
                  <div className="badge-success">Verified</div>
                </div>
                <p className="text-secondary mb-3">{review.review_text}</p>
                <p className="text-xs text-muted">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
