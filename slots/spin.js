function setupSpin() {

for (let i = 0; i < 5; i++) {
  let column = Array(3).fill(null).map(() => symbol[Math.floor(random(0, symbol.length))]);
  columns.push(column);
}


  for (let i = 0; i < 5; i++) { // Define rows as matching array values from columns, in sequential order
    // Assign rows
    const columnIndex = columns[i].length - 1;
    r1[i] = columns[i][columnIndex];
    r2[i] = columns[i][columnIndex - 1];
    r3[i] = columns[i][columnIndex - 2];
  }
  
  c1 = columns[0];
  c2 = columns[1];
  c3 = columns[2];
  c4 = columns[3];
  c5 = columns[4];
  c0buffer = columns[0].slice(-3);
  c1buffer = columns[1].slice(-3);
  c2buffer = columns[2].slice(-3);
  c3buffer = columns[3].slice(-3);
  c4buffer = columns[4].slice(-3);
  
  

}



function spin() {  

  columns = [];

  // Fill each column with symbols and shuffle
  for (let i = 0; i < 5; i++) {
    let column = quantities.flatMap((quantity, index) => Array(quantity).fill(symbol[index]));
    column = shuffle(column);

    // Adjust the length of the first column and subsequent columns
    let columnLength;
    if (i === 0) {
        // For the first column, set its length to a portion of its original length
        columnLength = Math.ceil(column.length / 10);
    } else {
        // For subsequent columns, add between min and max items to the length of the previous column
        const minExtraItems = 4;
        const maxExtraItems = 8;
        const extraItems = minExtraItems + Math.floor(Math.random() * (maxExtraItems - minExtraItems));
        columnLength = columns[i - 1].length + extraItems;
    }

    // Truncate the column if necessary
    column = column.slice(1, columnLength);
    columns.push(column);
  }

  columns[0].unshift(...c0buffer);
  columns[1].unshift(...c1buffer);
  columns[2].unshift(...c2buffer);
  columns[3].unshift(...c3buffer);
  columns[4].unshift(...c4buffer);


  c0buffer = columns[0].slice(-3);
  c1buffer = columns[1].slice(-3);
  c2buffer = columns[2].slice(-3);
  c3buffer = columns[3].slice(-3);
  c4buffer = columns[4].slice(-3);

  
  // Define Columns to matching arrays
  c1=columns[0]
  c2=columns[1]
  c3=columns[2]
  c4=columns[3]
  c5=columns[4]
  
  spinColLength = columns[4].length
  
  for (let i = 0; i < 5; i++) { // Define rows as matching array values from columns, in sequential order
      // Assign rows
      const columnIndex = columns[i].length - 1;
      r1[i] = columns[i][columnIndex];
      r2[i] = columns[i][columnIndex - 1];
      r3[i] = columns[i][columnIndex - 2];
  }

  // Calculate win for each row
  r1Win = calculateRowWin([r1[0], r1[1], r1[2], r1[3], r1[4]]);
  r2Win = calculateRowWin([r2[0], r2[1], r2[2], r2[3], r2[4]]);
  r3Win = calculateRowWin([r3[0], r3[1], r3[2], r3[3], r3[4]]);
  r4Win = calculateRowWin([r3[0], r2[1], r1[2], r2[3], r3[4]]);
  r5Win = calculateRowWin([r1[0], r2[1], r3[2], r2[3], r1[4]]);
  r6Win = calculateRowWin([r1[0], r1[1], r2[2], r3[3], r3[4]]);
  r7Win = calculateRowWin([r3[0], r3[1], r2[2], r1[3], r1[4]]);
  r8Win = calculateRowWin([r2[0], r3[1], r2[2], r1[3], r2[4]]);
  r9Win = calculateRowWin([r2[0], r1[1], r2[2], r3[3], r2[4]]);

  r1Mul = calculateRowMultiplier(r1);
  r2Mul = calculateRowMultiplier(r2);
  r3Mul = calculateRowMultiplier(r3);

  
  checkSpin = true;
  setupScroll = 0;
  mainScroll = 0;
  callWin = false;
  c1Scroll = 0, c2Scroll = 0, c3Scroll = 0, c4Scroll = 0, c5Scroll = 0;
  c1Delay = 0, c2Delay = 5, c3Delay = 10, c4Delay = 15, c5Delay = 20;

  setWinValue() // call setWinValue, move this to draw when scroll is finished

  
}




  //determine multiplier for symbols
function calculateRowMultiplier(row) {
  const wildSymbol = symbol[9]; // Assuming index 9 is the wild symbol
  let firstSymbol = row[0] === wildSymbol ? row.find(s => s !== wildSymbol) : row[0];

  // If the first symbol is wild and the row contains only wilds, set firstSymbol to wildSymbol
  if (!firstSymbol) {
    firstSymbol = wildSymbol;
  }

  for (let k = 0; k < symbol.length; k++) {
    if (firstSymbol == symbol[k]) {
      return symbolMul[k];
    }
  }

  return 0; // Default to 0 if no match is found, should not happen if symbols are correctly defined
}

//determine if rows are matching
function calculateRowWin(row) {
  const wildSymbol = symbol[9]; // Assuming index 9 is the wild symbol
  let firstSymbol = row[0] === wildSymbol ? row.find(s => s !== wildSymbol) : row[0];

  if (!firstSymbol) {
    // If the row is entirely wild symbols
    return cMul[4];
  }

  if (row.every(symbol => symbol === wildSymbol || symbol === firstSymbol)) {
    return cMul[4]; // All symbols match or are wild
  } else if (row.slice(0, 4).every(symbol => symbol === wildSymbol || symbol === firstSymbol)) {
    return cMul[3]; // First 4 symbols match or are wild
  } else if (row.slice(0, 3).every(symbol => symbol === wildSymbol || symbol === firstSymbol)) {
    return cMul[2]; // First 3 symbols match or are wild
  } else if (row.slice(0, 2).every(symbol => symbol === wildSymbol || symbol === firstSymbol)) {
    return cMul[1]; // First 2 symbols match or are wild
  } else {
    return cMul[0]; // No match
  }
}

function setWinValue() { //run math for winnings, and add to purse after removing cost
  prize = 0;
  const rowWins = [r1Win, r2Win, r3Win, r4Win, r5Win, r6Win, r7Win, r8Win, r9Win];
  const rowMult = [r1Mul, r2Mul, r3Mul, r3Mul, r1Mul, r1Mul, r3Mul, r2Mul, r2Mul];
    // Calculate prize
  for (let i = 0; i < rowWins.length; i++) {
      prize += rowMult[i] * costMul * rowWins[i];
  }
  purseOld = purse - cost; //fake paying cost
  purse += prize - cost; // Update purse
  storeItem('score', purse);
  storeItem('scoreOld', purse);
}