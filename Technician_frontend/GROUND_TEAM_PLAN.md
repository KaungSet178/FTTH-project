# Ground Team Frontend — Migration Plan

## Objective

Rewrite the existing Ground team HTML/CSS into a React + Vite project following the `user_frontend.md` design system (Tailwind CSS v4, Framer Motion animations, Lucide icons).

## Steps

### 1. Analyze Provided Code
- Review the HTML structure and CSS classes
- Identify all components: layout, cards, tables, forms, modals, navigation, etc.

### 2. Component Breakdown
Map HTML sections into React components:

| Component | Description |
|---|---|
| `Layout` | App shell with top nav / sidebar |
| `Header` / `Navbar` | Navigation bar with branding, links |
| `StatCard` | Quick stat display (counts, summaries) |
| `DataTable` | Table for ground team data |
| `TicketCard` / `ComplaintCard` | Individual issue/ticket display |
| `StatusBadge` | Colored badge for status (open, resolved, etc.) |
| `Modal` | Reusable modal dialog with Framer Motion spring animation |
| `Skeleton` | Loading skeleton with pulse animation |

### 3. Apply Design System
- Replace all hardcoded colors with Tailwind theme tokens (`bg-primary`, `text-muted`, etc.)
- Replace inline styles with Tailwind utility classes
- Map statuses to badge colors per `user_frontend.md` spec

### 4. Add Animations (Framer Motion)
- **Page transitions**: `opacity` fade on mount
- **Staggered entries**: cards, stats, list items with `opacity + y` offset and index-based delay
- **Skeleton pulse**: `opacity` looping animation
- **Modal**: overlay fade + dialog spring (`scale: 0.9 → 1`, `damping: 25`, `stiffness: 300`)
- **Hover effects**: `whileHover={{ y: -2 }}` on cards, `whileTap={{ scale: 0.92 }}` on nav items
- **Promotion banner**: slide in/out (`x: 40 → 0`, `x: 0 → -40`)

### 5. CSS Transitions
- Replace with Tailwind duration classes:
  - `transition-colors duration-200` — links, inputs, hover states
  - `transition-shadow duration-200` — card hover
  - `transition-all duration-200` — buttons
  - `active:scale-[0.98]` — submit button press

### 6. Verify
- `npm run build` — production build succeeds
- `npm run dev` — dev server starts without errors
