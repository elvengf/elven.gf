// === Soft Blobby Background (shaderless blur, p5 2D only) ===
// Controls (URL params):
//   ?down=3        // downscale factor (2–6). Higher = blurrier & faster.
//   ?iters=6       // upsample taps (3–10). Higher = smoother, a bit heavier.
//   ?spread=1.8    // pixel spread per tap (0.8–3.0). Higher = wider blur.
//   ?fps=60
//   You can still tweak your own numBlobs/minDistance inside the code.

let blobs = [];
let numBlobs = 10;
let minDistance = 200;

let sceneSmall;          // low-res buffer for blobs
let down = 3;            // default: 1/3 resolution
let iters = 6;           // number of taps when upsampling
let spread = 1.8;        // px spread in small-buffer space

function setup() {
    const P = new URLSearchParams(location.search);
    frameRate(+(P.get('fps') || 60));
    down = constrain(+(P.get('down') || down), 2, 6);
    iters = constrain(+(P.get('iters') || iters), 3, 10);
    spread = +(P.get('spread') || spread);

    pixelDensity(1);
    createCanvas(windowWidth, windowHeight); // final compositing surface
    colorMode(HSL, 360, 100, 100, 100);
    noStroke();

    // low-res drawing surface (pure 2D)
    sceneSmall = createGraphics(ceil(width / down), ceil(height / down));
    sceneSmall.colorMode(HSL, 360, 100, 100, 100);
    sceneSmall.noStroke();

    // initialize blobs with spacing
    for (let i = 0; i < numBlobs; i++) {
        let b, ok = false;
        while (!ok) {
            b = new Blob();
            ok = blobs.every(o => dist(o.x, o.y, b.x, b.y) >= minDistance);
        }
        blobs.push(b);
    }
}

function draw() {
    background(255);

    // 1) update & draw blobs to the SMALL buffer
    sceneSmall.clear();
    const t = millis() / 1000;
    for (const b of blobs) { b.update(t); b.display(sceneSmall); }

    // 2) upsample with multi-tap to simulate blur (shaderless Kawase-ish)
    //    draw the small texture several times with tiny offsets and low alpha
    push();
    translate(0, 0);
    // overall opacity for the blurred composite
    const baseAlpha = 255 / (iters + 1);

    // center draw (no offset)
    tint(255, baseAlpha);
    image(sceneSmall, 0, 0, width, height);

    // ring of taps that grows slightly per iteration
    for (let i = 1; i <= iters; i++) {
        const r = i * spread; // radius in SMALL buffer pixels
        const steps = 8;      // taps per ring (8 is plenty)
        for (let k = 0; k < steps; k++) {
            const ang = (k / steps) * TWO_PI;
            const dxSmall = r * Math.cos(ang);
            const dySmall = r * Math.sin(ang);
            // upscale those offsets to the main canvas:
            const dx = dxSmall * down;
            const dy = dySmall * down;
            push();
            translate(dx, dy);
            tint(255, baseAlpha);
            image(sceneSmall, 0, 0, width, height);
            pop();
        }
    }
    // reset tint
    tint(255, 255);
    pop();
}

// --- hue lerp that wraps 0..360 cleanly ---
function lerpHueDeg(a, b, amt) {
    let d = ((b - a + 540) % 360) - 180;
    return (a + d * amt + 360) % 360;
}

class Blob {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-2, 2);

        // smooth color motion
        this.hue = random(360);
        this.hueBase = random(360);
        this.hueAmp = random(40, 100);
        this.hueRate = random(0.03, 0.08);
        this.hueSeed = random(1000);

        this.saturation = 70;
        this.lightness = 50;
        this.alpha = 40;      // a bit lower, blur stacks it up nicely
        this.size = 1200;    // diameter
    }

    update(t) {
        // movement
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x < 0 || this.x > width) this.xSpeed *= -1;
        if (this.y < 0 || this.y > height) this.ySpeed *= -1;

        // repel
        for (const other of blobs) {
            if (other === this) continue;
            const d = dist(this.x, this.y, other.x, other.y);
            if (d < minDistance) {
                const ang = atan2(this.y - other.y, this.x - other.x);
                const force = (minDistance - d) * 0.05;
                this.xSpeed += cos(ang) * force * 0.1;
                this.ySpeed += sin(ang) * force * 0.1;
            }
        }

        // clamp speed
        const maxSpeed = 1;
        const sp = dist(0, 0, this.xSpeed, this.ySpeed);
        if (sp > maxSpeed) {
            this.xSpeed = (this.xSpeed / sp) * maxSpeed;
            this.ySpeed = (this.ySpeed / sp) * maxSpeed;
        }

        // smooth hue target via noise, then ease
        const n = noise(this.hueSeed + t * this.hueRate);
        const targetHue = (this.hueBase + this.hueAmp * (n * 2 - 1) + 360) % 360;
        this.hue = lerpHueDeg(this.hue, targetHue, 0.04);

        // subtle sat/light breathing (optional)
        this.saturation = 68 + 6 * sin(t * 0.7 + this.hueSeed);
        this.lightness = 50 + 5 * sin(t * 0.9 + this.hueSeed * 1.3);
    }

    display(pg) {
        // draw at SMALL resolution (sceneSmall)
        pg.fill(this.hue, this.saturation, this.lightness, this.alpha);
        // scale sizes to the small buffer
        const sx = this.x / down;
        const sy = this.y / down;
        const ss = this.size / down;
        pg.ellipse(sx, sy, ss);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    sceneSmall = createGraphics(ceil(width / down), ceil(height / down));
    sceneSmall.colorMode(HSL, 360, 100, 100, 100);
    sceneSmall.noStroke();
}
