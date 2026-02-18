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
  const user = req.session.username;

  const { newMessage } = req.body;

  await insertMessage({ text: newMessage, user: user });

  res.redirect("/");
}

export { getMessages, createMessage };