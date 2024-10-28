const ResponseUtil = require('../utils/responseUtil');
const EventService = require('../services/eventService'); 
const tokenUtil = require('../utils/tokenUtil');

class EventController {
  constructor() {
    this.EventService = new EventService();
  }

  async createEvent(req, res) {
  
    const { title,token, date, description } = req.body;
    const {userId:user_id} = tokenUtil.verifyToken(token)
    try {
     
      
      await this.EventService.createEvent({ title, date, description },user_id);
      ResponseUtil.successResponse(res, 'Event created successfully');
    } catch (error) {
      ResponseUtil.errorResponse(res, error);
    }
  }

  async getEvents(req, res) {
    try {
      const {userId} = req.auth;


      const events = await this.EventService.getEvents(userId);
      
      ResponseUtil.successResponse(res, events);
    } catch (error) {
      ResponseUtil.errorResponse(res, error);
    }
  }

  async updateEvent(req, res) {
    const { id } = req.params;

    const { title, date, description,token } = req.body;
    const {userId} = tokenUtil.verifyToken(token)

    
    try {
      const updatedEvent = await this.EventService.updateEvent(id, {userId, title, date, description });
      if (!updatedEvent) {
        return ResponseUtil.errorResponse(res, { message: 'Event not found' }, 404);
      }
      ResponseUtil.successResponse(res, updatedEvent, 'Event updated successfully');
    } catch (error) {
      ResponseUtil.errorResponse(res, error);
    }
  }
async getEventsById(req,res){


  try {
    const { id } = req.params;
    const {userId} = req.auth;


    const event = await this.EventService.getEventsById(id,userId);
   
    
    ResponseUtil.successResponse(res, event);
  } catch (error) {
    ResponseUtil.errorResponse(res, error);
  }

}
  async deleteEvent(req, res) {
    const { id } = req.params;
    const {userId} = req.auth;
    

    try {
      const deleted = await this.EventService.deleteEvent(id,userId);
      if (!deleted) {
        return ResponseUtil.errorResponse(res, { message: 'Event not found' }, 404);
      }
      ResponseUtil.successResponse(res, null, 'Event deleted successfully');
    } catch (error) {
      ResponseUtil.errorResponse(res, error);
    }
  }
}

module.exports = EventController;
