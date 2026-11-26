// NaijaStat charts — plain SVG bar, line, donut and horizontal-bar charts built
// from the data arrays. No libraries, no network.
function svgOpen(w, h, label) {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">`;
}

const GREEN = "#0b6b4a";
const GOLD = "#c9a227";
const TEAL = "#1f8a70";
const LIGHT = "#8fc7ae";
const RED = "#b3402e";
const GRID = "#e3e7e2";

export function barChart(rows, opts) {
  const { width = 640, height = 280, valueLabel = "", format = (v) => String(v) } = opts || {};
  const padL = 46, padB = 30, padT = 14, padR = 10;
  const max = Math.max(...rows.map((r) => r.value));
  const min = Math.min(0, ...rows.map((r) => r.value));
  const span = max - min || 1;
  const cw = width - padL - padR, ch = height - padT - padB;
  const yFor = (v) => padT + ((max - v) / span) * ch;
  const zeroY = yFor(0);
  const bw = Math.min(52, (cw / rows.length) * 0.62);
  let s = svgOpen(width, height, opts.label || "Bar chart");
  for (let i = 0; i <= 4; i++) {
    const y = padT + (ch * i) / 4;
    const v = max - (span * i) / 4;
    s += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#5a665f">${format(Math.round(v * 10) / 10)}</text>`;
  }
  s += `<line x1="${padL}" y1="${zeroY}" x2="${width - padR}" y2="${zeroY}" stroke="#9aa79f" stroke-width="1.5"/>`;
  rows.forEach((r, i) => {
    const x = padL + (cw / rows.length) * i + (cw / rows.length - bw) / 2;
    const y = Math.min(yFor(r.value), zeroY);
    const bh = Math.abs(yFor(r.value) - zeroY);
    const neg = r.value < 0;
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw}" height="${Math.max(bh, 2).toFixed(1)}" rx="3" fill="${neg ? RED : i % 2 ? TEAL : GREEN}"><title>${r.label}: ${format(r.value)}${valueLabel}</title></rect>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(neg ? y + bh + 14 : y - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#243b31">${format(r.value)}</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#5a665f">${r.label}</text>`;
  });
  return s + "</svg>";
}

export function lineChart(rows, opts) {
  const { width = 640, height = 280, format = (v) => String(v) } = opts || {};
  const padL = 46, padB = 30, padT = 16, padR = 14;
  const vals = rows.map((r) => r.value);
  let min = Math.min(...vals), max = Math.max(...vals);
  if (min > 0) min = Math.min(0, min);
  const span = max - min || 1;
  const cw = width - padL - padR, ch = height - padT - padB;
  const px = (i) => padL + (cw * i) / (rows.length - 1);
  const py = (v) => padT + ch - ((v - min) / span) * ch;
  let s = svgOpen(width, height, opts.label || "Line chart");
  for (let i = 0; i <= 4; i++) {
    const y = padT + (ch * i) / 4;
    s += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#5a665f">${format(Math.round((max - (span * i) / 4) * 10) / 10)}</text>`;
  }
  const pts = rows.map((r, i) => `${px(i).toFixed(1)},${py(r.value).toFixed(1)}`).join(" ");
  s += `<polyline points="${pts}" fill="none" stroke="${GREEN}" stroke-width="3" stroke-linejoin="round"/>`;
  rows.forEach((r, i) => {
    s += `<circle cx="${px(i).toFixed(1)}" cy="${py(r.value).toFixed(1)}" r="4.5" fill="${GOLD}" stroke="#fff" stroke-width="1.5"><title>${r.label}: ${format(r.value)}</title></circle>`;
    s += `<text x="${px(i).toFixed(1)}" y="${(py(r.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#243b31">${format(r.value)}</text>`;
    s += `<text x="${px(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#5a665f">${r.label}</text>`;
  });
  return s + "</svg>";
}

export function donutChart(rows, opts) {
  const size = (opts && opts.size) || 260;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r - 34;
  const total = rows.reduce((a, b) => a + b.value, 0);
  const colors = [GREEN, GOLD, TEAL, LIGHT, "#5b7d6e"];
  let s = svgOpen(size, size, (opts && opts.label) || "Donut chart");
  let angle = -Math.PI / 2;
  rows.forEach((row, i) => {
    const frac = row.value / total;
    const a2 = angle + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const x3 = cx + inner * Math.cos(a2), y3 = cy + inner * Math.sin(a2);
    const x4 = cx + inner * Math.cos(angle), y4 = cy + inner * Math.sin(angle);
    s += `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${x4.toFixed(1)} ${y4.toFixed(1)} Z" fill="${colors[i % colors.length]}"><title>${row.label}: ${row.value}%</title></path>`;
    angle = a2;
  });
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="#123c2c">${total.toFixed(1)}%</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#5a665f">of population</text>`;
  return s + "</svg>";
}

export function hbarChart(rows, opts) {
  const { width = 640, barH = 26, gap = 12, format = (v) => String(v) } = opts || {};
  const max = Math.max(...rows.map((r) => r.value));
  const height = rows.length * (barH + gap) + 8;
  const labelW = 110, valW = 56;
  const bw = width - labelW - valW - 8;
  let s = svgOpen(width, height, (opts && opts.label) || "Horizontal bar chart");
  rows.forEach((r, i) => {
    const y = 4 + i * (barH + gap);
    const w = Math.max((r.value / max) * bw, 3);
    s += `<text x="${labelW - 8}" y="${y + barH / 2 + 4}" text-anchor="end" font-size="12" fill="#243b31">${r.label}</text>`;
    s += `<rect x="${labelW}" y="${y}" width="${w.toFixed(1)}" height="${barH}" rx="4" fill="${i % 2 ? TEAL : GREEN}"><title>${r.label}: ${format(r.value)}</title></rect>`;
    s += `<text x="${labelW + w + 8}" y="${y + barH / 2 + 4}" font-size="12" font-weight="600" fill="#243b31">${format(r.value)}</text>`;
  });
  return s + "</svg>";
}
