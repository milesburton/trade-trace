# Trade Trace Documentation Index

Welcome to Trade Trace! This document provides a roadmap to all documentation and resources.

## 🚀 Getting Started

Start here if you're new to Trade Trace:

1. **[README.md](README.md)** - Project overview and links to key resources
2. **[QUICK_START.md](QUICK_START.md)** - 30-second setup and common commands
3. **[CLAUDE.md](CLAUDE.md)** - Development guidelines and project standards

## 📖 Documentation

### Setup & Configuration
- **[SETUP_SUMMARY.md](SETUP_SUMMARY.md)** - Detailed project structure and tech stack
- **[NEXT_STEPS.md](NEXT_STEPS.md)** - Post-launch configuration checklist
- **[.github/workflows/](frontend/../.github/workflows/)** - CI/CD automation setup

### Development
- **[CLAUDE.md](CLAUDE.md)** - Development guidelines, scripts, and standards
- **[frontend/](frontend/)** - React/TypeScript frontend application
- **[docs/](docs/)** - Documentation source (published to GitHub Pages)

### Reference
- **[SECURITY.md](SECURITY.md)** - Security policies and reporting
- **[LICENSE](LICENSE)** - MIT License

## 🎯 Quick Reference

### NPM Scripts
```bash
npm run dev              # Start development server (port 5173)
npm run build            # Production build
npm run test             # Run all tests
npm run lint             # Check code quality
npm run typecheck        # TypeScript type checking
npm run format           # Auto-format code
```

### Project Structure
```
trade-trace/
├── frontend/            # React + TypeScript application
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
├── docs/               # Documentation
├── .github/workflows/  # GitHub Actions CI/CD
└── [config files]      # Project configuration
```

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite
- **Testing**: Vitest, Playwright
- **Code Quality**: Biome, TypeScript strict mode
- **CI/CD**: GitHub Actions
- **Styling**: Tailwind CSS with slate colors

## 📋 Documentation by Role

### For New Developers
1. Read [README.md](README.md)
2. Follow [QUICK_START.md](QUICK_START.md)
3. Review [CLAUDE.md](CLAUDE.md)
4. Study [SETUP_SUMMARY.md](SETUP_SUMMARY.md)

### For Project Leads
1. Check [SETUP_SUMMARY.md](SETUP_SUMMARY.md)
2. Review [NEXT_STEPS.md](NEXT_STEPS.md)
3. Configure via [.github/workflows/](frontend/../.github/workflows/)
4. Set up deployment per [NEXT_STEPS.md](NEXT_STEPS.md)

### For Security/DevOps
1. Review [SECURITY.md](SECURITY.md)
2. Check [GitHub Actions workflows](.github/workflows/)
3. Configure secrets in repository settings
4. Set up branch protection rules

### For Documentation Contributors
1. Create content in [docs/](docs/) directory
2. Follow markdown style in [.markdownlint.jsonc](.markdownlint.jsonc)
3. Push to main to auto-publish

## 🔗 External Resources

### Official Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)

### Related Projects
- [VETA Trading Platform](https://github.com/milesburton/veta-trading-platform) - Reference implementation

## 🎨 Design Standards

Trade Trace follows VETA's design system:

- **Color Palette**: Slate gray with professional hierarchy
- **Typography**: System fonts for performance
- **Spacing**: Tailwind default scale (4px base)
- **Themes**: Dark/Light mode support
- **Components**: Composable React components

## ✅ Checklists

### Before First Commit
- [ ] Read [CLAUDE.md](CLAUDE.md)
- [ ] Run `npm install`
- [ ] Run `npm run dev` and test locally
- [ ] Run `npm run test` to verify tests pass

### Before Pushing to GitHub
- [ ] `npm run lint:fix` - Fix code style
- [ ] `npm run typecheck` - Verify types
- [ ] `npm run test` - Run all tests
- [ ] `git log` - Verify commit messages

### Before Deployment
- [ ] Review [NEXT_STEPS.md](NEXT_STEPS.md)
- [ ] Configure GitHub Pages in settings
- [ ] Set up branch protection rules
- [ ] Add team members and permissions
- [ ] Configure environment variables

## 🆘 Troubleshooting

### Common Issues
1. **Port in use** → `npm run dev -- --port 3000`
2. **Build fails** → `npm run typecheck` and fix errors
3. **Tests fail** → Check git hooks, run `npm run test:unit -- --ui`
4. **Styles not working** → Verify Tailwind classes and config

### Getting Help
- Check [CLAUDE.md](CLAUDE.md) development section
- Review [SETUP_SUMMARY.md](SETUP_SUMMARY.md) troubleshooting
- Check GitHub Actions logs for CI/CD issues
- See [SECURITY.md](SECURITY.md) for security questions

## 📊 Project Metadata

| Property | Value |
|----------|-------|
| **Name** | Trade Trace |
| **Version** | 0.1.0 |
| **License** | MIT |
| **Repository** | https://github.com/milesburton/trade-trace |
| **Documentation** | https://milesburton.github.io/trade-trace/ |
| **Status** | Initial scaffold complete |

## 🗺️ Document Map

```
Root Level Documents
├── README.md                    ← Start here
├── INDEX.md                     ← This file
├── QUICK_START.md              ← Quick reference
├── CLAUDE.md                   ← Development guide
├── SETUP_SUMMARY.md            ← Architecture overview
├── NEXT_STEPS.md               ← Configuration checklist
├── SECURITY.md                 ← Security policy
└── LICENSE                     ← MIT License

Configuration Files
├── package.json                ← Root npm config
├── tsconfig.json               ← TypeScript root config
├── biome.json                  ← Code quality config
├── .gitignore                  ← Git ignore rules
├── .markdownlint.jsonc         ← Markdown rules
└── .release-please-manifest.json ← Version tracking

Application Code
├── frontend/                   ← React application
│   ├── src/                   ← TypeScript/React code
│   ├── package.json           ← Frontend npm config
│   └── [config files]         ← Vite, Tailwind, etc.
└── docs/                      ← Documentation site

CI/CD & Automation
└── .github/workflows/          ← GitHub Actions
    ├── ci.yml                 ← Test & build
    ├── codeql.yml             ← Security analysis
    ├── gitleaks.yml           ← Secret scanning
    ├── pages.yml              ← Documentation deploy
    └── release-please.yml     ← Automated releases

Git Hooks
└── .husky/                     ← Pre-commit hooks
    └── pre-commit             ← Code quality checks
```

## 🎓 Learning Path

### Week 1: Foundation
- [ ] Read all root-level documentation
- [ ] Complete QUICK_START setup
- [ ] Run local development server
- [ ] Make your first component modification

### Week 2: Development
- [ ] Study React and TypeScript patterns
- [ ] Create a new component with tests
- [ ] Practice commit workflows
- [ ] Submit a pull request

### Week 3: Deployment
- [ ] Configure GitHub Pages
- [ ] Set up CI/CD pipeline
- [ ] Deploy to production
- [ ] Monitor with GitHub Actions

## 📞 Support

For questions or issues:

1. **Development**: See [CLAUDE.md](CLAUDE.md)
2. **Setup**: See [SETUP_SUMMARY.md](SETUP_SUMMARY.md)
3. **Configuration**: See [NEXT_STEPS.md](NEXT_STEPS.md)
4. **Security**: See [SECURITY.md](SECURITY.md)
5. **GitHub Issues**: Create an issue in the repository

---

**Last Updated**: 2026-09-18  
**Version**: 0.1.0  
**Status**: ✅ Project scaffolded and ready for development

**Next**: Run `npm install && npm run dev` to get started! 🚀
