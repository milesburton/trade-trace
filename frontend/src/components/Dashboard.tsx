import { useEffect, useState } from 'react'
import { Review, Tradesman } from '../types'
import { apiClient } from '../api/client'

interface DashboardStats {
  totalTradesmen: number
  totalReviews: number
  blockchainStatus: string
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTradesmen: 0,
    totalReviews: 0,
    blockchainStatus: 'Verified',
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
        blockchainStatus: 'Verified',
      })

      setRecentReviews(reviews.slice(0, 5))
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-panel rounded border border-divider p-6">
          <div className="text-sm font-semibold text-label">Total Tradesmen</div>
          <div className="text-4xl font-bold text-semantic-up mt-2">
            {isLoading ? '-' : stats.totalTradesmen}
          </div>
        </div>

        <div className="bg-panel rounded border border-divider p-6">
          <div className="text-sm font-semibold text-label">Total Reviews</div>
          <div className="text-4xl font-bold text-semantic-maker mt-2">
            {isLoading ? '-' : stats.totalReviews}
          </div>
        </div>

        <div className="bg-panel rounded border border-divider p-6">
          <div className="text-sm font-semibold text-label">Blockchain Status</div>
          <div className="text-4xl font-bold text-semantic-status-success mt-2">Verified</div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div>
        <h2 className="text-2xl font-bold text-strong mb-4">
          Recent Reviews
        </h2>
        <div className="space-y-4">
          {recentReviews.length === 0 ? (
            <p className="text-muted">No reviews yet</p>
          ) : (
            recentReviews.map((review) => (
              <div key={review.id} className="bg-panel rounded border border-divider p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-primary">
                      {review.reviewer_name}
                    </h3>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-lg">{'⭐'.repeat(review.rating)}</span>
                      <span className="text-sm text-secondary">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-semantic-status-success/10 text-semantic-status-success text-xs font-semibold rounded-full">
                    Confirmed
                  </span>
                </div>
                <p className="text-default mt-3">{review.review_text}</p>
                <p className="text-xs text-muted mt-3">
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
