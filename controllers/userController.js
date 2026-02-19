import { getUser, createUser } from "../db/queries.js";
import bcrypt from "bcryptjs";

async function signupUser(req, res) {
  const { username, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser(username, hashedPassword);
  
  req.session.userId = newUser.id;
  req.session.username = newUser.username;
  res.redirect("/");
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  
  const user = await getUser(username);

  if (!user) {
    return res.render("username-form", { error: "User not found." })
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect("/");
  } else {
    res.render("username-form", { error: "Incorrect password" });
  }
}

// non-routing api calls

// check if username is available
async function existingUserCheck(req, res) {
  const { username } = req.query;
  const user = await getUser(username);

  if (user) {
    res.json({ availabe: false }); // user exists
  } else {
    res.json({ available: true }); // username is free
  }
}

export { signupUser, loginUser, existingUserCheck };