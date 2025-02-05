//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  compatibilityDate: "2025-02-05",
  preset:"deno-deploy",
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Cache-Control',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400'
      }
    }
  },
  storage: {
    cache: {
      driver: 'fs',  // Use filesystem in development
      base: './.nitro/cache/'  // Cache location
    }
  },
  runtimeConfig: {
    debug: process.env.NODE_ENV !== 'production'
  }
});