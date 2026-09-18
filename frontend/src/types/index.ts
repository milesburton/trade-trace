export interface Tradesman {
  id: string
  name: string
  trade: string
  location: string
  rating: number
  reviewCount: number
  verified: boolean
  created_at: string
}

export interface Review {
  id: string
  tradesman_id: string
  reviewer_name: string
  rating: number
  review_text: string
  created_at: string
  blockchain_tx?: string
}

export interface GraphNode {
  id: string
  name: string
  type: 'trader' | 'reviewer'
}

export interface GraphEdge {
  source: string
  target: string
  type: string
}

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
