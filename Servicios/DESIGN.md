---
name: Cinematic Editorial
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cec5b8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#989083'
  outline-variant: '#4c463c'
  surface-tint: '#dac49a'
  primary: '#dac49a'
  on-primary: '#3c2f10'
  primary-container: '#b6a27a'
  on-primary-container: '#463819'
  inverse-primary: '#6d5c3a'
  secondary: '#c9c6c0'
  on-secondary: '#31312c'
  secondary-container: '#474742'
  on-secondary-container: '#b7b5af'
  tertiary: '#c9c6bf'
  on-tertiary: '#31312c'
  tertiary-container: '#a6a49e'
  on-tertiary-container: '#3b3a35'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f7e0b4'
  primary-fixed-dim: '#dac49a'
  on-primary-fixed: '#251a01'
  on-primary-fixed-variant: '#544524'
  secondary-fixed: '#e5e2db'
  secondary-fixed-dim: '#c9c6c0'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#474742'
  tertiary-fixed: '#e5e2db'
  tertiary-fixed-dim: '#c9c6bf'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#484742'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 90px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Bodoni Moda
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-xs:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.15em
spacing:
  base: 8px
  container-max: 1440px
  margin-desktop: 64px
  margin-mobile: 24px
  gutter: 32px
  section-gap: 128px
---

## Brand & Style

The design system for this studio is anchored in **Cinematic Elegance** and **Sophisticated Minimalism**. It prioritizes the production studio's high-fidelity visual output, acting as a quiet, galleriesque frame rather than an ornament. The personality is creative and strategic—achieving a premium feel through precise alignment, generous negative space, and a deliberate contrast between editorial serif headlines and utilitarian sans-serif micro-copy.

The aesthetic avoids common luxury tropes like gold gradients or heavy textures. Instead, it relies on monochromatic depth, thin hairlines (0.5pt to 1pt), and a rigid 12-column grid to convey precision and authority. The emotional response is one of calm confidence, appealing to high-end clients in the luxury, fashion, and architectural sectors.

## Colors

The palette is strictly dark-mode by default to mimic the environment of a color-grading suite or a darkroom.

- **Background (#111111):** A deep, near-black charcoal that provides maximum contrast for photography.
- **Surface (#262626):** A graphite gray used for UI containers, cards, and input fields to create subtle depth.
- **Primary Text (#F4F1EA):** A soft ivory that reduces eye strain compared to pure white while maintaining high legibility.
- **Secondary Text (#D8D5CE):** A warm light gray for metadata, descriptions, and placeholder text.
- **Accent (#B6A27A):** A muted champagne used as a surgical strike for focus states, thin dividers, and active navigation indicators. It should never be used for large surfaces.

## Typography

The typography strategy employs a high-contrast pairing:

- **Headlines:** Use **Bodoni Moda**. Its vertical stress and razor-thin serifs evoke high-fashion editorial. For large displays, use a slightly tighter letter-spacing to emphasize the dramatic stroke contrast.
- **Body & UI:** Use **Inter**. It provides a neutral, functional counterpoint to the serif headlines. 
- **Micro-labels:** All labels, buttons, and overlines must be set in Inter, Uppercase, with a generous letter-spacing (10-15%). This mimics technical production slate notations and enhances the feeling of "precision."

## Layout & Spacing

This design system utilizes a **12-column fixed grid** for desktop, centered within the viewport. 

- **Horizontal Rhythm:** A 32px gutter ensures content remains breathable. Wide margins (64px+) on desktop focus the user's eye toward the center, creating a "gallery" feel.
- **Vertical Rhythm:** Large section gaps (128px) are used to separate different case studies or service offerings, enforcing the "luxury of space."
- **Mobile Adaptivity:** On mobile, the layout collapses to a 4-column grid with 24px margins. Headlines scale down significantly to maintain their elegance without overwhelming the smaller screen.

## Elevation & Depth

To maintain a sophisticated and flat editorial look, this design system avoids traditional drop shadows.

- **Tonal Layering:** Depth is created by placing **Surface (#262626)** elements over the **Background (#111111)**.
- **Low-Contrast Outlines:** Instead of shadows, cards and buttons use a subtle 1px border of #262626 or a very dim version of the accent color (#B6A27A at 20% opacity).
- **Glassmorphism:** For overlays like navigation bars or modal backdrops, a heavy backdrop-blur (20px) with a semi-transparent #111111 (80% opacity) is used to maintain a sense of cinematic layering.

## Shapes

The shape language is **Sharp (0px roundedness)**. 

Every element—from buttons to image containers and input fields—must have 90-degree corners. This reinforces the architectural and precise nature of the studio. The only exception is the "Play" icon or specific functional iconography, which should remain geometric and minimalist.

## Components

- **Buttons:** Primary buttons are outlined (1px) in Ivory (#F4F1EA) with uppercase label text. Hover states fill the button with Ivory and flip the text to Charcoal (#111111).
- **Input Fields:** Bottom-border only (1px #262626). Active states transition the border color to Champagne (#B6A27A). Labels sit above the line in `label-xs` style.
- **Cards:** No background color by default; content is separated by generous spacing and thin #262626 dividers. For hover states, a subtle background shift to #181818 is permissible.
- **Chips/Labels:** Small, rectangular boxes with `label-xs` text. Used for categorizing production types (e.g., "COMMERCIAL," "NARRATIVE").
- **Lists:** High-density text with thin horizontal dividers. The index number (e.g., 01, 02) should be in Bodoni Moda to add editorial flair to functional lists.
- **Cursor:** For photography portfolios, consider a custom circular cursor that expands when hovering over interactive imagery.