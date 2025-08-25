const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "This is line 1.\n")
  .then(() => {
    console.log("Write the second line, first line was written at the start");
    return writeFile("temp.txt", "This is line 2.\n", { flag: "a" });
  })
  .then(() => {
    console.log("Write the third line");
    return writeFile("temp.txt", "This is line 3.", { flag: "a" });
  })
  .then(() => {
    console.log("Read the file data");
    return readFile("temp.txt", "utf-8");
  })
  .then((data) => {
    console.log("Log the file data on the screen");
    console.log(data + "Lines were written/read and shown");
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
