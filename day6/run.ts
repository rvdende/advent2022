const sample = [
  { data: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", marker: 7, messageStart: 19 },
  { data: "bvwbjplbgvbhsrlpgdmjqwftvncz", marker: 5, messageStart: 23 },
  { data: "nppdvjthqldpwncqszvftbrmjlhg", marker: 6, messageStart: 23 },
  { data: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", marker: 10, messageStart: 29 },
  { data: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", marker: 11, messageStart: 26 },
];

function findUniqueSequence(data: string, lengthOfSeq: number) {
  let firstId = -1;
  data.split("").forEach((char, index) => {
    if (index > data.length - lengthOfSeq) return;
    const chars = data.slice(index, index + lengthOfSeq).split("");
    // console.log(chars);

    // check if each char is different in chars
    let isUnique = true;
    chars.forEach((c, i) => {
      chars.forEach((c2, i2) => {
        if (i !== i2) {
          if (c === c2) isUnique = false;
        }
      });
    });
    // console.log(isUnique);
    if (isUnique && firstId === -1) firstId = index;
  });
  return firstId + lengthOfSeq;
}

sample.forEach((s) => {
  console.log(`${findUniqueSequence(s.data, 4)} should be ${s.marker}`);
});

console.log("-------------");
// part1

const dataload = Deno.readTextFileSync("part1data.txt").toString();
console.log(`Start of packet: ${findUniqueSequence(dataload, 4)}`);

// part2
console.log("-------------");

sample.forEach((s) => {
  console.log(
    `${findUniqueSequence(s.data, 14)} start of message should be ${
      s.messageStart
    }`
  );
});

console.log(`Start of message: ${findUniqueSequence(dataload, 14)}`);
