import express from "express";
import session from "express-session"
import path from "path";
import { fileURLToPath } from "url";
// const assetsPath = path.join(__dirname, "public");
import indexRouter from "./routes/indexRouter.js";
import { allowedNodeEnvironmentFlags } from "process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const PORT = process.env.port || 3000;

app.use(session({
  secret: "blagadug",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}`)
});