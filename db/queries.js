import pool from "./pool.js";

async function getAllMessages() {
  // destructure the query object to just select the row data
  const { rows } = await pool.query(
    "SELECT messages.id, messages.text, messages.added, users.username FROM messages JOIN users ON messages.user_id = users.id",
  );
  return rows;
}

async function insertMessage(message) {
  let result = await pool.query(`SELECT id FROM users WHERE username = $1`, [message.user]);
  let userId;

  if (result.rows.length > 0) {
    userId = result.rows[0].id;
  } else {

    // step 1: create user and get id
    const newRow = await pool.query("INSERT INTO users (username) VALUES ($1) RETURNING id",
      [message.user]
    );
    userId = newRow.rows[0].id;
  }
  
  await pool.query("INSERT INTO messages (text, user_id) VALUES ($1, $2)", 
    [
    message.text,
    userId,
    ]
  ); 
}

export { getAllMessages, insertMessage };
