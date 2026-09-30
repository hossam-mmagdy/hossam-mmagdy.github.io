/* ===== EDIT THESE ===== */
const C = {
  github: "https://github.com/hossam-mmagdy",
  formKey: "f7ed7ad9-9a25-488b-b48e-3991de4cacd9",
  email: "hossammagdy570@gmail.com",
  linkedin: "https://www.linkedin.com/in/hossammohamedmagdy/"
};

/* SVG Icons */
const P = {
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'
};

const ic = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

/* Theme Toggle Logic */
const initTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
};
initTheme();

window.toggleTheme = () => {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", current);
  localStorage.setItem("theme", current);
  const btn = document.getElementById("tb");
  if (btn) btn.innerHTML = ic(current === "light" ? "moon" : "sun");
};

/* Social Icons Builder */
const so = () => `<div class="so">
  <a href="mailto:${C.email}" aria-label="Email">${ic("mail")}</a>
  <a href="${C.linkedin}" aria-label="LinkedIn" target="_blank" rel="noopener">${ic("linkedin")}</a>
  ${C.github ? `<a href="${C.github}" aria-label="GitHub" target="_blank" rel="noopener">${ic("github")}</a>` : ""}
</div>`;

/* Main DOM Initialization */
const initDOM = () => {
  const pg = (document.body && document.body.dataset.p) ? document.body.dataset.p : "";
  const L = [["index.html", "Home"], ["research.html", "Research"], ["journey.html", "Journey"], ["contact.html", "Contact"]];

  const navEl = document.getElementById("nav");
  if (navEl) {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    navEl.innerHTML = `<div class="w">
      <a class="logo" href="index.html"><span>Hossam Mohamed</span></a>
      <nav class="mn">${L.map(l => `<a href="${l[0]}"${(pg && l[0].startsWith(pg)) ? ' class="on"' : ""}>${l[1]}</a>`).join("")}</nav>
      <div style="display:flex;align-items:center;gap:10px;">
        ${so()}
        <button id="tb" class="ib" aria-label="Toggle Theme" onclick="toggleTheme()">${ic(isLight ? "moon" : "sun")}</button>
      </div>
    </div>`;
  }

  const ftEl = document.getElementById("ft");
  if (ftEl) {
    ftEl.innerHTML = `<div class="w"><span>© 2026 Hossam Mohamed · Aswan, Egypt</span>${so()}</div>`;
  }

  document.querySelectorAll(".rv").forEach(el => {
    const o = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        el.classList.add("in");
        o.disconnect();
      }
    }, { threshold: .1 });
    o.observe(el);
  });

  document.querySelectorAll("canvas[data-art]").forEach(c => {
    const x = c.getContext("2d"), W = c.width = 800, H = c.height = 500, k = c.dataset.art;
    x.fillStyle = "#0a1020"; x.fillRect(0, 0, W, H); x.font = "15px Inter,sans-serif";
    if (k == "qubo") {
      const n = 24, s = 17, ox = (W - n * s) / 2, oy = (H - n * s) / 2;
      for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
        const v = Math.abs(Math.sin(i * 12.99 + j * 78.2) * 43758) % 1 / (1 + (i - j) * .18);
        x.fillStyle = `rgba(${i == j ? 94 : 124},${i == j ? 234 : 178},${i == j ? 212 : 255},${.08 + v * .9})`;
        x.fillRect(ox + j * s, oy + i * s, s - 2, s - 2);
      }
      x.fillStyle = "#9aa7bd"; x.fillText("QUBO matrix Q · 24 binary variables", ox, oy - 12);
    }
    if (k == "mit") {
      const f = (m) => {
        x.beginPath();
        for (let i = 0; i <= 200; i++) {
          const t = i / 200, y = Math.sin(t * 9) * .7 * (1 - t * .2), v = y * m + (m < 1 ? Math.sin(t * 90) * .03 : Math.sin(t * 90) * .16 * (t + .3));
          x.lineTo(60 + t * 680, 250 - v * 170);
        }
        x.stroke();
      };
      x.lineWidth = 2; x.strokeStyle = "#5a6a88"; f(.6); x.strokeStyle = "#5eead4"; f(.99);
      x.fillStyle = "#9aa7bd"; x.fillText("noisy expectation value", 70, 40);
      x.fillStyle = "#5eead4"; x.fillText("mitigated by the stacked ensemble (illustration)", 70, 66);
    }
    if (k == "apex") {
      const l = [["UV luminescent layer", "#7cb2ff"], ["Thermoelectric harvesting layer", "#f4b860"], ["Self-cleaning anti-reflection nanocoating", "#5eead4"], ["Solar cell", "#22345c"]];
      l.forEach((q, i) => {
        x.fillStyle = q[1]; x.globalAlpha = .85; x.fillRect(120, 90 + i * 80, 560, 58);
        x.globalAlpha = 1; x.fillStyle = i == 3 ? "#e9eef7" : "#06101c";
        x.fillText(q[0], 140, 125 + i * 80);
      });
      x.fillStyle = "#f4b860"; x.fillText("☀ 60 °C+", 40, 60);
      x.fillStyle = "#9aa7bd"; x.fillText("APEX screen concept (schematic)", 120, 60);
    }
  });

  const f = document.getElementById("cf");
  if (f) f.onsubmit = async e => {
    e.preventDefault();
    const s = document.getElementById("fs"), d = new FormData(f);
    if (d.get("botcheck")) return;
    if (!C.formKey) {
      location.href = `mailto:${C.email}?subject=${encodeURIComponent("Message from " + d.get("name"))}&body=${encodeURIComponent(d.get("message") + "\n\n" + d.get("email"))}`;
      return;
    }
    d.append("access_key", C.formKey);
    d.append("subject", "New message from your website");
    s.textContent = "Sending…";
    try {
      const r = await (await fetch("https://api.web3forms.com/submit", { method: "POST", body: d })).json();
      s.style.color = r.success ? "#5eead4" : "#ff8a8a";
      s.textContent = r.success ? "Thank you. Your message is on its way to Hossam." : "Could not send. Please email " + C.email;
      if (r.success) f.reset();
    } catch (_) {
      s.style.color = "#ff8a8a";
      s.textContent = "Network error. Please email " + C.email;
    }
  };
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDOM);
} else {
  initDOM();
}

/* Bloch sphere Simulation */
(function() {
  const c = document.getElementById("bloch");
  if (!c) return;
  const x = c.getContext("2d"), d = devicePixelRatio || 1, tr = [], rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  function fit() { c.width = c.clientWidth * d; c.height = c.clientHeight * d; }
  fit();
  addEventListener("resize", fit);

  function draw(t) {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const W = c.width, R = W * .36, cx = W / 2, cy = W / 2, a = t * .0002, b = .42, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    const p = (X, Y, Z) => {
      const x1 = X * ca + Z * sa, z1 = -X * sa + Z * ca;
      return [cx + R * x1, cy - R * (Y * cb - z1 * sb), Y * sb + z1 * cb];
    };
    x.clearRect(0, 0, W, W);
    x.lineWidth = d;

    const ring1Col = isLight ? "rgba(2, 132, 199, " : "rgba(124,178,255,";
    const ring2Col = isLight ? "rgba(13, 148, 136, " : "rgba(94,234,212,";
    const ring3Col = isLight ? "rgba(71, 85, 105, " : "rgba(154,167,189,";

    const ring = (f, col) => {
      for (let i = 0; i < 120; i++) {
        const u = i / 120 * 6.2832, v = (i + 1) / 120 * 6.2832, s = p(...f(u)), e = p(...f(v));
        x.strokeStyle = col + (.25 + .3 * (s[2] + 1) / 2) + ")";
        x.beginPath(); x.moveTo(s[0], s[1]); x.lineTo(e[0], e[1]); x.stroke();
      }
    };
    ring(u => [Math.cos(u), 0, Math.sin(u)], ring1Col);
    ring(u => [Math.cos(u), Math.sin(u), 0], ring2Col);
    ring(u => [0, Math.sin(u), Math.cos(u)], ring3Col);

    x.strokeStyle = isLight ? "rgba(15, 23, 42, 0.45)" : "rgba(233,238,247,.35)";
    [[0, 1.2, 0], [0, -1.2, 0], [1.2, 0, 0], [-1.2, 0, 0], [0, 0, 1.2], [0, 0, -1.2]].forEach(v => {
      const o = p(0, 0, 0), e = p(...v);
      x.beginPath(); x.moveTo(o[0], o[1]); x.lineTo(e[0], e[1]); x.stroke();
    });

    x.fillStyle = isLight ? "#0f172a" : "#e9eef7";
    x.font = `bold ${16 * d}px Inter,sans-serif`;
    const z = p(0, 1.32, 0), o1 = p(0, -1.32, 0);
    x.fillText("|0⟩", z[0] - 10 * d, z[1]);
    x.fillText("|1⟩", o1[0] - 10 * d, o1[1] + 12 * d);

    const th = 1.05 + .25 * Math.sin(t * .0007), ph = t * .0016, s = p(Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph));
    tr.push(s);
    if (tr.length > 70) tr.shift();

    const dotTrailCol = isLight ? "13, 148, 136" : "94,234,212";
    tr.forEach((q, i) => {
      x.fillStyle = `rgba(${dotTrailCol},${i / tr.length * .6})`;
      x.beginPath(); x.arc(q[0], q[1], (1 + i / 25) * d, 0, 6.3); x.fill();
    });

    const g = x.createLinearGradient(cx, cy, s[0], s[1]);
    g.addColorStop(0, isLight ? "#0284c7" : "#7cb2ff");
    g.addColorStop(1, isLight ? "#0f172a" : "#fff");
    x.strokeStyle = g;
    x.lineWidth = 2.4 * d;
    x.beginPath(); x.moveTo(cx, cy); x.lineTo(s[0], s[1]); x.stroke();

    x.fillStyle = isLight ? "#0f172a" : "#fff";
    x.shadowColor = isLight ? "#0d9488" : "#5eead4";
    x.shadowBlur = 18 * d;
    x.beginPath(); x.arc(s[0], s[1], 6 * d, 0, 6.3); x.fill();
    x.shadowBlur = 0;
    if (!rm) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
