import { getUser, createUser } from "../db/queries.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const validateUser = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username cannot be empty.")
    .isAlphanumeric().withMessage("Username must contain only letters and numbers.")
    .isLength({ min: 1, max: 20 }).withMessage("Username must be between 1 and 20 characters."),
  body("password")
    .notEmpty().withMessage("Password is required.")
    .isLength({ min: 4 }).withMessage("Password must be at least 4 characters.")
];

const signupUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("username-form", { error: errors.array()[0].msg });
    }

    const { username, password } = req.body;

    // protect against postman attacks (bypassing JS check)
    const existingUser = await getUser(username);
    if (existingUser) {
      return res.render("username-form", { error: "Username is already taken."});
    }
    

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(username, hashedPassword);

    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    res.redirect("/");
  },
];

const loginUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("username-form", { error: errors.array()[0].msg });
    }

    const { username, password } = req.body;

    const user = await getUser(username);

    if (!user) {
      return res.render("username-form", { error: "User not found." });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.userId = user.id;
      req.session.username = user.username;
      res.redirect("/");
    } else {
      res.render("username-form", { error: "Incorrect password" });
    }
  },
];
// non-routing api calls

// check if username is available
async function existingUserCheck(req, res) {
  const { username } = req.query;
  const user = await getUser(username);

  if (user) {
    res.json({ available: false }); // user exists
  } else {
    res.json({ available: true }); // username is free
  }
}

export { signupUser, loginUser, existingUserCheck };