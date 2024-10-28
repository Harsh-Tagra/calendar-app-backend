
class ResponseUtil {
    static successResponse(res, data, message = 'Success') {
   
      
      return res.status(200).json({ status: 'success', message, data });
    }
  
    static errorResponse(res, error, statusCode = 500) {
      return res.status(statusCode).json({ status: 'error', message: error.message });
    }
  }
  
  module.exports = ResponseUtil;
  