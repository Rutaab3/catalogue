--     /$$   /$$ /$$$$$$$$         
--    | $$  | $$| $$_____/        
--    | $$  | $$| $$              
--    | $$$$$$$$| $$$$$ 
--    | $$__  $$| $$__/ 
--    | $$  | $$| $$             
--    | $$  | $$| $$            
--    |__/  |__/|__/  



# HF-Furniture Collection

![Project Preview](pics/readme.webp)

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
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="HTML5" width="40" height="40"/> **HTML5** - Semantic markup
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="CSS3" width="40" height="40"/> **CSS3** - Custom styling with modern features
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40"/> **JavaScript (ES6+)** - Vanilla JS for all functionality

### Libraries & Frameworks
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" width="40" height="40"/> **[Bootstrap 5.3.0](https://getbootstrap.com/)** - Responsive grid system
- <img src="https://getbootstrap.com/docs/5.3/assets/img/favicons/favicon-32x32.png" alt="Bootstrap Icons" width="30"/> **[Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/)** - Icon library
- <img src="https://sweetalert2.github.io/images/sweetalert2-logo.png" alt="SweetAlert2" width="100"/> **[SweetAlert2](https://sweetalert2.github.io/)** - Beautiful modal dialogs
- <img src="https://fonts.gstatic.com/s/i/productlogos/fonts/v7/192px.svg" alt="Google Fonts" width="35"/> **[Google Fonts](https://fonts.google.com/)** - Playfair Display & Lato typography

## Project Structure

```
catalogue/
├── index.html              # Main catalogue page with product grid
├── home.html               # Landing page with hero carousel and features
├── product.html            # Product detail page
├── index-old.html          # Backup of previous index
├── product_old.html        # Backup of previous product page
│
├── css/
│   └── style.css           # Custom styles and theming
│
├── js/
│   ├── app.js              # Main app logic and filtering
│   ├── cart.js             # Shopping cart functionality
│   ├── data.js             # Product data definitions
│   ├── description.js      # Product descriptions
│   ├── transition.js       # Page transition effects
│   └── protect.js          # Content protection features
│
├── pics/                   # Images and assets
│   ├── logo.svg            # Site logo
│   ├── logo.webp           # Logo webp format
│   ├── logo2.webp          # Alternative logo
│   ├── hero-1.jpg          # Hero section backgrounds
│   ├── hero-2.jpg
│   ├── hero-3.jpg
│   ├── hero-4.jpg
│   ├── black.webp          # Color swatches
│   ├── grey.webp
│   └── white.webp
│   └── readme.webp         # Project preview image
│
├── Black/                  # Black variant product images
├── Grey/                   # Grey variant product images
├── White/                  # White variant product images
│
└── docs/                   # Documentation files
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

- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/facebook/facebook-original.svg" alt="Facebook" width="20"/> **Facebook**: [@hf.furniture.co.uk](https://www.facebook.com/hf.furniture.co.uk)
- <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" width="20"/> **Instagram**: [@hf.furniture.ltd](https://www.instagram.com/hf.furniture.ltd/)
- <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Pinterest" width="20"/> **Pinterest**: [HF Furniture](https://uk.pinterest.com/hffurniturescouk/)
- <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="20"/> **WhatsApp**: [+44 7476 748064](https://wa.me/447476748064) | [+44 7846 689490](https://wa.me/447846689490)

---

Built by the HF-Furniture team
