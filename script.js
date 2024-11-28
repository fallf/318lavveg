const express = require("express");
const app = express();

const PORT = 3000;

const bodyParser = require("body-parser");

const jsxViewEngine = require("jsx-view-engine");
const methodOverride = require("method-override");

// import the data from the fake database files
const vegetables = require("./data/vegetables");

// set up the view engine to be able to use it
app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

// ========== MIDDLEWARE ==========

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(methodOverride("_method"));

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("Middleware: I run for all routes");
  next();
});

app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `-----
        ${time.toLocaleDateString()}: Received a ${req.method} request to ${
      req.url
    }.`
  );

  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// ========== ROUTES ==========

app.get("/", (req, res) => {
  res.send("<h1>we are here</h1> ");
});

app.get("/api/vegetables/", (req, res) => {
  res.json(vegetables);
});

// NEW
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});
// DELETE
app.delete("/api/vegetables/:id", (req, res) => {
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    vegetables.splice(req.params.id, 1);
    res.json(vegetables);
  } else {
    res.send("<p> something went wrong</>p");
  }
});

// update
app.put("/api/vegetables/:id", (req, res) => {
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    // put takes the request body and replaces the entire database entry with it
    // find the id and replace the entire thing with the req.body
    if (req.body.readyToEat === "on") {
      // if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      // if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    vegetables[req.params.id] = req.body;
    res.json(vegetables[req.params.id]);
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});
//patch

app.patch("/api/vegetables/:id", (req, res) => {
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    // patch only replaces the properties that we give it
    // find the id and replace only they new properties
    console.log(vegetables[req.params.id]);
    console.log(req.body);
    const newVegetables = { ...vegetables[req.params.id], ...req.body };
    vegetables[req.params.id] = newVegetables;
    res.json(vegetables[req.params.id]);
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});

// CREATE
app.post("/api/vegetables", (req, res) => {
  console.log(req.body);
  // you should check this when you first start, but then get rid of this console.log
  // console.log(req.body);
  // need to add logic to change the check or not checked to true or false
  if (req.body.readyToEat === "on") {
    // if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    // if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  vegetables.push(req.body);
  // res.send('this was the post route');
  res.json(vegetables);
});

// E - Edit
app.get("/vegetables/:id/edit", (req, res) => {
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    res.render("vegetables/Edit", {
      vegetable: vegetables[req.params.id],
      id: req.params.id,
    });
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});

// SHOW
app.get("/api/vegetables/:id", (req, res) => {
  if (req.params.id >= 0 && req.params.id < vegetables.length) {
    res.json(vegetables[req.params.id]);
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});

app.listen(PORT, () => {
  console.log("listening");
});
