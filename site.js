(function () {
    // Shared page setup for the landing/index parallax background
    const background = document.querySelector('.page-bg');
    const toggle = document.querySelector('.parallax-toggle');
    const maxOffset = -24;
    const storageKey = 'elvengf-parallax-enabled';
    const mediaQuery = window.matchMedia('(max-width: 960px)');
    let enabled = !mediaQuery.matches && localStorage.getItem(storageKey) !== 'false';

    // Reset the background transform to its resting position
    const resetParallax = () => {
        if (background) {
            background.style.setProperty('--parallax-x', '0px');
            background.style.setProperty('--parallax-y', '0px');
        }
    };

    // Move the background in response to the pointer position
    const updateParallax = (event) => {
        if (!enabled || mediaQuery.matches || !background) return;
        const x = ((event.clientX / window.innerWidth) - 0.5) * maxOffset;
        const y = ((event.clientY / window.innerHeight) - 0.5) * maxOffset;
        background.style.setProperty('--parallax-x', `${x}px`);
        background.style.setProperty('--parallax-y', `${y}px`);
    };

    // Keep the toggle text and pressed state in sync with the parallax setting
    const syncToggle = () => {
        const mobile = mediaQuery.matches;
        if (toggle) {
            toggle.style.display = mobile ? 'none' : '';
            toggle.setAttribute('aria-pressed', String(!mobile && enabled));
            toggle.textContent = `parallax: ${!mobile && enabled ? 'on' : 'off'}`;
        }

        if (mobile) {
            resetParallax();
        }
    };

    // Bind the background movement listeners only when desktop parallax is available
    if (background && !mediaQuery.matches) {
        window.addEventListener('mousemove', updateParallax);
        window.addEventListener('mouseleave', resetParallax);
        window.addEventListener('touchmove', resetParallax, { passive: true });
    }

    // Allow the user to turn parallax on or off and persist that preference locally
    if (toggle) {
        syncToggle();

        toggle.addEventListener('click', () => {
            if (mediaQuery.matches) return;
            enabled = !enabled;
            localStorage.setItem(storageKey, String(enabled));
            syncToggle();

            if (!enabled) {
                resetParallax();
            }
        });
    }

    // Re-evaluate whether parallax should be disabled after a resize event
    window.addEventListener('resize', () => {
        if (mediaQuery.matches) {
            enabled = false;
        } else {
            enabled = localStorage.getItem(storageKey) !== 'false';
        }
        syncToggle();
    });

    // Clicking a `.box[data-href]` navigates normally, while modifier clicks open a new tab
    document.querySelectorAll('.box[data-href]').forEach((box) => {
        const openBoxLink = (event) => {
            const href = box.getAttribute('data-href');
            if (!href) return;

            if (event.button === 1 || event.metaKey || event.ctrlKey) {
                event.preventDefault();
                window.open(href, '_blank', 'noopener,noreferrer');
                return;
            }

            if (event.button === 0) {
                event.preventDefault();
                window.location.href = href;
            }
        };

        box.addEventListener('click', openBoxLink);
        box.addEventListener('auxclick', openBoxLink);
    });

    // Randomized color cycling for the landing-page content boxes
    function getRandomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 60%, 50%)`;
    }

    // Apply a specific color and optionally enable the smooth CSS transition
    function applyColor(box, color, animate) {
        box.style.setProperty('background-color', color);
        box.classList.toggle('transition-bg', animate);
        box.style.transition = animate ? '' : 'none';
    }

    // Pick a new random color for one box
    function recolorBox(box, animate = false) {
        applyColor(box, getRandomColor(), animate);
    }

    function initializeBox(box) {
        if (box.dataset.colorInitialized) return;
        box.dataset.colorInitialized = 'true';
        applyColor(box, getRandomColor(), false);
        window.setTimeout(() => {
            box.classList.add('transition-bg');
            box.style.transition = '';
        }, 10);
        const interval = 2000 + Math.floor(Math.random() * 2500);
        window.setInterval(() => {
            recolorBox(box, true);
        }, interval);
    }

    document.querySelectorAll('.box').forEach(initializeBox);

    const container = document.querySelector('.container');
    if (container) {
        new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType !== Node.ELEMENT_NODE) return;
                    if (node.matches('.box')) initializeBox(node);
                    node.querySelectorAll('.box').forEach(initializeBox);
                });
            });
        }).observe(container, { childList: true, subtree: true });
    }
})();
