console.log(new Date())
const data = await Deno.readTextFile("./sample.txt");

type Plantation = number[][];

const trees: Plantation = data.split('\n').map(s => s.split('').map(c => parseInt(c)))
console.log(trees)

const rows = trees.length
const cols = trees[0].length;

const getHeight = ({ x, y }: { x: number, y: number }) => {
  return trees[y][x];
}



const checkVisible = ({ x, y }: { x: number, y: number }) => {
  let visible = false;
  
  if (x == 0) visible = true;
  if (y == 0) visible = true;
  if (x == rows - 1) visible = true;
  if (y == cols - 1) visible = true;

  const treeHeight = getHeight({ x, y });

  // INVERT LOGIC
  // check if the tree is hidden in all directions.. must be hidden in all 4.
  // to left
  const hiddenToWest = () => {
    for (let col = x; col > 0; col--) if (getHeight({ x: col, y }) > treeHeight) return true; // if a tree is higher we are hidden
    return false; // asssume we are visible
  }

  // to right
  const hiddenToEast = () => {
    for (let col = x; col < cols; col++) if (getHeight({ x: col, y }) > treeHeight) return true;
    return false
  }

  // to top
  const hiddenToNorth = () => {
    for (let row = y; row > 0; row--) if (getHeight({ x, y: row }) > treeHeight) return true;
    return false;
  }

  // to bottom
  const hiddenToSouth = () => {
    for (let row = y; row < rows; row++) if (getHeight({ x, y: row }) > treeHeight) return true;
    return false;
  }

  // const directions = [!hiddenToWest(), !hiddenToEast(), !hiddenToNorth(), !hiddenToSouth()];

  

  // if (!visibleDirections) visible = true;

  return {
    x, y,
    treeHeight,
    visible,
    visibleDirections: {
      north: !hiddenToNorth(),
      east: !hiddenToEast(),
      south: !hiddenToSouth(),
      west: !hiddenToWest(),
    }
  };
}

type CheckData = ReturnType<typeof checkVisible>;


type CheckMap = CheckData[][];

const datamap: CheckMap = [];

const checkForest = () => {
  let count = 0;
  for (let row = 0; row < rows; row++) {
    let rowMap = [];
    for (let col = 0; col < cols; col++) {
      const check = checkVisible({ x: col, y: row });

      console.log(`tree x:${col} y:${row} is ${getHeight({ x: col, y: row })} tall and is ${check.visible ? '' : 'not '}visible `)
      if (check.visible) {
        count++
      }

      rowMap.push(check)
    }
    datamap.push(rowMap);
  }
  console.log(count);
}

checkForest();

// console.log(datamap);

/////////////////////

interface KeyValFunc<T, K extends keyof T> {
  key: K,
  valFunc: (val: T[K]) => void
}

const plot = (map: CheckData[][]) => <K extends keyof CheckData>(
  { prop,
    render,
  }: {
    prop: K,
    render: (val: CheckData[K]) => string
  }) => {
    console.log(`\n Plotting property: ${prop}`)
  for (let row = 0; row < rows; row++) {
    let outputstring = ""
    for (let col = 0; col < cols; col++) {
      let val = map[row][col][prop];
      outputstring += render(val);
    }
    console.log(outputstring);
  }
}

// Tree height map
plot(datamap)({
  prop: "treeHeight",
  render: (height) => height.toString()
});

// Visibility map
plot(datamap)({
  prop: "visible",
  render: (isVisible) => isVisible ? '·' : 'x'
});


// Visibility map
plot(datamap)({
  prop: "visibleDirections",
  render: (dir) => dir.north ? 'N' : '·'
});

// Visibility map
plot(datamap)({
  prop: "visibleDirections",
  render: (dir) => dir.east ? 'E' : '·'
});

// Visibility map
plot(datamap)({
  prop: "visibleDirections",
  render: (dir) => dir.west ? 'W' : '·'
});

// Visibility map
plot(datamap)({
  prop: "visibleDirections",
  render: (dir) => dir.south ? 'S' : '·'
});
