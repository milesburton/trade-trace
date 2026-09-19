<p align="center">
  <img src="docs/src/assets/logo-light.svg" alt="Trade Trace Logo" width="200" height="200" style="border-radius: 12px; margin-bottom: 20px;">
</p>

# Trade Trace

> **Overall:** [![Trade Trace test coverage](https://img.shields.io/badge/coverage-pending-lightgrey)](https://github.com/milesburton/trade-trace/actions/workflows/ci.yml)

| Domain | Check | Result |
| :--- | :--- | :--- |
| Project | License | [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) |
| Delivery | Continuous integration | [![CI](https://github.com/milesburton/trade-trace/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/milesburton/trade-trace/actions/workflows/ci.yml) |
| Delivery | Container build | [![Docker build](https://img.shields.io/github/actions/workflow/status/milesburton/trade-trace/ci.yml?branch=main&label=docker%20build&logo=docker)](https://github.com/milesburton/trade-trace/actions/workflows/ci.yml) |
| Delivery | Documentation | [![Docs Pages](https://github.com/milesburton/trade-trace/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/milesburton/trade-trace/actions/workflows/pages.yml) |
| Delivery | Release automation | [![Release Please](https://github.com/milesburton/trade-trace/actions/workflows/release-please.yml/badge.svg?branch=main)](https://github.com/milesburton/trade-trace/actions/workflows/release-please.yml) |
| Tests | Unit | [![Unit tests](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/milesburton/trade-trace/main/docs/badges/unit-tests.json)](https://github.com/milesburton/trade-trace/actions/workflows/ci.yml) |
| Tests | Integration | [![Integration tests](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/milesburton/trade-trace/main/docs/badges/integration-tests.json)](https://github.com/milesburton/trade-trace/actions/workflows/ci.yml) |
| Tests | End-to-end | [![E2E tests](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/milesburton/trade-trace/main/docs/badges/e2e-tests.json)](https://github.com/milesburton/trade-trace/actions/workflows/ci.yml) |
| Coverage | Combined | [![Combined coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/milesburton/trade-trace/main/docs/badges/coverage.json)](https://github.com/milesburton/trade-trace/actions/workflows/ci.yml) |
| Security | Secret scanning | [![Secret scan](https://github.com/milesburton/trade-trace/actions/workflows/gitleaks.yml/badge.svg?branch=main)](https://github.com/milesburton/trade-trace/actions/workflows/gitleaks.yml) |
| Security | Static analysis | [![CodeQL](https://github.com/milesburton/trade-trace/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/milesburton/trade-trace/actions/workflows/codeql.yml) |

A transparent tradesman review platform with blockchain-backed immutability. Submit reviews, build trust networks, and verify tradesman credentials with cryptographic proof.

<p align="center">
  <a href="https://milesburton.github.io/trade-trace/"><strong>Documentation</strong></a>
  &nbsp;&middot;&nbsp;
  <a href="https://milesburton.github.io/trade-trace/guides/quick-start/">Quick start</a>
  &nbsp;&middot;&nbsp;
  <a href="https://github.com/milesburton/trade-trace/issues">Issues</a>
</p>

## Live Demo

- **Frontend**: [https://trade-trace-xxx.vercel.app](https://trade-trace-xxx.vercel.app) (Vercel)
- **API**: [https://api-xxxxx.vercel.app](https://api-xxxxx.vercel.app) (Vercel Functions)
- **Docs**: [https://milesburton.github.io/trade-trace](https://milesburton.github.io/trade-trace/) (GitHub Pages)

## Architecture

**Full-stack prototype with:**
- **Frontend**: React 18 + Vite (veta-trading-platform design system)
- **Backend**: Deno + Oak serverless functions
- **Database**: PostgreSQL (Neon free tier)
- **Storage**: Images & videos (Supabase storage)
- **CI/CD**: GitHub Actions (lint, test, build, deploy)

See [deployment docs](../../VERCEL_SETUP.md) for setup details.

## Documentation

Full documentation is at **[milesburton.github.io/trade-trace](https://milesburton.github.io/trade-trace/)**, published on every merge to `main`.

## Development

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && deno task dev

# Docs
cd docs && npm install && npm run dev
```

## Contributing

Issues and PRs welcome. Please see [CONTRIBUTING](CONTRIBUTING.md) for guidelines.
