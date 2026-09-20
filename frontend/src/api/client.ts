const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

interface ReviewPayload {
  tradesman_id: string
  rating: number
  comment?: string
}

interface AuthResponse {
  user: { id: string; email: string; fullName?: string }
  token: string
}

export const apiClient = {
  token: localStorage.getItem("auth_token") || "",

  setToken(token: string) {
    this.token = token
    localStorage.setItem("auth_token", token)
  },

  getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    }
  },

  async register(email: string, password: string, fullName?: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    })
    const data = await res.json()
    if (data.token) this.setToken(data.token)
    return data
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.token) this.setToken(data.token)
    return data
  },

  async getTradesmen() {
    const res = await fetch(`${API_URL}/api/tradesmen`, {
      headers: this.getHeaders(),
    })
    return res.json()
  },

  async getTradesman(id: string) {
    const res = await fetch(`${API_URL}/api/tradesmen/${id}`, {
      headers: this.getHeaders(),
    })
    return res.json()
  },

  async createTradesman(data: {
    name: string
    tradeType: string
    description?: string
    location?: string
    contactEmail?: string
    phone?: string
  }) {
    const res = await fetch(`${API_URL}/api/tradesmen`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async updateTradesman(
    id: string,
    data: {
      name?: string
      description?: string
      location?: string
      contactEmail?: string
      phone?: string
    },
  ) {
    const res = await fetch(`${API_URL}/api/tradesmen/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async getReviewsForTradesman(tradesman_id: string) {
    const res = await fetch(`${API_URL}/api/reviews/tradesman/${tradesman_id}`, {
      headers: this.getHeaders(),
    })
    return res.json()
  },

  async submitReview(data: ReviewPayload) {
    const res = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async updateReview(id: string, data: { rating?: number; comment?: string }) {
    const res = await fetch(`${API_URL}/api/reviews/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async deleteReview(id: string) {
    const res = await fetch(`${API_URL}/api/reviews/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return res.json()
  },

  async getGraph(tradesman_id: string) {
    const res = await fetch(`${API_URL}/api/tradesmen/${tradesman_id}/graph`, {
      headers: this.getHeaders(),
    })
    return res.json()
  },
}
