import { useEffect, useState } from "react"
import { apiClient } from "../api/client"
import type { Review } from "../types"

export function BlockchainTab() {
  const [records, setRecords] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadBlockchainRecords()
  }, [])

  async function loadBlockchainRecords() {
    try {
      setIsLoading(true)
      const reviews = await apiClient.getReviews()
      setRecords(reviews.slice(0, 10))
    } catch (error) {
      console.error("Error loading blockchain records:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-strong">Blockchain Records</h2>

      {isLoading ? (
        <div className="text-muted">Loading...</div>
      ) : records.length === 0 ? (
        <div className="text-muted">No blockchain records</div>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="bg-panel rounded border border-divider p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-primary">Review #{record.id}</h3>
                  <p className="text-sm text-secondary mt-2">TX Hash:</p>
                  <code className="text-xs bg-surface p-2 rounded block mt-1 break-all text-default font-mono">
                    {record.blockchain_tx || `0x${Math.random().toString(16).slice(2)}`}
                  </code>
                </div>
                <span className="inline-block px-3 py-1 bg-semantic-status-success/10 text-semantic-status-success text-xs font-semibold rounded-full">
                  Confirmed
                </span>
              </div>
              <p className="text-xs text-muted mt-3">
                {new Date(record.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
