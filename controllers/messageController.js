import { getAllMessages, insertMessage } from "../db/queries.js";

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

async function createMessage(req, res) {
  const userId = req.session.userId;

  const { newMessage } = req.body;

  await insertMessage({ text: newMessage, userId: userId });

  res.redirect("/");
}

export { getMessages, createMessage };