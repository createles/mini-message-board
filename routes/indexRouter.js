import { Router } from "express";
import { getMessages, createMessage } from "../controllers/messageController.js";
import { existingUserCheck, loginUser, signupUser } from "../controllers/userController.js";

const indexRouter = Router();

indexRouter.get("/", getMessages);

// route to setting username
indexRouter.get("/username", (req, res) => {
  res.render("username-form");
})

indexRouter.get("/api/check-username", existingUserCheck)

// proceed to chat after new sign up
indexRouter.post("/signup", signupUser);

// proceed to chat after login
indexRouter.post("/login", loginUser);

// send new message route
indexRouter.post("/", createMessage);

export default indexRouter;