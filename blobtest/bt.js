// Even-slice "oil splotches" (optimized for OBS)
let pg;
const SCALE = 0.015;   // smaller -> larger blobs
const WARP = 40;       // more = wigglier edges
const OCTAVES = 6;     // detail levels
const SPEED = 0.08;    // 0 = still
const FLATTEN_GAMMA = 0.85;
let t = 0;

// Lower internal render res (cheaper to compute)
const INTERNAL_W = 160;   // width of offscreen buffer
const INTERNAL_H = 90;    // height of offscreen buffer

// Frame skipping: only update every N frames
const FRAME_SKIP = 6;     // 6 = ~10fps if OBS runs at 60fps

const palette = [
    '#FF0000', // red
    '#00FFFF', // cyan
    '#00FF00', // lime
    '#FFFF00', // yellow
    '#0000FF', // blue
    '#FFA500', // orange
    '#800080', // purple
    '#008000', // green
    '#FFC0CB'  // pink
];

function setup() {
    createCanvas(1920, 1080);
    pixelDensity(1);
    pg = createGraphics(INTERNAL_W, INTERNAL_H);
    pg.pixelDensity(1);
    noSmooth(); // keeps crisp upscaling
}

function fbm(x, y, z) {
    let a = 0.5, f = 0.0;
    for (let i = 0; i < OCTAVES; i++) {
        f += a * noise(x, y, z);
        x *= 2.0; y *= 2.0;
        a *= 0.5;
    }
    return f / (1.0 - pow(0.5, OCTAVES));
}

function indexFromValue(v, n) {
    if (FLATTEN_GAMMA !== 1.0) v = pow(v, FLATTEN_GAMMA);
    let idx = floor(v * n);
    return constrain(idx, 0, n - 1);
}

function draw() {
    // Skip frames to reduce load
    if (frameCount % FRAME_SKIP !== 0) {
        image(pg, 0, 0, width, height);
        return;
    }

    pg.loadPixels();
    for (let y = 0; y < pg.height; y++) {
        for (let x = 0; x < pg.width; x++) {
            let ux = x * SCALE, uy = y * SCALE;

            let wx = (noise(ux * 1.7, uy * 1.7, t * 0.3) - 0.5) * WARP;
            let wy = (noise(ux * 1.9 + 100, uy * 1.9 + 100, t * 0.3) - 0.5) * WARP;

            let v = fbm((x + wx) * SCALE, (y + wy) * SCALE, t);
            let idx = indexFromValue(v, palette.length);

            const c = color(palette[idx]);
            const i = 4 * (y * pg.width + x);
            pg.pixels[i + 0] = red(c);
            pg.pixels[i + 1] = green(c);
            pg.pixels[i + 2] = blue(c);
            pg.pixels[i + 3] = 255;
        }
    }
    pg.updatePixels();

    image(pg, 0, 0, width, height);
    t += SPEED * 0.01;
}
