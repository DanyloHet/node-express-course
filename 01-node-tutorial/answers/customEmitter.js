const { readFile } = require("fs").promises;
const path = require("path");
const EventEmitter = require("events");
const customEmitter = new EventEmitter();
const absolute = path.resolve(__dirname, "content", "subfolder", "test.txt");
let text = "";

customEmitter.on("readFile", (content) => {
  console.log("Content Recieved");
  text = content;
  console.log("File content is:" + content);
});

readFile(absolute, "utf8")
  .then((content) => {
    console.log("Reading file");
    customEmitter.emit("readFile", content);
  })
  .catch((err) => console.error("Error reading file:", err));

setTimeout(() => {
  if (!text.length) {
    console.log("operation failed");
  } else {
    console.log("success");
  }
}, 3000);
