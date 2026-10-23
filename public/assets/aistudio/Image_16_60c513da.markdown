---
name: Estudaí Clarity Learning
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#006058'
  on-tertiary: '#ffffff'
  tertiary-container: '#007b71'
  on-tertiary-container: '#b3fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

### Brand Personality & Core Audience
The design system supports middle and high school students facing academic hurdles, self-directed study, or exam preparation. The personality is encouraging, structured, transparent, and approachable—deliberately steering clear of patronizing infantilization while avoiding intimidating collegiate severity. It feels like an attentive, organized tutor who transforms cognitive overload into digestible, step-by-step progress.

### Visual Style
A tailored hybrid of **Modern Contemporary Soft UI** and **Functional Editorial Clarity**:
- **Warm Airiness:** Generous white space and crisp white cards anchored against muted neutral canvases keep cognitive fatigue low during extended study sessions.
- **Supportive Tactility:** Subtly elevated cards, refined outline boundaries, and pill/rounded action nodes offer a tangible, responsive interface that rewards engagement.
- **Contextual Subject Tinting:** Deliberate, color-coded functional domains (Emerald for Portuguese, Indigo/Violet for Mathematics) provide immediate spatial orientation without visually clashing with primary UI flows.
- **Constructive Validation:** Feedback avoids harsh punishment cues, utilizing warm tones and clear micro-interactions to foster resilience and motivation.

## Colors

### Color Roles & Semantics
- **Brand Primary (`#2563EB` / Active: `#1D4ED8` / Surface-tint: `#EFF6FF`):** Represents structure, focus, and momentum. Used for primary calls-to-action, navigation selection, and active progress trackers.
- **Brand Accent (`#F59E0B` / Deep: `#D97706` / Surface-tint: `#FEF3C7`):** Represents encouragement, streaks, bookmarks, and celebration milestones.
- **Disciplinary Accents:**
  - *Língua Portuguesa (`#0D9488` / Text: `#115E59` / Tint: `#F0FDFA` / Border: `#CCFBF1`):* Calming emerald/teal tone signaling textual comprehension, reading ease, and humanities.
  - *Matemática (`#4F46E5` / Text: `#3730A3` / Tint: `#EEF2FF` / Border: `#E0E7FF`):* Analytical indigo/violet tone signaling logical steps, calculation, and stem disciplines.
- **Feedback & State Palettes:**
  - *Concluído / Sucesso:* `#16A34A` (Background: `#DCFCE7`, Border: `#86EFAC`, Text: `#14532D`)
  - *Em Andamento / Atenção:* `#CA8A04` (Background: `#FEF9C3`, Border: `#FDE047`, Text: `#713F12`)
  - *Alerta / Erro Construtivo:* `#DC2626` (Background: `#FEE2E2`, Border: `#FCA5A5`, Text: `#7F1D1D`)
- **Neutrals & Surfaces:**
  - Canvas Base: `#F8FAFC`
  - Sub-Canvas / Wells: `#F1F5F9`
  - Pure Card Surface: `#FFFFFF`
  - Subtle Borders: `#E2E8F0`
  - Strong Borders: `#CBD5E1`
  - Text Primary: `#0F172A`
  - Text Secondary: `#475569`
  - Text Muted: `#94A3B8`

## Typography

### Structural Decisions
- **Selected Typeface:** `Plus Jakarta Sans` is utilized across display, body, and label tiers. Its contemporary geometry offers rounded terminals that feel inviting and human, while wide aperture shapes maintain exceptional legibility during multi-paragraph comprehension exercises and mathematical explanations.
- **Reading Comfort:** Body copy leverages comfortable line-height ratios (~1.5 to ~1.55) to support adolescent reading stamina and prevent fatigue.
- **Hierarchy Enforcement:** Section titles consistently pair `FontWeight: 700` with muted contextual tags using `label-sm` in all-caps tracking, organizing modules into intuitive bite-sized pieces.

## Layout & Spacing

### Grid Philosophy
The layout relies on a structured, fluid-responsive 12-column grid system centered inside a max-width container of `1240px` for desktop and `768px` for tablet:
- **Desktop (1024px+):** 12 columns, `1.5rem` (`24px`) gutters, `2rem` (`32px`) canvas margins. Sidebar pinned or collapsed navigation with a centralized primary content flow.
- **Tablet (640px - 1023px):** 8 columns, `1rem` (`16px`) gutters, `1.5rem` (`24px`) margins. Sidebar transitions into an off-canvas drawer or top tab array.
- **Mobile (<640px):** 4 columns, `1rem` (`16px`) gutters, `1rem` (`16px`) horizontal margins. Exercises reflow into single-column full-width interactive cards.

### Spacing Cadence
Component internal layouts follow strict multiples of 4px/8px:
- Tight inline groupings (icon + text, badge padding): `space-xs` (4px) to `space-sm` (8px).
- Input interior padding and card body gaps: `space-md` (16px).
- Module divisions and answer choice lists: `space-lg` (24px).
- Major topic section gaps: `space-xl` (40px).

## Elevation & Depth

### Ambient Soft Elevation Architecture
This design system avoids harsh dropshadows, dark overlays, or exaggerated skeuomorphism, relying instead on high-diffusion, color-tinted ambient shadows paired with soft structural borders (`#E2E8F0`).

- **Base Layer (Flat):** Interactive items at rest (cards, input wells) sit flat on the `#F8FAFC` background with a `#FFFFFF` fill and a single `1px solid #E2E8F0` border.
- **Hover / Interactive (`shadow-sm`):** `0 4px 12px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)`. Used when interactive lesson cards or actionable modules are focused.
- **Floating Controls (`shadow-md`):** `0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)`. Applied to sticky completion headers, bottom exercise bars, and popover tooltips.
- **Modal Modifiers:** Overlays use a tranquil backdrop blur (`backdrop-filter: blur(6px)`) over a `#0F172A` tint at 30% opacity to preserve calm spatial grounding during pauses or summary screens.

## Shapes

### Corner Curvature Scale
A roundedness factor of `2` provides an approachable, ergonomic aesthetic:
- **Micro elements (`rounded-sm` / 6px):** Badges, indicator dots, inline tags.
- **Standard UI elements (`rounded-md` / 8px):** Form input fields, dropdown trigger buttons, standard inline controls.
- **Interactive containers & Cards (`rounded-lg` / 16px):** Study cards, quiz choice wrappers, module banners.
- **Hero units & Modals (`rounded-xl` / 24px):** Major summary containers, diagnostic test summaries.
- **Full Radius (`rounded-full` / 9999px):** Status badges, pill buttons, avatar frames, and linear progress track ends.

## Components

### Buttons
- **Primary:** Solid `#2563EB` background with white text, `rounded-xl` (12px to 16px height-dependent), bold `label-lg` typography, and vertical/horizontal padding (`12px 24px`). Hover state shifts to `#1D4ED8` with a gentle `translateY(-1px)` and `shadow-sm`. Active state presses down (`translateY(0)`).
- **Secondary / Ghost:** White background with `#E2E8F0` border, `#0F172A` text. Hover transitions to `#F1F5F9`.
- **Accent (Encouragement):** Solid `#F59E0B` background with `#FFFFFF` text, reserved for "Começar Agora", streaks, and reward collection.

### Badges & Status Indicators
Rendered with `rounded-full`, `label-sm`, padding `4px 12px`, and border `1px solid`:
- **Não iniciado:** Background `#F1F5F9`, Border `#CBD5E1`, Text `#475569`.
- **Em andamento:** Background `#FEF9C3`, Border `#FDE047`, Text `#854D0E`. Includes a small pulsing indicator dot.
- **Concluído:** Background `#DCFCE7`, Border `#86EFAC`, Text `#166534`. Accompanied by a mini checkmark icon.

### Multiple Choice Options (Quiz / Exercises)
Constructed as distinct row cards with smooth `transition: all 0.15s ease-in-out`:
- **Default:** Background `#FFFFFF`, border `2px solid #E2E8F0`, label index pill in `#F1F5F9` text `#475569`.
- **Hover:** Border `2px solid #93C5FD`, background `#F8FAFC`.
- **Selected (Unconfirmed):** Border `2px solid #2563EB`, background `#EFF6FF`, indicator pill solid `#2563EB` with white letter.
- **Correct State:** Border `2px solid #16A34A`, background `#F0FDF4`, indicator pill solid `#16A34A` with white checkmark. Accompanied by a supportive text reveal below the card.
- **Incorrect State:** Border `2px solid #DC2626`, background `#FEF2F2`, indicator pill solid `#DC2626` with white cross. Displays encouraging remediation guidance without harsh styling.

### Linear Progress Bars
- Track height: `8px` (compact) or `12px` (hero/unit level) with `rounded-full` geometry.
- Base trough: `#E2E8F0`.
- Fill indicator: Smooth animated transitions (`transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1)`) using `#2563EB` for general course tracking, `#0D9488` for Portuguese, and `#4F46E5` for Math. Completed bars trigger an accent celebratory pulse (`#F59E0B`).

### Discipline Cards
- Surface: `#FFFFFF` card with `rounded-lg` (16px), bordered in `#E2E8F0`.
- Header: Subtle soft badge indicating subject (e.g., Portuguese displays emerald background `#F0FDFA` with `#0D9488` text).
- Elevation: Transitions from flat with subtle border to `shadow-sm` on pointer hover, raising 2px to signal affordance.

### Input Fields
- Height: `48px`, `rounded-md` (8px), background `#FFFFFF`, border `1.5px solid #CBD5E1`.
- Focus ring: `2px solid #2563EB` with `0 0 0 3px rgba(37, 99, 235, 0.15)` offset halo.
- Placeholder: `#94A3B8`, body-md scale.

### Flashcard & Step Containers
- Dual-sided or stepped containers utilizing a clean white card layer with a dedicated bottom step indicator (e.g., "Passo 2 de 5") aligned with breadcrumb dots, keeping student orientation persistent throughout complex study material.