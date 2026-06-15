---
name: tradescheduler
description: Deploy and manage the TradeScheduler dispatch board demo — a dark-themed React job scheduling app with drag-and-drop, localStorage persistence, collision detection, and print support. Use when the user asks to launch, view, update, or demo the TradeScheduler app.
version: 1.0.0
author: Wayne (YourDevonTechmate)
tags: [web, deployment, scheduling, tradesmen, demo, react]
triggers:
  - "tradescheduler"
  - "dispatch board"
  - "job scheduling demo"
  - "tradescheduler demo"
  - "launch the scheduler"
  - "show the dispatch"
---

# TradeScheduler — Dispatch Board Demo

A dark-themed job scheduling dispatch board for tradesmen. Built as a single-file React app (no build step — React + Babel loaded from CDN).

**Features:**
- Gantt-style dispatch board with 4 engineers, 10-hour timeline (7am–4pm)
- Drag-and-drop rescheduling between engineers and time slots
- List view with full job details
- localStorage persistence — jobs survive refresh
- Collision detection — overlapping jobs pulse red
- Print stylesheet — clean job sheets
- Mobile-responsive with swipe hints
- New Job / Edit Job modal with full form
- Status badges: Unassigned, Scheduled, En Route, On Site, Complete, Cancelled

## Files

The app lives in the TradeScheduler repository:

| File | Purpose |
|------|---------|
| `demo.html` | The dispatch board — self-contained, open in browser |
| `index.html` | Main landing page with calendar + map views |
| `tradeschedule.jsx` | Original React component source (reference) |
| `manifest.json` | PWA manifest |
| `sw.js` | Service worker |

**Repository:** `github.com/YourDevonTechmate/TradeScheduler`
**Live URL:** `tradescheduler.co.uk/demo.html` (GitHub Pages)

## Serving Locally

To serve the demo from the local repo:

```bash
cd /root/TradeScheduler
python3 -m http.server 8080 &
```

Then open `http://localhost:8080/demo.html`.

## Opening the Live Version

The live version is at `tradescheduler.co.uk/demo.html`. Use the `open_url` tool to open it directly.

## Updating the Demo

The demo is a single HTML file. To modify:

1. Read the current file: `cat /root/TradeScheduler/demo.html`
2. Make changes (React components are in the `<script type="text/babel">` block)
3. Commit and push: `cd /root/TradeScheduler && git add demo.html && git commit -m "message" && git push`

GitHub Pages deploys automatically from the `main` branch.

## Key Code Locations in demo.html

- **ENGINEERS array** (~line 400): Engineer names, colours
- **STATUS_CONFIG** (~line 410): Status badge colours and labels
- **DEFAULT_JOBS** (~line 420): Initial demo jobs
- **DispatchBoard component** (~line 520): The Gantt board with drag-and-drop
- **JobList component** (~line 600): The list view
- **App component** (~line 630): Main state management, localStorage, print
- **Print stylesheet** (~line 300): `@media print` rules

## Adding Engineers

Edit the `ENGINEERS` array in the `<script type="text/babel">` block:

```javascript
const ENGINEERS = [
  { id: 1, name: "Dave R.", colour: "#3b82f6" },
  { id: 2, name: "Mike T.", colour: "#10b981" },
  // Add more here...
];
```

## Troubleshooting

- **Page blank?** Check browser console — likely a CDN script failed to load (rare)
- **Jobs lost?** localStorage may have been cleared. First visit loads 5 demo jobs
- **Drag not working on mobile?** HTML5 drag-and-drop has limited mobile support — this is a known limitation. Works fully on desktop
