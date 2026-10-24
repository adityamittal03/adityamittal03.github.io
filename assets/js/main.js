// CRAFT video tabs: one tab stop, arrow-key navigation, and native video controls.
function initCraftVideoSwitchers(refreshPlayback) {
    const narrowScreen = window.matchMedia('(max-width: 520px)');

    document.querySelectorAll('[data-craft-video-switcher]').forEach(function(switcher) {
        const tablist = switcher.querySelector('[role="tablist"]');
        const tabs = Array.from(switcher.querySelectorAll('[role="tab"]'));
        const panels = Array.from(switcher.querySelectorAll('[role="tabpanel"]'));
        if (!tablist || !tabs.length) return;

        function updateOrientation() {
            tablist.setAttribute('aria-orientation', narrowScreen.matches ? 'vertical' : 'horizontal');
        }

        function activateTab(activeTab) {
            tabs.forEach(function(tab) {
                const isActive = tab === activeTab;
                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', String(isActive));
                tab.tabIndex = isActive ? 0 : -1;
            });

            panels.forEach(function(panel) {
                const isActive = panel.id === activeTab.getAttribute('aria-controls');
                panel.classList.toggle('is-active', isActive);
                panel.hidden = !isActive;
            });
            refreshPlayback();
        }

        tabs.forEach(function(tab, index) {
            tab.addEventListener('click', function() { activateTab(tab); });
            tab.addEventListener('keydown', function(event) {
                const previous = narrowScreen.matches ? 'ArrowUp' : 'ArrowLeft';
                const next = narrowScreen.matches ? 'ArrowDown' : 'ArrowRight';
                let target;
                if (event.key === previous) target = (index - 1 + tabs.length) % tabs.length;
                else if (event.key === next) target = (index + 1) % tabs.length;
                else if (event.key === 'Home') target = 0;
                else if (event.key === 'End') target = tabs.length - 1;
                else return;
                event.preventDefault();
                activateTab(tabs[target]);
                tabs[target].focus();
            });
        });

        updateOrientation();
        narrowScreen.addEventListener('change', updateOrientation);
        activateTab(tabs.find(function(tab) { return tab.getAttribute('aria-selected') === 'true'; }) || tabs[0]);
    });
}

// Play muted demos only while visible. Reduced-motion users retain manual controls.
function initVideoPlayback(videos) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const manuallyPaused = new WeakSet();
    const automaticPauses = new WeakSet();

    function isVisible(video) {
        if (document.hidden || video.closest('[hidden]')) return false;
        const rect = video.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
        return rect.width > 0 && rect.height > 0 && visibleHeight * visibleWidth / (rect.width * rect.height) >= 0.35;
    }

    function pauseVideo(video) {
        if (!video.paused) {
            automaticPauses.add(video);
            video.pause();
        }
    }

    function refresh() {
        videos.forEach(function(video) {
            if (!isVisible(video)) {
                pauseVideo(video);
            } else if (!reducedMotion.matches && video.muted && !manuallyPaused.has(video)) {
                // A browser may decline autoplay; the controls remain available.
                const playing = video.play();
                if (playing) playing.catch(function() {});
            }
        });
    }

    videos.forEach(function(video) {
        video.addEventListener('pause', function() {
            if (automaticPauses.has(video)) automaticPauses.delete(video);
            else manuallyPaused.add(video);
        });
        video.addEventListener('play', function() { manuallyPaused.delete(video); });
        const rate = Number(video.dataset.playbackRate);
        if (Number.isFinite(rate) && rate > 0) {
            video.defaultPlaybackRate = rate;
            video.playbackRate = rate;
            video.addEventListener('loadedmetadata', function() { video.playbackRate = rate; });
        }
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(refresh, { threshold: [0, 0.35, 0.7] });
        videos.forEach(function(video) { observer.observe(video); });
    } else {
        window.addEventListener('scroll', refresh, { passive: true });
        window.addEventListener('resize', refresh);
    }
    document.addEventListener('visibilitychange', refresh);
    reducedMotion.addEventListener('change', function() {
        if (reducedMotion.matches) videos.forEach(pauseVideo);
        else refresh();
    });
    return refresh;
}

function initPage() {
    const videos = Array.from(document.querySelectorAll('video'));
    if (!videos.length) return;
    const refreshPlayback = initVideoPlayback(videos);
    initCraftVideoSwitchers(refreshPlayback);
    refreshPlayback();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage, { once: true });
} else {
    initPage();
}
