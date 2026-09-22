// Complete sample data for Kellugs dashboard

export const DASH = {
  stats: [
    { ic: "shield", lbl: "Readiness index", val: "49%", chip: { t: "+5", c: "green" }, sub: "Target 70% in 12 months" },
    { ic: "naira", lbl: "Revenue MTD", val: "₦18.4m", chip: { t: "92%", c: "blue" }, sub: "of a ₦20m target" },
    { ic: "users", lbl: "Delegation", val: "38%", chip: { t: "-37", c: "pink" }, sub: "Closed without you · target 75%" },
    { ic: "check", lbl: "Improvements", val: "62%", chip: { t: "+12", c: "blue" }, sub: "4 of 8 items closed" },
  ],
  line: {
    points: [13.2, 14.1, 19.5, 17.8, 12.0, 15.8, 16.5, 15.9, 16.8, 17.4, 17.1, 18.4],
    months: ["Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26"],
    min: 11.3,
    max: 22.5,
    target: 20.0,
  },
  readinessBars: [
    { l: "Q3 25", v: 31 },
    { l: "Q4 25", v: 35 },
    { l: "Q1 26", v: 40 },
    { l: "Q2 26", v: 44 },
    { l: "Q3 26", v: 49 },
  ],
  scorecards: [
    {
      dept: "Sales",
      owner: "Amaka Bello",
      status: "On track",
      color: "green",
      metrics: [
        { l: "Revenue vs target", v: "92%", pct: 92, c: "green" },
        { l: "Lead-to-close", v: "27%", pct: 27, c: "green" },
        { l: "New customers", v: "11", pct: 70, c: "green" },
      ],
    },
    {
      dept: "Operations",
      owner: "Ifeanyi Nwosu",
      status: "Needs attention",
      color: "red",
      metrics: [
        { l: "Output vs plan", v: "88%", pct: 88, c: "amber" },
        { l: "Rework rate", v: "6.2%", pct: 60, c: "red" },
        { l: "On-time delivery", v: "94%", pct: 94, c: "green" },
      ],
    },
    {
      dept: "Admin",
      owner: "Tunde Salami",
      status: "Watch",
      color: "amber",
      metrics: [
        { l: "Reconciliation", v: "100%", pct: 100, c: "green" },
        { l: "Compliance closed", v: "80%", pct: 80, c: "amber" },
        { l: "Receivables ageing", v: "13d", pct: 35, c: "green" },
      ],
    },
    {
      dept: "Support",
      owner: "Ngozi Eze",
      status: "Needs attention",
      color: "red",
      metrics: [
        { l: "Satisfaction", v: "84%", pct: 84, c: "green" },
        { l: "Within SLA", v: "43%", pct: 43, c: "red" },
        { l: "Avg resolution", v: "3.4d", pct: 60, c: "red" },
      ],
    },
  ],
  tracker: [
    ["Publish the measurement sign-off gate to both branches", "Ifeanyi Nwosu", "2026-09-30", "In progress", "amber"],
    ["Confirm reorder thresholds with Operations", "Ifeanyi Nwosu", "2026-08-31", "Complete", "green"],
    ["One documented damaged-goods policy, applied to all", "Ngozi Eze", "2026-08-15", "Complete", "green"],
    ["Day-4 follow-up call on every delivery", "Ngozi Eze", "2026-10-15", "In progress", "amber"],
    ["Out-of-state delivery fee table from Logistics costs", "Amaka Bello", "2026-10-31", "Not started", "red"],
    ["Single lead record across Field, Digital, Showroom", "Amaka Bello", "2026-07-31", "Complete", "green"],
    ["General Manager role definition for Transition 2", "Kelechi Ugwu", "2026-12-31", "Not started", "red"],
    ["Complaint logged same day, every channel", "Ngozi Eze", "2026-07-15", "Complete", "green"],
  ],
  decisions: [
    ["Approve bulk import order — Turkish armoured doors", "Sales · Amaka Bello · ₦8.4m"],
    ["Sign off credit policy exception — Ade & Sons Ltd", "Admin · Tunde Salami · ₦640k"],
    ["Approve clearance pricing — slow-moving stock", "Inventory · Ifeanyi Nwosu · ₦9.78m"],
    ["Approve emergency CNC spare part purchase", "Production · Ifeanyi Nwosu · ₦340k"],
    ["Approve full refund — Mr. Balogun damaged delivery", "Support · Ngozi Eze · ₦300k"],
    ["Approve 10% discount — Ade & Sons, 6-unit order", "Sales · Amaka Bello · ₦270k"],
  ],
  alerts: [
    ["INVENTORY", "4FT 4 Chrome Steel Door [1200mm by 2100mm]", "Out of stock · Guangzhou Yidu — China · 60 day lead time · escalates to the CEO", "cube"],
    ["INVENTORY", "3FT Glossy Door [900mm by 2100mm]", "Out of stock · Anadolu Kapı — Turkey · 45 day lead time · escalates to the CEO", "cube"],
    ["INVENTORY", "3FT German Design Steel Door [900mm by 2100mm]", "Out of stock · Hörmann Trade — Germany · 40 day lead time · escalates to the CEO", "cube"],
    ["INVENTORY", "4FT Copper Steel Door [1200mm by 2100mm]", "Out of stock · Hörmann Trade — Germany · 40 day lead time · escalates to the CEO", "cube"],
    ["PRODUCTION", "CNC router down 3 days", "Spindle bearing — spare part on order", "gear"],
    ["SUPPORT", "Mr. Balogun — Damaged door on delivery", "64h against a 48h target", "alert"],
  ],
};

export const SALES = {
  stats: [
    { ic: "naira", lbl: "Revenue MTD", val: "₦18.4m", chip: { t: "92%", c: "blue" }, sub: "of a ₦20m target" },
    { ic: "trend", lbl: "Open pipeline", val: "₦30.7m", sub: "8 leads not yet won or lost" },
    { ic: "gear", lbl: "Lead-to-close", val: "27%", chip: { t: "-3 pts", c: "pink" }, sub: "11 won of 41 raised · target 30%" },
    { ic: "naira", lbl: "Cost per lead", val: "₦54.7k", sub: "₦820k marketing spend this period" },
  ],
  pipeline: [
    { l: "New (2)", v: 10.5 },
    { l: "Quoted (3)", v: 11.2 },
    { l: "Negotiation (3)", v: 9.1 },
  ],
  lost: [
    ["SHOWROOM", "Mrs. Adebayo", "Delivery fee quoted late · ₦900k · Mirror glass door"],
    ["INSTITUTIONAL", "Sunrise Schools", "Price — no follow-up call · ₦3.06m · Flush doors x18"],
  ],
  channels: [
    ["Instagram", "₦30k", "6 leads · ₦180k spent"],
    ["Showroom & signage", "₦60k", "4 leads · ₦240k spent"],
    ["Referral scheme", "₦30k", "3 leads · ₦90k spent"],
    ["Field / site reps", "₦155k", "2 leads · ₦310k spent"],
  ],
  leads: [
    ["Renaissance Homes", "Security doors x12", "Institutional", "Ikeja", "₦9.6m", "New", "blue", "Amaka Bello", "2026-09-05"],
    ["Bakehouse Ltd", "4FT security door", "Digital", "Lekki", "₦850k", "New", "blue", "Amaka Bello", "2026-09-02"],
    ["Mr. Danjuma", "4FT double wooden door", "Referral", "Ikeja", "₦1.2m", "Negotiation", "amber", "Amaka Bello", "2026-09-01"],
    ["Grandis Estate", "Wardrobes, custom", "Showroom", "Lekki", "₦1.1m", "Negotiation", "amber", "Amaka Bello", "2026-08-30"],
    ["Ade & Sons Ltd", "3FT Turkish doors x6", "Referral", "Ikeja", "₦2.7m", "Quoted", "amber", "Amaka Bello", "2026-08-28"],
    ["Adeyemi Residence", "3 openings, measured on site", "Field", "Ikeja", "₦1.45m", "Won", "green", "Ifeanyi Nwosu", "2026-08-24"],
    ["Mrs. Okafor", "Internal doors x4", "Referral", "Ikeja", "₦620k", "Won", "green", "Amaka Bello", "2026-08-19"],
    ["Lekki Gardens Phase 2", "Internal doors x40", "Institutional", "Lekki", "₦6.8m", "Negotiation", "amber", "Amaka Bello", "2026-08-14"],
    ["Mr. Balogun", "Emperor wooden door x2", "Digital", "Lekki", "₦320k", "Won", "green", "Amaka Bello", "2026-08-11"],
    ["Chukwu Properties", "Kitchen cabinets, 3 units", "Institutional", "Ikeja", "₦4.2m", "Quoted", "amber", "Amaka Bello", "2026-08-09"],
    ["Mrs. Adebayo", "Mirror glass door", "Showroom", "Lekki", "₦900k", "Lost", "red", "Amaka Bello", "2026-08-06"],
    ["Hilltop Contractors", "HDF doors x25", "Field", "Ikeja", "₦4.25m", "Quoted", "amber", "Amaka Bello", "2026-08-04"],
  ],
};

export const INV = {
  stats: [
    { ic: "naira", lbl: "Stock at cost", val: "₦93.1m", sub: "4.7 months of cover at a ₦20m month" },
    { ic: "alert", lbl: "At or below reorder", val: "28", chip: { t: "9 imported", c: "pink" }, sub: "Imported items escalate to the CEO" },
    { ic: "clock", lbl: "Untouched 90+ days", val: "9", sub: "₦7.41m of capital asleep on the shelf" },
    { ic: "box", lbl: "Out of stock", val: "8", sub: "Still listed for sale on the site" },
  ],
  reorder: [
    ["IMPORTED", "4FT 4 Chrome Steel Door [1200mm by 2100mm]", "Out of stock · Guangzhou Yidu — China · 60 day lead time · escalates to the CEO"],
    ["IMPORTED", "3FT Glossy Door [900mm by 2100mm]", "Out of stock · Anadolu Kapı — Turkey · 45 day lead time · escalates to the CEO"],
    ["IMPORTED", "3FT German Design Steel Door [900mm by 2100mm]", "Out of stock · Hörmann Trade — Germany · 40 day lead time · escalates to the CEO"],
    ["IMPORTED", "4FT Copper Steel Door [1200mm by 2100mm]", "Out of stock · Hörmann Trade — Germany · 40 day lead time · escalates to the CEO"],
    ["FINISHED GOOD", "Glass wooden door", "Out of stock · Kellugs Workshop — Ikeja · 7 day lead time"],
    ["FINISHED GOOD", "Laminant 1 Mtr", "Out of stock · Kellugs Workshop — Ikeja · 7 day lead time"],
    ["FINISHED GOOD", "Round Glass Design Door", "Out of stock · Kellugs Workshop — Ikeja · 7 day lead time"],
    ["FINISHED GOOD", "Turkish wooden glass door", "Out of stock · Kellugs Workshop — Ikeja · 7 day lead time"],
  ],
  classes: [
    { l: "Imported", v: 25.2 },
    { l: "Finished", v: 45.6 },
    { l: "Fitting", v: 13.2 },
    { l: "Raw", v: 8.2 },
    { l: "Consumable", v: 0.9 },
  ],
  exposure: [
    ["Imported SKUs", "27"],
    ["Below reorder", "9"],
    ["Longest lead time", "60 days"],
    ["Capital held", "₦25.2m"],
    ["China", "3 SKUs"],
    ["Germany", "4 SKUs"],
    ["Israel", "7 SKUs"],
    ["Origin not stated", "6 SKUs"],
    ["Turkey", "7 SKUs"],
  ],
  table: [
    ["2 Panel Solid Wooden Door", "KH-0048", "Finished good", 17, 6, "20d", "7d", "24d", "₦1.78m", "OK", "green"],
    ["3FT Black Glass Extra High Door", "KH-0101", "Imported", 3, 2, "68d", "45d", "51d", "₦1.4m", "OK", "green"],
    ["3FT Brown and Black Steel Door", "KH-0250", "Finished good", 1, 3, "2d", "7d", "10d", "₦186k", "Below reorder", "amber"],
    ["3FT Brown Israeli Door", "KH-0099", "Imported", 5, 5, "50d", "50d", "44d", "₦550k", "Below reorder", "amber"],
    ["3FT Extra High Wooden Door", "KH-0202", "Finished good", 9, 3, "21d", "7d", "57d", "₦2.79m", "OK", "green"],
    ["3FT German Design Door", "KH-0087", "Imported", 7, 3, "93d", "40d", "150d", "₦1.04m", "Slow moving", "blue"],
    ["3FT German Design Steel Door", "KH-0093", "Imported", 0, 2, "0d", "40d", "28d", "₦0", "Out of stock", "red"],
    ["3FT Glossy Door", "KH-0179", "Imported", 0, 3, "0d", "45d", "63d", "₦0", "Out of stock", "red"],
    ["3FT Gold and Gray Steel Door", "KH-0261", "Finished good", 8, 3, "19d", "7d", "13d", "₦1.49m", "OK", "green"],
    ["3FT Grey Embossed Handle Door", "KH-0247", "Finished good", 4, 2, "14d", "7d", "50d", "₦744k", "OK", "green"],
    ["4FT China Steel Door", "KH-0301", "Imported", 1, 3, "60d", "60d", "9d", "₦412k", "Below reorder", "amber"],
    ["4FT Copper Steel Door", "KH-0090", "Imported", 0, 2, "0d", "40d", "40d", "₦0", "Out of stock", "red"],
    ["4FT Single 8 Chromes Side Glass Door", "KH-0031", "Imported", 6, 2, "80d", "60d", "35d", "₦7.5m", "OK", "green"],
    ["5FT Round Top Wooden Door", "KH-0311", "Finished good", 11, 4, "12d", "7d", "19d", "₦990k", "OK", "green"],
  ],
};

export const LOG = {
  stats: [
    { ic: "check", lbl: "On-time delivery", val: "94%", chip: { t: "-1", c: "pink" }, sub: "Target 95%" },
    { ic: "truck", lbl: "In transit & scheduled", val: "3", sub: "1 running late" },
    { ic: "shield", lbl: "Proof of delivery", val: "100%", sub: "Captured on delivered orders" },
    { ic: "naira", lbl: "Out-of-state fees", val: "₦243k", sub: "Sales quotes from this, not guesswork" },
  ],
  deliveries: [
    ["Adeyemi Residence — 3 openings", "DLV-454 · Magodo, Lagos", "2026-09-13", "LAG-207-KJ", "Emeka O.", "Scheduled", "blue", "Awaiting handover", "—", "notyet"],
    ["Chukwu Properties — cabinets x3", "DLV-455 · Ibadan, Oyo", "2026-09-08", "Hired 3-ton", "Contract", "Dispatched", "blue", "Awaiting handover", "₦145k", "notyet"],
    ["Ozumba Residence — sink & fittings", "DLV-456 · Victoria Island, Lagos", "2026-09-07", "LAG-441-XA", "Sunday A.", "Delivered", "green", "Captured", "—", "delivered"],
    ["Bakehouse Ltd — security door", "DLV-452 · Lekki, Lagos", "2026-09-06", "LAG-441-XA", "Sunday A.", "Scheduled", "blue", "Awaiting handover", "—", "notyet"],
    ["Mrs. Okafor — internal doors x4", "DLV-451 · Ikeja, Lagos", "2026-09-04", "LAG-441-XA", "Sunday A.", "Delivered", "green", "Captured", "—", "delivered"],
    ["Mr. Balogun — Emperor doors x2", "DLV-453 · Ajah, Lagos", "2026-09-02", "LAG-207-KJ", "Emeka O.", "Delivered", "green", "Captured, damage noted at handover", "—", "delivered"],
    ["Sunrise Schools — sample doors", "DLV-450 · Abeokuta, Ogun", "2026-08-29", "Hired 3-ton", "Contract, vehicle breakdown en route", "Delayed", "red", "Awaiting handover", "₦98k", "delayed"],
  ],
};

export const ADMIN = {
  stats: [
    { ic: "check", lbl: "Reconciliation", val: "Up to date", sub: "Last run 2026-09-09" },
    { ic: "naira", lbl: "Outstanding receivables", val: "₦1.4m", chip: { t: "2 overdue", c: "pink" }, sub: "across 4 customers" },
    { ic: "shield", lbl: "Compliance closed", val: "4/5", sub: "Fire, CCTV, first-aid, exit signage" },
    { ic: "users", lbl: "Open HR items", val: "2", sub: "Hiring, onboarding and staff records" },
  ],
  receivables: [
    ["Chukwu Properties", "₦210k", "2026-08-28", "13 days overdue", "red"],
    ["Lekki Gardens Phase 2", "₦420k", "2026-09-03", "7 days overdue", "amber"],
    ["Ade & Sons Ltd", "₦640k", "2026-09-14", "Within terms", "green"],
    ["Hilltop Contractors", "₦130k", "2026-09-20", "Within terms", "green"],
  ],
  facilities: [
    ["LEKKI", "Fire alarm servicing — Lekki branch", "Overdue", "red", "Due 2026-09-12"],
    ["IKEJA", "CCTV coverage — workshop yard", "Closed", "green", "Due 2026-08-30"],
    ["IKEJA", "First-aid stock replenishment", "Closed", "green", "Due 2026-08-22"],
    ["LEKKI", "Fire extinguisher recertification", "Closed", "green", "Due 2026-08-18"],
    ["IKEJA", "Emergency exit signage", "Closed", "green", "Due 2026-07-30"],
  ],
};
