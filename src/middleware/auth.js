import jwt from 'jsonwebtoken';
import db from '../db/db';

const Auth = {
  /**
     * Verify Token */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    // const options = { expiresIn: '3d' };

    if (token) {
      const options = { expiresIn: '3d' };
      // return res.status(400).send({ message: 'Token is not provided' });
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, options);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (rows[0] < 0) {
        return res.status(400).send({ message: 'User not found' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(500)
      .send({
        error,
        success: false,
        message: 'something went wrong please try again'
      });
    }
  }
  else {
    decoded = { 
      error: `Authentication error. A Valid Token required.`,
      status: 401
    };
    res.status(401).send(decoded);
  }
  },

  async checkUser(req, res, next) {
    try {
      const check = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(check, [req.user.id]);
      if (rows[0].isAdmin === false) {
      return res.status(201).send({ message: 'Unauthorized Action', status: 201 });
      }
      next();
    } catch (error) {
      console.log('hoooooooooooooooooool', error);
      return res.status(400).send(error);
    }
  },
};

export default Auth;
