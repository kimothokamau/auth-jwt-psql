require('dotenv').config()
const express = require("express");
const cors = require("cors");
const {Pool} = require('pg');

const connectStr = process.env.DATABASE_URL;
// const pool = new Pool({
//     connectionString: connectStr,
//     ssl: true
// });

console.log(connectStr);

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
const config = require("./config/db.config.js");

const Sequelize = require("sequelize");
const psqlenv = require('./herokudb');
const sequelize = new Sequelize(psqlenv.database,psqlenv.user, psqlenv.password,
  {
  host: psqlenv.host,
  dialect: 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

console.log(psqlenv.host);

// const db = {};
let db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db = require("./models");
const Role = db.role;

db.sequelize.sync();
initial();

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

app.get('/', function (req, res) {
  res.send('hello world')
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
//  console.log(`Server is running on ports ${PORT}.`);
console.log('The value of PORT is:', PORT);
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
