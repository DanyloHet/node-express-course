const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.

const phrase = {
  start: "Enter something below.",
  filled: "Thank you, here is your list max 2 availible items.",
  guess: "Nothing was entered or list is full. Guess a number between 1 and 5 to start again",
  guessed: "You guessed the secret number!",
  wrongGuess: "Wrong guess. Try again."
}
const wrongUrl = `<h1>Oops!</h1><p>We can't seem to find the page you are looking for</p><a href="/">back home</a>`;
const visibility = {
  visible: 'display: block;',
  hidden: 'display: none'
}

let title = phrase.start;
let data = [];
let itemtList = "";
let defaultFormStyle = visibility.visible;
let secretFormStyle = visibility.hidden;



// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${title}</p>
  <form method="POST">
  <div style="${defaultFormStyle}">
  <input name="text"></input>
  <button type="submit">Submit</button>
  <ul>
  ${itemtList}
  </ul>
  </div>
  <div style="${secretFormStyle}">
  <label>Guess a number from 1 to 5:</label>
  <input type="number" name="guess" style min="1" max="5">
  <span title="3+2">
  <button type="submit">Guess</button>
  </span>
  </div>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.url !== "/") {
    res.end(wrongUrl);
    return;
  }
  if (req.method === "POST" && req.url === "/") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["text"]) {
        title = phrase.filled;
        data.push(body["text"]);
        itemtList = data.map(item => `<li>${item}</li>`).join('');
      }
      if (!body["text"] || data.length > 2) {
        title = phrase.guess;
        defaultFormStyle = visibility.hidden;
        secretFormStyle = visibility.visible;
        if (data.length >= 2) {
          data = [];
          itemtList = "";
        }
        if (body["guess"]) {
          const guessNumber = parseInt(body["guess"]);
          if (guessNumber === 5) {
            title = phrase.guessed;
            defaultFormStyle = visibility.visible;
            secretFormStyle = visibility.hidden;
            title = phrase.start;
          }
          else {
            title = phrase.wrongGuess;
          }
        }
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  }
  else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
