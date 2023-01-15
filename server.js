const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3000;

app.use(express.static(__dirname + "/public")); //configure the server to serve static files
app.use(express.json());
app.get("/", (req, res) => {
  //  res.send("Hello World")
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

///API endpoint to for get req at /notes
app.get("/notes", (req, res) => {
  //  res.send("Hello World")
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

///Lisiente to api/notes post
app.post("/api/notes", (req, res) => {
  const arr = JSON.parse(fs.readFileSync("db.json"));
  arr.push(req.body);
  fs.writeFileSync("db.json", `[${arr.map((el) => JSON.stringify(el))}]`);
});

app.get("/api/notes", (req, res) => {
  const arr = JSON.parse(fs.readFileSync("db.json"));
  res.send(arr);
});

///Create(post) Retrieve(get) Update(put) Delete(delete) //HTML/https protocol
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
