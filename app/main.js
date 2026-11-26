// NaijaStat router — hash routes, nav highlight, and wiring for the controls
// each view offers (year selector, state search, state sort).
import { ROUTES, NAV } from "./views.js";

const app = document.getElementById("view");
const navEl = document.getElementById("nav");

navEl.innerHTML = NAV.map(([href, label]) => `<a href="${href}" data-route="${href}">${label}</a>`).join("");

function currentRoute() {
  const hash = location.hash.replace(/^#/, "") || "/overview";
  return ROUTES[hash] ? hash : "/overview";
}

function wireControls() {
  const yearSelect = document.getElementById("year-select");
  if (yearSelect) {
    yearSelect.addEventListener("change", () => {
      window.__naijaYear = Number(yearSelect.value);
      render();
    });
  }
  const search = document.getElementById("state-search");
  if (search) {
    search.addEventListener("input", () => {
      window.__naijaQuery = search.value;
      render(false);
      const again = document.getElementById("state-search");
      if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); }
    });
  }
  const sort = document.getElementById("state-sort");
  if (sort) {
    sort.addEventListener("change", () => {
      window.__naijaSort = sort.value;
      render();
    });
  }
}

function render(scrollTop = true) {
  const route = currentRoute();
  app.innerHTML = ROUTES[route]();
  navEl.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === "#" + route);
    if (a.dataset.route === "#" + route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = "NaijaStat — Nigeria in numbers";
  wireControls();
  if (scrollTop) window.scrollTo(0, 0);
}

window.addEventListener("hashchange", () => render());
render();
