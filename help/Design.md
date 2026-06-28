---
version: 1.0.0
name: Level Up Coaching
description: A sophisticated visual framework for high-conversion personal coaching and executive mentorship landing pages.
colors:
  cream: "#fdfbf7"
  tan: "#e8decc"
  dark: "#121212"
  dark-gray: "#1a1a1a"
  badge-bg: "#2a332d"
  white: "#ffffff"
  gray-200: "#e5e7eb"
  gray-400: "#9ca3af"
  gray-500: "#6b7280"
  gray-800: "#1f2937"
typography:
  sans:
    family: "Inter, system-ui, sans-serif"
    weights: [400, 500, 600]
  serif:
    family: "Playfair Display, Georgia, serif"
    weights: [400]
  display:
    size: "88px"
    lineHeight: "1.05"
    letterSpacing: "-0.02em"
  heading:
    size: "60px"
    lineHeight: "1.1"
  body:
    size: "18px"
    lineHeight: "1.6"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "64px"
  section: "128px"
rounded:
  sm: "4px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "999px"
components:
  nav:
    background: "rgba(253, 251, 247, 0.9)"
    blur: "12px"
    height: "96px"
  hero:
    layout: "grid"
    imageShape: "rounded-b-full"
    subjectMask: "linear-gradient(to bottom, black 85%, transparent 100%)"
  buttons:
    primary: "bg-dark text-white rounded-full px-6 py-3 uppercase tracking-widest"
    secondary: "border border-gray-700 rounded-full hover:bg-white transition-all"
  cards:
    service: "bg-dark-gray border border-gray-800 rounded-2xl p-10"
    testimonial: "bg-white shadow-lg rounded-2xl p-8 border-gray-100"
  badges:
    floating: "rounded-full aspect-square flex flex-col items-center justify-center p-6"
  forms:
    faq: "border border-gray-300 rounded-xl bg-white overflow-hidden"
motion:
  duration: "300ms"
  curve: "ease-in-out"
  hover: "scale-105"
  spin: "15s linear infinite"
---
## Overview
The Level Up visual system is designed to project authority, luxury, and clarity. It utilizes a "neutral-plus" palette where organic creams and tans provide warmth against high-contrast dark accents. The interface prioritizes generous whitespace and editorial-style typography layering.

## Colors
- **Primary Background**: `cream` (#fdfbf7) is used for the majority of surface areas to reduce eye strain and feel premium.
- **Contrast Sections**: `dark` (#121212) is utilized for high-impact sections like Coaching Programs and CTA footers to create a sense of exclusivity.
- **Accents**: `tan` (#e8decc) acts as the primary highlight color for icons, badges, and secondary buttons.
- **State/Badge**: `badge-bg` (#2a332d) provides a deep botanical green-gray for specific floating callouts.

## Typography
- **Hierarchy**: Mixes heavy bold sans-serif headers with large, italicized serif sub-headers to emphasize key philosophical shifts.
- **Vertical Text**: Use `vertical-rl` for edge-of-screen labels to create a sense of luxury publication design.
- **Tracking**: Use `tracking-widest` for navigation and small labels to increase perceived value.

## Spacing
- **Vertical Rhythm**: Section padding is aggressive (128px on desktop) to ensure the content has room to breathe.
- **Grid**: Standardizes on a `max-w-[1400px]` container with deep horizontal gutters (up to 96px on large screens).

## Layout
- **Layer Stacks**: Uses z-index layering with absolute-positioned decorative elements (dot grids, circles, lines) behind foreground text and subjects.
- **Floating Badges**: Circular badges should overlap component boundaries (e.g., overlapping a card and the background) to create depth.
- **Fixed Elements**: Navigation is fixed with a backdrop-blur for a glassmorphism effect.

## Elevation & Depth
- **Soft Depth**: Use low-intensity shadows (`0_4px_20px_-4px_rgba(0,0,0,0.05)`) for testimonials.
- **High Depth**: The main subject in the hero uses `drop-shadow-2xl` to separate from background decorative shapes.
- **Glassmorphism**: Combine `backdrop-blur-md` with `bg-white/80` or `bg-cream/90` for overlays.

## Shapes
- **Signature Shape**: The "pill" and "circle" are dominant. Avoid sharp corners except for very small decorative icons.
- **Organic Masks**: Subject portraits utilize `rounded-b-full` or linear-gradient masks to blend into the section background.
- **Decorative Icons**: Use dot grids (4x4) and thin line dividers (`1px`) for architectural detail.

## Components
- **Navigation**: Clean, letter-spaced links with a centered dot indicator for the active state.
- **Hero Panel**: Features a split grid with a floating circular SVG text path that rotates infinitely.
- **Service Cards**: Transition from dark-gray to tan borders on hover; use 14x14 icon containers.
- **FAQ Accordion**: Bordered containers with plus/minus icons that rotate 45 degrees upon expansion.
- **Footer**: High-contrast dark background with a massive centered CTA heading.

## Motion
- **Hover States**: Links should transition color over 300ms. Primary CTA buttons should scale slightly on hover.
- **Decorative Animation**: Circular text badges should rotate slowly and continuously.
- **Layout Transitions**: Mobile menus and FAQ contents should use `transition-all` with calculated `max-height` or `translate` properties.

## Do's and Don'ts
- **Do**: Mix sans and serif in the same heading for emphasis.
- **Do**: Use grayscale or low-saturation filters on photography to maintain the color palette.
- **Don't**: Use vibrant colors or high-intensity gradients; keep it muted and organic.
- **Don't**: Overcrowd sections; if in doubt, add more whitespace.

## Accessibility
- **Contrast**: Ensure text on tan backgrounds uses the `dark` color for legibility.
- **Interactions**: All buttons and interactive icons must have clear focus states.
- **Semantic HTML**: Use `section` tags with descriptive `id` attributes for easy navigation via screen readers.