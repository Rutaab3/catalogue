

document.addEventListener('DOMContentLoaded', () => {
    // Ensure body is visible initially (removed fade-out if present, though defaults to visible)
    document.body.style.opacity = '1';

    // Link Interceptor
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            // Logic:
            // 1. Must have href
            // 2. Must not be # (anchor)
            // 3. Must not be external (start with http/https unless same origin - keeping simple for now functionality)
            // 4. Must not be target="_blank"
            // 5. Check if it's a real navigation
            
            if (href && href !== '#' && !href.startsWith('#') && target !== '_blank' && !href.startsWith('javascript:')) {
                // If it is an internal link (relative path) or same domain
                e.preventDefault();
                
                // Add fade out class
                document.body.classList.add('fade-out');

                // Wait for animation
                setTimeout(() => {
                    window.location.href = href;
                }, 100); // 500ms matches CSS
            }
        });
    });
});

// Handle browser back button (pageshow)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('fade-out');
    }
});
