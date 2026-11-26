// NaijaStat data — real figures for Nigeria, each with its source body and year.
// All figures are public statistics; sources are named next to every number on the site.
export const COUNTRY = {
  name: "Nigeria",
  official: "Federal Republic of Nigeria",
  capital: "Abuja",
  largestCity: "Lagos",
  areaKm2: 923768,
  areaSource: "World Bank, 2024",
  population2024: 235.6,
  populationSource: "United Nations, World Population Prospects 2024",
  density: 255,
  gdpPerCapitaUsd: 807,
  gdpSource: "World Bank, 2024",
  currency: "Naira (NGN)",
  language: "English (official)",
  independence: "1 October 1960",
};

export const POPULATION_BY_YEAR = [
  { year: 2000, pop: 122.3 },
  { year: 2005, pop: 141.4 },
  { year: 2010, pop: 160.9 },
  { year: 2015, pop: 183.5 },
  { year: 2020, pop: 213.4 },
  { year: 2024, pop: 235.6 },
];
export const POPULATION_SOURCE = "United Nations, World Population Prospects 2024 (millions, mid-year)";

export const AGE_STRUCTURE = [
  { group: "0–14 years", pct: 43.5 },
  { group: "15–64 years", pct: 53.8 },
  { group: "65+ years", pct: 2.7 },
];
export const AGE_SOURCE = "United Nations, World Population Prospects 2024";

export const KEY_INDICATORS = [
  { label: "Population", value: "235.6 million", note: "2024 estimate", source: "UN, 2024" },
  { label: "GDP per capita", value: "$807", note: "nominal, 2024", source: "World Bank, 2024" },
  { label: "GDP growth", value: "3.4%", note: "real, 2024", source: "NBS / World Bank, 2024" },
  { label: "Inflation (CPI)", value: "33.2%", note: "annual average, 2024", source: "NBS, 2024" },
  { label: "Unemployment", value: "4.3%", note: "Q2 2024", source: "NBS, 2024" },
  { label: "Life expectancy", value: "52.7 years", note: "at birth, 2023", source: "World Bank, 2023" },
  { label: "Adult literacy", value: "62.0%", note: "ages 15+, 2018", source: "UNESCO, 2018" },
  { label: "Land area", value: "923,768 km²", note: "density 255/km²", source: "World Bank, 2024" },
];

export const GDP_GROWTH = [
  { year: 2019, g: 2.2 },
  { year: 2020, g: -1.8 },
  { year: 2021, g: 3.6 },
  { year: 2022, g: 3.3 },
  { year: 2023, g: 2.9 },
  { year: 2024, g: 3.4 },
];
export const GDP_GROWTH_SOURCE = "National Bureau of Statistics / World Bank, 2019–2024 (real GDP growth, %)";

export const INFLATION = [
  { year: 2020, rate: 13.2 },
  { year: 2021, rate: 17.0 },
  { year: 2022, rate: 18.8 },
  { year: 2023, rate: 24.7 },
  { year: 2024, rate: 33.2 },
];
export const INFLATION_SOURCE = "National Bureau of Statistics, CPI annual average, 2020–2024 (%)";

export const GDP_SECTORS = [
  { sector: "Services", pct: 52.4 },
  { sector: "Agriculture", pct: 24.4 },
  { sector: "Industries", pct: 23.2 },
];
export const SECTORS_SOURCE = "World Bank, 2024 (share of GDP, %)";

export const STATES = [
  { state: "Lagos", pop: 14.4, zone: "South West" },
  { state: "Kano", pop: 13.1, zone: "North West" },
  { state: "Kaduna", pop: 8.3, zone: "North West" },
  { state: "Katsina", pop: 7.8, zone: "North West" },
  { state: "Oyo", pop: 7.8, zone: "South West" },
  { state: "Rivers", pop: 7.0, zone: "South South" },
  { state: "Bauchi", pop: 6.5, zone: "North East" },
  { state: "Jigawa", pop: 5.8, zone: "North West" },
  { state: "Benue", pop: 5.7, zone: "North Central" },
  { state: "Anambra", pop: 5.5, zone: "South East" },
];
export const STATES_SOURCE = "National Population Commission projections, 2022 (millions)";

export const CITIES = [
  { city: "Lagos", pop: 15.4, note: "Commercial capital" },
  { city: "Kano", pop: 4.0, note: "Northern trade hub" },
  { city: "Ibadan", pop: 3.6, note: "South West" },
  { city: "Abuja", pop: 3.1, note: "Federal capital" },
  { city: "Port Harcourt", pop: 2.5, note: "Oil-industry city" },
  { city: "Benin City", pop: 1.8, note: "South South" },
];
export const CITIES_SOURCE = "United Nations, World Urbanization Prospects 2023 (urban agglomerations, millions)";

export const HEALTH = [
  { label: "Life expectancy at birth", value: "52.7 years", source: "World Bank, 2023" },
  { label: "Under-5 mortality", value: "107 per 1,000 live births", source: "World Bank, 2023" },
  { label: "Infant mortality", value: "68 per 1,000 live births", source: "World Bank, 2023" },
  { label: "Maternal mortality", value: "993 per 100,000 live births", source: "World Bank, 2020" },
  { label: "Physicians", value: "0.4 per 1,000 people", source: "World Bank, 2019" },
  { label: "Hospital beds", value: "0.5 per 1,000 people", source: "World Bank, 2019" },
  { label: "Access to electricity", value: "60.5% of population", source: "World Bank, 2023" },
  { label: "Access to clean water", value: "71.0% of population", source: "World Bank, 2022" },
];

export const EDUCATION = [
  { label: "Adult literacy (15+)", value: "62.0%", source: "UNESCO, 2018" },
  { label: "Youth literacy (15–24)", value: "75.4%", source: "UNESCO, 2018" },
  { label: "Primary school enrolment (net)", value: "64.1%", source: "UNESCO, 2019" },
  { label: "Secondary enrolment (gross)", value: "43.5%", source: "UNESCO, 2019" },
  { label: "Primary completion rate", value: "76.6%", source: "UNESCO, 2019" },
  { label: "Government education spending", value: "5.1% of budget", source: "Federal budget, 2024" },
  { label: "Universities (federal + state + private)", value: "274", source: "NUC, 2024" },
  { label: "Out-of-school children", value: "18.3 million", source: "UNICEF, 2022" },
];

export const TRADE = [
  { label: "Main export", value: "Crude oil — 84% of exports", source: "NBS, 2024" },
  { label: "Main export partner", value: "India, Spain, Netherlands", source: "NBS, 2024" },
  { label: "Main import", value: "Petrol, machinery, wheat", source: "NBS, 2024" },
  { label: "Mobile subscriptions", value: "164 million", source: "NCC, 2024" },
  { label: "Internet users", value: "103 million", source: "NCC / ITU, 2024" },
];

export const SOURCES = [
  { body: "United Nations, World Population Prospects 2024", covers: "Population by year, age structure" },
  { body: "World Bank, World Development Indicators 2024", covers: "GDP per capita, life expectancy, area, sectors" },
  { body: "National Bureau of Statistics (NBS), Nigeria", covers: "Inflation, GDP growth, unemployment, trade" },
  { body: "UNESCO Institute for Statistics", covers: "Literacy and enrolment" },
  { body: "National Population Commission", covers: "State population projections" },
  { body: "United Nations, World Urbanization Prospects 2023", covers: "City populations" },
  { body: "UNICEF, 2022", covers: "Out-of-school children" },
  { body: "Nigerian Communications Commission, 2024", covers: "Mobile and internet users" },
];
