document.addEventListener("DOMContentLoaded", () => {

  // ──────────────────────────────────────────────────────────
  //  HELPERS
  // ──────────────────────────────────────────────────────────

  /** Converts "2025-07" → "Jul 2025", "July 2025" → "July 2025", "2020" → "2020", "Present" → "Present" */
  function formatDate(raw) {
    if (!raw) return "";
    const s = String(raw).trim();
    if (s === "Present") return "Present";
    if (/^[A-Za-z]/.test(s)) return s;                           // already readable
    if (/^\d{4}-\d{2}$/.test(s)) {                               // ISO "YYYY-MM"
      const [y, m] = s.split("-").map(Number);
      return new Date(y, m - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    return s;                                                     // bare year "2020"
  }

  // ──────────────────────────────────────────────────────────
  //  MOBILE HAMBURGER
  // ──────────────────────────────────────────────────────────
  const hamburger = document.getElementById("nav-hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden", isOpen);
      hamburger.setAttribute("aria-expanded", String(!isOpen));
    });
    // Close on any link click
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        hamburger.setAttribute("aria-expanded", "false");
      })
    );
  }

  // ──────────────────────────────────────────────────────────
  //  SCROLL SPY — active nav link
  // ──────────────────────────────────────────────────────────
  const navLinks = document.querySelectorAll('#main-nav .nav-link[href^="#"]');

  if (navLinks.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navLinks.forEach((l) =>
              l.classList.toggle("active", l.getAttribute("href") === `#${e.target.id}`)
            );
          }
        });
      },
      { rootMargin: "-64px 0px -60% 0px", threshold: 0 }
    );
    document.querySelectorAll("main section[id], header#hero").forEach((s) => io.observe(s));
  }

  // ──────────────────────────────────────────────────────────
  //  DATA FETCH
  // ──────────────────────────────────────────────────────────
  fetch("profile.json")
    .then((r) => r.json())
    .then((data) => {

      // ────────────────────────────────────────
      //  HERO
      // ────────────────────────────────────────
      const hero = document.getElementById("hero");
      if (hero) {
        hero.innerHTML = `
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
      }

      // ────────────────────────────────────────
      //  PERSONAL DETAILS
      // ────────────────────────────────────────
      const personal = document.getElementById("personal");
      if (personal) {
        personal.innerHTML = `
          <h3 class="sidebar-heading">Personal Details</h3>
          <ul class="space-y-2">
            <li class="sidebar-item">
              <span class="sidebar-icon">✉️</span>
              <a href="mailto:${data.personalDetails.email}" class="sidebar-link break-all">${data.personalDetails.email}</a>
            </li>
            <li class="sidebar-item">
              <span class="sidebar-icon">🌐</span>
              <a href="${data.personalDetails.website}" target="_blank" class="sidebar-link break-all">${data.personalDetails.website}</a>
            </li>
            <li class="sidebar-item">
              <span class="sidebar-icon">📞</span>
              <span>${data.personalDetails.phone}</span>
            </li>
            <li class="sidebar-item">
              <span class="sidebar-icon">📍</span>
              <span>${data.personalDetails.address}</span>
            </li>
          </ul>
        `;
      }

      // ────────────────────────────────────────
      //  SOCIALS
      // ────────────────────────────────────────
      const socials = document.getElementById("socials");
      if (socials) {
        socials.innerHTML = `
          <h3 class="sidebar-heading">Socials</h3>
          <ul class="flex flex-col gap-3">
            ${data.socials.map((s) => `
              <li class="flex items-center gap-3">
                <img src="${s.icon}" alt="${s.platform}" loading="lazy" class="w-5 h-5 object-contain rounded shrink-0"/>
                <a href="${s.url}" target="_blank" rel="noopener" class="sidebar-link text-sm font-medium">
                  ${s.platform} <span class="text-gray-400 dark:text-gray-500">— ${s.handle}</span>
                </a>
              </li>
            `).join("")}
          </ul>
        `;
      }

      // ────────────────────────────────────────
      //  LANGUAGES
      // ────────────────────────────────────────
      const languages = document.getElementById("languages");
      if (languages) {
        languages.innerHTML = `
          <h3 class="sidebar-heading">Languages</h3>
          <ul class="flex flex-wrap gap-2">
            ${data.languages.map((l) => `
              <li class="tag-indigo text-xs">${l.name} <span class="opacity-70">· ${l.proficiency}</span></li>
            `).join("")}
          </ul>
        `;
      }

      // ────────────────────────────────────────
      //  HOBBIES
      // ────────────────────────────────────────
      const hobbies = document.getElementById("hobbies");
      if (hobbies) {
        hobbies.innerHTML = `
          <h3 class="sidebar-heading">Hobbies</h3>
          <ul class="flex flex-wrap gap-2">
            ${data.hobbies.map((h) => `<li class="tag-blue text-xs">${h}</li>`).join("")}
          </ul>
        `;
      }

      // ────────────────────────────────────────
      //  EXPERIENCE
      // ────────────────────────────────────────
      const experience = document.getElementById("experience");
      if (experience) {
        experience.innerHTML = `
          <h2 class="section-title">Experience</h2>
          <div class="space-y-5">
            ${data.experience.map((exp) => `
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
            `).join("")}
          </div>
        `;
      }

      // ────────────────────────────────────────
      //  EDUCATION
      // ────────────────────────────────────────
      const education = document.getElementById("education");
      if (education) {
        education.innerHTML = `
          <h2 class="section-title">Education</h2>
          <div class="space-y-4">
            ${data.education.map((edu) => `
              <div class="premium-card flex items-start gap-4">
                <img src="${edu.logo}" alt="${edu.institution}" loading="lazy"
                  class="w-12 h-12 rounded-xl object-contain bg-white dark:bg-slate-800 p-1.5 shadow-sm shrink-0"/>
                <div>
                  <h3 class="text-base font-bold text-gray-900 dark:text-white">${edu.institution}</h3>
                  <p class="text-slate-600 dark:text-zinc-400 text-sm font-medium mt-0.5">${edu.degree}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                    🗓 ${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}
                    &nbsp;·&nbsp;
                    📍 ${edu.location}
                  </p>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }

      // ────────────────────────────────────────
      //  PROJECTS
      // ────────────────────────────────────────
      const projects = document.getElementById("projects");
      if (projects) {
        projects.innerHTML = `
          <h2 class="section-title">Projects</h2>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            ${data.projects.map((proj) => `
              <article class="project-card flex flex-col">
                <div class="project-img-wrap overflow-hidden">
                  <img src="${proj.coverImage.src}" alt="${proj.coverImage.alt}" loading="lazy"
                    class="w-full h-44 object-cover project-img"/>
                </div>
                <div class="p-5 flex flex-col gap-3 flex-grow">
                  <h3 class="text-base font-bold text-gray-900 dark:text-white">${proj.title}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed flex-grow">${proj.summary}</p>
                  <ul class="flex flex-wrap gap-1.5">
                    ${proj.tags.map((t) => `<li class="tag-indigo text-xs">${t}</li>`).join("")}
                  </ul>
                  <div class="flex gap-2 pt-1">
                    ${proj.links.map((l) => `
                      <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                        ${l.label} ↗
                      </a>
                    `).join("")}
                  </div>
                </div>
              </article>
            `).join("")}
          </div>
        `;
      }

      // ────────────────────────────────────────
      //  SKILLS
      // ────────────────────────────────────────
      const skills = document.getElementById("skills");
      if (skills) {
        skills.innerHTML = `
          <h2 class="section-title">Skills & Expertise</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${data.skills.map((group) => `
              <div class="space-y-3">
                <h3 class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>${group.icon}</span> ${group.category}
                </h3>
                <ul class="flex flex-wrap gap-2">
                  ${group.items.map((s) => `<li class="skill-pill">${s}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
          </div>
        `;
      }

      // ────────────────────────────────────────
      //  COURSES
      // ────────────────────────────────────────
      const courses = document.getElementById("courses");
      if (courses) {
        courses.innerHTML = `
          <h2 class="section-title">Courses & Certifications</h2>
          <div class="space-y-4">
            ${data.courses.map((c) => `
              <div class="premium-card flex items-start gap-4">
                <div class="course-icon shrink-0">🎓</div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-base font-bold text-gray-900 dark:text-white">${c.title}</h3>
                  <p class="text-slate-600 dark:text-zinc-400 text-sm font-medium mt-0.5">${c.provider}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    🗓 ${formatDate(c.startDate)} – ${formatDate(c.endDate)}
                  </p>
                  ${c.certificateUrl
            ? `<a href="${c.certificateUrl}" target="_blank" class="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        🏆 View Certificate
                       </a>`
            : `<span class="text-xs text-gray-400 dark:text-gray-600 mt-1 block italic">Certificate coming soon</span>`
          }
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }

      // ────────────────────────────────────────
      //  FOOTER
      // ────────────────────────────────────────
      const footer = document.getElementById("site-footer");
      if (footer) {
        footer.innerHTML = `
          <p>© ${new Date().getFullYear()} ${data.profile.name} — All rights reserved.</p>
        `;
      }

    })
    .catch((err) => console.error("Error loading profile.json:", err));
});
