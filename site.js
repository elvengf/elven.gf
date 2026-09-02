(function () {
    // initialize all page behaviors in the local module scope
    // this iife keeps helper functions and state out of the global window object

    function setupParallax() {
        // parallax background setup for landing/index pages
        // select the background element that will receive CSS variable transforms
        const background = document.querySelector('.page-bg');
        // select the toggle button so the user can enable or disable parallax
        const toggle = document.querySelector('.parallax-toggle');
        // maximum transform range in pixels for the parallax effect
        const maxOffset = -24;
        // localStorage key used to remember the user's parallax preference
        const storageKey = 'elvengf-parallax-enabled';
        // media query to detect mobile layout and disable parallax there
        const mediaQuery = window.matchMedia('(max-width: 960px)');

        // parallax defaults to enabled when not on mobile and when the user has not disabled it
        let enabled = !mediaQuery.matches && localStorage.getItem(storageKey) !== 'false';

        // reset the CSS variables to the neutral position
        const resetParallax = () => {
            if (background) {
                background.style.setProperty('--parallax-x', '0px');
                background.style.setProperty('--parallax-y', '0px');
            }
        };

        const updateParallax = (event) => {
            // only move the background when parallax is enabled and desktop layout is active
            if (!enabled || mediaQuery.matches || !background) return;

            const x = ((event.clientX / window.innerWidth) - 0.5) * maxOffset;
            const y = ((event.clientY / window.innerHeight) - 0.5) * maxOffset;
            background.style.setProperty('--parallax-x', `${x}px`);
            background.style.setProperty('--parallax-y', `${y}px`);
        };

        const syncToggle = () => {
            const mobile = mediaQuery.matches;
            if (toggle) {
                // hide the toggle on mobile and keep the aria state correct
                toggle.style.display = mobile ? 'none' : '';
                toggle.setAttribute('aria-pressed', String(!mobile && enabled));
                toggle.textContent = `parallax: ${!mobile && enabled ? 'on' : 'off'}`;
            }

            if (mobile) {
                resetParallax();
            }
        };

        if (background && !mediaQuery.matches) {
            // bind pointer events only on desktop when parallax is supported
            window.addEventListener('mousemove', updateParallax);
            window.addEventListener('mouseleave', resetParallax);
            window.addEventListener('touchmove', resetParallax, { passive: true });
        }

        if (toggle) {
            // initialize toggle state and label once on page load
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

        window.addEventListener('resize', () => {
            // re-check mobile state and persisted preference after resize
            if (mediaQuery.matches) {
                enabled = false;
            } else {
                enabled = localStorage.getItem(storageKey) !== 'false';
            }
            syncToggle();
        });
    }

    function setupBoxLinks() {
        // make `.box[data-href]` elements behave like links
        // this allows a clickable box to act like an anchor without extra markup
        document.querySelectorAll('.box[data-href]').forEach((box) => {
            const openBoxLink = (event) => {
                const href = box.getAttribute('data-href');
                if (!href) return;

                // open in a new tab for modifier clicks or middle-click
                if (event.button === 1 || event.metaKey || event.ctrlKey) {
                    event.preventDefault();
                    window.open(href, '_blank', 'noopener,noreferrer');
                    return;
                }

                // navigate normally for left-click
                if (event.button === 0) {
                    event.preventDefault();
                    window.location.href = href;
                }
            };

            box.addEventListener('click', openBoxLink);
            box.addEventListener('auxclick', openBoxLink);
        });
    }

    function setupColorCycling() {
        // random color animation for `.box` elements
        // this makes each visible box cycle through unique hues over time
        function getRandomColor() {
            // return a random hue with fixed saturation and lightness
            return `hsl(${Math.floor(Math.random() * 360)}, 60%, 50%)`;
        }

        function applyColor(box, color, animate) {
            // set the background color and optionally allow a smooth transition
            box.style.setProperty('background-color', color);
            box.classList.toggle('transition-bg', animate);
            box.style.transition = animate ? '' : 'none';
        }

        function recolorBox(box, animate = false) {
            // update box background color and optionally animate the change
            applyColor(box, getRandomColor(), animate);
        }

        function initializeBox(box) {
            // skip boxes that are already initialized
            if (box.dataset.colorInitialized) return;
            box.dataset.colorInitialized = 'true';
            applyColor(box, getRandomColor(), false);

            // allow the first color to show immediately then enable transitions
            window.setTimeout(() => {
                box.classList.add('transition-bg');
                box.style.transition = '';
            }, 10);

            const interval = 2000 + Math.floor(Math.random() * 2500);
            window.setInterval(() => {
                recolorBox(box, true);
            }, interval);
        }

        // initialize every box that exists on page load
        document.querySelectorAll('.box').forEach(initializeBox);

        const container = document.querySelector('.container');
        if (container) {
            // watch for dynamically added boxes and initialize them too
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
    }

    // run all setup functions after this script loads
    setupParallax();
    setupBoxLinks();
    setupColorCycling();
})();
