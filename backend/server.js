const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router();

 var corsOptions = {
 origin: "http://localhost:3000"
};



app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, './build/', 'index.html')
    );
  });

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.status(201).json({});
  });
}
}

// database
const db = require("./models");
const Role = db.role;

//db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync();
initial();

// simple route
app.get("/", (req, res) => {
res.json({ message: "Welcome to bezkoder application." });
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}.`);
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
