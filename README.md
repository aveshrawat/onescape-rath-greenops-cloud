# RATH GreenOps Cloud v3 — Full Codebase

## Core product screens

1. Overview
2. Risk Map
3. Nature
4. Water
5. Evidence + Investment

## Backend modules included

- Green Asset Data Quality Score
- Campus Green Asset Risk Map
- Nature-Readiness Score
- Water-to-Health Index
- Green Infrastructure Investment Planner
- Green Asset Maturity Pathway
- Evidence Maturity Funnel
- Claim-Control Matrix
- Carbon stock / annual sequestration proxy as supporting evidence only

## GitHub structure

```text
package.json
index.html
vite.config.ts
tsconfig.json
tailwind.config.js
postcss.config.js
README.md
src/
  main.tsx
  App.tsx
  index.css
  rath/
    RathGreenOpsCloud.tsx
    domain/
      engine.ts
```

## Vercel settings

Framework: Vite  
Build command: `npm run build`  
Output directory: `dist`  
Install command: `npm install`

## Positioning guardrail

Use: "internal green asset contribution estimate."  
Avoid: "carbon credits generated", "certified biodiversity score", "guaranteed savings".
