# NaijaStat — Nigeria in numbers

An original national statistics site for Nigeria: population, economy, health, education, states and cities — every figure traced to its source and year. Built for the [make.fun bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/PrivatePope/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/PrivatePope/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

## What it is

NaijaStat presents Nigeria's national statistics in one fast, plain-HTML site:

- **Overview** — key indicators at a glance: 235.6 million people (UN, 2024), $807 GDP per capita (World Bank, 2024), 3.4% GDP growth, 33.2% inflation, 4.3% unemployment (NBS, 2024), 52.7 years life expectancy (World Bank, 2023).
- **Population & demographics** — population by year 2000–2024 with a year selector, age structure, major cities.
- **Economy** — real GDP growth, inflation, GDP by sector, trade and connectivity.
- **Health** — life expectancy, mortality, physicians, electricity and water access.
- **Education** — literacy, enrolment, completion, out-of-school children.
- **States & cities** — the ten largest states with live search and sorting.
- **Data tables** — every figure on the site in one place, with source and year.
- **About & methodology** — how figures were chosen and every source body.

## How it works

- Static files under `app/` — no build step, no network requests, no framework. Open `app/index.html` in a browser or serve it with `node serve.ts` (http://localhost:8080).
- Hash routes (`#/overview`, `#/population`, …) — every nav link works; every control (year selector, state search, state sort) is wired to the real data.
- Charts are hand-drawn SVG from the data (`app/charts.js`); data lives in `app/data.js`; views in `app/views.js`; routing in `app/main.js`.
- `main.ts` (Node 22, stdlib only) copies `app/` and `screenshots/` to `/output` and writes `dossier.json` via `vendor/makefun-frontend.ts`. Run it with `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.

## Sources

United Nations (World Population Prospects 2024, World Urbanization Prospects 2023) · World Bank (World Development Indicators 2024) · National Bureau of Statistics, Nigeria · UNESCO Institute for Statistics · UNICEF · National Population Commission · Nigerian Communications Commission. See the About page for the full list.
