console.log("Express Tutorial");
const express = require("express");
const app = express();
const { products } = require("./data");
const PeopleRouter = require("./routes/PeopleRouter");

//middleware function
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};
// setup static and middleware
app.use(logger);
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: false })); //parse URL-encoded data
//app.use(express.static("./public"));
app.use(express.static("./methods-public"));
app.use("/api/v1/people", PeopleRouter);
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// get all products
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

//get products by ID
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ error: "That Product was not found" });
  }

  res.json(product);
});

//get specific product/products
app.get("/api/v1/query", (req, res) => {
  let data = [...products];
  const { search, limit, priceLess } = req.query;
  if (search) {
    data = data.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }
  if (priceLess) {
    const priceLimit = parseFloat(priceLess);
    if (!isNaN(priceLimit)) {
      data = data.filter((product) => product.price < priceLimit);
    }
  }

  if (limit) {
    const lim = parseInt(limit);
    if (!isNaN(lim)) {
      data = data.slice(0, lim);
    }
  }

  if (data.length === 0) {
    return res
      .status(200)
      .json({ message: "No products matched your search." });
  }

  res.json(data);
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000....");
});
