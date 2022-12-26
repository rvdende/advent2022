const sample = [
  { data: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", marker: 7 },
  { data: "bvwbjplbgvbhsrlpgdmjqwftvncz", marker: 5 },
  { data: "nppdvjthqldpwncqszvftbrmjlhg", marker: 6 },
  { data: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", marker: 10 },
  { data: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", marker: 11 },
];

function findStartOfPacket(data: string) {
  let firstId = -1;
  data.split("").forEach((char, index) => {
    if (index > data.length - 4) return;
    const chars = data.slice(index, index + 4).split("");
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
  return firstId + 4;
}

sample.forEach((s) => {
  console.log(`${findStartOfPacket(s.data)} should be ${s.marker}`);
});

// part1

const dataload = Deno.readTextFileSync("part1data.txt").toString();
console.log(dataload);
console.log(findStartOfPacket(dataload));
