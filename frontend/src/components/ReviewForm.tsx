import { useEffect, useState } from 'react'
import { Tradesman } from '../types'
import { apiClient } from '../api/client'

export function ReviewForm() {
  const [tradesmen, setTradesmen] = useState<Tradesman[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message?: string }>({
    type: null,
  })

  const [formData, setFormData] = useState({
    tradesman_id: '',
    reviewer_name: '',
    rating: '',
    review_text: '',
  })

  useEffect(() => {
    loadTradesmen()
  }, [])

  async function loadTradesmen() {
    try {
      const data = await apiClient.getTradesmen()
      setTradesmen(data)
    } catch (error) {
      console.error('Error loading tradesmen:', error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus({ type: null })

    try {
      await apiClient.submitReview({
        tradesman_id: formData.tradesman_id,
        reviewer_name: formData.reviewer_name,
        rating: parseInt(formData.rating),
        review_text: formData.review_text,
      })

      setSubmitStatus({
        type: 'success',
        message: '✅ Review submitted and recorded on blockchain!',
      })
      setFormData({
        tradesman_id: '',
        reviewer_name: '',
        rating: '',
        review_text: '',
      })

      setTimeout(() => setSubmitStatus({ type: null }), 5000)
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: '❌ Error submitting review',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-panel rounded border border-divider p-6">
        <h2 className="text-2xl font-bold text-strong mb-6">Submit a Review</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Tradesman
            </label>
            <select
              value={formData.tradesman_id}
              onChange={(e) => setFormData({ ...formData, tradesman_id: e.target.value })}
              className="w-full px-4 py-2 border border-divider rounded bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-semantic-up"
              required
            >
              <option value="">Select a tradesman...</option>
              {tradesmen.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} - {t.trade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={formData.reviewer_name}
              onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-divider rounded bg-surface text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-semantic-up"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Rating
            </label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="px-4 py-2 border border-divider rounded bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-semantic-up"
              required
            >
              <option value="">Select rating...</option>
              <option value="1">⭐ 1 - Poor</option>
              <option value="2">⭐⭐ 2 - Fair</option>
              <option value="3">⭐⭐⭐ 3 - Good</option>
              <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Review
            </label>
            <textarea
              value={formData.review_text}
              onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
              placeholder="Share your experience..."
              rows={5}
              className="w-full px-4 py-2 border border-divider rounded bg-surface text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-semantic-up"
              required
            />
          </div>

          {submitStatus.type && (
            <div
              className={`p-4 rounded ${
                submitStatus.type === 'success'
                  ? 'bg-semantic-status-success/10 text-semantic-status-success'
                  : 'bg-semantic-status-critical/10 text-semantic-status-critical'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-semantic-up text-strong font-semibold rounded hover:bg-semantic-up-dark transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  )
}
