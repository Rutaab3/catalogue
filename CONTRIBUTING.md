# Contributing Guidelines

Thank you for considering contributing to the HF-Furniture Collection project. This document outlines the standards, conventions, and steps for contributing to this static showroom and e-commerce catalogue application.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Adding and Editing Products](#adding-and-editing-products)
5. [Image Asset Rules](#image-asset-rules)
6. [Code Style & Conventions](#code-style--conventions)
7. [Protection & Security Deterrents](#protection--security-deterrents)
8. [Submitting Pull Requests](#submitting-pull-requests)

---

## Code of Conduct

All contributors are expected to maintain a respectful, inclusive, and professional environment. Focus on constructive feedback, clear communication, and high-quality code contributions.

---

## Getting Started

1. **Fork the Repository**: Create a personal fork of the project repository on GitHub.
2. **Clone the Fork**:
   ```bash
   git clone https://github.com/your-username/HF-Furniture.git
   cd HF-Furniture
   ```
3. **Run Locally**:
   Because this is a pure static website with no compilation step, you can serve the directory using any HTTP server:
   ```bash
   python -m http.server 8000
   ```
   Open `http://localhost:8000` in your web browser.

---

## Development Workflow

1. Create a descriptive branch for your work:
   ```bash
   git checkout -b feature/add-new-wardrobe-line
   ```
2. Make your modifications following the project guidelines.
3. Verify your changes locally in multiple browser viewport sizes (Desktop, Tablet, Mobile).
4. Commit your changes with clear, structured commit messages:
   ```bash
   git commit -m "feat(catalogue): add 3-door sliding wardrobe series"
   ```

---

## Adding and Editing Products

All product data is centralized inside `js/data.js`. Each product entry follows this structure:

```js
{
    id: "unique-product-id",
    name: "2 door / simple / no mirror",
    category: "2 door",
    price: 404,
    relativePath: "2 door/simple/no mirror.webp",
    dimensions: {
        width: "120cm",
        height: "215cm",
        depth: "62cm"
    }
}
```

### Steps to Add a New Product

1. **Add Data Entry**: Insert the product object into the `products` array in `js/data.js`.
2. **Add Descriptions**: Add corresponding textual copy in `js/description.js`.
3. **Add Finish Assets**: Ensure the WebP image exists in all finish directories (see [Image Asset Rules](#image-asset-rules)).

---

## Image Asset Rules

The application uses dynamic finish switching based on the `relativePath` property.

- Supported Finish Folders:
  - `black/`
  - `white/`
  - `grey/`
  - `oak/`

### Rule
If `relativePath` is `"2 door/simple/no mirror.webp"`, the exact image must be present in every finish directory:

- `black/2 door/simple/no mirror.webp`
- `white/2 door/simple/no mirror.webp`
- `grey/2 door/simple/no mirror.webp`
- `oak/2 door/simple/no mirror.webp`

### Format Guidelines
- Standard format: WebP (`.webp`)
- Optimization: Images should be compressed for web viewing before committing.
- Fallback: Missing images will trigger `js/image-fallback.js` and render `pics/fallback.webp`.

---

## Code Style & Conventions

### HTML
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<details>`, `<summary>`).
- Maintain consistent indentation (4 spaces).

### CSS
- Maintain styles inside `css/style.css`.
- Use CSS variables for color schemes, spacing, and typography.
- Ensure media queries handle mobile (up to 768px), tablet (768px to 1024px), and desktop views.

### JavaScript
- Vanilla JS only (no heavy frameworks required).
- Use strict equality (`===` and `!==`).
- Handle DOM manipulation safely without direct inline script execution.

---

## Protection & Security Deterrents

The codebase includes client-side devtools detection (`js/wall.js`) and interaction protection (`js/protect.js`).

- **Do Not Remove Core Guard Logic**: Keep protection intact unless testing specifically behind `gateway.html`.
- **Owner Gateway**: Developer testing can temporarily disable protections by visiting `gateway.html`.

---

## Submitting Pull Requests

1. Push your branch to your remote fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request targeting the `main` branch.
3. Provide a clear description of changes made, screenshots of visual modifications, and steps to test.
4. Respond promptly to code review suggestions.
