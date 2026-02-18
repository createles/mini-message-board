import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ), 
  text VARCHAR ( 255 ),
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, text)
VALUES
  ('Amando', 'Hi there!'),
  ('Charles', 'Hello World!');
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