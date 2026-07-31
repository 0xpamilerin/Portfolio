# 0xPamilerin — Portfolio

> A fast, clean, data-driven personal portfolio built with Eleventy, Tailwind CSS v4, and vanilla JavaScript.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Updating Content](#updating-content)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Customisation](#customisation)

---

## Overview

This portfolio is fully **data-driven** — all personal information (experience, education, projects, skills, etc.) is stored in a single JSON file (`src/profile.json`). No HTML editing is needed to update content; just update the JSON and rebuild.

**Key Features:**
- ⚡ Static site generation with [Eleventy](https://www.11ty.dev/)
- 🎨 Utility-first styling with [Tailwind CSS v4](https://tailwindcss.com/)
- 🌙 Dark / Light mode toggle (persisted via `localStorage`)
- 📱 Fully responsive — mobile-first layout
- 📝 Blog section powered by Markdown posts
- 🔍 Scroll-spy active navigation links
- ♿ Accessible semantic HTML throughout

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Eleventy v3](https://www.11ty.dev/) | Static site generator |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Open Sans](https://fonts.google.com/specimen/Open+Sans) | Body font (Google Fonts) |
| [Outfit](https://fonts.google.com/specimen/Outfit) | Heading font (Google Fonts) |
| Vanilla JavaScript | Dynamic content rendering & interactivity |
| JSON | Content data source (`profile.json`) |

---

## Project Structure

```
Portfolio-main/
├── src/                        # Source files (edit these)
│   ├── _includes/
│   │   └── layouts/
│   │       └── post.njk        # Blog post layout template
│   ├── assets/
│   │   ├── icons/              # Social media icons (svg/png)
│   │   │   ├── inst.jpg
│   │   │   ├── linkedin.svg
│   │   │   └── twitter.svg
│   │   ├── logos/              # Company & profile logos
│   │   │   ├── AOU.png
│   │   │   ├── may.png
│   │   │   ├── oxpam.jpeg      # Profile photo
│   │   │   └── ui.jpeg
│   │   └── projects/           # Project cover images
│   │       ├── food.jpg
│   │       ├── guess-thumbnail.jpg
│   │       └── preview.jpg
│   ├── posts/                  # Blog posts (Markdown)
│   ├── app.js                  # Main JS — renders all sections from profile.json
│   ├── blog.njk                # Blog listing page
│   ├── favicon.png             # Site favicon
│   ├── index.html              # Main HTML shell
│   ├── input.css               # Tailwind source CSS
│   ├── profile.json            # ⭐ ALL content lives here
│   ├── style.css               # Generated CSS (do not edit manually)
│   └── theme.js                # Dark/light mode initialisation
├── _site/                      # Built output (auto-generated, do not edit)
├── .eleventy.js                # Eleventy configuration
├── package.json
└── README.md
```

> **⚠️ Important:** Never edit files inside `_site/` directly. They are overwritten on every build. Always edit files in `src/`.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/0xpamilerin/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

This starts two concurrent processes:
1. **Tailwind CSS** in watch mode — rebuilds `style.css` on every `input.css` change
2. **Eleventy** with live-reload — rebuilds the site and refreshes the browser on file changes

Visit `http://localhost:8080` to view the site.

---

## Updating Content

All content is managed through **`src/profile.json`**. After editing, run `npm run build` to apply changes.

### Profile & Hero Section

```json
"profile": {
  "name": "Your Name",
  "role": "Your Role",
  "photo": {
    "src": "/assets/logos/your-photo.jpeg",
    "alt": "Portrait of Your Name"
  },
  "summary": "Your bio summary..."
}
```

### Personal Details (Sidebar)

```json
"personalDetails": {
  "email": "you@example.com",
  "website": "https://yoursite.com",
  "phone": "+000 000 000 0000",
  "address": "City, Country"
}
```

### Socials

```json
"socials": [
  {
    "platform": "LinkedIn",
    "handle": "your-handle",
    "url": "https://linkedin.com/in/your-handle",
    "icon": "/assets/icons/linkedin.svg"
  }
]
```

### Experience

```json
"experience": [
  {
    "company": "Company Name",
    "role": "Your Job Title",
    "location": "City, Country",
    "startDate": "2024-01",
    "endDate": "Present",
    "logo": "/assets/logos/company.png",
    "summary": "Brief role summary.",
    "highlights": [
      "Key achievement or responsibility one.",
      "Key achievement or responsibility two."
    ]
  }
]
```

> **Date formats accepted:** `"YYYY-MM"` (e.g. `"2025-07"`), `"Present"`, or plain year `"2020"`.

### Projects

```json
"projects": [
  {
    "title": "Project Name",
    "coverImage": {
      "src": "/assets/projects/cover.jpg",
      "alt": "Project screenshot"
    },
    "summary": "Short project description.",
    "tags": ["JavaScript", "CSS", "API"],
    "links": [
      { "label": "Live Demo", "url": "https://your-demo.com" },
      { "label": "GitHub", "url": "https://github.com/you/repo" }
    ]
  }
]
```

### Adding a Blog Post

Create a new Markdown file in `src/posts/`:

```markdown
---
title: "Your Post Title"
date: 2025-07-31
description: "Short description for the post listing."
layout: layouts/post.njk
---

Your post content here in **Markdown**.
```

---

## Building for Production

```bash
npm run build
```

This runs two steps in sequence:
1. `build:css` — compiles `input.css` → `style.css` via Tailwind CLI
2. `eleventy` — generates the full static site into `_site/`

The `_site/` folder is your deployable output.

---

## Deployment

The site is deployed on **[Netlify](https://netlify.com)** at:
🌐 **https://0xpamilerin.netlify.app/**

### Manual Deploy

1. Run `npm run build`
2. Drag and drop the `_site/` folder into the Netlify dashboard

### Continuous Deployment (Recommended)

Connect the GitHub repository to Netlify:
- **Build command:** `npm run build`
- **Publish directory:** `_site`

Every push to the `main` branch will auto-deploy.

---

## Customisation

### Changing Fonts

Edit `src/input.css` line 1 — update the Google Fonts import URL and the `font-family` in the `body` rule.

### Changing Colours / Theme

The design uses Tailwind utility classes. Global design tokens (card backgrounds, nav styles, hero gradients) are defined in the `@layer base` block in `src/input.css`.

### Profile Photo Positioning

The profile photo uses CSS to zoom and position within the circular frame:

```html
style="object-position: center 92%; transform: scale(1.7);"
```

- **`object-position`** — controls vertical focus point (higher % = lower in the image)
- **`transform: scale()`** — controls zoom level

Adjust these values in `src/app.js` (Hero section, ~line 82) to suit your photo's composition.

---

## License

© 2025 0xPamilerin. All rights reserved.
