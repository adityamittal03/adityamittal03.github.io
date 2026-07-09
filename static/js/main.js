// Email tooltip functionality - now handled by pure CSS hover
// Removed special JavaScript behavior to make all tooltips consistent

// Paper expand/collapse functionality
document.addEventListener('DOMContentLoaded', function() {
    const paperToggles = document.querySelectorAll('.paper-toggle');
    const paperTitles = document.querySelectorAll('.paper-title');
    const paperItems = document.querySelectorAll('.paper-item');
    
    function collapsePaper(toggle) {
        const paperId = toggle.getAttribute('data-paper');
        const paperContent = document.getElementById('paper-content-' + paperId);
        if (!paperContent) return;
        paperContent.style.maxHeight = '0';
        paperContent.style.opacity = '0';
        toggle.classList.remove('expanded');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '+';
    }
    
    function expandPaper(toggle) {
        const paperId = toggle.getAttribute('data-paper');
        const paperContent = document.getElementById('paper-content-' + paperId);
        if (!paperContent) return;
        paperContent.style.maxHeight = paperContent.scrollHeight + 'px';
        paperContent.style.opacity = '1';
        toggle.classList.add('expanded');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.textContent = '−';
    }
    
    function togglePaper(paperId) {
        const toggle = document.querySelector(`[data-paper="${paperId}"]`);
        if (!toggle) return;
        
        const isExpanded = toggle.classList.contains('expanded');
        
        if (isExpanded) {
            collapsePaper(toggle);
        } else {
            expandPaper(toggle);
        }
    }
    
    // Add click listeners to toggle buttons
    paperToggles.forEach(function(toggle) {
        const paperId = toggle.getAttribute('data-paper');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'paper-content-' + paperId);
        toggle.setAttribute('aria-label', 'Toggle details');

        toggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            togglePaper(this.getAttribute('data-paper'));
        });
    });
    
    // Add click listeners to paper titles (the entire title div)
    paperTitles.forEach(function(titleDiv) {
        titleDiv.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link or icon inside a link.
            if (e.target.closest('a')) {
                return;
            }
            
            const toggle = this.querySelector('.paper-toggle');
            if (toggle) {
                const paperId = toggle.getAttribute('data-paper');
                togglePaper(paperId);
            }
        });
        
        // Add a subtle visual cue that the title is clickable
        titleDiv.style.cursor = 'pointer';
    });
    
    // Close papers when clicking outside
    document.addEventListener('click', function(e) {
        // Check if the click is outside any paper item
        let clickedInsidePaper = false;
        
        paperItems.forEach(function(paperItem) {
            if (paperItem.contains(e.target)) {
                clickedInsidePaper = true;
            }
        });
        
        // If clicked outside all papers, close any expanded papers
        if (!clickedInsidePaper) {
            paperToggles.forEach(function(toggle) {
                if (toggle.classList.contains('expanded')) {
                    collapsePaper(toggle);
                }
            });
        }
    });
});

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
