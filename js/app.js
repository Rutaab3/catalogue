document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const filterSelect = document.getElementById('filterSelect');
    const collectionHeading = document.getElementById('collectionHeading');

    // Helper to get filter from URL
    function getFilterFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('filter') || 'all';
    }

    // Helper to update heading based on filter
    function updateHeading(filter) {
        if (!collectionHeading) return;
        
        const headingMap = {
            'all': 'Our Collection',
            '2 door': '2 Door Collection',
            '3 door': '3 Door Collection',
            '4 door': '4 Door Collection',
            '5 door': '5 Door Collection',
            '6 door': '6 Door Collection',
            'extras': 'Extras Collection'
        };
        
        collectionHeading.textContent = headingMap[filter] || 'Our Collection';
    }

    // Initial render based on URL
    const initialFilter = getFilterFromUrl();
    applyFilter(initialFilter);

    // Handle bfcache (back button)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            applyFilter(getFilterFromUrl()); // Re-apply filter from URL
        }
    });

    // Filter logic
    function applyFilter(filter) {
        // Update select dropdown value
        if (filterSelect) {
            filterSelect.value = filter;
        }

        // Update heading
        updateHeading(filter);

        if (filter === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === filter);
            renderProducts(filtered);
        }
    }

    // Event listener for select dropdown
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const filter = e.target.value;
            
            // Update URL without reload
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('filter', filter);
            window.history.pushState({}, '', newUrl);

            applyFilter(filter);
        });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        applyFilter(getFilterFromUrl());
    });

    function getDimensions(item) {
        // Direct category match
        if (dimensions[item.category] && item.category !== 'extras') {
            return dimensions[item.category];
        }

        // Logic for 'extras'
        if (item.category === 'extras') {
            const lowerName = item.name.toLowerCase();
            const extrasDims = dimensions['extras'];
            
            if (lowerName.includes('bedside')) return extrasDims['bedside'];
            if (lowerName.includes('5') && lowerName.includes('chest')) {
                if (lowerName.includes('x2')) return extrasDims['5x2 chest'];
                return extrasDims['5 chest'];
            }
            if (lowerName.includes('4') && lowerName.includes('chest')) {
                if (lowerName.includes('x2')) return extrasDims['4x2 chest'];
                return extrasDims['4 chest'];
            }
            if (lowerName.includes('3') && lowerName.includes('x2')) return extrasDims['3x2 chest'];
            if (lowerName.includes('6') && lowerName.includes('chest')) return extrasDims['6 chest'];
        }

        return null;
    }

    function renderProducts(items) {
        productGrid.innerHTML = '';
        
        items.forEach((item, index) => {
            // Construct paths for 3 colors
            const colors = ['Black', 'Grey', 'White'];
            // Create Carousel ID
            const carouselId = `carousel-${index}`;
            
            let carouselItemsHtml = '';
            colors.forEach((color, i) => {
                const activeClass = i === 0 ? 'active' : '';
                // Encode spaces in path
                const imagePath = `${color}/${item.relativePath}`;
                const encodedPath = encodeURI(imagePath);
                
                carouselItemsHtml += `
                    <div class="carousel-item ${activeClass}" data-bs-interval="3000">
                        <img src="${encodedPath}" class="d-block w-100" alt="${item.name}" loading="lazy" style="height: 300px; object-fit: contain;">
                    </div>
                `;
            });

            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-6 col-xl-4 col-xxl-3 fade-in';
            col.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
            col.style.opacity = '0'; // Initial state for animation

            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel" data-bs-pause="false">
                        <div class="carousel-inner bg-light">
                            ${carouselItemsHtml}
                        </div>
                    </div>
                    
                    <!-- Cart Button -->
                    <button class="btn position-absolute top-0 end-0 m-2 shadow-sm cart-btn" 
                            data-path="${item.relativePath}" 
                            title="Add to Cart"
                            style="width: 35px; height: 35px; padding: 0; z-index: 10; display: flex; align-items: center; justify-content: center;">
                        <i class="bi bi-cart-plus"></i>
                    </button>

                    <div class="card-body text-center d-flex flex-column">
                        <h6 class="card-title text-capitalize mb-2" style="font-family: 'Playfair Display', serif;">${item.name}</h6>
                        <div class="mt-auto">
                            <h6 class="text-muted small mb-2">£${item.price || 404}</h6>
                            <a href="product.html?path=${encodeURIComponent(item.relativePath)}" class="btn btn-dark w-100">View Details</a>
                        </div>
                    </div>
                </div>
            `;

            productGrid.appendChild(col);
            
            // Initialize carousel manually
            const carouselEl = col.querySelector('.carousel');
            new bootstrap.Carousel(carouselEl, {
                interval: 3000,
                ride: 'carousel',
                pause: false
            });

            // Cart Listener
            const cartBtn = col.querySelector('.cart-btn');
            cartBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                
                // Show color selection modal
                Cart.showColorModal(item.relativePath, item.name);
                
                // Animation
                cartBtn.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartBtn.style.transform = 'scale(1)';
                }, 300);
            });
        });
    }
});
