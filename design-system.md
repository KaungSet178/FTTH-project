# Design System

## Tech Stack

| Technology | Version |
|---|---|
| React | ^19.2.6 |
| Framer Motion | ^12.40.0 |
| Tailwind CSS | ^4.3.0 |
| Lucide React | ^1.16.0 |

---

## Colors

### Theme Variables (`src/index.css` via `@theme`)

| Variable | Hex | Usage |
|---|---|---|
| `--color-primary` | `#2563eb` | Brand blue |
| `--color-primary-dark` | `#1d4ed8` | Primary hover/active |
| `--color-primary-light` | `#dbeafe` | Primary background tint |
| `--color-secondary` | `#0ea5e9` | Sky blue accent |
| `--color-secondary-light` | `#e0f2fe` | Secondary background tint |
| `--color-warning` | `#f59e0b` | Amber warning |
| `--color-warning-light` | `#fef3c7` | Warning background tint |
| `--color-success` | `#10b981` | Emerald green |
| `--color-success-light` | `#d1fae5` | Success background tint |
| `--color-danger` | `#ef4444` | Red danger |
| `--color-danger-light` | `#fee2e2` | Danger background tint |
| `--color-surface` | `#f8fafc` | Page background |
| `--color-muted` | `#64748b` | Muted text |

### Body Text

| Variable | Hex | Usage |
|---|---|---|
| `body { color }` | `#0f172a` (slate-900) | Primary body text |

### Shadows (`index.css`)

| Variable | Value |
|---|---|
| `--shadow-card` | `0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.06)` |
| `--shadow-card-hover` | `0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04)` |

### Badge / Status Colors

| Variant | Classes | Visual |
|---|---|---|
| open / pending | `bg-warning-light text-warning` | Amber |
| resolved / paid / online / strong | `bg-success-light text-success` | Green |
| closed | `bg-gray-100 text-muted` | Gray |
| overdue / offline / weak | `bg-danger-light text-danger` | Red |
| medium | `bg-warning-light text-warning` | Amber |

### Promotion Banner Gradients

| Variant | Gradient |
|---|---|
| primary | `from-primary to-secondary` (blue → sky) |
| secondary | `from-secondary to-cyan-400` (sky → cyan) |
| success | `from-success to-emerald-400` (green → emerald) |

### Common Inline Tailwind Grays

- `text-gray-900` — headings
- `text-gray-700` — labels
- `text-gray-500` — secondary text / icons
- `text-gray-400` — inactive nav icons
- `bg-gray-100`, `bg-gray-50`, `bg-gray-200` — skeletons, empty states, disabled inputs
- `border-gray-200`, `border-gray-100` — borders

### Category Icon Colors

| Category | Classes |
|---|---|
| "Report Issue" (generic) | `bg-red-50 text-red-500` |
| "No Internet" | `bg-red-50 text-red-500` |
| "Device Offline" | `bg-orange-50 text-orange-500` |

---

## Animations (Framer Motion)

### Page Transitions

| Component | initial | animate | exit | transition |
|---|---|---|---|---|
| Loading states | `{ opacity: 0 }` | `{ opacity: 1 }` | `{ opacity: 0 }` | `{ duration: 0.2 }` |
| Content pages | `{ opacity: 0 }` | `{ opacity: 1 }` | — | `{ duration: 0.3 }` |

### Entry Animations (staggered)

| Component | initial | animate | transition |
|---|---|---|---|
| Device Card | `{ opacity: 0, y: 20 }` | `{ opacity: 1, y: 0 }` | `{ delay, duration: 0.4 }` |
| Quick Stat Card | `{ opacity: 0, y: 16 }` | `{ opacity: 1, y: 0 }` | `{ delay, duration: 0.4 }` |
| Complaint Card | `{ opacity: 0, y: 16 }` | `{ opacity: 1, y: 0 }` | `{ delay: index*0.08, duration: 0.35 }` |
| Promotion Card | `{ opacity: 0, y: 20 }` | `{ opacity: 1, y: 0 }` | `{ delay: index*0.1, duration: 0.4 }` |
| Empty State | `{ opacity: 0, y: 20 }` | `{ opacity: 1, y: 0 }` | (default) |

### Promotion Banner (slide)

| initial | animate | exit | transition |
|---|---|---|---|
| `{ opacity: 0, x: 40 }` | `{ opacity: 1, x: 0 }` | `{ opacity: 0, x: -40 }` | `{ duration: 0.3 }` |

### Modal (Ticket Modal)

| Element | initial | animate | exit | transition |
|---|---|---|---|---|
| Overlay | `{ opacity: 0 }` | `{ opacity: 1 }` | `{ opacity: 0 }` | (default) |
| Dialog | `{ scale: 0.9, opacity: 0 }` | `{ scale: 1, opacity: 1 }` | `{ scale: 0.9, opacity: 0 }` | `{ type: "spring", damping: 25, stiffness: 300 }` |
| Submitted state | `{ scale: 0.9, opacity: 0 }` | `{ scale: 1, opacity: 1 }` | — | (default) |
| "Other" category expand | `{ height: 0, opacity: 0 }` | `{ height: "auto", opacity: 1 }` | — | `{ duration: 0.2 }` |

### Hover & Tap

| Component | whileHover | whileTap |
|---|---|---|
| Device Card | `{ y: -3 }` | — |
| Promotion Card | `{ y: -2 }` | — |
| Card (UI) | `{ y: -2 }` (conditional) | — |
| Bottom Nav item | — | `{ scale: 0.92 }` |

### Skeleton Pulse

| animate | transition |
|---|---|
| `{ opacity: [0.5, 1, 0.5] }` | `{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }` |

---

## CSS Transitions (Tailwind utility classes)

| Class | Duration | Applied to |
|---|---|---|
| `transition-colors` | `duration-200` | Device card links, promo banner dots, promo card "learn more", top-nav logout, form inputs (focus) |
| `transition-colors` | `duration-150` | Bottom nav icons & labels |
| `transition-shadow` | `duration-200` | Device card (hover), Card UI (hover) |
| `transition-all` | `duration-200` | Device card "Report Issue" button |
| `transition-all` | `duration-300` | Promo banner pagination dots |
| `active:scale-[0.98]` | instant | Modal submit button |
