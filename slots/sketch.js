//created by elvengf 2024
//last update September 17 2025
//push comment: added to elven.gf , blocked the shop button for now as it is broken. may fix later

//idea 
//  instead of simple symbols, what if they were cards of a deck where you matched colour, suit, runs, etc?
//  would make it more complex, and would allow a game system of customizing your deck
//  maybe a point-buy system for consecutive runs? returning to the casino the next day

let r1Win, r2Win, r3Win, r4Win, r5Win, r6Win, r7Win, r8Win, r9Win;
let r1=[], r2=[], r3=[];
let c1=[], c2=[], c3=[], c4=[], c5=[];
let columns = [];
let c0buffer = [];
let c1buffer = [];
let c2buffer = [];
let c3buffer = [];
let c4buffer = [];

let grid;
let increment;
let c1Coordinates, c2Coordinates, c3Coordinates, c4Coordinates, c5Coordinates;

const deck = [
  { suit: "heart", symbol: "ace", value: 1, quantity: 1, spriteX: 3, spriteY: 0 },
  { suit: "heart", symbol: "two", value: 2, quantity: 1, spriteX: 0, spriteY: 0 },
  { suit: "heart", symbol: "three", value: 3, quantity: 1, spriteX: 0, spriteY: 1 },
  { suit: "heart", symbol: "four", value: 4, quantity: 1, spriteX: 0, spriteY: 2 },
  { suit: "heart", symbol: "five", value: 5, quantity: 1, spriteX: 0, spriteY: 3 },
  { suit: "heart", symbol: "six", value: 6, quantity: 1, spriteX: 1, spriteY: 0 },
  { suit: "heart", symbol: "seven", value: 7, quantity: 1, spriteX: 1, spriteY: 1 },
  { suit: "heart", symbol: "eight", value: 8, quantity: 1, spriteX: 1, spriteY: 2 },
  { suit: "heart", symbol: "nine", value: 9, quantity: 1, spriteX: 1, spriteY: 3 },
  { suit: "heart", symbol: "ten", value: 10, quantity: 1, spriteX: 2, spriteY: 0 },
  { suit: "heart", symbol: "jack", value: 10, quantity: 1, spriteX: 2, spriteY: 1 },
  { suit: "heart", symbol: "queen", value: 10, quantity: 1, spriteX: 2, spriteY: 2 },
  { suit: "heart", symbol: "king", value: 10, quantity: 1, spriteX: 2, spriteY: 3 },

  { suit: "diamond", symbol: "ace", value: 1, quantity: 1, spriteX: 3, spriteY: 0 },
  { suit: "diamond", symbol: "two", value: 2, quantity: 1, spriteX: 0, spriteY: 0 },
  { suit: "diamond", symbol: "three", value: 3, quantity: 1, spriteX: 0, spriteY: 1 },
  { suit: "diamond", symbol: "four", value: 4, quantity: 1, spriteX: 0, spriteY: 2 },
  { suit: "diamond", symbol: "five", value: 5, quantity: 1, spriteX: 0, spriteY: 3 },
  { suit: "diamond", symbol: "six", value: 6, quantity: 1, spriteX: 1, spriteY: 0 },
  { suit: "diamond", symbol: "seven", value: 7, quantity: 1, spriteX: 1, spriteY: 1 },
  { suit: "diamond", symbol: "eight", value: 8, quantity: 1, spriteX: 1, spriteY: 2 },
  { suit: "diamond", symbol: "nine", value: 9, quantity: 1, spriteX: 1, spriteY: 3 },
  { suit: "diamond", symbol: "ten", value: 10, quantity: 1, spriteX: 2, spriteY: 0 },
  { suit: "diamond", symbol: "jack", value: 10, quantity: 1, spriteX: 2, spriteY: 1 },
  { suit: "diamond", symbol: "queen", value: 10, quantity: 1, spriteX: 2, spriteY: 2 },
  { suit: "diamond", symbol: "king", value: 10, quantity: 1, spriteX: 2, spriteY: 3 },

  { suit: "club", symbol: "ace", value: 1, quantity: 1, spriteX: 3, spriteY: 0 },
  { suit: "club", symbol: "two", value: 2, quantity: 1, spriteX: 0, spriteY: 0 },
  { suit: "club", symbol: "three", value: 3, quantity: 1, spriteX: 0, spriteY: 1 },
  { suit: "club", symbol: "four", value: 4, quantity: 1, spriteX: 0, spriteY: 2 },
  { suit: "club", symbol: "five", value: 5, quantity: 1, spriteX: 0, spriteY: 3 },
  { suit: "club", symbol: "six", value: 6, quantity: 1, spriteX: 1, spriteY: 0 },
  { suit: "club", symbol: "seven", value: 7, quantity: 1, spriteX: 1, spriteY: 1 },
  { suit: "club", symbol: "eight", value: 8, quantity: 1, spriteX: 1, spriteY: 2 },
  { suit: "club", symbol: "nine", value: 9, quantity: 1, spriteX: 1, spriteY: 3 },
  { suit: "club", symbol: "ten", value: 10, quantity: 1, spriteX: 2, spriteY: 0 },
  { suit: "club", symbol: "jack", value: 10, quantity: 1, spriteX: 2, spriteY: 1 },
  { suit: "club", symbol: "queen", value: 10, quantity: 1, spriteX: 2, spriteY: 2 },
  { suit: "club", symbol: "king", value: 10, quantity: 1, spriteX: 2, spriteY: 3 },

  { suit: "spade", symbol: "ace", value: 1, quantity: 1, spriteX: 3, spriteY: 0 },
  { suit: "spade", symbol: "two", value: 2, quantity: 1, spriteX: 0, spriteY: 0 },
  { suit: "spade", symbol: "three", value: 3, quantity: 1, spriteX: 0, spriteY: 1 },
  { suit: "spade", symbol: "four", value: 4, quantity: 1, spriteX: 0, spriteY: 2 },
  { suit: "spade", symbol: "five", value: 5, quantity: 1, spriteX: 0, spriteY: 3 },
  { suit: "spade", symbol: "six", value: 6, quantity: 1, spriteX: 1, spriteY: 0 },
  { suit: "spade", symbol: "seven", value: 7, quantity: 1, spriteX: 1, spriteY: 1 },
  { suit: "spade", symbol: "eight", value: 8, quantity: 1, spriteX: 1, spriteY: 2 },
  { suit: "spade", symbol: "nine", value: 9, quantity: 1, spriteX: 1, spriteY: 3 },
  { suit: "spade", symbol: "ten", value: 10, quantity: 1, spriteX: 2, spriteY: 0 },
  { suit: "spade", symbol: "jack", value: 10, quantity: 1, spriteX: 2, spriteY: 1 },
  { suit: "spade", symbol: "queen", value: 10, quantity: 1, spriteX: 2, spriteY: 2 },
  { suit: "spade", symbol: "king", value: 10, quantity: 1, spriteX: 2, spriteY: 3 }
];
let symbol=["A","B","C","D","E","F","G","H","J","WILD"];
const quantities = [20, 20, 15, 15, 10, 10, 7, 5, 3, 1];
let symbolMul=[1,1,2,2,6,6,20,50,100,1000];
let cMul=[0,0,2,5,10];
let purse;
let purseOld;
let cost = 10;
let costMul;
let prize;

let checkSpin = false;
let setupScroll = 0;
let scrollSpeed = 8.00;
let spinColLength;
let callWin = false;
let c1Scroll = 0, c2Scroll = 0, c3Scroll = 0, c4Scroll = 0, c5Scroll = 0;
let bgColor = [60,60,100];

let buffer;

let shopOpen = false;

function preload () {
  f = loadFont('Jacquard12-Regular.ttf');
}


function setup() {
  
  devTools()
  
  //pixelDensity(1)
  createCanvas(windowWidth, windowHeight);
  buffer = createGraphics(windowWidth, windowHeight, WEBGL); // Create the buffer
  textAlign(CENTER,CENTER);

  // Retrieve stored values or initialize them
  purse = getItem('score');
  purseOld = getItem('scoreOld');

  // Convert retrieved values to numbers if they exist
  purse = purse !== null ? int(purse) : null;
  purseOld = purseOld !== null ? int(purseOld) : null;

  // Check if purse is null (not stored yet) or less than or equal to 0
  if (purse === null || purse <= 0) {
    purse = 100;  // Reset purse to 100
    storeItem('score', purse);  // Store the reset value
  }

  // Check if purseOld is null (not stored yet) or 0
  if (purseOld === null || purseOld <= 0) {
    purseOld = 100;  // Reset purseOld to 100
    storeItem('scoreOld', purseOld);  // Store the reset value
  }
  
  costMul = cost;
  calculateIncrement();
  createGrid();
  setupSpin();
  callWin=true;
}





function draw() {

  buffer.background(bgColor[2]-20, bgColor[1]-20, bgColor[2]-20);
  background(0);
  gameScreen()
  
  if (!shopOpen) {
    wheelDecor()
    controlButtons()
    createAllColCoordinates();

    mainText();
    const columns = [c1, c2, c3, c4, c5];
    var colCoordinates = [c1Coordinates, c2Coordinates, c3Coordinates, c4Coordinates, c5Coordinates];
    columns.forEach((col, i) => outputColSym(col, colCoordinates[i]));

    mainSpin(); // Actually spin things
    displayBuffer();
    createWheelWindow();

    if (callWin == true) {
      drawLines(); // Draw red lines to show winning rows
      updateText(); // Draws text
    }
  } else {
    shopText()
    shopButtons()
    shopUpdate()
  }
}


function displayBuffer() {
  push()
  translate(width/2,height/2,-2)
  img = buffer.get((width/2-(increment*2.5)),
                   (height/2-(increment*1.5)),
                   increment*5,
                   increment*3)
  image(img,(-(increment*2.5)),-(increment*1.5));
  pop()
  buffer.clear(); // Clear the buffer for new frame
}

function gameScreen() {
  push()
  translate(width/2,height/2,-3)
  fill(bgColor[1], bgColor[1], bgColor[1])
  strokeWeight(increment/16);
  rectMode(CORNERS)
  rect(grid[0][0].x-increment,grid[0][0].y-increment,grid[6][6].x+increment,grid[6][6].y+increment)
  pop()
}

//ornamental shapes
function wheelDecor() {
  
  push()
  translate(width/2,height/2,-3)
  fill(bgColor[2], bgColor[2], bgColor[2])
  strokeWeight(increment/16);
  rectMode(CORNERS)
  rect(grid[0][1].x,grid[0][1].y-increment/2,grid[0][5].x,grid[0][5].y+increment/2, increment/4)
  pop()
  
  push()
  translate(width/2,height/2,-3)
  fill(bgColor[2], bgColor[2], bgColor[2])
  strokeWeight(increment/16);
  rectMode(CORNERS)
  rect(grid[6][1].x,grid[6][1].y-increment/2,grid[6][5].x,grid[6][5].y+increment/2, increment/4)
  pop()
  
  push()
  translate(width/2,height/2,-3)
  fill(bgColor[2], bgColor[2], bgColor[2])
  strokeWeight(increment/16);
  rectMode(CORNERS)
  rect(grid[1][0].x,grid[1][0].y,grid[5][6].x,grid[5][6].y, increment/4)
  pop()
}

//block elements to outline and cover areas
function createWheelWindow() {
  push()
  translate(width/2,height/2,0)
  noFill()
  strokeWeight(increment/16);
  rectMode(CORNERS)
  rect(grid[2][1].x-increment/2,grid[2][1].y-increment/2,grid[4][5].x+increment/2,grid[4][5].y+increment/2,increment/16)
  pop()
}

//manage all text elements
function mainText() {
  push()
  translate(width/2,height/2)
  textFont(f, increment);
  fill(255)
  textSize(increment/2)
  text('Bet '+cost,grid[0][2].x,grid[0][2].y)

  if (callWin == true) {
    textSize(increment)
    text(purse, grid[0][4].x,grid[0][4].y-increment/5);
  }
  else {
    textSize(increment)
    text(purseOld, grid[0][4].x,grid[0][4].y-increment/5);
  }

  pop()
}  

function updateText() {
  push()
  translate(width/2,height/2)
  textFont(f, increment);
  fill(255)
  if (prize>0) {
    textSize(increment/2)
    text('You Win', grid[6][2].x,grid[6][2].y)
    textSize(increment)
    text(prize,grid[6][4].x,grid[6][4].y-increment/5)
  }  
  
  if (purse <= 0) {
    purse = 0
    textSize(increment/2)
    text('You Lose', grid[6][2].x,grid[6][2].y)
    text('Restart?',grid[6][4].x,grid[6][4].y)
  }
  pop()
}

// define and control the grid system
function calculateIncrement() {
  increment = min(width, height) / 9;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buffer.resizeCanvas(windowWidth,windowHeight)
  calculateIncrement();
  createGrid();
  //createAllRowCoordinates();
  createAllColCoordinates() 
}
function createGrid() {
  grid = [];
  for (let i = 0; i < 7; i++) {
    grid[i] = [];
    for (let j = 0; j < 7; j++) {
      grid[i][j] = createVector((j-3) * increment, (i - 3) * increment);
    }
  }
}



//draw lines for winning rows
function drawLines() { 
  push()
  strokeWeight(increment/16);
  stroke(255, 0, 0);
  if (r1Win > 0) {
    drawGridLine(2, 1, 2, 5); // Draw a line for row 1
  }
  if (r2Win > 0) {
    drawGridLine(3, 1, 3, 5); // Draw a line for row 2
  }
  if (r3Win > 0) {
    drawGridLine(4, 1, 4, 5); // Draw a line for row 3
  }
  if (r4Win > 0) {
    drawGridLine(4, 1, 2, 3); // Draw a line for mountain
    drawGridLine(2, 3, 4, 5);
  }
  if (r5Win > 0) {
    drawGridLine(2, 1, 4, 3); // Draw a line for valley
    drawGridLine(4, 3, 2, 5);
  }
  if (r6Win > 0) {
    drawGridLine(2, 1, 2, 2); // Draw a line for backslash
    drawGridLine(2, 2, 4, 4);
    drawGridLine(4, 4, 4, 5);
  }
  if (r7Win > 0) {
    drawGridLine(4, 1, 4, 2); // Draw a line for forwardslash
    drawGridLine(4, 2, 2, 4);
    drawGridLine(2, 4, 2, 5);
  }
  if (r8Win > 0) {
    drawGridLine(3, 1, 4, 2); // Draw a line for downup
    drawGridLine(4, 2, 2, 4);
    drawGridLine(2, 4, 3, 5);
  }
  if (r9Win > 0) {
    drawGridLine(3, 1, 2, 2); // Draw a line for updown
    drawGridLine(2, 2, 4, 4);
    drawGridLine(4, 4, 3, 5);
  }
  pop()
}
function drawGridLine(startRow, startCol, endRow, endCol) {
  push()
  translate(width/2,height/2,-2)
  line(grid[startRow][startCol].x, grid[startRow][startCol].y, grid[endRow][endCol].x, grid[endRow][endCol].y);
  pop()
}

//draw the symbols to the buffer
function outputColSym(cArray, colCoord) {
  const symFunctions = [sym1, sym2, sym3, sym4, sym5, sym6, sym7, sym8, sym9, sym10];

  cArray.forEach((item, index) => {
    if (colCoord[index].y >= -increment * 3 && colCoord[index].y <= increment * 1.9) {
      const k = symbol.indexOf(item);
      if (k !== -1) {
        symFunctions[k](buffer, colCoord[index].x, colCoord[index].y);
      }
    }
  });
}

function createAllColCoordinates() {
  const allCoordinates = [
    createColumnCoordinates(0, c1Scroll),
    createColumnCoordinates(1, c2Scroll),
    createColumnCoordinates(2, c3Scroll),
    createColumnCoordinates(3, c4Scroll),
    createColumnCoordinates(4, c5Scroll)
  ];
  [c1Coordinates, c2Coordinates, c3Coordinates, c4Coordinates, c5Coordinates] = allCoordinates;
}

function createColumnCoordinates(columnIndex, scroll) {
  return columns[columnIndex].map((_, j) => createVector(grid[4][columnIndex + 1].x, grid[4][columnIndex].y - j * increment + setupScroll + scroll));
}

//scroll the symbols
function updateScroll(scroll, maxScroll) {
  scroll += increment / scrollSpeed;
  if (scroll > maxScroll) {
    scroll = maxScroll;
  }
  return scroll;
}

function mainSpin() {
  if (checkSpin == false) { // respin the intro symbols
    //   if (setupScroll >= increment * 3) {
    //   setupScroll = 0;
    // } else {
    //   setupScroll += increment/scrollSpeed;
    // }
  } else {  
    let maxScrolls = [
      increment * columns[0].length - increment * 3,
      increment * columns[1].length - increment * 3,
      increment * columns[2].length - increment * 3,
      increment * columns[3].length - increment * 3,
      increment * columns[4].length - increment * 3
    ];
      // Update scroll positions with delays
    if (c1Delay <= 0) c1Scroll = updateScroll(c1Scroll, maxScrolls[0]);
    if (c2Delay <= 0) c2Scroll = updateScroll(c2Scroll, maxScrolls[1]);
    if (c3Delay <= 0) c3Scroll = updateScroll(c3Scroll, maxScrolls[2]);
    if (c4Delay <= 0) c4Scroll = updateScroll(c4Scroll, maxScrolls[3]);
    if (c5Delay <= 0) c5Scroll = updateScroll(c5Scroll, maxScrolls[4]);

    // Decrease delay timers
    c1Delay = max(0, c1Delay - random(1));
    c2Delay = max(0, c2Delay - random(1));
    c3Delay = max(0, c3Delay - random(1));
    c4Delay = max(0, c4Delay - random(1));
    c5Delay = max(0, c5Delay - random(1));

    // Assuming you have a function to output symbols for each column
    outputColSym(columns[0], c1Coordinates);
    outputColSym(columns[1], c2Coordinates);
    outputColSym(columns[2], c3Coordinates);
    outputColSym(columns[3], c4Coordinates);
    outputColSym(columns[4], c5Coordinates);

    callWin = c1Scroll >= maxScrolls[0] && c2Scroll >= maxScrolls[1] && c3Scroll >= maxScrolls[2] && c4Scroll >= maxScrolls[3] && c5Scroll >= maxScrolls[4];
  }
  
}

//
//
//

let buttons = [
  { active: false, label: 'Locked', row: 1, col: 1, color: [155, 55, 55], action: null, isPressed: false },
  { active: false, label: 'Locked', row: 1, col: 3, color: [155, 55, 55], action: null, isPressed: false },
  { active: false, label: 'Locked', row: 1, col: 5, color: [155, 55, 55], action: null, isPressed: false },
  { active: false, label: 'Auto', row: 5, col: 1, color: [155, 55, 55], action: autoButton, isPressed: false },
  { active: true, label: 'Spin', row: 5, col: 3, color: [155, 55, 55], action: spinButton, isPressed: false },
  { active: false, label: 'Locked', row: 5, col: 5, color: [155, 55, 55], action: null, isPressed: false } //shopButton is currently broken, set to action: null for now. also, label: 'Shop' when it works again
];

function drawButton(label, x, y, color) {
  fill(color);
  rect(x, y, increment * 1.5, increment / 1.5, increment/10)
  fill(255);
  text(label, x, y - increment / 15);
}

function controlButtons() {
  push();
  translate(width / 2, height / 2);
  rectMode(CENTER);
  strokeWeight(increment / 16);
  textFont(f, increment);
  textSize(increment / 2);
  
  for (let btn of buttons) {
    if (btn.active === true) {
      let x = grid[btn.row][btn.col].x + width / 2;
      let y = grid[btn.row][btn.col].y + height / 2;
      if (mouseX > x - (increment * 0.75) && mouseX < x + (increment * 0.75) &&
          mouseY > y - (increment * 0.35) && mouseY < y + (increment * 0.35) && (!callWin)) {
        btn.color = [105, 35, 35]; // Darker red
      } else  if (mouseX > x - (increment * 0.75) && mouseX < x + (increment * 0.75) &&
          mouseY > y - (increment * 0.35) && mouseY < y + (increment * 0.35) && btn.isPressed == false) {
        btn.color = [225, 75, 75]; // Brighter red
      } else  if ((btn.isPressed == true) || (!callWin)) {
        btn.color = [105, 35, 35]; // Darker red
      } else if (!!callWin) {
        btn.color = [155,55,55]; // Reset to original color
      }
    drawButton(btn.label, grid[btn.row][btn.col].x, grid[btn.row][btn.col].y, btn.color);
    } else if (btn.active === false){
    drawButton('Locked', grid[btn.row][btn.col].x, grid[btn.row][btn.col].y, 55, 55, 55);
    }
  }
  
  pop();
}

function touchStarted() {
  if (!shopOpen) {
    for (let btn of buttons) {
      let x = grid[btn.row][btn.col].x + width / 2;
      let y = grid[btn.row][btn.col].y + height / 2;
      if (mouseX > x - (increment * 0.75) && mouseX < x + (increment * 0.75) &&
          mouseY > y - (increment * 0.25) && mouseY < y + (increment * 0.25)) {
          btn.isPressed = true;
        if (btn.action) {
          btn.action();
        }
        break;
      } else { btn.isPressed = false}
    }
  } else if (!!shopOpen) {
    for (let btn of purchaseButtons) {
      let x = grid[btn.row][btn.col].x + width / 2;
      let y = grid[btn.row][btn.col].y + height / 2;
      if (mouseX > x - (increment * 0.75) && mouseX < x + (increment * 0.75) &&
          mouseY > y - (increment * 0.25) && mouseY < y + (increment * 0.25)) {
          btn.isPressed = true;
        if (btn.action) {
          btn.action();
        }
        break;
      } else { btn.isPressed = false}
    } 
  }
}

function touchEnded() {
  for (let btn of buttons) {
    let x = grid[btn.row][btn.col].x + width / 2;
    let y = grid[btn.row][btn.col].y + height / 2;
        btn.isPressed = false;
  }
  for (let btn of purchaseButtons) {
    let x = grid[btn.row][btn.col].x + width / 2;
    let y = grid[btn.row][btn.col].y + height / 2;
        btn.isPressed = false;
  }
}



let intervalId = null;
let spinning = false;

function autoButton() {
  if (buttons[3].active) {
    if (!spinning) {
      if (!checkSpin || !!callWin) {
        autoSpin()
        buttons[3].originalColor=[105, 35, 35]
      }
    } else {
      clearInterval(intervalId);
      spinning = false;
      buttons[3].originalColor=[155, 55, 55]
    }
  } else {
    clearInterval(intervalId);
    spinning = false;
    buttons[3].originalColor=[155, 55, 55]
  }
  
  return false;
}
function autoSpin() {
  spin();
  intervalId = setInterval(spin, 70+ (spinColLength * (scrollSpeed * 25)));
  spinning = true;
}


function spinButton() {
  if (buttons[4].active==true) {   
    if (purse <= 0) {
      window.location.reload();
    } else {
      if (!checkSpin || !!callWin) {
        spin(); // Call spin logic here
      }
    }
  }
}

function shopButton() {
  if (buttons[5].active==true) {   
    if (!shopOpen) {
      if (!checkSpin || !!callWin) {
        shopOpen = true;
      }
    } else if (!!shopOpen) {
      shopOpen = false;
    }
  }
}

//
//
//
//
//

function devTools() {
  // button1 = createButton('10')
  // button2 = createButton('100')
  // button3 = createButton('1000')
  // button4 = createButton('10000')
  // button5 = createButton('100000')
  // button6 = createButton('toggle auto')
  // button1.position(0, 20);
  // button2.position(0, 40);
  // button3.position(0, 60);
  // button4.position(0, 80);
  // button5.position(0, 100);
  // button6.position(0, 120);
  // button1.mousePressed(bu1);
  // button2.mousePressed(bu2);
  // button3.mousePressed(bu3);
  // button4.mousePressed(bu4);
  // button5.mousePressed(bu5);
  // button6.mousePressed(bu6);
  // function bu1() {
  //   purse = 10;
  // }
  // function bu2() {
  //   purse = 100;
  // }
  // function bu3() {
  //   purse = 1000;
  // }
  // function bu4() {
  //   purse = 10000;
  // }
  // function bu5() {
  //   purse = 100000;
  // }
  // function bu6() {
  // let buttontoggle = false
  //   if (buttons[3].active == false) {
  //     buttons[3].active = true;
  //   } else {
  //     buttons[3].active = false;
  //   }
  // }
}