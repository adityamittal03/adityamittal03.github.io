// Apply the stored preference before paint. Keep the existing "theme" storage key.
(function() {
    const html = document.documentElement;
    let theme = 'dark';
    try {
        if (localStorage.getItem('theme') === 'light') theme = 'light';
    } catch (_) {
        // Theme switching still works when browser storage is unavailable.
    }
    html.setAttribute('data-theme', theme);

    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.getElementById('dark-mode-toggle');
        if (!toggle) return;

        function updateLabel() {
            const label = html.getAttribute('data-theme') === 'dark'
                ? 'Switch to light mode' : 'Switch to dark mode';
            toggle.setAttribute('aria-label', label);
            toggle.setAttribute('title', label);
        }

        updateLabel();
        toggle.addEventListener('click', function() {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (_) {}
            updateLabel();
        });
    });
})();
