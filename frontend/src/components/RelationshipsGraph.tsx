import { useEffect, useState } from "react"
import { apiClient } from "../api/client"
import type { Graph, Tradesman } from "../types"

export function RelationshipsGraph() {
  const [tradesmen, setTradesmen] = useState<Tradesman[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [graph, setGraph] = useState<Graph | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadTradesmen()
  }, [])

  async function loadTradesmen() {
    try {
      const data = await apiClient.getTradesmen()
      setTradesmen(data)
      if (data.length > 0) {
        setSelectedId(data[0].id)
        loadGraph(data[0].id)
      }
    } catch (error) {
      console.error("Error loading tradesmen:", error)
    }
  }

  async function loadGraph(tradesman_id: string) {
    try {
      setIsLoading(true)
      const data = await apiClient.getGraph(tradesman_id)
      setGraph(data)
    } catch (error) {
      console.error("Error loading graph:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    setSelectedId(id)
    loadGraph(id)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-strong">Relationship Graph</h2>

      <div>
        <label className="block text-sm font-semibold text-primary mb-2">Select Tradesman</label>
        <select
          value={selectedId}
          onChange={handleSelectChange}
          className="w-full px-4 py-2 border border-divider rounded bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-semantic-up"
        >
          {tradesmen.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} - {t.trade}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="text-muted">Loading graph...</div>
      ) : !graph ? (
        <div className="text-muted">Select a tradesman to view relationships</div>
      ) : (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-panel rounded border border-divider p-4">
              <div className="text-sm font-semibold text-label">Nodes</div>
              <div className="text-3xl font-bold text-semantic-up">{graph.nodes.length}</div>
            </div>
            <div className="bg-panel rounded border border-divider p-4">
              <div className="text-sm font-semibold text-label">Connections</div>
              <div className="text-3xl font-bold text-semantic-maker">{graph.edges.length}</div>
            </div>
          </div>

          {/* Nodes List */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Nodes ({graph.nodes.length})
            </h3>
            <div className="space-y-2">
              {graph.nodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center space-x-3 p-3 rounded bg-surface border border-divider"
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      node.type === "trader" ? "bg-semantic-up" : "bg-semantic-maker"
                    }`}
                  />
                  <span className="text-default">
                    {node.name} <span className="text-xs text-muted">({node.type})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connections List */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Connections ({graph.edges.length})
            </h3>
            {graph.edges.length === 0 ? (
              <p className="text-muted">No connections declared</p>
            ) : (
              <div className="space-y-2">
                {graph.edges.map((edge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 p-3 rounded bg-surface border border-divider"
                  >
                    <span className="text-muted">→</span>
                    <span className="text-default">{edge.type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
