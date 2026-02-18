import { getUser, createUser } from "../db/queries.js";

async function loginUser(req, res) {
  const { username } = req.body;
  
  let user = await getUser(username);

  if (!user) {
    user = await createUser(username);
  }

  req.session.userId = user.id;
  req.session.username = user.username;

  res.redirect("/");
}

export { loginUser };