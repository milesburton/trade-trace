---
title: Quick Start
description: Get Trade Trace up and running in minutes
---

## Prerequisites

- Node.js 20+ ([download](https://nodejs.org/))
- npm 10+

## Installation

```bash
# Clone the repository
git clone https://github.com/milesburton/trade-trace.git
cd trade-trace

# Install dependencies
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:ui

# E2E tests in headed mode (watch browser)
npm run test:ui:headed
```

## Code Quality

```bash
# Check code style
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run typecheck

# Format code
npm run format
```

## Environment Configuration

Create a `.env` file in the frontend directory:

```bash
REACT_APP_API_URL=http://localhost:8000
```

Replace `http://localhost:8000` with your backend API URL.

## Next Steps

- Read the [installation guide](/guides/installation) for detailed setup
- Check out the [platform documentation](/platform/overview)
- Review the [development guide](/development/getting-started)

## Troubleshooting

### Port already in use

```bash
npm run dev -- --port 3000
```

### Dependencies not installing

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
npm run typecheck
```

Need more help? Join our [Discord](https://discord.gg/tSGgsKnz) or create an [issue](https://github.com/milesburton/trade-trace/issues).
