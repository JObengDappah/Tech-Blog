//Path import
const path = require("path");
//store environment variables in .env without exposing them in the code
require('dotenv').config();

const express = require("express");
const app = express();
const session = require('express-session');
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8000;
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const userRoutes = require('./controllers/userController');
const authRoutes = require('./controllers/authController');

//create a new instance of handlebars with default parameters
const hbs = exphbs.create({
    layoutsDir: __dirname + '/public/views/layouts',
    extname: 'hbs',
    partialsDir: __dirname + '/public/views/',
    extname: 'hbs',
});

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 3600000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(express.static(path.join(__dirname, '/public')));
  app.use(session(sess));
  app.use(authRoutes);
  app.use(userRoutes);
  app.use(express.urlencoded());
  app.use(express.json());

  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  });




  app.get("/dashboard", (req, res) =>{
    console.log("dashboard loaded");
    res.render("dashboard",{layout:"main"});
});

app.get("/home", (req, res) =>{
  console.log("homepage loaded");
  res.render("homepage",{layout:"main"});
});