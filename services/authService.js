const bcrypt = require('bcryptjs');
const pool = require('../db'); 

class AuthService {

  async registerUser(username,email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO users (username, password,email) VALUES ($1, $2,$3) RETURNING *';
      const values = [username, hashedPassword,email];
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the registered user
    } catch (err) {
      throw new Error('Error registering user: ' + err.message);
    }
  }

  async getUserByUsername(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the user if found
    } catch (err) {
      throw new Error('Error fetching user: ' + err.message);
    }
  }
}

module.exports = AuthService; // Export the class, not an instance
