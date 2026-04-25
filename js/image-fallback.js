(function () {
    const FALLBACK_SRC = 'pics/fallback.webp';

    function rememberAlt(img) {
        if (img && !img.dataset.originalAlt && img.getAttribute('alt')) {
            img.dataset.originalAlt = img.getAttribute('alt');
        }
    }

    window.ImageFallback = {
        src: FALLBACK_SRC,

        handle(img) {
            if (!img) return;

            rememberAlt(img);

            const currentSrc = img.getAttribute('src') || img.currentSrc || '';
            if (!currentSrc || currentSrc.includes(FALLBACK_SRC)) return;

            img.dataset.failedSrc = currentSrc;
            img.src = FALLBACK_SRC;
            img.alt = img.dataset.originalAlt || img.alt || 'Image unavailable';
        },

        setSource(img, src, alt) {
            if (!img) return;

            if (typeof alt === 'string') {
                img.alt = alt;
                img.dataset.originalAlt = alt;
            } else {
                rememberAlt(img);
            }

            delete img.dataset.failedSrc;
            img.src = src;
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img').forEach(rememberAlt);
    });
})();


  const img = new Image();
  img.src = "pics/logo.webp";
  img.onload = () => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Keep aspect ratio, don't stretch
    const scale = Math.min(size / img.width, size / img.height);
    const x = (size - img.width * scale) / 2;
    const y = (size - img.height * scale) / 2;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    const link = document.createElement("link");
    link.rel = "icon";
    link.href = canvas.toDataURL("image/png");
    document.head.appendChild(link);
  };
