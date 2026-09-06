<div align="center">

# HF-Furniture Collection

### Premier Static Showroom, Multi-Finish Wardrobe Catalogue & WhatsApp E-Commerce Platform

<p align="center">
  <a href="#key-features"><img src="https://img.shields.io/badge/Platform-Static_Web_App-blue.svg" alt="Platform"></a>
  <a href="#technology-stack"><img src="https://img.shields.io/badge/Stack-HTML5_|_CSS3_|_Vanilla_JS-brightgreen.svg" alt="Stack"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-orange.svg" alt="License"></a>
  <a href="#security--devtools-protection"><img src="https://img.shields.io/badge/Protection-Client_DevTools_Shield-red.svg" alt="Protection"></a>
  <a href="#running-the-project"><img src="https://img.shields.io/badge/Status-Production_Ready-success.svg" alt="Status"></a>
</p>

![Project Preview](pics/readme/readme.webp)

---

</div>

## Overview

**HF-Furniture Collection** is an enterprise-grade static web catalogue and e-commerce showroom engineered for high performance, smooth visual aesthetics, and frictionless product discovery. Designed specifically for contemporary furniture lines and wardrobe systems, the web application delivers a seamless shopping experience without requiring a heavyweight backend database or dynamic server framework.

The platform provides modern consumer features including multi-finish dynamic product switching (Black, White, Grey, and Oak), detailed dimension specs, visual modal previews, real-time cart persistence, automated WhatsApp checkout order compilation, and an client-side developer protection layer with owner bypass controls.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture & Data Flows](#system-architecture--data-flows)
- [Interactive Technical Deep-Dive](#interactive-technical-deep-dive)
  - [1. Page Hierarchy & Functionality](#1-page-hierarchy--functionality)
  - [2. Multi-Finish Image Resolution Engine](#2-multi-finish-image-resolution-engine)
  - [3. Cart Pipeline & WhatsApp Checkout](#3-cart-pipeline--whatsapp-checkout)
  - [4. Security & DevTools Protection System](#4-security--devtools-protection-system)
  - [5. Full Repository Directory Tree](#5-full-repository-directory-tree)
  - [6. Local Setup & Workflow](#6-local-setup--workflow)
  - [7. Product & Content Management](#7-product--content-management)
  - [8. Troubleshooting & FAQ](#8-troubleshooting--faq)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Support](#contact--support)

---

## Key Features

| Feature | Description | Technical Implementation |
| :--- | :--- | :--- |
| **Hero Landing Experience** | Marketing landing page with hero slider, featured categories, company highlights, and newsletter module. | `home.html`, CSS keyframe carousels, responsive flex layouts. |
| **Interactive Catalogue** | High-density product catalogue supporting instant category filtering without page reloads. | `index.html`, `js/app.js`, dynamic DOM grid manipulation. |
| **Multi-Finish Swapper** | Real-time visual switching across 4 finish variants (Black, White, Grey, Oak). | `js/data.js`, `js/cart.js`, dynamic WebP asset resolution. |
| **Finish Selection Modal** | Interactive overlay modal previewing exact wardrobe variations before adding to cart. | `cart.html`, custom modal overlay JS event listeners. |
| **WhatsApp Checkout** | Instant conversion of cart items into pre-formatted, itemized WhatsApp order messages. | `js/cart.js`, URL encoding, WhatsApp Web/API integration. |
| **DevTools Deterrence** | Detection of browser developer tools to prevent unauthorized inspection and scraping. | `js/wall.js`, `js/protect.js`, DOM inspection timing checks. |
| **Owner Security Gateway** | Administrative bypass gateway page allowing verified site managers to unlock devtools. | `gateway.html`, `localStorage` permission keys with expiration. |
| **Graceful Image Fallback** | Automated fallback image handler targeting broken or missing asset paths. | `js/image-fallback.js`, native image error event handling. |

---

## Technology Stack

```text
+-----------------------------------------------------------------------+
|                             FRONTEND LAYER                            |
|  +-------------------+   +-------------------+   +-----------------+  |
|  |  HTML5 Semantics  |   |    CSS3 Custom    |   | Vanilla JS ES6  |  |
|  | (Layout & Pages)  |   | (Themes & Grid)   |   | (Data & Logic)  |  |
|  +-------------------+   +-------------------+   +-----------------+  |
+-----------------------------------------------------------------------+
|                            ASSETS & DATA                              |
|  +-------------------+   +-------------------+   +-----------------+  |
|  | WebP Image Sets   |   | JSON-based Objects|   | Local Storage   |  |
|  | (4 Finish Trees)  |   | (js/data.js Data) |   | (Cart & Bypass) |  |
|  +-------------------+   +-------------------+   +-----------------+  |
+-----------------------------------------------------------------------+
|                           INTEGRATIONS                                |
|  +-----------------------------------------------------------------+  |
|  | WhatsApp API Checkout Direct Integration                        |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

---

## System Architecture & Data Flows

### 1. Multi-Finish Image Path Resolution

```text
Product Data Request (relativePath: "2 door/simple/no mirror.webp")
                           |
       +-------------------+-------------------+
       |                   |                   |
       v                   v                   v
   Black Finish       White Finish        Grey Finish        Oak Finish
  "black/2 door/..." "white/2 door/..." "grey/2 door/..." "oak/2 door/..."
       |                   |                   |                   |
       +-------------------+-------------------+-------------------+
                           |
                    Image Render
                           |
                 (If File Missing)
                           |
                js/image-fallback.js
                           |
                   pics/fallback.webp
```

### 2. DevTools Guard & Bypass Flow

```text
User Navigates to Protected Page (e.g. index.html)
                           |
             Does Valid Owner Bypass Exist?
                           |
              +------------+------------+
              |                         |
            YES                        NO
              |                         |
      DevTools Guard           DevTools Detection
         Bypassed              Active via js/wall.js
              |                         |
      Normal Site Access       DevTools Opened?
                                        |
                         +--------------+--------------+
                         |                             |
                       YES                            NO
                         |                             |
                 Redirect to                  Normal Site Access
               restricted.html
```

---

## Interactive Technical Deep-Dive

Click on any section below to expand detailed documentation.

<details>
<summary><b>1. Page Hierarchy & Functionality</b></summary>

<br>

### Application Pages

1. **`home.html` (Landing Page)**
   - Displays primary brand identity, rotating hero carousel banners, product category highlights, value proposition badges, FAQ accordion, and newsletter subscription form.
   - Entry point for first-time visitors with direct navigation buttons to catalogue sections.

2. **`index.html` (Catalogue Grid)**
   - Renders the full product catalogue grid fed dynamically from `js/data.js`.
   - Includes real-time category filtering tabs (e.g., 2 Door, 3 Door, Sliding Wardrobes).
   - Card components feature interactive image carousels across available finishes.

3. **`product.html` (Detailed Product View)**
   - Provides full product specifications including dimensions (Width, Height, Depth), finish toggles, product code, description copy, and stock status.
   - Includes an inline finish swapper that immediately updates the main showcase image.

4. **`cart.html` (Shopping Cart & Modal View)**
   - Interactive shopping cart interface rendering itemized line items grouped by finish selection.
   - Calculates item sub-totals, grand totals, and shipping notes.
   - Features a finish selection modal previewing wardrobe variations prior to checkout.

5. **`gateway.html` (Owner Gateway)**
   - Administrative activation page for site owners and maintainers.
   - Allows temporary authorization to bypass client-side protection scripts during site maintenance and content auditing.

6. **`restricted.html` (Access Denied View)**
   - Security fallback page shown when developer tools inspection is triggered on protected pages without authorization.

</details>

<details>
<summary><b>2. Multi-Finish Image Resolution Engine</b></summary>

<br>

### Dynamic Image Path Construction

To optimize asset storage and eliminate duplicated logic, every wardrobe model is defined once in `js/data.js` with a single `relativePath` string property.

#### Product Schema Example (`js/data.js`):

```javascript
{
    id: "wardrobe-2d-simple",
    name: "2 door / simple / no mirror",
    category: "2 door",
    price: 404,
    relativePath: "2 door/simple/no mirror.webp",
    dimensions: {
        width: "120 cm",
        height: "215 cm",
        depth: "62 cm"
    }
}
```

#### Finish Resolution Logic (`js/data.js` / `js/cart.js`):

```javascript
function getProductImagePath(relativePath, finish) {
    const validFinishes = ['black', 'white', 'grey', 'oak'];
    const selectedFinish = validFinishes.includes(finish.toLowerCase())
        ? finish.toLowerCase()
        : 'black';
    return `${selectedFinish}/${relativePath}`;
}
```

#### Asset Folder Structure Requirement

For a given product with `relativePath: "2 door/simple/no mirror.webp"`, the directory structure must contain the corresponding asset in all finish folders:

```text
HF-Furniture/
├── black/2 door/simple/no mirror.webp
├── white/2 door/simple/no mirror.webp
├── grey/2 door/simple/no mirror.webp
└── oak/2 door/simple/no mirror.webp
```

If an asset is missing or corrupted, `js/image-fallback.js` intercepts the `onerror` DOM event and gracefully substitutes `pics/fallback.webp`.

</details>

<details>
<summary><b>3. Cart Pipeline & WhatsApp Checkout</b></summary>

<br>

### Order Generation Pipeline

1. **State Persistence**: Cart items are serialized into JSON and stored in browser `localStorage` under key `hf_cart_data`.
2. **Finish Isolation**: Each item in the cart is indexed by `productId + "_" + finish`, allowing users to purchase the same wardrobe in multiple finishes simultaneously.
3. **Payload Formatting**: Upon clicking "Order via WhatsApp", `js/cart.js` constructs a URI-encoded text message payload summarizing order contents, quantities, selected finishes, total cost, and customer details.

#### Sample WhatsApp Payload String:

```text
New Order Request - HF-Furniture Collection
-------------------------------------------
Items:
1. 2 door / simple / no mirror
   - Finish: Oak
   - Quantity: 1
   - Price: £404

2. 3 door / mirror / drawers
   - Finish: White
   - Quantity: 2
   - Price: £1,100

-------------------------------------------
Total Amount: £1,504
Please confirm stock availability and delivery options.
```

4. **Redirection**: The app launches `https://wa.me/447476748064?text=<ENCODED_PAYLOAD>` directly opening WhatsApp Web or Mobile App.

</details>

<details>
<summary><b>4. Security & DevTools Protection System</b></summary>

<br>

### Protection Engine Details

The repository incorporates a dual-layer client-side deterrence mechanism:

1. **DevTools Inspection Detector (`js/wall.js`)**:
   - Monitors browser window dimensions, inner/outer height variance, and debugger timing thresholds.
   - If DevTools activation is detected, the browser is instantly redirected to `restricted.html`.

2. **Context & Keyboard Protection (`js/protect.js`)**:
   - Blocks right-click context menus (`contextmenu`).
   - Disables common developer shortcuts (`F12`, `Ctrl+Shift+I`, `Ctrl+Shift+J`, `Ctrl+U`, `Cmd+Option+I`).
   - Prevents image dragging and text selection across product galleries.

3. **Owner Bypass Mechanism (`gateway.html`)**:
   - Site maintainers can access `gateway.html` to generate an authenticated session flag in `localStorage`.
   - When present, protection scripts temporarily suspend redirects, enabling developer updates and debugging.

*Note: As this is a static frontend website, client-side protection acts as a surface deterrence against casual copying and inspection.*

</details>

<details>
<summary><b>5. Full Repository Directory Tree</b></summary>

<br>

```text
HF-Furniture/
├── 404.html                      # Custom 404 page
├── CONTRIBUTING.md               # Detailed contribution guidelines
├── LICENSE                       # MIT License file
├── cart.html                     # Shopping cart & finish modal interface
├── gateway.html                  # Administrative owner bypass page
├── google04b13acad8b9153e.html    # Google Webmaster verification file
├── home.html                     # Main landing & marketing showcase page
├── index.html                    # Interactive product catalogue page
├── product.html                  # Single product view & detail page
├── readme.md                     # Technical documentation & project guide
├── restricted.html               # Security fallback redirect target page
├── robots.txt                    # Search engine crawler instructions
├── sitemap.xml                   # XML sitemap for SEO indexing
│
├── black/                        # Image assets for Black finish wardrobe variants
├── white/                        # Image assets for White finish wardrobe variants
├── grey/                         # Image assets for Grey finish wardrobe variants
├── oak/                          # Image assets for Oak finish wardrobe variants
│
├── css/
│   └── style.css                 # Master stylesheet for all pages and components
│
├── js/
│   ├── app.js                    # Catalogue grid rendering & dynamic category filtering
│   ├── cart.js                   # Shopping cart logic, modal handler & WhatsApp link generator
│   ├── data.js                   # Master product database, dimensions & image path utilities
│   ├── description.js            # Textual product copy & long descriptions
│   ├── image-fallback.js         # Global image error handling & fallback router
│   ├── protect.js                # Interaction blocking (context menu, hotkeys, dragging)
│   ├── transition.js             # Page transition effects and animations
│   └── wall.js                   # DevTools detection library & redirect trigger
│
├── docs/                         # Internal documentations & maintenance scripts
│   ├── convert_images.ps1        # PowerShell script for automated WebP image conversion
│   ├── description.md            # Reference notes on product descriptions
│   ├── dimensions.md             # Specification reference for wardrobe dimensions
│   ├── rename.md                 # Batch asset renaming guide
│   └── social-media.md           # Marketing copy & social channel documentation
│
└── pics/                         # Branding assets, hero images & README preview media
    ├── black.webp                # Color finish preview swatch (Black)
    ├── white.webp                # Color finish preview swatch (White)
    ├── grey.webp                 # Color finish preview swatch (Grey)
    ├── fallback.webp             # Global fallback image asset
    ├── hero-1.webp               # Hero slider image 1
    ├── hero-2.webp               # Hero slider image 2
    ├── hero-3.webp               # Hero slider image 3
    ├── hero-4.webp               # Hero slider image 4
    ├── logo.webp                 # Primary brand logo
    ├── logo2.webp                # Secondary brand logo variant
    └── readme/
        └── readme.webp           # README preview screenshot
```

</details>

<details>
<summary><b>6. Local Setup & Workflow</b></summary>

<br>

### Local Development Steps

Because HF-Furniture is built as a static site, no complex build tools, package managers, or compilers are required.

#### Option 1: Python HTTP Server (Recommended)

```bash
# Navigate to project root directory
cd HF-Furniture

# Launch HTTP server on port 8000
python -m http.server 8000
```

Open your browser and navigate to `http://localhost:8000/home.html`.

#### Option 2: Node.js static server (`npx serve`)

```bash
npx serve .
```

#### Option 3: VS Code Live Server Extension

1. Open the repository root directory in Visual Studio Code.
2. Install the **Live Server** extension by extension publisher `ritwickdey`.
3. Right-click `home.html` or `index.html` and select **Open with Live Server**.

</details>

<details>
<summary><b>7. Product & Content Management</b></summary>

<br>

### Management Guide

#### Adding a New Product

1. **Insert Entry in `js/data.js`**:
   ```javascript
   {
       id: "wardrobe-4d-luxury",
       name: "4 door / luxury / full mirror",
       category: "4 door",
       price: 850,
       relativePath: "4 door/luxury/full mirror.webp",
       dimensions: {
           width: "250 cm",
           height: "215 cm",
           depth: "62 cm"
       }
   }
   ```

2. **Add Product Copy in `js/description.js`**:
   ```javascript
   "wardrobe-4d-luxury": "Spacious 4-door wardrobe with full-length mirrored sliding doors and premium shelving."
   ```

3. **Deploy Asset Files**:
   Copy the WebP image to all finish folders:
   - `black/4 door/luxury/full mirror.webp`
   - `white/4 door/luxury/full mirror.webp`
   - `grey/4 door/luxury/full mirror.webp`
   - `oak/4 door/luxury/full mirror.webp`

</details>

<details>
<summary><b>8. Troubleshooting & FAQ</b></summary>

<br>

### Frequently Asked Questions

#### Q: Why am I getting redirected to `restricted.html` when opening the site?
**A:** DevTools detection is active via `js/wall.js`. If you have Developer Tools open in your browser, close them or visit `gateway.html` to enable owner bypass mode.

#### Q: How do I test image paths locally?
**A:** Ensure image filenames and folder names match the exact case-sensitive string specified in `relativePath`. Operating systems like Linux and web servers like Nginx enforce strict case sensitivity.

#### Q: Why are product images showing the placeholder fallback graphic?
**A:** `js/image-fallback.js` loads `pics/fallback.webp` whenever an image path returns a 404 HTTP status code. Check that the image file exists in the selected finish directory.

#### Q: How do I update the WhatsApp recipient phone numbers?
**A:** Edit `js/cart.js` and locate the WhatsApp checkout function `sendWhatsAppOrder()`. Replace the target phone number string with your verified business line.

</details>

---

## Contributing

We welcome contributions! Please review our detailed [CONTRIBUTING.md](CONTRIBUTING.md) guide before submitting pull requests or opening issues.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m "feat: add new feature"`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 HF-Furniture Collection. All rights reserved.

---

## Contact & Support

For business inquiries, order updates, or customer support, connect with HF-Furniture through official communication channels:

- **Facebook**: [HF-Furniture Official Facebook Page](https://www.facebook.com/hf.furniture.co.uk)
- **Instagram**: [HF-Furniture Official Instagram Profile](https://www.instagram.com/hf.furniture.ltd/)
- **Pinterest**: [HF-Furniture Pinterest Board](https://uk.pinterest.com/hffurniturescouk/)
- **WhatsApp Support Line 1**: [+44 7476 748064](https://wa.me/447476748064)
- **WhatsApp Support Line 2**: [+44 7846 689490](https://wa.me/447846689490)
