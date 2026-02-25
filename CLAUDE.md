# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build

```bash
node build.js
```

This generates `index.html` from `template.html` + `config.json`. There are no dependencies — Node.js built-ins only.

## Architecture

The site uses a three-file build pipeline:

- **`config.json`** — all user-facing content: names, date, venue, schedule, airports, hotel, registries, footer
- **`template.html`** — static HTML with `{{placeholder}}` tokens where config values are injected
- **`build.js`** — reads both files, performs token replacement, writes `index.html`

`index.html` is the deployable artifact (do not edit it directly).

### How `build.js` works

- Simple values use `{{key}}` tokens replaced via `String.replaceAll`
- All config values are HTML-escaped through `esc()` before insertion
- Array fields (`schedule`, `registries`, `airports`) are rendered to HTML strings in `build.js` and injected as single block tokens (`{{schedule}}`, `{{registry}}`, `{{airportList}}`)
- The countdown target date (`{{countdownIso}}`) is inserted into an inline `<script>` tag — it is intentionally not HTML-escaped since it's a JS string value

### Adding a new configurable field

1. Add the value to `config.json`
2. Add a `{{token}}` in the appropriate place in `template.html`
3. Add the token → value mapping to the `replacements` object in `build.js` (use `esc()` for any user-visible strings)
4. Run `node build.js`
