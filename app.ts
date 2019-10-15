const BodyParser = require("body-parser");
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");

const SessionStore = require("express-session-sequelize")(session.Store);

const csrf = require("csurf")();

// import { ErrorsController } from "./controllers/errors-controller";
// import { Repository } from "./database/repository";
// // import { Repository2 } from "./database/repository2";
// import { Environment } from "./environment";
// import router from "./routes/web";

const Errors = require("./controllers/errors-controller").ErrorsController;
const Repository = require("./database/repository").Repository;
const Environment = require("./environment").Environment;
const router = require('./routes/web');

const app = express();

app.engine("hbs", handlebars({
  defaultLayout: "app",
  extname: "hbs",
  helpers: {
    uppercase(message: string) {
      return message.toUpperCase();
    },
    prop(obj: object, property: string) {
      return obj && obj[property] ? obj[property] : "";
    },
    increase(a: string, b: string) {
      const aa: number = Number.parseInt(a, 10);
      const bb: number = Number.parseInt(b, 10);

      return aa + bb;
    },
    toISODate(text: string) {
      const date: Date = new Date(text);
      return date.toISOString().substr(0, 10);
    },
  },
  layoutsDir: __dirname + "\\views\\layouts",
  partialsDir: __dirname + "\\views\\partials",
}));

app.set("views", "views");
app.set("view engine", "hbs");

// middleware for parsing application/x-www-form-urlencoded
app.use(BodyParser.urlencoded({ extended: false }));

// middleware for json body parsing
// app.use(BodyParser.json({ limit: '5mb' }));

// enabling the session
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "hello-it-is-me",
  store: new SessionStore({
    db: Repository.instance(),
  }),
}));

// Handling CSRD Attacks
app.use(csrf);

// Static files route
app.use(express.static(Environment.public));

app.use((request, response, next) => {
  // Hello this is the Gate keeper of our site >>>
  // Enter with your right leg please >>>
  // See you next MIDDLEWARE
  console.log("+==========+==========+==========+==========+");
  console.log("New request recieved", [
    request.url,
    request.method,
  ]);
  next();
});

// Modules routes
app.use(router);

// Errors routes
app.use(ErrorsController.pageNotFound404);

Repository.synchronize(false, () => {
  app.listen(Environment.port, Environment.hostName, () => {
    console.warn("APP", `listening on  http://${Environment.hostName}:${Environment.port}`);
    console.log("we are learning NodeJs");

  });
});

// Repository2.connect(() => {
//   app.listen(Environment.port, Environment.hostName, () => {
//     console.warn("APP", `listening on  http://${Environment.hostName}:${Environment.port}`);
//     console.log("we are learning NodeJs");
//   });
// });
