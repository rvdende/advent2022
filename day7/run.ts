// const data = Deno.readTextFileSync("sample.txt").trim().split("\n");
const data = Deno.readTextFileSync("day7data.txt").trim().split("\n");

let parseCommand: {
  result: string[];
  cmd: string;
  args: string;
  line: string;
} = { result: [], cmd: "", args: "", line: "" };

const parsedCommands: typeof parseCommand[] = [];

data.forEach((line) => {
  if (line.startsWith("$")) {
    if (parseCommand.cmd !== "") parsedCommands.push(parseCommand);
    const cmd = line.split(" ")[1];
    const args = line.split(" ")[2];
    parseCommand = { line, cmd, args, result: [] };
  } else {
    parseCommand.result.push(line);
  }
});

parsedCommands.push(parseCommand);

console.log(parsedCommands);

// ------------------------------
interface DataEntry {
  id: string;
  name: string;
  parentId: string | null;
  type: "dir" | "file";
  size: number | null;
}

const rootId = crypto.randomUUID();

let state: DataEntry[] = [
  {
    id: rootId,
    name: "/",
    type: "dir",
    parentId: null,
    size: null,
  },
];

let currentFolderId = "";

function changeDirectory(args: string) {
  if (args === "/") {
    currentFolderId = rootId;
    return;
  }

  if (args === "..") {
    currentFolderId =
      state.find((item) => item.id === currentFolderId)?.parentId || "";
    return;
  }

  // cd into a folder
  // check if it exists else create it.
  console.log(`Change directory into "${args}"`);
  const childFolders = state.filter(
    (i) => i.parentId === currentFolderId && i.type === "dir" && i.name === args
  );
  if (childFolders.length === 0) {
    const newFolder: DataEntry = {
      id: crypto.randomUUID(),
      name: args,
      type: "dir",
      parentId: currentFolderId,
      size: null,
    };
    state.push(newFolder);
    currentFolderId = newFolder.id;
  }
}

function list(data: typeof parseCommand) {
  data.result.forEach((line) => {
    const newDataEntry: DataEntry = {
      id: crypto.randomUUID(),
      name: "",
      type: "dir",
      parentId: currentFolderId,
      size: null,
    };

    if (line.split(" ")[0] === "dir") {
      //folders
      const name = line.split(" ")[1];
      newDataEntry.type = "dir";
      // todo parentId
    } else {
      // files
      newDataEntry.name = line.split(" ")[1];
      newDataEntry.size = parseInt(line.split(" ")[0]);
      newDataEntry.type = "file";
    }

    if (newDataEntry.type !== "dir") state.push(newDataEntry);
  });
}

// ------------------------------
console.log("==========================================");
console.log(parsedCommands);
parsedCommands.forEach((c, i) => {
  console.log(i, "Executing command: ", c.cmd, c.args);

  if (c.cmd === "cd") {
    changeDirectory(c.args);
  }

  if (c.cmd === "ls") {
    list(c);
  }
});

// ------------------------------
console.log("==========================================");

const totalFSSize = 70000000;
const updateSize = 30000000;
const totalUsedSize = 46592386;

let smallestToDeleteNumber = 999999999;
let smallestToDelete: any = {};

function plotTree(data: DataEntry[], parentId: string, level: number) {
  const findItem = (id: string) => data.filter((i) => i.id === id)[0];
  const findChildren = (id: string) =>
    data
      .filter((i) => i.parentId === id)
      .sort((a, b) => a.name.localeCompare(b.name));

  const printItem = (item: DataEntry) => {
    return;
    // console.log(
    //   `${"-".padStart(1 + level * 2)} ${item.name} (${
    //     item.type === "file" ? "file, size=" + item.size : item.type
    //   })`
    // );
  };

  const item = findItem(parentId);

  printItem(item);

  let totalSize = 0;

  if (item.type === "file") {
    totalSize = item.size || 0;
  }
  findChildren(parentId).forEach((child) => {
    const size = plotTree(data, child.id, level + 1);
    totalSize += size;
  });

  if (item.type === "dir") {
    const freespaceIfDeleted =
      totalFSSize - totalUsedSize + totalSize - updateSize;
    if (freespaceIfDeleted >= 0) {
      console.log("========>");
    }
    console.log(
      `${item.name} totalSize: ${totalSize} freespace: ${freespaceIfDeleted}`
    );
  }
  return totalSize;
}

plotTree(state, rootId, 0);
