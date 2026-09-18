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
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-semibold text-slate-600">Total Tradesmen</div>
          <div className="text-4xl font-bold text-blue-600 mt-2">
            {isLoading ? '-' : stats.totalTradesmen}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-semibold text-slate-600">Total Reviews</div>
          <div className="text-4xl font-bold text-green-600 mt-2">
            {isLoading ? '-' : stats.totalReviews}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-semibold text-slate-600">Blockchain Status</div>
          <div className="text-4xl font-bold text-purple-600 mt-2">Verified</div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
          Recent Reviews
        </h2>
        <div className="space-y-4">
          {recentReviews.length === 0 ? (
            <p className="text-slate-500">No reviews yet</p>
          ) : (
            recentReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow p-4 dark:bg-slate-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                      {review.reviewer_name}
                    </h3>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-lg">{'⭐'.repeat(review.rating)}</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full dark:bg-green-900 dark:text-green-100">
                    Confirmed
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mt-3">{review.review_text}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
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
