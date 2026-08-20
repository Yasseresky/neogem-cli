import { DatabaseSync } from "node:sqlite";
import chalk from "chalk";

export const db = new DatabaseSync("local.db");

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log(chalk.gray("Database initialized"));
}

export function saveMessage(role, content) {
  try {
    const stmt = db.prepare(
      "INSERT INTO messages (role, content) VALUES (?, ?)",
    );
    stmt.run(role, content);
  } catch (err) {
    console.error(chalk.red("Failed to save message:"), err.message);
  }
}

export function getChatHistory(limit = 10) {
  try {
    const stmt = db.prepare(
      "SELECT role, content, timestamp FROM messages ORDER BY timestamp DESC LIMIT ?",
    );
    return stmt.all(limit);
  } catch (err) {
    console.error(chalk.red("Failed to fetch history:"), err.message);
    return [];
  }
}
