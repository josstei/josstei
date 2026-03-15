# Fathom Color Scheme — GitHub Profile README

## Overview

Update the GitHub profile README to use the Fathom color palette (from josstei's custom Hyprland/Neovim theme) instead of the current Nami-inspired teal/coral scheme. All visual elements must look intentional on both GitHub dark and light themes.

## Approach

**Approach B: Selective Theme Adaptation**

- Header/footer banners: `<picture>` tags with per-theme gradients
- Star badges (×13): `<picture>` tags with dark/light badge variants
- Social badges (×3): Single set with brand logo colors — dark pill aesthetic works on both themes
- Streak stats card: Single URL with transparent background — Fathom accent colors have sufficient contrast on both themes

## Fathom Palette Reference

| Role | Hex | Name |
|------|-----|------|
| Deep Background | `#050A14` | Abyss |
| Mid Background / Surface | `#0E1830` | Deep Navy |
| Primary Foreground | `#C8C8E0` | Lavender |
| Dim Foreground | `#A8A8C8` | Mist |
| Muted | `#4A4A70` | Twilight |
| Primary Accent | `#5E81F4` | Blue |
| Secondary Accent | `#7C3AED` | Purple |
| Tertiary Accent | `#56B6C2` | Cyan |

## Element-by-Element Spec

### 1. Header Banner (capsule-render)

Uses `<picture>` + `<source media="(prefers-color-scheme: ...)">` to serve different capsule-render URLs.

**Dark theme:**
- Gradient: `0:050A14,50:5E81F4,100:7C3AED`
- Font color: `C8C8E0`
- Desc color: `A8A8C8`

**Light theme:**
- Gradient: `0:ffffff,50:5E81F4,100:7C3AED`
- Font color: `050A14`
- Desc color: `0E1830`

Both: type=waving, height=200, text="I'm Josstei", desc="@josstei_dev", fontSize=50, fontAlignY=35, descSize=16, descAlignY=55, animation=fadeIn.

### 2. Footer Banner (capsule-render)

Same gradient as header but with `section=footer&reversal=true`. Same `<picture>` tag approach.

**Dark theme:**
- Gradient: `0:050A14,50:5E81F4,100:7C3AED`

**Light theme:**
- Gradient: `0:ffffff,50:5E81F4,100:7C3AED`

Both: type=waving, height=120.

### 3. Tech Stack Icons

No change needed — skillicons.dev with `theme=dark` works fine on both GitHub themes as the icons have their own backgrounds.

### 4. Social Badges (×3)

Single set of badges, no `<picture>` tags. Dark pill aesthetic.

| Badge | labelColor | color | logoColor |
|-------|-----------|-------|-----------|
| X/Twitter | `050A14` | `0E1830` | `C8C8E0` |
| Reddit | `050A14` | `0E1830` | `ff4500` (brand orange) |
| Ko-fi | `050A14` | `0E1830` | `ff5e5b` (brand color) |

### 5. Star Badges (×13)

Each star badge wrapped in a `<picture>` tag.

**Dark theme:**
- `labelColor=050A14`, `color=0E1830`

**Light theme:**
- `labelColor=e8eaf0`, `color=f0f2f8`

Style: `flat-square` (unchanged).

Repos requiring star badges:
1. maestro-gemini
2. argus-claude
3. prismgb-app
4. nami.nvim
5. fathom.nvim
6. voidpulse.nvim
7. whisk.nvim
8. quill.nvim
9. vim-easyops

### 6. Streak Stats Card

Single URL with transparent background. No `<picture>` tag needed.

| Parameter | Value |
|-----------|-------|
| background | `00000000` (transparent) |
| border | `0E1830` |
| stroke | `0E1830` |
| ring | `5E81F4` |
| fire | `5E81F4` |
| currStreakNum | `56B6C2` |
| sideNums | `5E81F4` |
| currStreakLabel | `C8C8E0` |
| sideLabels | `A8A8C8` |
| dates | `4A4A70` |
| hide_border | `false` |

## Implementation Notes

- The `<picture>` tag approach uses GitHub's native support for `prefers-color-scheme` media queries in markdown
- Pattern for each theme-adaptive element (GitHub's canonical single-`<source>` pattern):
  ```html
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="DARK_URL" />
    <img src="LIGHT_URL" alt="..." />
  </picture>
  ```
- The `<img>` fallback uses the light variant — more readable in non-supporting contexts (email clients, RSS readers)
- Total `<picture>` blocks: 2 (header + footer) + 9 (star badges) = 11
- Social badges remain simple `<img>` tags — dark pills read well on both backgrounds
- Streak stats remain a single `<img>` tag — accent colors have enough saturation for both themes
- Accepted tradeoff: streak label colors (`C8C8E0`, `A8A8C8`) are light-valued and will have reduced contrast on GitHub's white background. The dark theme appearance is prioritized; on light theme the numbers and ring (high-saturation blues/cyan) remain clearly readable while labels are de-emphasized
- All text content (markdown headings, paragraphs, descriptions) is unstyled and inherits GitHub's theme natively — no changes needed
