import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ) UNIQUE NOT NULL,
  password VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  text VARCHAR ( 255 ),
  user_id INTEGER REFERENCES users(id),
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password)
VALUES
 ('Jason', 'trialpass'),
 ('Ronaldo', '123456');

INSERT INTO messages (text, user_id)
VALUES
  ('Hi there!', (SELECT id FROM users WHERE username = 'Jason')),
  ('Hello world!', (SELECT id FROM users WHERE username = 'Ronaldo'));
`;

async function main() {
  console.log("Seeding database...");

  const client = new Client ({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("Completed seeding process.")
}

main();