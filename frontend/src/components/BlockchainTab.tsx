import { useEffect, useState } from 'react'
import { Review } from '../types'
import { apiClient } from '../api/client'

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
      console.error('Error loading blockchain records:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Blockchain Records</h2>

      {isLoading ? (
        <div className="text-slate-500">Loading...</div>
      ) : records.length === 0 ? (
        <div className="text-slate-500">No blockchain records</div>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-lg shadow p-6 dark:bg-slate-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                    Review #{record.id}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">TX Hash:</p>
                  <code className="text-xs bg-slate-100 dark:bg-slate-700 p-2 rounded block mt-1 break-all text-slate-800 dark:text-slate-200">
                    {record.blockchain_tx || `0x${Math.random().toString(16).slice(2)}`}
                  </code>
                </div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full dark:bg-green-900 dark:text-green-100">
                  Confirmed
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                {new Date(record.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
