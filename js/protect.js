// Disable Right Click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showProtectionMessage(e.clientX, e.clientY);
});

// Disable Keyboard Shortcuts (Ctrl+C, Ctrl+U, Ctrl+S, F12)
document.addEventListener('keydown', (e) => {
    if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) || 
        e.key === 'F12'
    ) {
        e.preventDefault();
        showProtectionMessage();
    }
});

// Create and show the message
function showProtectionMessage(x, y) {
    // Remove existing if any
    const existing = document.getElementById('protection-msg');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.id = 'protection-msg';
    msg.innerText = "Can't do that!";
    
    // Style
    Object.assign(msg.style, {
        position: 'fixed',
        backgroundColor: 'rgba(255, 0, 25, 0.77)', // Bootstrap danger red, slightly transparent
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '500',
        pointerEvents: 'none',
        zIndex: '10000',
        boxShadow: '0 4px 12px rgba(221, 0, 22, 0.3)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: '0',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
    });

    // If x and y provided, maybe position near cursor? 
    // User asked for "simple subtle red". Centered top toast is usually cleanest "subtle" notification.
    // Let's stick to top center as it's mobile friendly too.

    document.body.appendChild(msg);

    // Animate in
    requestAnimationFrame(() => {
        msg.style.opacity = '1';
        msg.style.transform = 'translate(-50%, 10px)';
    });

    // Remove after delay
    setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transform = 'translate(-50%, 0px)';
        setTimeout(() => msg.remove(), 300);
    }, 1500);
}
