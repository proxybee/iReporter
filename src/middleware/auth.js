import jwt from 'jsonwebtoken';
import db from '../db/db';

const Auth = {
  /**
     * Verify Token */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(400).send({ message: 'Token is not provided or has expired' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (rows[0] < 0) {
        return res.status(400).send({ message: 'User not found' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      console.log("heeeeeeeeeeeeeeeeeey", error)
      return res.status(500).send({
        success: false,
        message: 'something went wrong please try again'
      });
    }
  },
  async checkUser(req, res, next) {
    try {
      const check = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(check, [req.user.id]);
      // console.log('hoooooooooooooooooool', rows);
      if (rows[0].isAdmin === false) {
      return res.status(201).send({ message: 'Unauthorized Action', status: 201 });
      }
      next();
    } catch (error) {
      // console.log('hoooooooooooooooooool', error);
      return res.status(400).send(error);
    }
  },
  // async accessPost(req, res, next) {
  //   try {
  //     const check = 'SELECT * FROM users WHERE id = $1';
  //     const { rows } = await db.query(check, [req.user.id]);
  //     // console.log('hoooooooooooooooooool', rows);
  //     if (rows[0].user.id === req.params.id) {
  //       console.log('jjjjjjjjjjj', rows[0].user.id, req.user.id )
  //     return res.status(401).send({ message: 'Unauthorized Action', status});
  //     }
  //     next();
  //   } catch (error) {
  //     // console.log('hoooooooooooooooooool', error);
  //     return res.status(400).send(error);
  //   }
  // },
};

export default Auth;
