import * as SQLite from 'expo-sqlite';

// Function to create tables
const createTables = async () => {

  try{
      // Open the database, creating it if it doesn't exist
      const db = await SQLite.openDatabaseAsync('calendarDatabase.db');
      // Execute SQL queries to create tables
      await db.runAsync(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
      );`
    );
    await db.runAsync(
      `CREATE TABLE IF NOT EXISTS days (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        date TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(user_id, date)
      );`
    );
    await db.runAsync(
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
    await db.runAsync(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day_id INTEGER,
        content TEXT,
        FOREIGN KEY (day_id) REFERENCES days(id)
      );`
    );
    console.log("done creating tables");
    
  } catch (error) {
    console.error('Error creating tables:', error);
  }
  
};


export { createTables };