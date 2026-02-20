import { getAllMessages, insertMessage } from "../db/queries.js";
import { body, validationResult } from "express-validator";

const validateMessage = [
  body("newMessage")
    .trim()
    .notEmpty().withMessage("Message cannot be empty.")
    .isLength({ max: 255 }).withMessage("Message must be 255 characters or less.")
];

async function getMessages(req, res) {
  const user = req.session.username;

  if (!user) {
    return res.redirect("/username");
  }

  const messages = await getAllMessages();
  res.render("index", {
     title: "Mini Message Board", 
     messages: messages, 
     user: user, 
    });
}

const createMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const messages = await getAllMessages();
      const user = req.session.username;

      return res.render("index", {
        title: "Mini Message Board",
        messages: messages,
        user: user,
        error: errors.array()[0].msg
      });
    }

    const userId = req.session.userId;
    const { newMessage } = req.body;
    await insertMessage({ text: newMessage, userId: userId });
    res.redirect("/");
  }
];

export { getMessages, createMessage };