# Wedding-Site

A minimal, single-page wedding website. All content is configured via `config.json` and the site is built with a simple Node.js script — no frameworks or dependencies required.

## Usage

1. Edit `config.json` with your details
2. Run the build:
   ```bash
   node build.js
   ```
3. Deploy `index.html`

## Configuration

All customizable content lives in `config.json`:

| Field | Description |
|---|---|
| `bride`, `groom` | Names displayed in the hero and footer |
| `title` | Browser tab title |
| `date.iso` | Wedding datetime for the countdown (`YYYY-MM-DDTHH:MM:SS`) |
| `date.displayLine1/2` | Date written out in prose for the hero |
| `location`, `year` | Footer text |
| `venue` | Name, address, and Google Maps link |
| `airports` | Array of `{ name, duration }` |
| `hotel` | Name, discount code, block deadline, and booking URL |
| `schedule` | Array of `{ time, name, desc }` — `desc` is optional |
| `registries` | Array of `{ name, url }` |
