# Trade Trace Development Guide

Trade Trace is a comprehensive trade execution and compliance monitoring platform, following the same project structure and design standards as VETA Trading Platform.

## Project Structure

```
trade-trace/
├── frontend/           # React + TypeScript frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
├── docs/              # Documentation
├── .github/workflows/ # GitHub Actions CI/CD
└── package.json       # Root project configuration
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Testing**: Vitest, Playwright, Testing Library
- **Code Quality**: Biome, TypeScript strict mode
- **Build**: Vite, npm workspaces
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run test:frontend` - Run frontend tests only
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run typecheck` - Check TypeScript types
- `npm run test:ui` - Run E2E tests with Playwright

## Design Standards

This project follows VETA's design standards:

- **Typography**: System fonts with professional hierarchy
- **Colors**: Slate color palette with dark/light theme support
- **Spacing**: Tailwind's default spacing scale
- **Components**: Composable, accessible React components

## Code Quality

- All code must pass TypeScript strict mode
- Biome linting is enforced
- Pre-commit hooks run linting and type checking
- GitHub Actions CI runs tests and builds on every push

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure code passes linting and tests
4. Create a pull request

## Release Process

Releases are automated via Release Please. Merge PRs to `main` with conventional commit messages to trigger automatic releases.
