
const pool = require('../db');

class EventService {
  async createEvent(eventData,userId) {

    
    const { title, description, date } = eventData;
    const time  = new Date(date).toISOString();


    const result = await pool.query(
      'INSERT INTO events (user_id, title, description, date) VALUES ($1, $2, $3, $4)',
      [userId, title, description, time]
    );
   
    
  
  }

  async getEvents(userId) {
 
    const result = await pool.query('SELECT * FROM events WHERE user_id = $1', [userId]);
  
    
    return result.rows;

  }

  async getEventsById(id,userId) {
 

    
    const result = await pool.query('SELECT * FROM events WHERE id = $1 AND user_id = $2', [id,userId]);
  
    
    return result.rows;

  }

  async updateEvent(id,eventData) {
    const {  title, description, date,userId } = eventData;
   
    
    const result = await pool.query(
      'UPDATE events SET title = $1, description = $2, date = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [title, description, date, id, userId]
    );
    
    return result.rows[0];
  }

  async deleteEvent(id,user_id) {
    
 const result = await pool.query('DELETE FROM events WHERE id = $1 AND user_id = $2 ', [id,user_id]);
return result.rows
  
}
}

module.exports =  EventService;
