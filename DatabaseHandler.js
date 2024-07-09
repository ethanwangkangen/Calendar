import * as SQLite from 'expo-sqlite';

// Open the database, creating it if it doesn't exist
const db = SQLite.openDatabase('calendar.db');

// Function to create tables
export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS days (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        date TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(user_id, date)
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day_id INTEGER,
        title TEXT,
        description TEXT,
        start_time TEXT,
        end_time TEXT,
        FOREIGN KEY (day_id) REFERENCES days(id)
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day_id INTEGER,
        content TEXT,
        FOREIGN KEY (day_id) REFERENCES days(id)
      );`
    );
  });
};
