import pool from "./pool.js";

async function getAllMessages() {
  // destructure the query object to just select the row data
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(message) {
  await pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)",
    [
      message.user,
      message.text,
      // no need for date due to use of CURRENT_TIMESTAMP in table definition
    ]);
}

export { getAllMessages, insertMessage };
