const { writeFile, readFile } = require("fs").promises;

async function writer() {
  try {
    await writeFile("temp.txt", "Line 1\n");
    await writeFile("temp.txt", "Line 2\n", { flag: "a" });
    await writeFile("temp.txt", "Line 3\n", { flag: "a" });
    console.log("File written successfully!");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
}

// Async function to read and log content from temp.txt
async function reader() {
  try {
    const content = await readFile("temp.txt", "utf-8");
    console.log("File contents:\n" + content);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

// Async function to start  both writer and reader
async function readWrite() {
  try {
    await writer();
    await reader();
    console.log("Everything works");
  } catch (error) {
    console.error("Error, function or both functions are broken");
  }
}

readWrite();
