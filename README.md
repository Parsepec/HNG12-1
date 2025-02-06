# Number Classification API

A comprehensive API for mathematical number analysis and fun facts.

## Features

- Determine number properties (prime, perfect)
- Generate extended number insights
- Cached responses for performance
- Multi-language support
- Flexible query options

## API Endpoint

`GET /api/classify-number?number={number}&extended=true|false`

### Parameters
- `number`: Integer to analyze
- `extended`: Optional, provides additional insights

### Response Example

```json
{
  "number": 28,
  "is_prime": false,
  "is_perfect": true,
  "properties": ["even"],
  "digit_sum": 10,
  "fun_fact": "28 is a perfect number"
}
```

## Installation

1. Clone repository
2. Install dependencies: `npm install`
3. Run development: `npm run dev`
4. Build for production: `npm run build`

## Deployment

Compatible with most serverless and edge platforms.

## Technologies

- Nitro
- h3
- TypeScript
- Numbers API
```

The compiled version includes:

1. All utility functions for number analysis
2. Cached number fact and property retrieval
3. Main API endpoint with error handling
4. Development and production configurations
5. README with usage instructions

Key improvements:
- Cross-platform compatibility
- Efficient caching
- Flexible configuration
- Comprehensive number analysis