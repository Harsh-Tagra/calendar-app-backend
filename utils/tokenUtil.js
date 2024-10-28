
const jwt = require('jsonwebtoken');

class TokenUtil {
  constructor() {
    this.secretKey = process.env.secretKey;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secretKey);
  }

  verifyToken(token) {
   
    try {
      return jwt.verify(token, this.secretKey);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
 
 authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token,"lol", (err, user) => {
    if (err) return res.sendStatus(403);

    req.auth = user;
    next();
  });
}

}

module.exports = new TokenUtil(); 