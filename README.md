# RATH Green Infrastructure Intelligence v6

This is the full clean deployable codebase.

## Product architecture

1. CEO / Board  
   **Green Infrastructure Value Dashboard**  
   Purpose: sell the vision.

2. ESG Team  
   **Evidence & Nature-Readiness Studio**  
   Purpose: prove defensibility.

3. IFM / Property Management  
   **GreenOps Control Center**  
   Purpose: prove execution.

## Demo credentials

| Role | Email | PIN |
|---|---|---|
| CEO | ceo@client.com | 111111 |
| ESG Team | esg@client.com | 222222 |
| IFM Partner | ifm@partner.com | 333333 |
| Property Manager | pm@client.com | 444444 |

## Optional Vercel environment variables

Anthropic / Claude:
```text
ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=claude-sonnet-4-20250514
```

OpenAI:
```text
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini
```

If no key exists, the API uses fallback rules and the platform still works.

## Vercel settings

Framework: Vite  
Build command: `npm run build`  
Output directory: `dist`  
Install command: `npm install`

## Required structure

```text
package.json
index.html
vite.config.js
tailwind.config.js
postcss.config.js
api/
  ai-summary.js
src/
  main.jsx
  index.css
  rath/
    RathGreenOpsCloud.jsx
    domain/
      engine.js
```

## Claim boundary

RATH does not issue carbon credits. It provides internal green asset intelligence, evidence maturity, nature-readiness, water-to-health, risk, operations, and investment recommendations.
