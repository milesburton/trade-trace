# Trade Trace Components

This document describes the React components in Trade Trace following VETA's design standards.

## Component Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx     # Overview with statistics
│   ├── TradesmenList.tsx # Grid of tradesman cards
│   ├── ReviewForm.tsx    # Form to submit reviews
│   ├── BlockchainTab.tsx # Blockchain transaction records
│   ├── RelationshipsGraph.tsx # Network graph visualization
│   └── index.ts          # Component exports
├── types/                # TypeScript interfaces
│   └── index.ts          # Type definitions
├── api/                  # API integration
│   └── client.ts         # Fetch wrapper
└── App.tsx              # Main application shell
```

## Components

### Dashboard

Displays key metrics and recent reviews.

**Props**: None

**State**:
- `stats`: DashboardStats
- `recentReviews`: Review[]
- `isLoading`: boolean

**Features**:
- Three stat cards (Total Tradesmen, Total Reviews, Blockchain Status)
- Recent reviews list with ratings and timestamps
- Auto-refresh every 10 seconds

**Styling**: VETA slate color palette with stat cards

### TradesmenList

Grid view of all tradesmen with ratings.

**Props**: None

**State**:
- `tradesmen`: Tradesman[]
- `isLoading`: boolean

**Features**:
- 3-column responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
- Individual cards showing name, trade, location, rating, review count
- Verified badge for verified tradesmen
- Hover shadow effect on cards

**Styling**: Card-based layout with consistent spacing

### ReviewForm

Form to submit a new review.

**Props**: None

**State**:
- `tradesmen`: Tradesman[]
- `formData`: Review form data
- `isLoading`: boolean
- `submitStatus`: Success/error message

**Features**:
- Tradesman dropdown selector
- Reviewer name text input
- Star rating selector (1-5)
- Review text area
- Success/error status messages
- Form reset on successful submission

**Styling**: Centered max-width form with blue accent button

### BlockchainTab

Displays blockchain transaction records.

**Props**: None

**State**:
- `records`: Review[]
- `isLoading`: boolean

**Features**:
- Shows up to 10 most recent reviews
- Transaction hash for each record
- Confirmed status badge
- Timestamp display

**Styling**: Card layout with monospace font for hashes

### RelationshipsGraph

Network visualization of connections.

**Props**: None

**State**:
- `tradesmen`: Tradesman[]
- `selectedId`: string
- `graph`: Graph
- `isLoading`: boolean

**Features**:
- Dropdown selector for tradesman
- Node count and edge count summary
- Node list with type indicators (trader/reviewer)
- Connection list showing edge types
- Color-coded nodes by type

**Styling**: Summary cards with list layout

## Design System

All components follow VETA's design standards:

### Colors

- **Primary**: `bg-blue-600` (#2563eb)
- **Success**: `bg-green-600` (#16a34a)
- **Warning**: `bg-yellow-600` (#ca8a04)
- **Neutral**: `bg-slate-*` (gray scale)

### Typography

- **Headings**: `text-2xl font-bold`
- **Subheadings**: `text-lg font-semibold`
- **Labels**: `text-sm font-semibold`
- **Body**: Default size with `text-slate-700`

### Spacing

- **Sections**: `py-8` spacing between major sections
- **Cards**: `p-6` internal padding
- **Elements**: `mb-4` between form fields
- **Grid**: `gap-6` between grid items

### Dark Mode

All components support dark mode via Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-slate-800">
  <p className="text-slate-900 dark:text-slate-50">Text</p>
</div>
```

## API Integration

All components use the `apiClient` from `src/api/client.ts`:

```typescript
import { apiClient } from '../api/client'

// Get all tradesmen
const tradesmen = await apiClient.getTradesmen()

// Get all reviews
const reviews = await apiClient.getReviews()

// Submit a review
await apiClient.submitReview({
  tradesman_id: 'abc123',
  reviewer_name: 'John Doe',
  rating: 5,
  review_text: 'Great work!',
})

// Get tradesman details
const tradesman = await apiClient.getTradesman('abc123')

// Get relationship graph
const graph = await apiClient.getGraph('abc123')
```

## Type Definitions

### Tradesman

```typescript
interface Tradesman {
  id: string
  name: string
  trade: string
  location: string
  rating: number
  reviewCount: number
  verified: boolean
  created_at: string
}
```

### Review

```typescript
interface Review {
  id: string
  tradesman_id: string
  reviewer_name: string
  rating: number
  review_text: string
  created_at: string
  blockchain_tx?: string
}
```

### Graph

```typescript
interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

interface GraphNode {
  id: string
  name: string
  type: 'trader' | 'reviewer'
}

interface GraphEdge {
  source: string
  target: string
  type: string
}
```

## Creating New Components

Follow this template when creating new components:

```typescript
import { useEffect, useState } from 'react'
import { SomeType } from '../types'
import { apiClient } from '../api/client'

export function NewComponent() {
  const [data, setData] = useState<SomeType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setIsLoading(true)
      const result = await apiClient.getSomething()
      setData(result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
        Component Title
      </h2>

      {isLoading ? (
        <div className="text-slate-500">Loading...</div>
      ) : data.length === 0 ? (
        <div className="text-slate-500">No data</div>
      ) : (
        <div className="grid gap-6">
          {/* Content here */}
        </div>
      )}
    </div>
  )
}
```

## Testing Components

Each component should have corresponding tests in `src/components/__tests__/`:

```typescript
import { render, screen } from '@testing-library/react'
import { Dashboard } from '../Dashboard'

describe('Dashboard', () => {
  it('renders statistics', () => {
    render(<Dashboard />)
    expect(screen.getByText(/total tradesmen/i)).toBeInTheDocument()
  })
})
```

## Accessibility

All components follow WCAG 2.1 guidelines:

- Use semantic HTML (`<button>`, `<label>`, `<select>`)
- Include `aria-*` attributes where needed
- Ensure proper color contrast ratios
- Support keyboard navigation
- Use proper heading hierarchy

## Performance

- Components are memoized where appropriate
- API calls use Promise.all() for parallelization
- Unnecessary re-renders are prevented with proper state management
- Lists use key props for efficient rendering

## Contributing

When adding new components:

1. Follow the naming convention (PascalCase.tsx)
2. Create corresponding tests in `__tests__/`
3. Add TypeScript types to `src/types/`
4. Use the API client for backend integration
5. Follow VETA's design standards
6. Document component in this file
7. Export from `components/index.ts`

---

**Last Updated**: 2026-09-18  
**Design System**: VETA Trading Platform standards
