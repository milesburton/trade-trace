import { useEffect, useState } from "react"
import { apiClient } from "../api/client"
import type { Tradesman } from "../types"

export function ReviewForm() {
  const [tradesmen, setTradesmen] = useState<Tradesman[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message?: string
  }>({
    type: null,
  })

  const [formData, setFormData] = useState({
    tradesman_id: "",
    reviewer_name: "",
    rating: "",
    review_text: "",
  })

  useEffect(() => {
    loadTradesmen()
  }, [])

  async function loadTradesmen() {
    try {
      const data = await apiClient.getTradesmen()
      setTradesmen(data)
    } catch {
      console.error("Error loading tradesmen")
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
        rating: Number.parseInt(formData.rating, 10),
        review_text: formData.review_text,
      })

      setSubmitStatus({
        type: "success",
        message: "✅ Review submitted and recorded on blockchain!",
      })
      setFormData({
        tradesman_id: "",
        reviewer_name: "",
        rating: "",
        review_text: "",
      })

      setTimeout(() => setSubmitStatus({ type: null }), 5000)
    } catch {
      setSubmitStatus({
        type: "error",
        message: "❌ Error submitting review",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-strong mb-2">Share Your Experience</h2>
        <p className="text-secondary mb-8">
          Help others find trusted tradesmen by leaving a review
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="tradesman-select"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Select Tradesman *
            </label>
            <select
              id="tradesman-select"
              value={formData.tradesman_id}
              onChange={(e) => setFormData({ ...formData, tradesman_id: e.target.value })}
              className="input-base w-full"
              required
            >
              <option value="">Choose a tradesman...</option>
              {tradesmen.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.trade})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="reviewer-name"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Your Name *
            </label>
            <input
              id="reviewer-name"
              type="text"
              value={formData.reviewer_name}
              onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
              placeholder="Enter your full name"
              className="input-base w-full"
              required
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-semibold text-primary mb-3">Rating *</legend>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: rating.toString() })}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 font-semibold ${
                    formData.rating === rating.toString()
                      ? "border-semantic-up bg-semantic-up/10 text-semantic-up"
                      : "border-divider text-muted hover:border-secondary"
                  }`}
                >
                  <span className="text-lg">{"⭐".repeat(rating)}</span>
                  <div className="text-xs mt-1">
                    {rating === 1
                      ? "Poor"
                      : rating === 2
                        ? "Fair"
                        : rating === 3
                          ? "Good"
                          : rating === 4
                            ? "Great"
                            : "Excellent"}
                  </div>
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="review-text" className="block text-sm font-semibold text-primary mb-2">
              Your Review *
            </label>
            <textarea
              id="review-text"
              value={formData.review_text}
              onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
              placeholder="Describe your experience with this tradesman..."
              rows={5}
              className="input-base w-full"
              required
            />
            <p className="text-xs text-muted mt-2">
              {formData.review_text.length} / 500 characters
            </p>
          </div>

          {submitStatus.type && (
            <div
              className={`p-4 rounded-lg border-l-4 ${
                submitStatus.type === "success"
                  ? "bg-semantic-status-success/10 border-semantic-status-success text-semantic-status-success"
                  : "bg-semantic-status-critical/10 border-semantic-status-critical text-semantic-status-critical"
              }`}
            >
              <div className="font-semibold mb-1">
                {submitStatus.type === "success" ? "✓ Success" : "✗ Error"}
              </div>
              {submitStatus.message}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="btn-primary w-full py-3">
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  )
}
