import pool from "./pool.js";

// find user by username; 
// used to check for EXISTING users with a given name
async function getUser(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
}

async function createUser(username) {
  const { rows } = await pool.query("INSERT INTO users (username) VALUES ($1) RETURNING *", [username]);
  return rows[0];
}

async function getAllMessages() {
  // destructure the query object to just select the row data
  const { rows } = await pool.query(
    "SELECT messages.id, messages.text, messages.added, users.username FROM messages JOIN users ON messages.user_id = users.id",
  );
  return rows;
}

async function insertMessage(message) {
  await pool.query("INSERT INTO messages (text, user_id) VALUES ($1, $2)", 
    [
    message.text,
    message.userId,
    ]
  ); 
}

export { getUser, createUser, getAllMessages, insertMessage };
