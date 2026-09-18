const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export const apiClient = {
  async getTradesmen() {
    const res = await fetch(`${API_URL}/api/tradesmen`)
    return res.json()
  },

  async getReviews() {
    const res = await fetch(`${API_URL}/api/reviews`)
    return res.json()
  },

  async submitReview(data: {
    tradesman_id: string
    reviewer_name: string
    rating: number
    review_text: string
  }) {
    const res = await fetch(`${API_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async getTradesman(id: string) {
    const res = await fetch(`${API_URL}/api/tradesmen/${id}`)
    return res.json()
  },

  async getGraph(tradesman_id: string) {
    const res = await fetch(`${API_URL}/api/tradesmen/${tradesman_id}/graph`)
    return res.json()
  },
}
