// NaijaStat views — one render function per hash route. Every figure carries its
// source and year; every control (year selector, sorting, search, tabs) is wired.
import {
  COUNTRY, POPULATION_BY_YEAR, POPULATION_SOURCE, AGE_STRUCTURE, AGE_SOURCE,
  KEY_INDICATORS, GDP_GROWTH, GDP_GROWTH_SOURCE, INFLATION, INFLATION_SOURCE,
  GDP_SECTORS, SECTORS_SOURCE, STATES, STATES_SOURCE, CITIES, CITIES_SOURCE,
  HEALTH, EDUCATION, TRADE, SOURCES,
} from "./data.js";
import { barChart, lineChart, donutChart, hbarChart } from "./charts.js";

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}
function statCard(k) {
  return `<article class="card stat"><div class="stat-value">${k.value}</div><div class="stat-label">${k.label}</div><div class="stat-note">${k.note} · ${k.source}</div></article>`;
}
function dataTable(heads, rows) {
  return `<table class="data-table"><thead><tr>${heads.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

export function viewOverview() {
  const cards = KEY_INDICATORS.map(statCard).join("");
  return `
  <section class="hero">
    <p class="eyebrow">Federal Republic of Nigeria · West Africa</p>
    <h1>Nigeria in numbers</h1>
    <p class="lede">Population, economy, health and education for Africa's most populous country — every figure traced to its source and year.</p>
    <p class="hero-facts">Capital ${COUNTRY.capital} · Largest city ${COUNTRY.largestCity} · ${COUNTRY.areaKm2.toLocaleString()} km² · Independence ${COUNTRY.independence}</p>
  </section>
  <h2>Key indicators</h2>
  <div class="grid stats">${cards}</div>
  <div class="grid two">
    <section class="card">
      <h3>Population growth, 2000–2024</h3>
      ${barChart(POPULATION_BY_YEAR.map((p) => ({ label: String(p.year), value: p.pop })), { label: "Population in millions by year", format: (v) => v.toFixed(1) })}
      ${sourceLine(POPULATION_SOURCE)}
    </section>
    <section class="card">
      <h3>Age structure</h3>
      <div class="donut-wrap">${donutChart(AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.pct })), { label: "Age structure of the population" })}
      <ul class="legend">${AGE_STRUCTURE.map((a) => `<li><span class="sw"></span>${a.group} — <strong>${a.pct}%</strong></li>`).join("")}</ul></div>
      ${sourceLine(AGE_SOURCE)}
      <p>Nigeria has one of the world's youngest populations: a median age of about 18 years.</p>
    </section>
  </div>
  <section class="card">
    <h3>Explore the data</h3>
    <div class="link-cards">
      <a href="#/population">Population &amp; demographics →</a>
      <a href="#/economy">Economy →</a>
      <a href="#/health">Health →</a>
      <a href="#/education">Education →</a>
      <a href="#/regions">States &amp; cities →</a>
      <a href="#/tables">All data tables →</a>
    </div>
  </section>`;
}

export function viewPopulation() {
  const years = POPULATION_BY_YEAR.map((p) => p.year);
  const year = window.__naijaYear || 2024;
  const row = POPULATION_BY_YEAR.find((p) => p.year === year) || POPULATION_BY_YEAR[POPULATION_BY_YEAR.length - 1];
  const prev = POPULATION_BY_YEAR[POPULATION_BY_YEAR.indexOf(row) - 1];
  const growth = prev ? (((row.pop - prev.pop) / prev.pop / (row.year - prev.year)) * 100).toFixed(1) : "—";
  return `
  <h1>Population &amp; demographics</h1>
  <p class="lede">235.6 million people in 2024 — the largest population in Africa and the sixth largest in the world.</p>
  <section class="card">
    <h3>Population by year</h3>
    <label class="control">Year: <select id="year-select">${years.map((y) => `<option value="${y}"${y === row.year ? " selected" : ""}>${y}</option>`).join("")}</select></label>
    <p class="big-number">${row.pop.toFixed(1)} million <span>in ${row.year}</span></p>
    <p>Average annual growth since the previous point shown: <strong>${growth}%</strong>. Nigeria's population has nearly doubled since 2000.</p>
    ${barChart(POPULATION_BY_YEAR.map((p) => ({ label: String(p.year), value: p.pop })), { label: "Population in millions by year", format: (v) => v.toFixed(1) })}
    ${sourceLine(POPULATION_SOURCE)}
  </section>
  <div class="grid two">
    <section class="card">
      <h3>Age structure</h3>
      ${donutChart(AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.pct })), { label: "Age structure" })}
      <ul class="legend">${AGE_STRUCTURE.map((a) => `<li><span class="sw"></span>${a.group} — <strong>${a.pct}%</strong></li>`).join("")}</ul>
      ${sourceLine(AGE_SOURCE)}
    </section>
    <section class="card">
      <h3>Major cities</h3>
      ${dataTable(["City", "Population", "Note"], CITIES.map((c) => [c.city, c.pop.toFixed(1) + "m", c.note]))}
      ${sourceLine(CITIES_SOURCE)}
    </section>
  </div>`;
}

export function viewEconomy() {
  return `
  <h1>Economy</h1>
  <p class="lede">Africa's largest economy by GDP (PPP) and fourth largest nominally — driven by services, agriculture and oil.</p>
  <div class="grid stats">
    ${statCard({ label: "GDP per capita", value: "$807", note: "nominal, 2024", source: "World Bank, 2024" })}
    ${statCard({ label: "GDP growth", value: "3.4%", note: "real, 2024", source: "NBS, 2024" })}
    ${statCard({ label: "Inflation (CPI)", value: "33.2%", note: "annual average, 2024", source: "NBS, 2024" })}
    ${statCard({ label: "Unemployment", value: "4.3%", note: "Q2 2024", source: "NBS, 2024" })}
  </div>
  <div class="grid two">
    <section class="card">
      <h3>Real GDP growth, %</h3>
      ${barChart(GDP_GROWTH.map((g) => ({ label: String(g.year), value: g.g })), { label: "Real GDP growth by year", format: (v) => v.toFixed(1) + "%" })}
      ${sourceLine(GDP_GROWTH_SOURCE)}
      <p>The 2020 dip marks the COVID-19 recession; growth has held between 2.9% and 3.6% since 2021.</p>
    </section>
    <section class="card">
      <h3>Consumer inflation, %</h3>
      ${lineChart(INFLATION.map((i) => ({ label: String(i.year), value: i.rate })), { label: "Inflation by year", format: (v) => v.toFixed(1) + "%" })}
      ${sourceLine(INFLATION_SOURCE)}
      <p>Inflation climbed after the 2023 fuel-subsidy removal and naira float, averaging 33.2% in 2024.</p>
    </section>
  </div>
  <div class="grid two">
    <section class="card">
      <h3>GDP by sector</h3>
      ${hbarChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.pct })), { label: "GDP share by sector", format: (v) => v.toFixed(1) + "%" })}
      ${sourceLine(SECTORS_SOURCE)}
    </section>
    <section class="card">
      <h3>Trade &amp; connectivity</h3>
      ${dataTable(["Indicator", "Figure", "Source"], TRADE.map((t) => [t.label, t.value, t.source]))}
    </section>
  </div>`;
}

export function viewHealth() {
  return `
  <h1>Health</h1>
  <p class="lede">Life expectancy is 52.7 years (2023) — health outcomes remain among the hardest challenges in the data.</p>
  <div class="grid stats">
    ${statCard({ label: "Life expectancy", value: "52.7 yrs", note: "at birth, 2023", source: "World Bank, 2023" })}
    ${statCard({ label: "Under-5 mortality", value: "107", note: "per 1,000 births, 2023", source: "World Bank, 2023" })}
    ${statCard({ label: "Physicians", value: "0.4", note: "per 1,000 people, 2019", source: "World Bank, 2019" })}
    ${statCard({ label: "Electricity access", value: "60.5%", note: "of population, 2023", source: "World Bank, 2023" })}
  </div>
  <section class="card">
    <h3>Health indicators</h3>
    ${dataTable(["Indicator", "Value", "Source"], HEALTH.map((h) => [h.label, h.value, h.source]))}
    <p>Under-5 mortality has fallen from 213 per 1,000 in 1990 to 107 in 2023 (World Bank), but remains far above the global average of 37.</p>
  </section>`;
}

export function viewEducation() {
  return `
  <h1>Education</h1>
  <p class="lede">Adult literacy is 62.0% (2018) — rising among young people, at 75.4% for ages 15–24.</p>
  <div class="grid stats">
    ${statCard({ label: "Adult literacy", value: "62.0%", note: "ages 15+, 2018", source: "UNESCO, 2018" })}
    ${statCard({ label: "Youth literacy", value: "75.4%", note: "ages 15–24, 2018", source: "UNESCO, 2018" })}
    ${statCard({ label: "Primary enrolment", value: "64.1%", note: "net, 2019", source: "UNESCO, 2019" })}
    ${statCard({ label: "Out-of-school children", value: "18.3m", note: "2022", source: "UNICEF, 2022" })}
  </div>
  <section class="card">
    <h3>Education indicators</h3>
    ${dataTable(["Indicator", "Value", "Source"], EDUCATION.map((e) => [e.label, e.value, e.source]))}
    <p>Nigeria has the world's largest number of out-of-school children; enrolment and completion are highest in the south and lowest in the north-east.</p>
  </section>`;
}

export function viewRegions() {
  const sort = window.__naijaSort || "pop-desc";
  const query = (window.__naijaQuery || "").toLowerCase();
  let rows = STATES.filter((s) => s.state.toLowerCase().includes(query) || s.zone.toLowerCase().includes(query));
  if (sort === "pop-asc") rows = [...rows].sort((a, b) => a.pop - b.pop);
  else if (sort === "name") rows = [...rows].sort((a, b) => a.state.localeCompare(b.state));
  else rows = [...rows].sort((a, b) => b.pop - a.pop);
  return `
  <h1>States &amp; cities</h1>
  <p class="lede">Nigeria has 36 states plus the Federal Capital Territory, grouped into six geo-political zones.</p>
  <section class="card">
    <h3>Largest states by population</h3>
    <div class="controls">
      <label>Search: <input id="state-search" type="search" placeholder="e.g. Kano or North West" value="${window.__naijaQuery || ""}"></label>
      <label>Sort: <select id="state-sort">
        <option value="pop-desc"${sort === "pop-desc" ? " selected" : ""}>Largest first</option>
        <option value="pop-asc"${sort === "pop-asc" ? " selected" : ""}>Smallest first</option>
        <option value="name"${sort === "name" ? " selected" : ""}>A to Z</option>
      </select></label>
    </div>
    ${rows.length ? hbarChart(rows.map((s) => ({ label: s.state, value: s.pop })), { label: "State populations in millions", format: (v) => v.toFixed(1) + "m" }) : "<p>No states match that search.</p>"}
    ${dataTable(["State", "Population (m)", "Zone"], rows.map((s) => [s.state, s.pop.toFixed(1), s.zone]))}
    ${sourceLine(STATES_SOURCE)}
  </section>
  <section class="card">
    <h3>Major cities</h3>
    ${dataTable(["City", "Population", "Note"], CITIES.map((c) => [c.city, c.pop.toFixed(1) + "m", c.note]))}
    ${sourceLine(CITIES_SOURCE)}
  </section>`;
}

export function viewTables() {
  return `
  <h1>All data tables</h1>
  <p class="lede">Every figure on this site in one place, with its source and year. Use your browser's find (Ctrl+F) to search the page.</p>
  <section class="card"><h3>Population by year (millions)</h3>
    ${dataTable(["Year", "Population"], POPULATION_BY_YEAR.map((p) => [String(p.year), p.pop.toFixed(1)]))}
    ${sourceLine(POPULATION_SOURCE)}</section>
  <section class="card"><h3>Real GDP growth (%)</h3>
    ${dataTable(["Year", "Growth"], GDP_GROWTH.map((g) => [String(g.year), g.g.toFixed(1) + "%"]))}
    ${sourceLine(GDP_GROWTH_SOURCE)}</section>
  <section class="card"><h3>Inflation, CPI annual average (%)</h3>
    ${dataTable(["Year", "Inflation"], INFLATION.map((i) => [String(i.year), i.rate.toFixed(1) + "%"]))}
    ${sourceLine(INFLATION_SOURCE)}</section>
  <section class="card"><h3>Age structure (%)</h3>
    ${dataTable(["Age group", "Share"], AGE_STRUCTURE.map((a) => [a.group, a.pct.toFixed(1) + "%"]))}
    ${sourceLine(AGE_SOURCE)}</section>
  <section class="card"><h3>GDP by sector (%)</h3>
    ${dataTable(["Sector", "Share"], GDP_SECTORS.map((s) => [s.sector, s.pct.toFixed(1) + "%"]))}
    ${sourceLine(SECTORS_SOURCE)}</section>
  <section class="card"><h3>States by population (millions)</h3>
    ${dataTable(["State", "Population", "Zone"], STATES.map((s) => [s.state, s.pop.toFixed(1), s.zone]))}
    ${sourceLine(STATES_SOURCE)}</section>
  <section class="card"><h3>Health indicators</h3>
    ${dataTable(["Indicator", "Value", "Source"], HEALTH.map((h) => [h.label, h.value, h.source]))}</section>
  <section class="card"><h3>Education indicators</h3>
    ${dataTable(["Indicator", "Value", "Source"], EDUCATION.map((e) => [e.label, e.value, e.source]))}</section>`;
}

export function viewAbout() {
  return `
  <h1>About &amp; methodology</h1>
  <p class="lede">NaijaStat is an independent, original statistics site about Nigeria. It is not affiliated with any government statistics office.</p>
  <section class="card">
    <h3>How the figures were chosen</h3>
    <p>Each figure comes from a named public source — the United Nations, the World Bank, UNESCO, UNICEF, Nigeria's National Bureau of Statistics, the National Population Commission, the Nigerian Communications Commission, and the National Universities Commission. Where sources disagree, the most recent official figure is shown and the source is named beside it. Population figures are mid-year estimates; economic figures are for the calendar year shown.</p>
    <h3>Sources</h3>
    ${dataTable(["Source body", "Covers"], SOURCES.map((s) => [s.body, s.covers]))}
    <h3>What this site is not</h3>
    <p>This site republishes public statistics with attribution; it collects no data from visitors, sets no cookies, and makes no network requests. Figures are rounded for readability — see the source bodies for exact values and methods.</p>
    <p>Last updated: 26 November 2026. Currency: naira (NGN). All money figures in US dollars unless stated.</p>
  </section>`;
}

export const ROUTES = {
  "/overview": viewOverview,
  "/population": viewPopulation,
  "/economy": viewEconomy,
  "/health": viewHealth,
  "/education": viewEducation,
  "/regions": viewRegions,
  "/tables": viewTables,
  "/about": viewAbout,
};
export const NAV = [
  ["#/overview", "Overview"],
  ["#/population", "Population"],
  ["#/economy", "Economy"],
  ["#/health", "Health"],
  ["#/education", "Education"],
  ["#/regions", "States & Cities"],
  ["#/tables", "Data Tables"],
  ["#/about", "About"],
];
