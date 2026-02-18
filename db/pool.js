import { Pool } from "pg";
import "dotenv/config";

export default new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT
});