
const { Pool } = require('pg');


const pool = new Pool({
  
  connectionString:process.env.connectionString,  ssl: {
    rejectUnauthorized: false, // This allows SSL connection to cloud-based databases
  },
  port: 5432,
});

// Function to initialize the database tables
async function initializeTables() {
  try {
    // Create the users table if it doesn't already exist
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    
    // Add more table creation queries if needed
    await pool.query(createUserTableQuery);
    console.log('Users table created or already exists.');

    // You can create other tables here if needed, e.g., events table
    const createEventsTableQuery = `
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        date TIMESTAMP NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `;
    
    await pool.query(createEventsTableQuery);
    console.log('Events table created or already exists.');

  } catch (err) {
    console.error('Error initializing database tables:', err.message);
    throw err;
  }
}

// Call the function to initialize tables
initializeTables();

module.exports = pool;
