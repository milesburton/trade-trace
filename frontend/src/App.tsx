import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
          Trade Trace
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Comprehensive trade execution and compliance monitoring
        </p>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
