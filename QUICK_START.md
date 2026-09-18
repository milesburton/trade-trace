# Trade Trace Quick Start

## 🎯 30-Second Overview

Trade Trace is a trade execution and compliance monitoring platform, built with the same standards as VETA Trading Platform for consistency across your project library.

## ⚡ Quick Commands

```bash
# Install and start
npm install
npm run dev          # → http://localhost:5173

# Testing
npm run test         # Unit + integration tests
npm run test:ui      # E2E tests
npm run test:ui:headed  # E2E tests in browser

# Code Quality
npm run lint         # Check code style
npm run lint:fix     # Fix style issues
npm run typecheck    # Check TypeScript types
npm run format       # Auto-format code

# Building
npm run build        # Production build
npm run preview      # Preview production build
```

## 📂 Project Layout

| Directory | Purpose |
|-----------|---------|
| `frontend/src` | React components and application logic |
| `docs` | Documentation (published to GitHub Pages) |
| `.github/workflows` | CI/CD automation |
| `.husky` | Git pre-commit hooks |

## 🎨 Key Files to Customize

1. **`frontend/src/App.tsx`** - Main application component
2. **`frontend/tailwind.config.ts`** - Tailwind theme colors
3. **`README.md`** - Project description
4. **`docs/README.md`** - Documentation structure
5. **`CLAUDE.md`** - Development guidelines

## 📦 Tech Stack at a Glance

```
React 18          TypeScript 5       Tailwind CSS 3
    ↓                  ↓                   ↓
 Components      Type Safety         Styling
    
Vite              Vitest             Playwright
    ↓                  ↓                   ↓
Build Tool      Unit Tests          E2E Tests

Biome             GitHub Actions
    ↓                   ↓
Linting/Format   CI/CD Automation
```

## 🚀 Deployment Checklist

- [ ] Push to GitHub
- [ ] Enable GitHub Pages
- [ ] Configure branch protection
- [ ] Set up environment variables
- [ ] Deploy to production

## 🔗 Important Links

| Link | Purpose |
|------|---------|
| [CLAUDE.md](CLAUDE.md) | Development guide |
| [SETUP_SUMMARY.md](SETUP_SUMMARY.md) | Detailed setup overview |
| [NEXT_STEPS.md](NEXT_STEPS.md) | Post-launch checklist |
| [SECURITY.md](SECURITY.md) | Security policy |

## 💡 Common Tasks

### Create a new component
```bash
mkdir -p frontend/src/components/YourComponent
# Create YourComponent.tsx and YourComponent.test.tsx
```

### Add a new dependency
```bash
cd frontend && npm install package-name
npm run typecheck  # Verify types work
```

### Run specific test
```bash
npm run test:frontend -- YourComponent.test.tsx
```

### Debug E2E tests
```bash
npm run test:ui:headed
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 in use | `npm run dev -- --port 3000` |
| TypeScript errors | `npm run typecheck` |
| Style not applied | Check Tailwind config and class names |
| Tests failing | Run with `npm run test:unit -- --ui` |

## 📚 Documentation Structure

Create docs in `/docs`:
```
docs/
├── index.md           # Homepage
├── guides/            # How-to guides
├── platform/          # Technical docs
└── development/       # Contributing guides
```

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest](https://vitest.dev/)

## 🆘 Need Help?

1. Check [CLAUDE.md](CLAUDE.md) for development guidelines
2. Review [SETUP_SUMMARY.md](SETUP_SUMMARY.md) for architecture
3. See [NEXT_STEPS.md](NEXT_STEPS.md) for configuration options
4. Check GitHub Actions logs for CI/CD issues

---

**Ready to code?** Start with `npm install && npm run dev` 🚀
