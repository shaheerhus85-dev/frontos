# FrontOS icon and logo policy

This policy applies to every FrontOS interface and should be followed whenever
an icon or logo is added or replaced.

## Interface icons

- Use `lucide-react` for generic interface actions, navigation, statuses, and
  sections such as Workspace, Hours, AI Behavior, Notifications, Privacy,
  Search, Calendar, Save, and Reset.
- Match the surrounding interface's established icon size and stroke weight.
- Do not use emoji, fabricated brand-like symbols, or letter avatars for generic
  interface actions.

## Third-party brands

- Use the official SVG supplied by the represented third party. Do not redraw,
  recolor, crop, distort, or replace an available official logo with a generic
  icon or letter avatar.
- Store approved brand SVG files locally in `public/brands/`; never hotlink a
  remote logo.
- Preserve the SVG's original aspect ratio in a restrained neutral container.
  Brand colors may remain inside the logo, but must not replace the Aurora Prism
  interface palette.
- Give meaningful images accessible `alt` text. Decorative duplicates should
  use empty `alt` text or `aria-hidden="true"` as appropriate.

## FrontOS brand

- Use the shared `FrontOSLogo` component for the approved FrontOS mark and
  wordmark.
- Use its compact mark-only treatment only where the available space genuinely
  requires it; do not substitute a generic sparkle or fabricated icon when the
  complete logo is appropriate.

## Review checklist

Before approving an asset change, confirm its source, local path, proportions,
color treatment, neutral container, and accessible name. Generic interface
icons must remain Lucide icons; third-party identities must remain official
brand assets.
