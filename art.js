(function () {
    const gallery = document.querySelector('.art-gallery');
    const contentsUrl = 'https://api.github.com/repos/elvengf/elven.gf/contents/art';
    const imagePattern = /\.(avif|gif|jpe?g|png|webp)$/i;

    if (!gallery) return;

    function showStatus(message) {
        const status = document.createElement('p');
        status.className = 'gallery-status';
        status.textContent = message;
        gallery.appendChild(status);
    }

    function getLocalFiles() {
        return fetch('art/')
            .then((response) => {
                if (!response.ok) throw new Error(`Local art directory returned ${response.status}`);
                return response.text();
            })
            .then((html) => Array.from(new DOMParser().parseFromString(html, 'text/html').querySelectorAll('a'))
                .map((link) => link.getAttribute('href'))
                .filter((name) => name && imagePattern.test(name))
                .map((name) => ({ name: decodeURIComponent(name) })));
    }

    function getFiles() {
        return fetch(contentsUrl, { headers: { Accept: 'application/vnd.github+json' } })
            .then((response) => {
                if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
                return response.json();
            })
            .catch(() => getLocalFiles());
    }

    getFiles().then((files) => {
            const images = files
                .filter((file) => (!file.type || file.type === 'file') && imagePattern.test(file.name))
                .sort((first, second) => first.name.localeCompare(second.name));

            if (images.length === 0) {
                showStatus('no artwork found');
                return;
            }

            images.forEach((file) => {
                const imagePath = `art/${encodeURIComponent(file.name)}`;
                const tile = document.createElement('a');
                const preview = document.createElement('img');

                tile.className = 'box art-box';
                tile.href = imagePath;
                tile.setAttribute('aria-label', `Open ${file.name} at full size`);
                preview.className = 'art-preview';
                preview.src = imagePath;
                preview.alt = file.name.replace(imagePattern, '');
                tile.appendChild(preview);
                gallery.appendChild(tile);
            });
        })
        .catch(() => showStatus('artwork could not be loaded'));
})();
