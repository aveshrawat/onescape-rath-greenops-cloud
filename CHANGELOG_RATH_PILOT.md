# RATH Pilot Dashboard Changes

## Implemented

1. Restored a dedicated **Carbon + Resource** module in CEO and ESG workspaces.
2. Added cards for:
   - Annual Green Asset Contribution Estimate
   - Carbon Stock Proxy
   - Water Reuse + Freshwater Avoidance
   - Cost Leakage Watch
3. Added safe claim language: no carbon credits, no offsets, no certified sequestration unless upgraded through third-party review.
4. Cleaned login page:
   - removed visible credentials from role cards
   - removed auto-filled login fields
   - merged IFM Partner and Property Manager into Property Operations
   - replaced AI-ready/provider language with AI-powered executive insights
5. Removed top navigation dev badges for methodology version, E0 and AI-ready.
6. Moved methodology/evidence version into the claim-boundary block.
7. Replaced 30D/QTD/YTD with Current Snapshot and 30-Day Pilot.
8. Disabled non-functional filters and renamed export to **Export Board Pack** with print/PDF export behavior.
9. Removed visible Claude/OpenAI selector from AI Insight Layer.
10. AI backend now attempts Anthropic first, then OpenAI, then deterministic fallback.
11. AI output now opens in a board-room style modal/drawer.
12. Metric cards now open a method/action popover with definition, formula, source, evidence and next action.
13. Risk map now has clickable zones and a zone detail panel.
14. Risk bars now show numeric scores out of 100.
15. Nature page now makes Nature-Readiness Score the hero metric and displays each component as score/denominator with weight.
16. Build verified successfully with `npm run build`.

## Important claim boundary

The carbon module is intentionally worded as internal supporting estimate / proxy. It does not claim certified carbon sequestration, carbon credit generation, or offset creation.
