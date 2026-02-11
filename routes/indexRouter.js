import { Router } from "express";

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

indexRouter.get("/", (req, res) => {
  const user = req.session.username;

  if (!user) {
    return res.redirect("/username");
  }
  res.render("index", { 
    title: "Mini Message Board", 
    messages: messages, 
    user: user 
  })
});

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

indexRouter.post("/", (req, res) => {
  const user = req.session.username;

  const newMsg = { 
    text: req.body.newMessage,
    user: user,
    added: new Date(),
  }

  messages.push(newMsg);
  res.redirect("/")
})

export default indexRouter;