console.log("day4");
// const data = Deno.readTextFileSync("sample.txt")
const data = Deno.readTextFileSync("part1data.txt")
  .trim()
  .split("\n")
  .map((line, pairId) => {
    const elves = line.split(",").map((elf, elfId) => {
      const s = elf.split("-").map((s) => {
        return parseInt(s);
      });
      const from = s[0];
      const to = s[1];
      const range = to - from + 1;
      return { elfId, pairId, from, to, range };
    });

    return { pairId, elves };
  });

console.log(data);

function fullyContain(pair: typeof data[number]) {
  const [a, b] = pair.elves;
  console.log(`Checking`);
  console.log(a);
  console.log(b);

  if (a.from <= b.from && a.to >= b.to) return true;
  if (b.from <= a.from && b.to >= a.to) return true;

  return false;
}

let count = 0;
data.forEach((i) => {
  const result = fullyContain(i);
  if (result) count++;
});

console.log(`Fully contained answer is: ${count}`);

// PART 2

function partiallyContain(pair: typeof data[number]) {
  const [a, b] = pair.elves;
  console.log(`Checking`);
  console.log(a);
  console.log(b);

  if (a.from >= b.from && a.from <= b.to) return true;
  if (b.from >= a.from && b.from <= a.to) return true;
  return false;
}

let countPart2 = 0;
data.forEach((i) => {
  const result = partiallyContain(i);
  if (result) countPart2++;
});

console.log(`Partially contained answer si ${countPart2}`);
