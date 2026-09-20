interface NavTab {
  name: string
  label: string
  icon?: string
}

interface NavigationProps {
  tabs: NavTab[]
  activeTab: string
  onTabChange: (tabName: string) => void
}

export function Navigation({ tabs, activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="sticky top-[78px] z-40 bg-surface border-b border-divider">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              onClick={() => onTabChange(tab.name)}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-all duration-200 ${
                activeTab === tab.name
                  ? "border-semantic-up text-semantic-up"
                  : "border-transparent text-muted hover:text-secondary"
              }`}
            >
              {tab.icon && <span className="mr-1">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
