
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initializeDatabase() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS characters (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      userId TEXT,
      characterId TEXT,
      timestamp INTEGER,
      FOREIGN KEY (userId) REFERENCES users (id),
      FOREIGN KEY (characterId) REFERENCES characters (id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversationId TEXT,
      sender TEXT,
      content TEXT,
      timestamp INTEGER,
      FOREIGN KEY (conversationId) REFERENCES conversations (id)
    )
  `);

  return db;
}

export async function seedDatabase(db: any) {
  await db.run(`
    INSERT INTO characters (id, name, description)
    VALUES
      ('char1', 'Alice', 'A friendly and curious AI character.'),
      ('char2', 'Bob', 'A witty and knowledgeable AI character.'),
      ('char3', 'Charlie', 'An adventurous and imaginative AI character.')
  `);
}

