const express = require("express");
const cors = require("cors");


const path = __dirname + '/views';
const app = express();
app.use(express.static(path));


var corsOptions = {
 origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// database
const db = require("./models");
const Role = db.role;

//db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync();
initial();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
//  console.log(`Server is running on ports ${PORT}.`);
console.log(__dirname);
});

 function initial() {
 Role.create({
  id: 1,
  name: "user"
 });

 Role.create({
  id: 2,
  name: "moderator"
 });

 Role.create({
  id: 3,
  name: "admin"
 });
 }
