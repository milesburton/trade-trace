import type { APIRoute } from 'astro'

interface VersionResponse {
  name: string
  version: string
  status: string
  lastUpdated: string
  repository: string
  documentation: string
}

export const GET: APIRoute = async () => {
  const version: VersionResponse = {
    name: 'Trade Trace',
    version: '0.1.0',
    status: 'production',
    lastUpdated: new Date().toISOString(),
    repository: 'https://github.com/milesburton/trade-trace',
    documentation: 'https://github.com/milesburton/trade-trace/blob/main/README.md',
  }

  return new Response(JSON.stringify(version), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
