# TradeScheduler v4 — Feature Spec

## 1. GPS Check-in (Priority #1)
- Worker taps "Clock In" → phone grabs GPS coordinates
- Admin sees map pin on job card: "Wayne clocked in at 51 Exeter Rd at 08:03"
- Geofence optional — flag if worker clocks in >500m from job site
- Clock Out same flow — captures total on-site hours
- Works offline — queues GPS data, syncs when back online
- Privacy: only captures location at clock in/out, not continuous tracking

## 2. Team Chat (Priority #2)
- Per-job chat threads — every dispatched job gets a chat room
- Worker can message: "Running 20 min late" or "Need materials"
- Admin can broadcast to all workers on a job
- Push notifications for new messages
- Read receipts so admin knows worker saw the update
- Simple — no emoji reactions, no GIFs. Just text. It's a tool, not WhatsApp

## 3. Shift Swaps (Priority #3)
- Worker taps "Request Swap" on their shift
- System shows which coworkers are available (same skillset, not already booked)
- Worker picks who to swap with → notification sent to that worker
- Other worker accepts → admin gets final approval request
- Admin approves → calendar updates automatically, both workers notified
- Swap history logged for accountability

## 4. Job Costing (Priority #4)
- Each worker has an hourly rate (cost to business)
- Each job has a quoted price (revenue)
- GPS clock-in/out auto-calculates total worker hours
- Job dashboard: Revenue £850 − Labour £320 − Materials £110 = Margin £420
- Flag jobs where margin drops below threshold
- Export to CSV for accountant

## 5. Free Tier (Launch Strategy)
- Free: up to 5 workers, basic scheduling + GPS check-in + chat
- Pro (£30/mo): up to 20 workers, shift swaps, job costing, priority support
- Business (£60/mo): unlimited workers, API access, custom branding, export to QuickBooks
- Free tier IS the marketing — tradesmen tell other tradesmen
- Stripe billing with 14-day Pro trial on signup

## Competitive Intel (from YouTube review)
- Connect Team: all-in-one, free for 10, has chat + shift swaps. Main competitor.
- QuickBooks: payroll-focused, GPS tracking, QuickBooks integration.
- Clock Shark: GPS-first, job costing, project management.
- TradeScheduler advantages: drag-drop calendar, PIN login, OpenStreetMap (no API keys), built by a tradesman.
