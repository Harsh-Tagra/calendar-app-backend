
const bcrypt = require('bcryptjs');
const AuthService = require('../services/authService');
const TokenUtil = require('../utils/tokenUtil');
const ResponseUtil = require('../utils/responseUtil');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async registerUserController(req, res) {
    const { Name:username, email, password } = req.body;
  
    
    try {
      const user = await this.authService.registerUser(username, email,password);

      return ResponseUtil.successResponse(res, user, 'User registered successfully');
    } catch (err) {
      return ResponseUtil.errorResponse(res, err);
    }
  }

  async loginUserController(req, res) {
    const { email, password } = req.body;
    try {
      const user = await this.authService.getUserByUsername(email);
      if (!user) {
        return ResponseUtil.errorResponse(res, new Error('Invalid credentials'), 400);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return ResponseUtil.errorResponse(res, new Error('Invalid credentials'), 400);
      }

      const token = TokenUtil.generateToken({ userId: user.id });
      return ResponseUtil.successResponse(res, { token }, 'Login successful');
    } catch (err) {
      return ResponseUtil.errorResponse(res, err);
    }
  }
}

module.exports = AuthController;
