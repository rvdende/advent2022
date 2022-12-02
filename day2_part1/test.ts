import { level1data } from './input.ts'

type Options = "A" | "B" | "C" | "X" | "Y" | "Z";

const getValue = (char: Options) => {
  if (char === "A") return { is: "rock", val: 1 };
  if (char === "B") return { is: "paper", val: 2 };
  if (char === "C") return { is: "scissors", val: 3 };
  
  if (char === "X") return { is: "rock", val: 1 };
  if (char === "Y") return { is: "paper", val: 2 }; 
  if (char === "Z") return { is: "scissors", val: 3 };
  throw Error("invalid choice");
}

type StratLine = [Options, " ", Options];

const getChoice = (val:Options) => {
  if (val === "A") return "Y";
  if (val === "B") return "X";
  if (val === "C") return "Z";
  throw "invalid choice";
}

const processStrat = (s: StratLine) => {
  const opponent = getValue(s[0]);

  // const choice = getChoice(s[0]);
  
  const you = getValue(s[2]);

  console.log(`${opponent.is} vs ${you.is}`);

  let result = 0;

  // // draw
  if (opponent.is == you.is) {
    console.log("draw");
    return 3 + you.val;
  }

  if (opponent.is ==="rock" && you.is === "paper") {
    console.log("win");
    return 6 + you.val;
  }

  if (opponent.is === "scissors" && you.is ==="rock") {
    
    console.log("win");
    return 6 + you.val;
  }

  if (opponent.is === "paper" && you.is === "scissors") {
    
    console.log("win");
    return 6 + you.val;
  }
  
  // loss

  return you.val;
}

const game = (strat: StratLine[]) => {
  const scores = strat.map(s => processStrat(s));
  console.log(scores)
  let total = 0
  scores.forEach(s => { total += s });
  return total;
}

// test
const level0 = [
  "A Y",
  "B X",
  "C Z"
].map(l => l.split('')) as StratLine[];


// level 1
const level1 = level1data.split('\n').map(l => l.split('')) as StratLine[];



// console.log(game(level0));
 console.log(game(level1));

// console.log(JSON.stringify(result, null, 2));