// Blog video task switchers.
function initCraftVideoSwitchers() {
    const switchers = document.querySelectorAll('[data-craft-video-switcher]');
    if (!switchers.length) return;

    switchers.forEach(function(switcher) {
        const tabs = Array.from(switcher.querySelectorAll('.craft-video-switcher__tab'));
        const panels = Array.from(switcher.querySelectorAll('.craft-video-switcher__panel'));

        function activateTab(activeTab) {
            const activePanelId = activeTab.getAttribute('aria-controls');

            tabs.forEach(function(tab) {
                const isActive = tab === activeTab;
                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', String(isActive));
            });

            panels.forEach(function(panel) {
                const isActive = panel.id === activePanelId;
                panel.classList.toggle('is-active', isActive);
                panel.hidden = !isActive;

                if (!isActive) {
                    const video = panel.querySelector('video');
                    if (video && !video.paused) {
                        video.pause();
                    }
                }
            });
        }

        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                activateTab(tab);
            });
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCraftVideoSwitchers);
} else {
    initCraftVideoSwitchers();
}

// Optional per-video playback speed.
function initVideoPlaybackRates() {
    const videos = document.querySelectorAll('video[data-playback-rate]');
    videos.forEach(function(video) {
        const rate = parseFloat(video.getAttribute('data-playback-rate'));
        if (!Number.isFinite(rate) || rate <= 0) return;

        video.defaultPlaybackRate = rate;
        video.playbackRate = rate;
        video.addEventListener('loadedmetadata', function() {
            video.defaultPlaybackRate = rate;
            video.playbackRate = rate;
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoPlaybackRates);
} else {
    initVideoPlaybackRates();
}

// Autoplay muted videos as they enter the viewport, and pause them when they leave.
document.addEventListener('DOMContentLoaded', function() {
    const videos = Array.from(document.querySelectorAll('video'));
    if (!videos.length) return;

    videos.forEach(function(video) {
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
    });

    function playVideo(video) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(function() {});
        }
    }

    if (!('IntersectionObserver' in window)) {
        videos.forEach(playVideo);
        return;
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            const video = entry.target;
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
                playVideo(video);
            } else if (!video.paused) {
                video.pause();
            }
        });
    }, {
        threshold: [0, 0.35, 0.7]
    });

    videos.forEach(function(video) {
        observer.observe(video);
    });
});
