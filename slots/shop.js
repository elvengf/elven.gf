function shopUpdate() {
  if (investment > 0) {
    purchaseButtons[8].active=true;
  } else if (investment <=0){
    investment=0
    purchaseButtons[8].active=false;
  }
  
  if (purse>shop0mult) {
    purchaseButtons[0].active=true;
  } else if (purse<=shop0mult){
    purchaseButtons[0].active=false;
  }  
}

function shopText() {
  push()
  translate(width/2,height/2)
  textFont(f, increment);
  fill(255)

  if (callWin == true) {
    text(purse, grid[6][3].x,grid[6][3].y-increment/5);
  }
  else {
    text(purseOld, grid[6][3].x,grid[6][3].y-increment/5);
  }
  pop()
  
  push()
  
  translate(width/2,height/2)
  textFont(f, increment/2)
  fill(255)
  text('speed - '+speedOut, grid[2][0].x,grid[2][0].y)
  
  pop()
}

let purchaseButtons = [
  { active: false, label: 'Speed', row: 0, col: 0, color: [155, 55, 55], action: shop0, isPressed: false },
  { active: false, label: 'Locked', row: 0, col: 2, color: [155, 55, 55], action: shop1, isPressed: false },
  { active: false, label: 'Locked', row: 0, col: 4, color: [155, 55, 55], action: shop2, isPressed: false },
  { active: false, label: 'Locked', row: 0, col: 6, color: [155, 55, 55], action: shop3, isPressed: false },
  { active: false, label: 'Locked', row: 3, col: 0, color: [155, 55, 55], action: shop4, isPressed: false },
  { active: false, label: 'Locked', row: 3, col: 2, color: [155, 55, 55], action: shop5, isPressed: false },
  { active: false, label: 'Locked', row: 3, col: 4, color: [155, 55, 55], action: shop6, isPressed: false },
  { active: false, label: 'Locked', row: 3, col: 6, color: [155, 55, 55], action: shop7, isPressed: false },
  { active: false, label: 'Rebuy', row: 6, col: 0, color: [155, 55, 55], action: rebuyButton, isPressed: false },
  { active: true, label: 'Return', row: 6, col: 6, color: [155, 55, 55], action: shopButton, isPressed: false },
];

function drawShopButtons(label, x, y, color) {
  fill(color);
  rect(x, y, increment * 1.5, increment / 1.5, increment/10)
  fill(255);
  text(label, x, y - increment / 15);
}

function shopButtons() {
  push();
  translate(width / 2, height / 2);
  rectMode(CENTER);
  strokeWeight(increment / 16);
  textFont(f, increment);
  textSize(increment / 2);
  
  for (let btn of purchaseButtons) {
    if (btn.active === true) {
      let x = grid[btn.row][btn.col].x + width / 2;
      let y = grid[btn.row][btn.col].y + height / 2;
      if (mouseX > x - (increment * 0.75) && mouseX < x + (increment * 0.75) &&
          mouseY > y - (increment * 0.35) && mouseY < y + (increment * 0.35) && btn.isPressed == false) {
        btn.color = [225, 75, 75]; // Brighter red
      } else  if (btn.isPressed == true) {
        btn.color = [105, 35, 35];
      } else {
        btn.color = [155,55,55]; // Reset to original color
      }
    drawShopButtons(btn.label, grid[btn.row][btn.col].x, grid[btn.row][btn.col].y, btn.color);
    } else if (btn.active === false){
    drawShopButtons(btn.label, grid[btn.row][btn.col].x, grid[btn.row][btn.col].y, 55, 55, 55);
    }
  }
  
  pop();
}

let investment = 0;
function rebuyButton() {
  purse += investment;
  purseOld = purse;
  investment = 0;
  shop0mult=100;
  scrollSpeed=8;
  speedOut=scrollSpeed.toFixed(2)
}

let shop0mult=100;
let speedOut=scrollSpeed;
function shop0() {
  if (purchaseButtons[0].active == true) {
    purse-=shop0mult;
    purseOld=purse;
    investment+=shop0mult;
    shop0mult*=10;
    scrollSpeed*=0.8
    speedOut = scrollSpeed.toFixed(2)
  }
}

function shop1() {
  if (purchaseButtons[1].active == true) {
    
  }
}

function shop2() {
  if (purchaseButtons[2].active == true) {
    
  }
}

function shop3() {
  if (purchaseButtons[3].active == true) {
    
  }
}

function shop4() {
  if (purchaseButtons[4].active == true) {
    
  }
}

function shop5() {
  if (purchaseButtons[5].active == true) {
    
  }
}

function shop6() {
  if (purchaseButtons[6].active == true) {
    
  }
}

function shop7() {
  if (purchaseButtons[7].active == true) {
    
  }
}
