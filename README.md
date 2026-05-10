# RATH Green Infrastructure Intelligence v7.1

## What changed in v7.1
- IFM Partner and Property Manager credentials verified
- Working period controls: 30 Days, Quarter, 6 Months, 9 Months, 12 Months
- Working filter drawer: zone, investment priority, intervention-only
- Hover-only method popovers rendered above all cards
- Dynamic AI drawer instead of static AI panel
- Dedicated print-ready board pack export, not a mobile screenshot
- Investment Planner upgraded to board-level capital logic
- Board Pack upgraded to decision memo format

## Demo credentials

| Role | Email | PIN |
|---|---|---|
| CEO | ceo@client.com | 111111 |
| ESG Team | esg@client.com | 222222 |
| IFM Partner | ifm@partner.com | 333333 |
| Property Manager | pm@client.com | 444444 |

## Vercel settings
- Framework: Vite
- Install command: `npm install --no-audit --no-fund --legacy-peer-deps`
- Build command: `npm run build`
- Output directory: `dist`

## Optional AI environment variables
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL=claude-sonnet-4-6`
- `OPENAI_API_KEY`
- `OPENAI_MODEL=gpt-5.5`

## Claim boundary
RATH does not issue carbon credits. Carbon, nature, and financial outputs remain internal supporting estimates unless upgraded through expert or third-party review.


## v7.1 Executive Polish

- CEO: decision strip, period-over-period deltas, scenario-based investment planner
- ESG: reportability readiness, missing data queue, claim upgrade path, ESG evidence exports
- IFM: QBR readiness, client escalation watch, IFM-specific AI actions, QBR export
- Property Manager: daily action queue, zone visit queue, site-specific AI actions, daily action sheet export
- AI drawer: role-specific prompts instead of one generic summary action
