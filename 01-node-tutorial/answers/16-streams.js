const { createReadStream } = require("fs");

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let counter = 0;

stream.on("data", (result) => {
  counter++;
  console.log(`Chunk # ${counter}:`, result);
});

stream.on("end", () => {
  console.log(`Operation ended. total chunks count is :${counter}`);
});

stream.on("error", (err) => console.log("Something goes wrong:", err));
