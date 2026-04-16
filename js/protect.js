(function () {
    const OWNER_ACTIVATION_CODE = 'iamtheboss';
    const BYPASS_STORAGE_KEY = 'hf-protection-bypass';
    const BYPASS_DURATION_MS = 12 * 60 * 60 * 1000;

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

    function shouldSkipProtection() {
        const pagePath = window.location.pathname.toLowerCase();
        const bodyFlag = document.body?.dataset?.protection;

        return bodyFlag === 'off' || pagePath.endsWith('/gateway.html') || pagePath.endsWith('gateway.html');
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

    if (shouldSkipProtection() || isBypassActive()) {
        return;
    }

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showProtectionMessage();
    });

    document.addEventListener('keydown', (e) => {
        if (
            (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) ||
            e.key === 'F12'
        ) {
            e.preventDefault();
            showProtectionMessage();
        }
    });
})();
