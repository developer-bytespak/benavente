# Sales Pitch Playbook
## CMS + CRM Upsell — The Benavente Group LLC

> A practical guide for the sales meeting. Read this once before you walk in. Use the demo flow as your script.

---

## 1. About This Document

You are pitching a **custom Admin Panel** that combines:
- **CMS** (Content Management System) — so the firm can edit their own website without calling us
- **CRM** (Client Relationship Management) — so the firm can track leads, assignments, invoices and operations

Everything in the live demo (`/admin`, password `1234`) is **frontend mock-up**. Your job is to sell the *vision*. Implementation comes after they say yes.

---

## 2. The Client at a Glance

**The Benavente Group LLC** — Hawaii's top-tier real estate appraisal firm.

| Detail | Notes |
|---|---|
| **Office** | Pauahi Tower, 1003 Bishop Street, Honolulu |
| **Team** | 9 members — 3 MAI/SRA designated appraisers, 2 Certified General appraisers, 2 market analysts, 1 associate, 1 admin |
| **Decision-maker** | Fernando Benavente (Manager, MAI/SRA) |
| **Coverage** | Hawai‘i + Guam + Saipan + CNMI + Marshall Islands |
| **Clients** | Attorneys, banks (First Hawaiian, Central Pacific), developers, government agencies |
| **Service mix** | Commercial appraisal, litigation support, market analysis, property tax appeals, consulting, residential valuation |
| **Currently uses** | Their website + Sanity Studio for blog (we built that). Everything else is **spreadsheets, email, and Word docs.** |

---

## 3. The Core Pitch (One Paragraph)

> "You already trust us with your website. What we want to show you today goes beyond the website — it's a **single command center** for running The Benavente Group. Everything you currently track in spreadsheets, email threads, and folders — assignments, peer reviews, comps, invoices, leads, license renewals — lives in one place built specifically for an appraisal firm. It saves your team hours every week, protects you from compliance risk, and gives you visibility you don't have today."

---

## 4. The Three Hooks (Pick Based on Who's in the Room)

**If Fernando leads the meeting → "Operations & Visibility" hook**
> "You're managing 12 active assignments across 4 islands and 9 people. How long does it take you right now to know who's doing what, what's late, and what's about to bill? Probably 20 minutes of asking around. We're going to bring that to 10 seconds."

**If Miriam (Admin) is in the room → "Eliminate Repetitive Work" hook**
> "Every engagement letter you draft, every invoice you generate, every CV you email out — these are repeatable workflows. Our system gives you templates, auto-fills client details from the CRM, tracks signatures, and chases unpaid invoices. You stop being the bottleneck."

**If a senior appraiser (Brian/Randy) is there → "Comps Library" hook**
> "How much time do your appraisers lose every assignment hunting for comparable sales? An hour? Two? Multiplied across 12 projects and 6 appraisers, that's a week of billable time gone every month. We've built you an in-house comps database — search, filter, done."

Use the hook that fits. Then pivot to the demo.

---

## 5. Pre-Meeting Prep (15 Minutes)

- [ ] Open `/admin` in a fresh browser window. Log in (`1234`). Click around once so the panel is warm and animations have triggered.
- [ ] Open `/` (the live website) in another tab — proves the brand match.
- [ ] Have one tab on `Dashboard`, one on `Assignments`, one on `Comps Library` — your three power tabs.
- [ ] Bring **two screens if possible** — laptop for your notes, secondary screen or a TV/projector for the demo.
- [ ] Phone on silent. Close Slack/email pop-ups.
- [ ] Print Section 8 of this doc (the objection handling) and keep it nearby.

---

## 6. The Opening (2 Minutes)

Start with credibility, then permission to show.

> "Fernando, thanks for the time. Quick recap — six months ago we built your website. The blog system you have at `/studio` is part of that, your SEO person uses it weekly. Today we want to show you what happens when we extend that same idea to **everything else** you do as a firm. Not a generic CRM. Not Salesforce. A panel built specifically for the way appraisal firms operate in Hawaii. Can I show you 15 minutes of it on screen, then we'll talk about whether it makes sense for you?"

Wait for **yes**. Don't proceed without it.

---

## 7. The Demo Walkthrough (15 Minutes)

Open `/admin`. Show the login screen first — **don't skip this**, it sets the security frame.

> "First — this is locked. Only your team gets in. Today I'm using a demo password, but this is full role-based access in production."

Type `1234`. Press enter. Let the animation play.

### 7.1 Dashboard (3 minutes — biggest impact)

Pause on the Dashboard. Let them see the welcome strip and KPI cards animate.

> "This is the home screen. Whoever logs in lands here. Notice the personalization — *Welcome back, Fernando*. The numbers you see are pulling live from your operations: 14 new leads this month, 47 total leads, 234 newsletter subscribers, 6 published articles."

Point at the **Revenue Pipeline** strip:

> "This is what's most important to you as a manager. ${'$'}197k of fees in motion right now — color-coded by stage. ${'$'}47k still in the engagement-letter phase, ${'$'}122k actively in progress, ${'$'}30k delivered and waiting on payment. You'd be surprised how few firms can answer that question in seconds."

Scroll to **Workload Heatmap**:

> "Now look at this. Every team member, their active assignments, their estimated hours versus capacity. See Fernando — 90% loaded, marked Heavy. Kanae is at 10%, marked Open. **This is the conversation you have at every Monday morning meeting** — except now it takes you 3 seconds instead of 20 minutes of asking around."

Now the **Conflict-of-Interest Check**. Type `Bishop`:

> "Last one on the dashboard. Before you accept a new client, you have a USPAP obligation to check for conflicts. Right now your team does this from memory, or by asking around. Watch — I type *Bishop*, and it's instantly searching every prior lead, every assignment, every comparable sale we've used. Two matches found — one is a current assignment with First Hawaiian on Bishop Street. **You just avoided a potential ethics violation in 3 seconds.**"

### 7.2 Assignments (4 minutes — the operations heart)

Click **Assignments** in the sidebar.

> "This replaces the spreadsheet you use today. 12 active assignments. Filter by stage — engaged, site visit, drafting, peer review, delivered, invoiced. The 'Needs Attention' filter shows you what's overdue or due in the next 7 days."

Click on **A-3080 (Matsumoto Law Group · Diamond Head)** — the one in Peer Review:

> "Click any row, you get the full picture. Fee, deadline, assigned appraiser, peer reviewer."

Click the **Peer Review tab**:

> "This is huge. USPAP best practice says every commercial appraisal should be peer-reviewed. Right now you do that with email threads. Here, the reviewer leaves comments inline, marks them addressed or approved. The whole quality control process is documented automatically — which protects you in litigation if anyone ever challenges your methodology."

Click the **Documents tab**:

> "Engagement letter, site photos, comp sheets, drafts, final report — all in one place per assignment. **And see this badge — 'Compliant'.** USPAP requires you to retain a workfile for 5 years. The system auto-archives. If a state board ever audits you, you have a complete digital workfile for every assignment, ready to export."

Pause for effect. This is your money moment.

### 7.3 Comps Library (3 minutes — the IP hook)

Click **Comps Library**.

> "This one is your appraisers' favorite. Right now, when Brian or Randy starts a new commercial appraisal, the first hour of work is digging up comparable sales — through the Bureau of Conveyances, MLS, prior reports. We've built you an internal database that grows with every assignment."

Show the filters. Click **Office** + select **O‘ahu**:

> "Filter by property type, region, date range. 21 comparable sales right now. Look at the 'Used In' column — that's how many of your past appraisals each comp has supported. **The more your firm uses this, the more valuable your comps library becomes.** It's proprietary IP that compounds."

Click on a comp row → drawer opens:

> "Full detail — sale price, building size, cap rate, buyer, seller, source, year built. *Verified* badge means we confirmed the sale price with one of the parties. This is your audit trail."

### 7.4 Quick Sweep (5 minutes — show breadth)

Don't go deep here. Just click through and call out the value.

**Litigation Cases:**
> "Every expert witness engagement, with deposition and trial dates. The red strip at the top — Critical Deadlines — that means in the next 30 days, you have 3 depositions and 2 trials. Miss one of these and you have a malpractice exposure."

**Engagement Letters:**
> "14 templates pre-built. Click 'Generate Letter' — fill in client, property, fee, scope, done. PDF generated, emailed, signature tracked. What takes Miriam 30 minutes today takes 3."

**Invoices:**
> "Linked to assignments. ${'$'}13k overdue right now — system flags it red, sends reminders automatically. You'll collect faster."

**Market Data:**
> "This is Pearl and Anthony's section. They track key submarket metrics monthly — cap rates, vacancy, rents. Notice each card has a 6-month trend chart. This data eventually becomes your quarterly market reports — which, by the way, our system can also auto-build from these data points."

**Analytics:**
> "Lead funnel — out of 47 inquiries, 7 paid clients, ${'$'}102k revenue. Below that, your top referral sources. Matsumoto Law sent you 9 leads, 67% convert, average fee ${'$'}16,500. That's the kind of insight you use to decide where to spend your business development time."

**CV Downloads (still in Analytics):**
> "Which of your appraisers' CVs are getting downloaded most by attorneys? Fernando's CV — 47 downloads in 30 days. That tells you litigation demand is shifting toward Fernando. Marketing intel you don't have today."

**Licenses & CE:**
> "And finally, compliance. Every state license, every continuing education hour. Look — Brian's CNMI license expires in 23 days. The system flagged it 60 days ago. **Practicing without an active license is illegal.** This pays for itself the first time it prevents a missed renewal."

### 7.5 Content Sections (1 minute — quick reassurance)

Click through Blog Posts → Team → Gallery → Site Content.

> "And of course, your existing website — every word, every photo, every team member, every gallery image, every service description, every testimonial — all editable here, no developer needed. You already do blog posts in Sanity. Now you do everything in one place."

End the demo on the dashboard. Lean back. Let them ask questions.

---

## 8. Feature → Pain → Value Map

Quick reference. If they push back on a feature, here's the pain it solves and the dollar value.

| Feature | Current Pain | Quantified Value |
|---|---|---|
| **Assignment Pipeline** | "Who is working on what? When is it due?" — answered via Slack/email | Saves 3-5 hrs/week of manager coordination time |
| **Peer Review Workflow** | Email threads, no audit trail | Reduces malpractice exposure, defensible in court |
| **Document Hub / USPAP Workfile** | Files scattered across email, Dropbox, local drives | Compliance with USPAP 5-year retention + audit-ready instantly |
| **Comps Library** | Each appraiser hunts the same comps repeatedly | Saves 1-2 hrs/assignment × 12 assignments/month = ~20 hrs/month billable |
| **Engagement Letter Generator** | Miriam types each one in Word | 30 min → 3 min per letter |
| **Invoices + Aging Report** | Tracked in QuickBooks but no link to assignments | Faster collections; less write-off |
| **Conflict-of-Interest Check** | Manual recall by senior partners | Prevents USPAP ethics violations |
| **License & CE Tracker** | Outlook calendar reminders (or memory) | Prevents license lapse — illegal practice = state board penalty |
| **Lead-to-Revenue Funnel** | No visibility into conversion | Identifies which marketing channels actually pay |
| **Market Data Tracker** | Pearl & Anthony work in Excel | Centralizes market IP; powers blog content + client pitches |
| **CV Download Analytics** | No tracking | Shows which appraisers attorneys are evaluating — informs marketing |
| **Conflict + Source Attribution + Newsletter Capture** | Contact form just emails them | Every inquiry captured, scored, attributed, followed up |

---

## 9. The Money Conversation

After the demo, they will ask: **"How much?"** Don't blurt a number. Frame value first.

> "The way we price this is in three phases. We don't try to land all of this on day one — we sequence it so you start getting value in 30 days, and we expand based on what's working for your team. Let me show you the phasing first, then we can talk numbers."

(Move to Section 10 — Phasing — before quoting.)

When they push for a number, anchor on **value**, not cost:

> "If this saves your firm 20 billable hours a month at your appraisers' rates, that's well over ${'$'}5,000 in recovered time. Per month. The system pays for itself many times over. Our build investment is a one-time figure that we'll quote based on which phases you want."

Only quote a real number after you've confirmed phasing scope. **Get the scope, then quote.**

---

## 10. Phased Implementation Roadmap

Sell this. It de-risks their decision.

### Phase 1 — Foundation (4–6 weeks)
The website-side CMS + the lead capture pieces.
- Login portal + role-based access
- All CMS sections (Hero, Stats, Team, Gallery, Services, Testimonials, Site Content, Blog, SEO)
- Contact form → CRM lead capture
- Newsletter capture
- Email notifications when leads come in
- Basic Lead pipeline (New → Contacted → Qualified → Closed)

**They already see immediate value.** Their site is fully self-managed. Their leads are captured.

### Phase 2 — Operations (6–8 weeks)
The appraisal-firm-specific tools.
- Assignment Pipeline (full workflow)
- Document Hub + USPAP Workfile (5-year retention)
- Peer Review workflow
- Engagement Letter generator + templates
- Invoice generator + aging report
- Conflict-of-Interest Check

**This is where the real productivity gains kick in.**

### Phase 3 — Intelligence & Compliance (4–6 weeks)
- Comps Library (build & seed)
- Submarket Data Tracker
- Lead-to-Revenue Analytics
- CV Download Tracking
- License & CE Compliance tracker
- Quarterly Market Report builder

**This phase deepens the moat.** Once Phase 3 is in, switching costs are high.

> "Most clients land Phase 1 in their budget without much debate. Phase 2 is the one that genuinely changes how the firm operates day-to-day. Phase 3 is the one we tend to do six months later when the team is asking for it themselves."

---

## 11. Common Objections & Responses

### "We already use [QuickBooks / Outlook / Google Drive] for that."

> "You're right — and you'll keep using QuickBooks for accounting, your email for communication, your file system for archives. This isn't replacing those. It's the **layer that connects them** with structure built for an appraisal firm. QuickBooks doesn't know what an assignment is. Outlook doesn't know what USPAP is. Google Drive doesn't tell you which appraiser is overloaded this week. That's the gap."

### "This looks like a lot. We're not that big."

> "That's exactly why we phase it. Phase 1 alone is worth the conversation — your website fully self-managed, every lead captured. If we never built another phase, you'd still get more value than you pay for. Phase 2 and 3 happen on your timeline, when your team asks for them."

### "Can't we just use Salesforce / HubSpot?"

> "You could. Two issues. One — Salesforce doesn't know what a peer review is, what a USPAP workfile is, what a comp is. You'd spend the first six months customizing it, and even then it'll feel generic. Two — those tools start at ${'$'}75/user/month and go up fast. With 9 users, you're at ${'$'}8,000–12,000/year forever. We build something purpose-fit, you own it, no per-user fees."

### "What if we want to change something later?"

> "Everything is editable. Your team logs in, makes the change, done. The CMS sections we showed today — Hero, Stats, Services, Team — those are all live-editable. For deeper structural changes, we have an ongoing support agreement that covers tweaks. But honestly, 90% of changes you'll do yourselves through the panel."

### "How long until it's actually built?"

> "Phase 1 in 4–6 weeks. You'd be in the panel using it before the end of the next quarter. Phase 2 layered on top after that. We don't make you wait six months to see anything."

### "Is our data safe?"

> "Hosted on the same infrastructure your website is on now — Vercel, with daily backups, encrypted at rest, SOC 2 compliant. Documents are stored in encrypted cloud storage with access logging. We can show you the security architecture document separately if you want to dig in."

### "What if we already have a draft of an engagement letter we like?"

> "Send it to us. We'll convert it into a template inside the system. The generator just auto-fills your client and property details into your existing letter. You don't lose your branding or your legal language."

### "Who else uses something like this?"

> "Built specifically for The Benavente Group. We don't sell shrink-wrapped software. The reference points are firms in adjacent industries — law firms with case management software, medical practices with EMR systems. The principle is the same: an industry-specific tool beats a generic CRM every time."

### "Can my SEO person still use Sanity Studio for blogs?"

> "Yes. Either we keep Sanity Studio at `/studio` exactly as-is and just embed the blog management into the new admin too — your SEO person picks whichever interface they prefer — or we migrate fully into the new admin. Your call."

### "What happens if we cancel?"

> "Your data is yours. We'd export everything in standard formats — CSV for tabular data, PDFs for documents — and hand it over. No lock-in tricks."

---

## 12. The Close

Three closing options based on the room's energy:

### A. Direct Close (if they're nodding)
> "Fernando, what would it take to start with Phase 1? Let's get a kick-off date on the calendar."

### B. Soft Close (if they need to confer)
> "I'd like to send over a one-page proposal with the Phase 1 scope and investment by Friday. If it lines up, we can plan a kick-off in early May. Does Friday work for you to review?"

### C. Discovery Close (if they're hesitant)
> "Help me understand what you'd need to see to feel confident moving forward. Is it a smaller starting scope? A reference call with another client? A written guarantee on timeline? Whatever it is, let's talk through it."

**Don't leave the meeting without:**
1. A scheduled follow-up date (within 5 business days)
2. Their confirmation of who the decision-maker is (sometimes Fernando + a CFO/spouse)
3. Their permission to send a proposal

---

## 13. What NOT to Promise

Be honest. Don't oversell. Each of these is a "Phase 4 / future" item — never on the table for now:

- **No** real-time MLS / CoStar / Bureau of Conveyances data integration. Those APIs cost ${'$'}15k–30k/year just for the data.
- **No** auto-generated full appraisal reports (that's specialty software like ACI, TOTAL, Narrative1).
- **No** e-signature integration in Phase 1 (DocuSign in Phase 2 if requested, separate cost).
- **No** mobile app on day one (responsive web works on mobile; native app is a Phase 4 conversation).
- **No** SMS notifications in Phase 1 (email + in-app only; SMS in later phases).

If they ask for any of the above, frame it: *"That's a great Phase 4 enhancement once the core is in place."*

---

## 14. After the Meeting

**Day of:**
- Send a 2-line thank-you email + the link to `/admin` (with `1234`) so they can show their team.

**Day +1:**
- Send the proposal. One page. Phase 1 scope, deliverables, timeline, investment, two payment options.

**Day +3:**
- Light follow-up: *"Did you get a chance to review? Happy to walk your team through the demo as well — sometimes it lands better with the people who'll actually use it."*

**Day +5:**
- If no reply: *"Quick check — is the proposal something you want to move forward with, or did something else come up I can address?"*

**Day +10:**
- Final outreach: *"Closing out — want to make sure I'm not chasing if it's not the right fit. Let me know either way."*

Then move on. Pipeline discipline > one deal.

---

## 15. Reference: Demo Setup

| Item | Value |
|---|---|
| Demo URL | `http://localhost:3000/admin` (in dev) — production URL TBD |
| Demo password | `1234` |
| Logout | Bottom-left of sidebar |
| Live website | `http://localhost:3000/` |
| Existing Sanity Studio | `http://localhost:3000/studio` |

**Pre-flight checklist:**
- [ ] Sidebar shows all 18 sections (Dashboard through Settings & SEO)
- [ ] KPI numbers animate on Dashboard
- [ ] Workload Heatmap loads with team avatars
- [ ] Conflict Check responds when you type `Bishop`
- [ ] Assignment row click opens drawer with 4 tabs
- [ ] Comps Library shows 21+ entries with filters working
- [ ] No console errors
- [ ] Sound off, notifications off, screen at brightness max

---

## 16. The Mindset

You're not selling software. You're selling **time, peace of mind, and a competitive moat.**

- Time — every appraiser, analyst, and admin gets hours back each week.
- Peace of mind — USPAP compliance, license tracking, audit-ready workfiles, conflict checks.
- Moat — the comps library, the market data, the CRM history compound. Switching cost grows every month.

Every client question can be reframed back to one of those three. Practice that move.

Good luck. Make Fernando smile.

---

*Document version: 1.0 — for internal sales use only · The Benavente Group LLC engagement*
