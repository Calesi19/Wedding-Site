const fs = require("fs");
const path = require("path");

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "config.json"), "utf8")
);

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const scheduleHtml = config.schedule
  ? config.schedule
      .map((item) => {
        const desc = item.desc
          ? `\n            <div class="tl-desc">${esc(item.desc)}</div>`
          : "";
        return `        <div class="tl-row">
          <div class="tl-time">${esc(item.time)}</div>
          <div>
            <div class="tl-name">${esc(item.name)}</div>${desc}
          </div>
        </div>`;
      })
      .join("\n")
  : "";

const registryHtml = config.registries
  .map(
    (r) =>
      `          <li>${esc(r.name)} <a href="${esc(r.url)}" target="_blank">View →</a></li>`
  )
  .join("\n");

const airportList = config.airports
  .map((a) => `${esc(a.name)} — ${esc(a.duration)}`)
  .join(" &nbsp;·&nbsp; ");

const scheduleSectionHtml = config.schedule
  ? `      <div class="section">
        <p class="section-head">the day</p>
        ${scheduleHtml}
      </div>

      <hr class="rule" />`
  : "";

const hotelBlockHtml = config.hotel
  ? `<div class="info-block">
          <span class="info-label">hotel block</span>
          <div class="info-main">${esc(config.hotel.name)}</div>
          <div class="info-detail">
            Code <em>${esc(config.hotel.code)}</em> for a discounted rate. Block held until
            ${esc(config.hotel.blockDeadline)}.<br /><a href="${esc(config.hotel.url)}" target="_blank">Book →</a>
          </div>
        </div>`
  : "";

const replacements = {
  title:             esc(config.title),
  bride:             esc(config.bride),
  groom:             esc(config.groom),
  dateDisplayLine1:  esc(config.date.displayLine1),
  dateDisplayLine2:  esc(config.date.displayLine2),
  countdownIso:      config.date.iso,
  scheduleSection:   scheduleSectionHtml,
  venueName:         esc(config.venue.name),
  venueAddress:      esc(config.venue.address),
  venueDirectionsUrl: esc(config.venue.directionsUrl),
  airportList,
  hotelBlock:        hotelBlockHtml,
  rsvpUrl:           esc(config.rsvpUrl),
  registry:          registryHtml,
  footerCouple:      esc(`${config.bride} & ${config.groom}`),
  footerLocation:    esc(config.location),
  footerYear:        esc(config.year),
};

let html = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");

for (const [key, value] of Object.entries(replacements)) {
  html = html.replaceAll(`{{${key}}}`, value);
}

fs.writeFileSync(path.join(__dirname, "index.html"), html, "utf8");
console.log("Built index.html");
