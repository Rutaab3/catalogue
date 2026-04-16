const Cart = {
    key: 'shoppingCart',
    cartPage: 'cart.html',
    phoneNumber: '923122853974',
    currencySymbol: '\u00A3',

    get() {
        try {
            const stored = localStorage.getItem(this.key);
            const parsed = stored ? JSON.parse(stored) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    },

    save(cart) {
        localStorage.setItem(this.key, JSON.stringify(cart));
    },

    getDefaultColor() {
        return getDefaultFinishLabel();
    },

    add(productPath, color = getDefaultFinishLabel()) {
        const cart = this.get();
        const normalizedColor = getFinishOption(color).label;
        const existingItem = cart.find((item) => (
            item.path === productPath && getFinishOption(item.color).label === normalizedColor
        ));

        if (existingItem) {
            existingItem.qty = (existingItem.qty || 1) + 1;
        } else {
            cart.push({ path: productPath, qty: 1, color: normalizedColor });
        }

        this.save(cart);
        this.updateUI();
        return true;
    },

    remove(productPath, color) {
        const normalizedColor = getFinishOption(color).label;
        const nextCart = this.get().filter((item) => !(
            item.path === productPath && getFinishOption(item.color).label === normalizedColor
        ));
        this.save(nextCart);
        this.updateUI();
    },

    increment(productPath, color) {
        this.changeQuantity(productPath, color, 1);
    },

    decrement(productPath, color) {
        this.changeQuantity(productPath, color, -1);
    },

    changeQuantity(productPath, color, delta) {
        const cart = this.get();
        const normalizedColor = getFinishOption(color).label;
        const itemIndex = cart.findIndex((item) => (
            item.path === productPath && getFinishOption(item.color).label === normalizedColor
        ));

        if (itemIndex === -1) {
            return;
        }

        const item = cart[itemIndex];
        const nextQty = Math.max(0, (item.qty || 1) + delta);

        if (nextQty === 0) {
            cart.splice(itemIndex, 1);
        } else {
            item.qty = nextQty;
        }

        this.save(cart);
        this.updateUI();
    },

    has(productPath, color) {
        const normalizedColor = color ? getFinishOption(color).label : null;

        return this.get().some((item) => (
            item.path === productPath && (!normalizedColor || getFinishOption(item.color).label === normalizedColor)
        ));
    },

    isCartPage() {
        const path = window.location.pathname.toLowerCase();
        return path.endsWith('/cart.html') || path.endsWith('cart.html');
    },

    show() {
        if (this.isCartPage()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        window.location.href = this.cartPage;
    },

    showColorModal(productPath, productName) {
        this.injectColorModal();

        if (typeof bootstrap === 'undefined') {
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('colorSelectionModal'));

        document.getElementById('colorModalProductName').innerText = productName;
        document.getElementById('colorModalProductPath').value = productPath;
        this.updateColorModalChoices(productPath, productName);

        document.querySelectorAll('.color-choice').forEach((button) => button.classList.remove('selected'));
        const defaultChoice = document.querySelector(`.color-choice[data-color="${this.getDefaultColor()}"]`);
        if (defaultChoice) {
            defaultChoice.classList.add('selected');
        }

        modal.show();
    },

    confirmColorSelection() {
        const productPath = document.getElementById('colorModalProductPath').value;
        const selectedColor = document.querySelector('.color-choice.selected')?.getAttribute('data-color') || this.getDefaultColor();

        this.add(productPath, selectedColor);

        if (typeof bootstrap !== 'undefined') {
            const modal = bootstrap.Modal.getInstance(document.getElementById('colorSelectionModal'));
            if (modal) {
                modal.hide();
            }
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Added to Cart (${selectedColor})!`,
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            background: '#212529',
            color: '#fff',
            customClass: {
                popup: 'shadow-lg'
            }
        });
    },

    getDetails() {
        return this.get()
            .map((cartItem) => {
                const product = products.find((entry) => entry.relativePath === cartItem.path);

                if (!product) {
                    return null;
                }

                const qty = Math.max(1, Number(cartItem.qty) || 1);
                const color = getFinishOption(cartItem.color).label;
                const price = Number(product.price) || 404;

                return {
                    product,
                    qty,
                    color,
                    price,
                    lineTotal: price * qty,
                    imagePath: getProductImagePath(product.relativePath, color),
                    detailUrl: `product.html?path=${encodeURIComponent(product.relativePath)}`
                };
            })
            .filter(Boolean);
    },

    getCount(items = this.getDetails()) {
        return items.reduce((total, item) => total + item.qty, 0);
    },

    getSubtotal(items = this.getDetails()) {
        return items.reduce((total, item) => total + item.lineTotal, 0);
    },

    formatCurrency(value) {
        return `${this.currencySymbol}${Number(value).toFixed(2)}`;
    },

    formatItemCount(count) {
        return `${count} ${count === 1 ? 'item' : 'items'}`;
    },

    escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    updateUI() {
        const items = this.getDetails();
        const count = this.getCount(items);
        const subtotal = this.getSubtotal(items);

        document.querySelectorAll('.cart-count').forEach((element) => {
            element.innerText = count;
        });

        this.renderCartPage(items, count, subtotal);
    },

    renderCartPage(items, count, subtotal) {
        const list = document.getElementById('cartPageItems');

        const countTargets = [
            document.getElementById('cartPageCount'),
            document.getElementById('cartSummaryCount')
        ].filter(Boolean);

        countTargets.forEach((element) => {
            element.textContent = this.formatItemCount(count);
        });

        const subtotalTargets = [
            document.getElementById('cartSummarySubtotal'),
            document.getElementById('cartGrandTotal')
        ].filter(Boolean);

        subtotalTargets.forEach((element) => {
            element.textContent = this.formatCurrency(subtotal);
        });

        const hint = document.getElementById('cartSummaryHint');
        if (hint) {
            hint.textContent = count
                ? 'Your order opens in WhatsApp with all selected items, finishes, and quantities prefilled.'
                : 'Add furniture pieces to your cart and the WhatsApp checkout will be ready here.';
        }

        const checkoutButton = document.getElementById('cartCheckoutBtn');
        if (checkoutButton) {
            checkoutButton.disabled = count === 0;
        }

        if (!list) {
            return;
        }

        if (!items.length) {
            list.innerHTML = `
                <div class="cart-empty-state text-center">
                    <div class="cart-empty-icon">
                        <i class="bi bi-bag-x"></i>
                    </div>
                    <p class="text-uppercase small text-muted mb-2">No items yet</p>
                    <h3 class="mb-3">Your cart is empty</h3>
                    <p class="text-muted mb-4">Browse the catalogue, choose your finish, and build your order here.</p>
                    <a href="index.html" class="btn btn-dark px-4 py-3 text-uppercase">Explore Catalogue</a>
                </div>
            `;
            return;
        }

        list.innerHTML = items
            .map((item) => {
                const productName = this.escapeHtml(item.product.name);
                const itemColor = this.escapeHtml(item.color);
                const unitPrice = this.formatCurrency(item.price);
                const lineTotal = this.formatCurrency(item.lineTotal);

                return `
                    <article class="cart-line-item">
                        <div class="cart-line-media">
                            <img src="${item.imagePath}" alt="${productName}" onerror="ImageFallback.handle(this)">
                        </div>
                        <div class="cart-line-content">
                            <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                                <div>
                                    <p class="text-uppercase small text-muted mb-2">${this.escapeHtml(item.product.category)}</p>
                                    <h3 class="cart-line-title mb-2">${productName}</h3>
                                    <div class="d-flex align-items-center gap-3 flex-wrap">
                                        <span class="cart-finish-badge">${itemColor}</span>
                                        <a href="${item.detailUrl}" class="cart-inline-link">View details</a>
                                    </div>
                                </div>
                                <div class="text-lg-end">
                                    <p class="text-uppercase small text-muted mb-2">Unit Price</p>
                                    <div class="cart-line-price">${unitPrice}</div>
                                </div>
                            </div>
                            <div class="cart-line-footer">
                                <div class="qty-control" aria-label="Quantity controls">
                                    <button type="button" class="qty-control-btn" onclick="Cart.decrement('${item.product.relativePath}', '${item.color}')" aria-label="Decrease quantity">
                                        <i class="bi bi-dash-lg"></i>
                                    </button>
                                    <span class="qty-control-value">${item.qty}</span>
                                    <button type="button" class="qty-control-btn" onclick="Cart.increment('${item.product.relativePath}', '${item.color}')" aria-label="Increase quantity">
                                        <i class="bi bi-plus-lg"></i>
                                    </button>
                                </div>
                                <div class="cart-line-actions">
                                    <span class="cart-line-total">${lineTotal}</span>
                                    <button type="button" class="btn btn-link cart-remove-btn" onclick="Cart.remove('${item.product.relativePath}', '${item.color}')">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
            })
            .join('');
    },

    buildCheckoutUrl() {
        const items = this.getDetails();

        if (!items.length) {
            return null;
        }

        const lines = ['Hello, I would like to place an order:', ''];

        items.forEach((item) => {
            lines.push(`- ${item.qty}x ${item.product.name} (${item.color}) - ${this.formatCurrency(item.lineTotal)}`);
        });

        lines.push('', `Total: ${this.formatCurrency(this.getSubtotal(items))}`);

        return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    },

    checkout() {
        const checkoutUrl = this.buildCheckoutUrl();

        if (!checkoutUrl) {
            Swal.fire({
                icon: 'warning',
                title: 'Cart is empty',
                text: 'Please add items to your cart first.',
                confirmButtonColor: '#000'
            });
            return;
        }

        window.open(checkoutUrl, '_blank', 'noopener');
    },

    init() {
        this.injectColorModal();

        const checkoutButton = document.getElementById('cartCheckoutBtn');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => this.checkout());
        }

        this.updateUI();
        window.addEventListener('storage', () => this.updateUI());
    },

    updateColorModalChoices(productPath, productName) {
        document.querySelectorAll('.color-choice').forEach((button) => {
            const finishLabel = getFinishOption(button.getAttribute('data-color')).label;
            const preview = button.querySelector('.finish-choice-preview');

            if (!preview) {
                return;
            }

            ImageFallback.setSource(
                preview,
                getProductImagePath(productPath, finishLabel),
                `${productName} - ${finishLabel}`
            );
        });
    },

    injectColorModal() {
        if (document.getElementById('colorSelectionModal')) {
            return;
        }

        const colorChoicesHtml = productFinishes.map((finish) => {
            const isSelected = finish.label === this.getDefaultColor() ? ' selected' : '';

            return `
                <button class="color-choice${isSelected}" data-color="${finish.label}" onclick="document.querySelectorAll('.color-choice').forEach((button) => button.classList.remove('selected')); this.classList.add('selected');">
                    <img class="finish-choice-preview" src="pics/fallback.webp" alt="${finish.label}" loading="lazy" onerror="ImageFallback.handle(this)">
                    <span class="finish-choice-label mt-2">${finish.label}</span>
                </button>
            `;
        }).join('');

        const modalHtml = `
            <div class="modal fade" id="colorSelectionModal" tabindex="-1" aria-labelledby="colorSelectionModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content bg-dark text-white">
                        <div class="modal-header border-secondary">
                            <h5 class="modal-title" id="colorSelectionModalLabel" style="font-family: 'Playfair Display', serif;">Choose Finish</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="colorModalProductPath" value="">
                            <p class="mb-3 text-center" id="colorModalProductName" style="font-size: 1.1rem; font-weight: 500;">Product Name</p>
                            <p class="text-white text-center mb-4" style="font-size: 0.9rem;">Select your preferred finish:</p>
                            <div class="d-flex justify-content-center gap-3 flex-wrap">
                                ${colorChoicesHtml}
                            </div>
                        </div>
                        <div class="modal-footer border-secondary">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-dark" onclick="Cart.confirmColorSelection()">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = modalHtml.trim();
        document.body.appendChild(wrapper.firstElementChild);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
});
