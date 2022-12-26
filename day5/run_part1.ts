console.log("day4 part1");

const filename = Deno.args[0] ?? "sample.txt";
console.log(`Using file: ${filename}`);
const dataIn = Deno.readTextFileSync(filename).split("\n");

const yardData = dataIn.filter(
  (line) => !(line.startsWith("move") || line.trim() == "")
);

function processYardData(yardData: string[]) {
  const stackHeight = yardData.slice(0, -1).length;
  const stacks: { stackId: number; crates: string[] }[] = [];
  const stackCount = parseInt(
    yardData
      .slice(-1)[0]
      .split("")
      .filter((i) => i.trim() !== "")
      .slice(-1)[0]
  );

  for (let i = 1; i <= stackCount; i++) {
    const stack: { stackId: number; crates: string[] } = {
      stackId: i,
      crates: [],
    };
    yardData.slice(0, -1).forEach((line) => {
      const crate = line[(i - 1) * 4 + 1];
      if (crate !== " ") stack.crates.push(crate);
    });
    stack.crates = stack.crates.reverse();
    stacks.push(stack);
  }

  const output = {
    yardData: yardData.slice(0, -1),
    stackHeight,
    stacks,
    stackCount,
  };

  return output;
}

const yardOutput = processYardData(yardData);

const moves = dataIn
  .filter((line) => line.startsWith("move"))
  .map((line) => {
    return {
      move: parseInt(line.split(" ")[1]),
      from: parseInt(line.split(" ")[3]),
      to: parseInt(line.split(" ")[5]),
      // raw: line,
    };
  });

function plotYard(yard: typeof yardOutput) {
  const output = [];
  console.log("-----------");
  yard.stacks.forEach((stack) => {
    console.log(`${stack.stackId} ${stack.crates.join("")}`);
  });
}

console.log("----");
plotYard(yardOutput);

function moveCrate(
  yard: typeof yardOutput,
  move: typeof moves[0],
  verbose = false
) {
  const fromStack = yard.stacks.find((stack) => stack.stackId === move.from);
  const toStack = yard.stacks.find((stack) => stack.stackId === move.to);

  if (fromStack && toStack) {
    const crate = fromStack.crates.pop();
    if (crate) {
      toStack.crates.push(crate);
      if (verbose) {
        console.log(`Moved ${crate} from ${move.from} to ${move.to}`);
      }
    }
  }
}

moves.forEach((move) => {
  console.log("===== MOVE ====");
  console.log(move);

  for (let i = 0; i < move.move; i++) {
    moveCrate(yardOutput, move, true);
  }
});

console.log("-----");

plotYard(yardOutput);
