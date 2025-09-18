function sym1(buffer, x, y) {
  buffer.push();
  buffer.translate(x, y, -abs(y)/6);
  buffer.fill(150, 255, 105);
  buffer.strokeWeight(increment / 16);
  buffer.circle(0, 0, increment / 2);
  buffer.pop();
}

function sym2(buffer, x, y) {
  buffer.push();
  buffer.translate(x, y, -abs(y)/6);
  buffer.fill(0, 255, 255);
  buffer.strokeWeight(increment / 16);
  buffer.circle(0, 0, increment / 2);
  buffer.pop();
}

function sym3(buffer, x, y) {
  buffer.push();
  buffer.translate(x, y, -abs(y)/6);
  buffer.rectMode(CENTER);
  buffer.fill(255, 200, 0);
  buffer.strokeWeight(increment / 16);
  buffer.square(0, 0, increment / 2);
  buffer.pop();
}

function sym4(buffer, x, y) {
  buffer.push();
  buffer.translate(x, y, -abs(y)/6);
  buffer.rectMode(CENTER);
  buffer.fill(255, 100, 100);
  buffer.strokeWeight(increment / 16);
  buffer.square(0, 0, increment / 2);
  buffer.pop();
}

function sym5(buffer, x, y) {
  buffer.push();
  buffer.translate(x, y, -abs(y)/6);
  buffer.fill(255, 150, 200);
  buffer.strokeWeight(increment / 16);
  buffer.triangle(-increment / 4, increment / 4, 0, -increment / 4, increment / 4, increment / 4);
  buffer.pop();
}

function sym6(buffer, x, y) {
  buffer.push();
  buffer.translate(x, y, -abs(y)/6);
  buffer.fill(155, 0, 255);
  buffer.strokeWeight(increment / 16);
  buffer.triangle(-increment / 4, -increment / 4, 0, increment / 4, increment / 4, -increment / 4);
  buffer.pop();
}

function sym7(buffer, x, y) {
  buffer.push();
  buffer.translate(x, y,-increment/40 -abs(y)/6);
  yd = (y/increment)/(increment/9)
  buffer.rotateX(yd-3.3);
  buffer.rotateY(frameCount * 0.02);
  buffer.fill(0, 255, 0);
  buffer.strokeWeight(increment / 16);
  buffer.cone(increment / 3, increment / 2, 5);
  buffer.pop();
}

function sym8(buffer, x, y) {
  buffer.push();
  buffer.translate(x, y, -abs(y)/6);
  buffer.rotateY(frameCount * -0.02);
  buffer.rotateZ(frameCount * 0.01);
  buffer.fill(0, 0, 255);
  buffer.strokeWeight(increment / 16);
  buffer.box(increment / 2.2);
  buffer.pop();
}

function sym9(buffer, x, y) {
  shadowBuffer()
  buffer.push();
  buffer.translate(x, y, -abs(y)/6);
  buffer.rotateY(frameCount * 0.04);
  buffer.noStroke();
  buffer.fill(255, 255, 0);
  buffer.torus(increment / 4.5, increment/20);
  buffer.pop();
  
  function shadowBuffer() {
    buffer.push()
    xchange = (x/increment)*(increment/40)
    ychange = (y/increment)*(increment/40)
    buffer.translate(x+xchange, y+ychange, -20-abs(y)/6);
    buffer.rotateY(frameCount * 0.04);
    buffer.noStroke();
    buffer.fill(0);
    buffer.torus(increment / 4.3, increment/9);
    buffer.pop()
  }
}

function sym10(buffer, x, y) {
  buffer.push();
  buffer.translate(x, y, -abs(y)/6);
  yd = (y/increment)/(increment/9)
  buffer.rotateX(yd);
  buffer.rotateY(frameCount * 0.06);
  
  // Set color mode to HSB
  buffer.colorMode(HSB, 360, 100, 100);
  
  // Calculate hue based on frameCount
  let hue = (frameCount * 3) % 360; // Adjust speed with the factor (2)
  hue += 1; // Offset to start from a different color
  
  buffer.fill(hue, 100, 100);
  buffer.strokeWeight(increment / 16);
  
  const radius = increment / 3;
  const innerRadius = increment / 6;
  const angleIncrement = TWO_PI / 5; // points for the star
  
  buffer.beginShape();
  for (let i = -HALF_PI; i < TWO_PI - HALF_PI; i += angleIncrement) {
    let x1 = buffer.cos(i) * radius;
    let y1 = buffer.sin(i) * radius;
    let x2 = buffer.cos(i + angleIncrement / 2) * innerRadius;
    let y2 = buffer.sin(i + angleIncrement / 2) * innerRadius;
    buffer.vertex(x1, y1);
    buffer.vertex(x2, y2);
  }
  buffer.endShape(CLOSE);
  
  // Reset color mode
  buffer.colorMode(RGB);
  buffer.pop();
}
