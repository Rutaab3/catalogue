(function () {
    const OWNER_ACTIVATION_CODE = 'iamtheboss';
    const BYPASS_STORAGE_KEY = 'hf-protection-bypass';
    const BYPASS_DURATION_MS = 12 * 60 * 60 * 1000;
    const CONTENT_SHORTCUT_KEYS = new Set(['c', 'u', 's', 'p']);
    const DEVTOOLS_SHORTCUT_KEYS = new Set(['i', 'j', 'c']);

    function getBypassState() {
        try {
            const rawValue = localStorage.getItem(BYPASS_STORAGE_KEY);

            if (!rawValue) {
                return null;
            }

            const parsedValue = JSON.parse(rawValue);

            if (!parsedValue || typeof parsedValue.expiresAt !== 'number') {
                localStorage.removeItem(BYPASS_STORAGE_KEY);
                return null;
            }

            if (Date.now() >= parsedValue.expiresAt) {
                localStorage.removeItem(BYPASS_STORAGE_KEY);
                return null;
            }

            return parsedValue;
        } catch (error) {
            localStorage.removeItem(BYPASS_STORAGE_KEY);
            return null;
        }
    }

    function isBypassActive() {
        return Boolean(getBypassState());
    }

    function activateBypass(code, durationMs = BYPASS_DURATION_MS) {
        if (String(code).trim() !== OWNER_ACTIVATION_CODE) {
            return false;
        }

        const now = Date.now();
        const payload = {
            activatedAt: now,
            expiresAt: now + durationMs
        };

        localStorage.setItem(BYPASS_STORAGE_KEY, JSON.stringify(payload));
        return true;
    }

    function deactivateBypass() {
        localStorage.removeItem(BYPASS_STORAGE_KEY);
    }

    function getProtectionMode() {
        return document.body?.dataset?.protection || 'full';
    }

    function shouldSkipGuardProtection() {
        return getProtectionMode() === 'off';
    }

    function shouldEnableWallProtection() {
        return getProtectionMode() === 'full';
    }

    function getProtectionRedirectUrl() {
        const customRedirect = document.body?.dataset?.protectionRedirect;
        return new URL(customRedirect || 'restricted.html', window.location.href).href;
    }

    function isCurrentProtectionPage(targetUrl) {
        const currentUrl = new URL(window.location.href);
        const resolvedTargetUrl = new URL(targetUrl, currentUrl.href);

        return currentUrl.origin === resolvedTargetUrl.origin && currentUrl.pathname === resolvedTargetUrl.pathname;
    }

    function getProtectionRewriteHtml() {
        return [
            '<!DOCTYPE html>',
            '<html lang="en">',
            '<head>',
            '<meta charset="UTF-8">',
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '<title>Access Restricted</title>',
            '<style>',
            'body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #111; color: #fff; font-family: Georgia, serif; }',
            '.lock-screen { max-width: 32rem; padding: 2rem; text-align: center; }',
            '.lock-screen h1 { margin-bottom: 0.75rem; font-size: clamp(2rem, 4vw, 3rem); }',
            '.lock-screen p { margin: 0; color: rgba(255,255,255,0.75); line-height: 1.6; }',
            '</style>',
            '</head>',
            '<body>',
            '<main class="lock-screen">',
            '<h1>Developer tools are not allowed.</h1>',
            '<p>Close developer tools and reload the page to continue browsing the HF-Furniture collection.</p>',
            '</main>',
            '</body>',
            '</html>'
        ].join('');
    }

    function initializeWallProtection() {
        if (typeof window.DisableDevtool !== 'function') {
            return;
        }

        const redirectUrl = getProtectionRedirectUrl();

        const wallOptions = {
            url: redirectUrl,
            timeOutUrl: redirectUrl,
            clearIntervalWhenDevOpenTrigger: true,
            clearLog: true,
            disableMenu: false,
            disableSelect: false,
            disableCopy: false,
            disableCut: false,
            disablePaste: false
        };

        if (isCurrentProtectionPage(redirectUrl)) {
            delete wallOptions.url;
            delete wallOptions.timeOutUrl;
            wallOptions.rewriteHTML = getProtectionRewriteHtml();
        }

        window.DisableDevtool(wallOptions);
    }

    function isEditableTarget(target) {
        if (!(target instanceof HTMLElement)) {
            return false;
        }

        const tagName = target.tagName;
        return tagName === 'INPUT' || tagName === 'TEXTAREA' || target.isContentEditable;
    }

    function getBlockedShortcutType(event) {
        const key = String(event.key || '').toLowerCase();
        const usesPrimaryModifier = event.ctrlKey || event.metaKey;

        if (key === 'f12' || (usesPrimaryModifier && event.shiftKey && DEVTOOLS_SHORTCUT_KEYS.has(key))) {
            return 'devtools';
        }

        if (usesPrimaryModifier && CONTENT_SHORTCUT_KEYS.has(key)) {
            return 'content';
        }

        return null;
    }

    function showProtectionMessage() {
        const existing = document.getElementById('protection-msg');
        if (existing) {
            existing.remove();
        }

        const msg = document.createElement('div');
        msg.id = 'protection-msg';
        msg.innerText = "Can't do that!";

        Object.assign(msg.style, {
            position: 'fixed',
            backgroundColor: 'rgba(255, 0, 25, 0.77)',
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

        document.body.appendChild(msg);

        requestAnimationFrame(() => {
            msg.style.opacity = '1';
            msg.style.transform = 'translate(-50%, 10px)';
        });

        setTimeout(() => {
            msg.style.opacity = '0';
            msg.style.transform = 'translate(-50%, 0px)';
            setTimeout(() => msg.remove(), 300);
        }, 1500);
    }

    window.ProtectionAccess = {
        activate(code, durationMs) {
            return activateBypass(code, durationMs);
        },
        deactivate() {
            deactivateBypass();
        },
        isActive() {
            return isBypassActive();
        },
        getStatus() {
            return getBypassState();
        }
    };

    if (shouldSkipGuardProtection() || isBypassActive()) {
        return;
    }

    if (shouldEnableWallProtection()) {
        initializeWallProtection();
    }

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showProtectionMessage();
    });

    document.addEventListener('keydown', (e) => {
        const shortcutType = getBlockedShortcutType(e);

        if (!shortcutType) {
            return;
        }

        if (shortcutType === 'content' && isEditableTarget(e.target)) {
            return;
        }

        e.preventDefault();
        showProtectionMessage();
    });

    ['copy', 'cut'].forEach((eventName) => {
        document.addEventListener(eventName, (e) => {
            if (isEditableTarget(e.target)) {
                return;
            }

            e.preventDefault();
            showProtectionMessage();
        });
    });

    document.addEventListener('dragstart', (e) => {
        if (!(e.target instanceof HTMLImageElement)) {
            return;
        }

        e.preventDefault();
        showProtectionMessage();
    });
})();
