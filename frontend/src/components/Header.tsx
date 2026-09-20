import { useState } from "react"

export function Header() {
  const [theme, setTheme] = useState<"dark" | "darker" | "light" | "high-contrast">("dark")

  const toggleTheme = () => {
    const themes: Array<"dark" | "darker" | "light" | "high-contrast"> = [
      "dark",
      "darker",
      "light",
      "high-contrast",
    ]
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
    document.documentElement.setAttribute("data-theme", nextTheme)
  }

  return (
    <header className="sticky top-0 z-50 bg-panel border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-semantic-up to-semantic-maker flex items-center justify-center">
              <span className="text-lg font-bold text-strong">TT</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-strong">Trade Trace</h1>
              <p className="text-xs text-muted">Verified tradesman reviews</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg border border-divider text-label hover:text-primary hover:bg-surface transition-all duration-200 text-sm font-medium"
            title={`Switch to ${theme === "dark" ? "darker" : theme === "darker" ? "light" : theme === "light" ? "high-contrast" : "dark"} theme`}
          >
            {theme === "dark" && "🌙"}
            {theme === "darker" && "🌑"}
            {theme === "light" && "☀️"}
            {theme === "high-contrast" && "⚡"}
          </button>
        </div>
      </div>
    </header>
  )
}
