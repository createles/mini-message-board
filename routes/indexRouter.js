import { Router } from "express";
import { getMessages, createMessage } from "../controllers/messageController.js";
import { loginUser } from "../controllers/userController.js";

const indexRouter = Router();

indexRouter.get("/", getMessages);

// route to setting username
indexRouter.get("/username", (req, res) => {
  res.render("username-form");
})

// post route to pass username to chat page
indexRouter.post("/username", loginUser);

// indexRouter.get("/new", (req, res) => {
//   res.render("form")
// });

indexRouter.post("/", createMessage);

export default indexRouter;