document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const filterBtns = document.querySelectorAll('.nav-link[data-filter]'); // Updated selector

    // Initial render
    renderProducts(products);

    // Handle bfcache (back button)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            renderProducts(products);
        }
    });

    // Filter event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
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
            col.className = 'col-md-6 col-lg-4 col-xl-3 fade-in';
            col.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
            col.style.opacity = '0'; // Initial state for animation

            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel" data-bs-pause="false">
                        <div class="carousel-inner bg-light rounded-top">
                            ${carouselItemsHtml}
                        </div>
                    </div>
                    
                    <!-- Cart Button -->
                    <button class="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm cart-btn" 
                            data-path="${item.relativePath}" 
                            title="Add to Cart"
                            style="width: 35px; height: 35px; padding: 0; z-index: 10; display: flex; align-items: center; justify-content: center;">
                        <i class="bi bi-cart-plus"></i>
                    </button>

                    <div class="card-body text-center d-flex flex-column">
                        <h6 class="card-title text-capitalize mb-2" style="font-family: 'Playfair Display', serif;">${item.name}</h6>
                        <div class="mt-auto">
                            <h6 class="text-muted small mb-2">£${item.price || 404}</h6>
                            <a href="product.html?path=${encodeURIComponent(item.relativePath)}" class="btn btn-dark w-100 rounded-0">View Details</a>
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
                
                Cart.add(item.relativePath);
                
                // Animation
                cartBtn.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartBtn.style.transform = 'scale(1)';
                }, 300);
                
                // SweetAlert notification
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added to Cart!",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    background: '#212529',
                    color: '#fff',
                    customClass: {
                        popup: 'shadow-lg'
                    }
                });
            });
        });
    }
});
