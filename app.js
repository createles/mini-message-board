import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// const assetsPath = path.join(__dirname, "public");
import indexRouter from "./routes/indexRouter.js";
import { allowedNodeEnvironmentFlags } from "process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(3000, () => {
  console.log("Listening in on port 3000")
});