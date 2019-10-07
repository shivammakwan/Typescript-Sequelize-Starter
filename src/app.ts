import express from "express";
import routes from "./modules/Users/Routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const port = 4000;

dotenv.config({ path:".env"});

app.get("/", (req, res) => {
    // UserController.getAllUsers(req,res);
    res.send("Yes it Worked!!!");
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api", routes);
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.log(`Server is Up and Running on ${port}`);
});