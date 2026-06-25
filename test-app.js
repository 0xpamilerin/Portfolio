const fs = require('fs');

const profileRaw = fs.readFileSync('src/profile.json', 'utf8');
const data = JSON.parse(profileRaw);

// Let's run the rendering logic
try {
  let output = `
    <div class="hero-content">
      <div class="profile-ring">
        <img
          src="${data.profile.photo.src}"
          alt="${data.profile.photo.alt}"
          class="w-36 h-36 rounded-full object-cover block"
        />
      </div>
      <h1 class="hero-name">${data.profile.name}</h1>
      <p class="hero-role">${data.profile.role}</p>
      <p class="hero-summary">${data.profile.summary}</p>
      <div class="hero-cta">
        <a href="#projects" class="hero-btn-primary">View Projects ↓</a>
        <a href="javascript:void(0)" class="hero-btn-secondary opacity-50 cursor-not-allowed" title="Blog is currently under construction">Blog (Coming Soon)</a>
      </div>
    </div>
  `;
  
  // Test experience
  function formatDate(raw) {
    if (!raw) return "";
    const s = String(raw).trim();
    if (s === "Present") return "Present";
    if (/^[A-Za-z]/.test(s)) return s;                           
    if (/^\d{4}-\d{2}$/.test(s)) {                               
      const [y, m] = s.split("-").map(Number);
      return new Date(y, m - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    return s;                                                     
  }

  let expHTML = data.experience.map((exp) => `
    <div class="premium-card">
      <div class="flex items-start gap-4 mb-4">
        ${exp.logo 
          ? `<img src="${exp.logo}" alt="${exp.company}" loading="lazy" class="w-11 h-11 rounded-xl object-contain bg-white dark:bg-slate-800 p-1 shadow-sm shrink-0"/>` 
          : `<div class="w-11 h-11 rounded-xl bg-gray-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 shadow-sm border border-gray-200 dark:border-slate-700"><span class="text-xl">💼</span></div>`
        }
        <div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">${exp.role}</h3>
          <p class="text-slate-600 dark:text-zinc-400 text-sm font-semibold">${exp.company}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
        <span>📍 ${exp.location}</span>
        <span>🗓 ${formatDate(exp.startDate)} – ${formatDate(exp.endDate)}</span>
      </div>
      <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">${exp.summary}</p>
      <ul class="space-y-1.5">
        ${exp.highlights.map((h) => `
          <li class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span class="text-slate-500 dark:text-zinc-500 shrink-0 mt-0.5">▸</span>
            <span>${h}</span>
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("");

  console.log("Successfully rendered all templates.");
} catch (e) {
  console.error(e);
}
