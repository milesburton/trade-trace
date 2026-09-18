---
title: Installation
description: Detailed installation instructions for Trade Trace
---

## System Requirements

- **Node.js**: 20.0.0 or higher
- **npm**: 10.0.0 or higher
- **Operating System**: Linux, macOS, or Windows
- **RAM**: 2GB minimum (4GB recommended)
- **Disk Space**: 500MB for dependencies

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/milesburton/trade-trace.git
cd trade-trace
```

### 2. Install Dependencies

```bash
npm install
```

This installs all project dependencies including:
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Vitest
- Playwright

### 3. Configure Environment

Create a `.env` file in the `frontend` directory:

```bash
cat > frontend/.env << EOF
REACT_APP_API_URL=http://localhost:8000
EOF
```

Replace `http://localhost:8000` with your backend API URL.

### 4. Verify Installation

```bash
npm run typecheck
npm run lint
npm run test
```

All commands should complete without errors.

## Development Setup

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Configure IDE

#### VS Code

Install recommended extensions:
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

#### JetBrains (WebStorm, IntelliJ)

Install plugins:
- Tailwind CSS
- Biome
- TypeScript

## Production Setup

### Build for Production

```bash
npm run build
```

This creates an optimized production build in `frontend/dist/`

### Deploy

Copy the contents of `frontend/dist/` to your web server:

```bash
# Example: Copy to web server
scp -r frontend/dist/* user@server:/var/www/html/trade-trace/
```

### Configure Web Server

For single-page applications, configure your web server to serve `index.html` for all routes:

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Docker Setup

### Build Docker Image

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

Build and run:

```bash
docker build -t trade-trace .
docker run -p 3000:3000 trade-trace
```

## Troubleshooting Installation

### Node Version Error

```bash
# Check your Node version
node --version

# Install NVM (Node Version Manager) if needed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 20
nvm install 20
nvm use 20
```

### npm Install Fails

```bash
# Clear npm cache
npm cache clean --force

# Remove lock file and reinstall
rm package-lock.json
npm install
```

### Port Already in Use

```bash
# Use a different port
npm run dev -- --port 3000

# Or kill the process using port 5173
lsof -i :5173  # Find PID
kill -9 <PID>  # Kill process
```

### TypeScript Errors After Install

```bash
# Reinstall dependencies with specific versions
npm install --force
npm run typecheck
```

## Next Steps

- [Quick Start](/guides/quick-start) - Get up and running
- [Development Guide](/development/getting-started) - Learn the workflow
- [Contributing](/development/contributing) - Start contributing

## Getting Help

- Check the [FAQ](/faq)
- Search [GitHub Issues](https://github.com/milesburton/trade-trace/issues)
- Ask on [Discord](https://discord.gg/tSGgsKnz)
