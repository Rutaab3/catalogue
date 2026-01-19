const Cart = {
    key: 'shoppingCart',
    
    get() {
        const stored = localStorage.getItem(this.key);
        return stored ? JSON.parse(stored) : [];
    },

    add(productPath) {
        let cart = this.get();
        if (!cart.some(item => item.path === productPath)) {
            cart.push({ path: productPath, qty: 1 });
            localStorage.setItem(this.key, JSON.stringify(cart));
        }
        this.updateUI();
        // this.show(); // User requested to not open cart on add
        return true;
    },

    remove(productPath) {
        let cart = this.get();
        cart = cart.filter(item => item.path !== productPath);
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateUI();
    },

    has(productPath) {
        return this.get().some(item => item.path === productPath);
    },

    show() {
        const offcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
        offcanvas.show();
    },

    updateUI() {
        const cart = this.get();
        const count = cart.reduce((acc, item) => acc + (item.qty || 1), 0); // Count total items including qty
        
        // Update Count Badges
        document.querySelectorAll('.cart-count').forEach(el => el.innerText = count);
        
        // Render List
        const list = document.getElementById('cartItemsList');
        if (!list) return;

        list.innerHTML = '';
        let subtotal = 0;

        cart.forEach(cartItem => {
            const product = products.find(p => p.relativePath === cartItem.path);
            if (!product) return;
            
            // Assuming price is set, defaulting to 404 if missing (safety)
            const price = product.price || 404;
            const qty = cartItem.qty || 1;
            subtotal += price * qty;

             // Construct image path (Default to Black for thumb)
            const imagePath = `Black/${product.relativePath}`; 
            const encodedPath = encodeURI(imagePath);

            const itemHtml = `
                <div class="d-flex align-items-start mb-4 px-2">
                    <img src="${encodedPath}" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover; border-radius: 0;" alt="${product.name}">
                    <div class="ms-3 flex-grow-1">
                        <div class="d-flex justify-content-between">
                             <h6 class="text-uppercase mb-1" style="font-size: 0.9rem; font-weight: 600;">${product.name}</h6>
                             <button class="btn btn-link text-muted p-0 text-decoration-none" onclick="Cart.remove('${product.relativePath}')" style="font-size: 1rem;"><i class="bi bi-x-lg"></i></button>
                        </div>
                        <p class="text-muted mb-2" style="font-size: 0.9rem;">${qty} x £${price.toFixed(2)}</p>
                        <button class="btn btn-dark btn-sm w-100 py-1" 
                                onclick="Cart.increment('${product.relativePath}')"
                                title="Add one more">
                            Add +1
                        </button>
                    </div>
                </div>
            `;
            list.innerHTML += itemHtml;
        });

        // Update Subtotal
        const totalEl = document.getElementById('cartSubtotal');
        if (totalEl) totalEl.innerText = `£${subtotal.toFixed(2)}`;
    },

    increment(productPath) {
        let cart = this.get();
        const item = cart.find(i => i.path === productPath);
        if (item) {
            item.qty = (item.qty || 1) + 1;
            localStorage.setItem(this.key, JSON.stringify(cart));
            this.updateUI();
        }
    },

    checkout() {
        const cart = this.get();
        if (cart.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Cart is empty',
                text: 'Please add items to your cart first.',
                confirmButtonColor: '#000'
            });
            return;
        }

        let message = "Hello, I would like to place an order:%0a%0a";
        let total = 0;

        cart.forEach(item => {
            const product = products.find(p => p.relativePath === item.path);
            if (product) {
                const price = product.price || 0;
                const lineTotal = price * item.qty;
                total += lineTotal;
                message += `• ${item.qty}x ${product.name} - £${lineTotal.toFixed(2)}%0a`;
            }
        });

        message += `%0a*Total: £${total.toFixed(2)}*`;

        const phoneNumber = "923122853974";
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, '_blank');
    },

    init() {
        this.injectOverlay();
        this.updateUI();
    },

    injectOverlay() {
        if (document.getElementById('cartOffcanvas')) return;

        const overlayHtml = `
        <div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel" style="width: 100%; max-width: 400px;">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title" id="cartOffcanvasLabel" style="font-family: 'Playfair Display', serif;">
                    Shopping Cart 
                    <span class="badge bg-black cart-count" style="font-size: 0.8rem; vertical-align: top;">0</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column">
                <div id="cartItemsList" class="flex-grow-1 overflow-auto">
                    <!-- Items go here -->
                </div>
                
                <div class="mt-auto pt-4 border-top">
                    <div class="d-flex justify-content-between mb-4">
                        <span class="fw-bold text-uppercase">Subtotal:</span>
                        <span class="fw-bold" id="cartSubtotal">£0.00</span>
                    </div>
                    <div class="d-grid gap-2">
                         <button class="btn btn-outline-dark text-uppercase py-2">View Cart</button>
                         <button class="btn btn-dark text-uppercase py-2" onclick="Cart.checkout()">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        // Create a wrapper to insert
        const div = document.createElement('div');
        div.innerHTML = overlayHtml;
        document.body.appendChild(div.firstElementChild);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
});
