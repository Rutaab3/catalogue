--     /$$   /$$ /$$$$$$$$         /$$$$$$$$ /$$   /$$ /$$$$$$$  /$$   /$$ /$$$$$$ /$$$$$$$$ /$$   /$$ /$$$$$$$  /$$$$$$$$
--    | $$  | $$| $$_____/        | $$_____/| $$  | $$| $$__  $$| $$$ | $$|_  $$_/|__  $$__/| $$  | $$| $$__  $$| $$_____/
--    | $$  | $$| $$              | $$      | $$  | $$| $$  \ $$| $$$$| $$  | $$     | $$   | $$  | $$| $$  \ $$| $$      
--    | $$$$$$$$| $$$$$  /$$$$$$| | $$$$$   | $$  | $$| $$$$$$$/| $$ $$ $$  | $$     | $$   | $$  | $$| $$$$$$$/| $$$$$   
--    | $$__  $$| $$__/ |______/  | $$__/   | $$  | $$| $$__  $$| $$  $$$$  | $$     | $$   | $$  | $$| $$__  $$| $$__/   
--    | $$  | $$| $$              | $$      | $$  | $$| $$  \ $$| $$\  $$$  | $$     | $$   | $$  | $$| $$  \ $$| $$      
--    | $$  | $$| $$              | $$      |  $$$$$$/| $$  | $$| $$ \  $$ /$$$$$$   | $$   |  $$$$$$/| $$  | $$| $$$$$$$$
--    |__/  |__/|__/              |__/       \______/ |__/  |__/|__/  \__/|______/   |__/    \______/ |__/  |__/|________/

# HF-Furniture Collection

A modern, responsive **furniture catalogue website** built with vanilla HTML, CSS, and JavaScript.  
Browse elegant wardrobes and furniture by color variants (Black / Grey / White), filter by door count, add items to cart, and complete orders via WhatsApp.

## Features

- **Dynamic Product Grid** with color carousel for each item (Black, Grey, White variants)
- **Smart Filtering** - Filter by category: All, 2 Door, 3 Door, 4 Door, 5 Door, 6 Door, Extras
- **Dynamic Headings** - Page heading updates based on active filter
- **Shopping Cart** - Add items with color selection modal, quantity management
- **WhatsApp Checkout** - Direct order placement via WhatsApp integration
- **Product Details Page** - Individual product pages with color switcher and dimensions
- **Related Products** - Shows similar items from the same category
- **FAQ Section** - Accordion-style frequently asked questions
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Clean design with smooth animations and transitions

## Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with modern features
- **JavaScript (ES6+)** - Vanilla JS for all functionality

### Libraries & Frameworks
- **[Bootstrap 5.3.0](https://getbootstrap.com/)** - Responsive grid system and components
- **[Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/)** - Icon library
- **[SweetAlert2](https://sweetalert2.github.io/)** - Beautiful modal dialogs
- **[Google Fonts](https://fonts.google.com/)** - Playfair Display & Lato typography

## Project Structure

```
catalogue/
├── index.html              # Main catalogue page with product grid
├── home.html              # Landing page with hero carousel and features
├── product.html           # Product detail page
├── index-old.html         # Backup of previous index
├── product_old.html       # Backup of previous product page
│
├── css/
│   └── style.css          # Custom styles and theming
│
├── js/
│   ├── app.js             # Main app logic and filtering
│   ├── cart.js            # Shopping cart functionality
│   ├── data.js            # Product data definitions
│   ├── description.js     # Product descriptions
│   ├── transition.js      # Page transition effects
│   └── protect.js         # Content protection features
│
├── pics/                  # Images and assets
│   ├── logo.svg           # Site logo
│   ├── logo.webp          # Logo webp format
│   ├── logo2.webp         # Alternative logo
│   ├── hero-1.jpg         # Hero section backgrounds
│   ├── hero-2.jpg
│   ├── hero-3.jpg
│   ├── hero-4.jpg
│   ├── black.webp         # Color swatches
│   ├── grey.webp
│   └── white.webp
│
├── Black/                 # Black variant product images
├── Grey/                  # Grey variant product images
├── White/                 # White variant product images
│
└── docs/                  # Documentation files
    ├── dimension.md
    └── dimensions.md
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for best experience)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rutaab3/catalogue.git
   cd catalogue
   ```

2. **Open in browser**
   - Simply open `home.html` or `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **Navigate to the site**
   - Open `http://localhost:8000` in your browser

## Usage

- **Browse Products**: Visit `index.html` to see the full catalogue
- **Filter Items**: Use the dropdown on the right to filter by door count or extras
- **View Details**: Click "View Details" on any product for more information
- **Add to Cart**: Click the cart icon and select your preferred color
- **Checkout**: Click the cart icon in navigation and proceed to WhatsApp checkout

## Customization

### Updating Products
Edit `js/data.js` to add/modify products:
```javascript
{
    name: "Product Name",
    relativePath: "category/product-image.jpg",
    category: "2 door",
    price: 299
}
```

### Updating Descriptions
Edit `js/description.js` to modify product descriptions.

### Styling
Modify `css/style.css` to customize colors, fonts, and layout.

## License

© 2025 HF-Furniture Collection. All rights reserved.

## Contact

- **Website**: [HF-Furniture](https://hf-furniture.co.uk)
- **Facebook**: [@hf.furniture.co.uk](https://www.facebook.com/hf.furniture.co.uk)
- **Instagram**: [@hf.furniture.ltd](https://www.instagram.com/hf.furniture.ltd/)
- **Pinterest**: [HF Furniture](https://uk.pinterest.com/hffurniturescouk/)
- **WhatsApp**: [+44 7476 748064](https://wa.me/447476748064) | [+44 7846 689490](https://wa.me/447846689490)

---

Built by the HF-Furniture team
