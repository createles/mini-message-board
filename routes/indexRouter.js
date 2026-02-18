import { Router } from "express";
import { getMessages, createMessage } from "../controllers/messageController.js";

const indexRouter = Router();

indexRouter.get("/", getMessages);

// route to setting username
indexRouter.get("/username", (req, res) => {
  res.render("username-form");
})

// post route to pass username to chat page
indexRouter.post("/username", (req, res) => {
  req.session.username = req.body.username;
  res.redirect("/");
})

// indexRouter.get("/new", (req, res) => {
//   res.render("form")
// });

indexRouter.post("/", createMessage);

export default indexRouter;