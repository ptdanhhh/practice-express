import { config } from "dotenv";

config();

export const port = process.env.PORT;

export const appConfig = {
  port,
  db: {
    dsn: process.env.DB_DSN || "",
  },
};
