import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db/db";
import Helper from "../middleware/helper";

const User = {
  /**
   * Create A User */
  async signUp(req, res) {
    if (!req.body.email || !req.body.password || req.body.password.length < 5) {
      res.status(400).send({ message: "Invalid entry" });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      res
        .status(400)
        .send({ message: "Please enter a valid email address or password" });
      return;
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      users(id, firstname, lastname, username, email, phone_number, isAdmin, created_date, modified_date, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
    const values = [
      uuidv4(),
      req.body.firstname,
      req.body.lastname,
      req.body.username,
      req.body.email,
      req.body.phone_number,
      false,
      moment(new Date()),
      moment(new Date()),
      hashPassword
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      res.status(201).send({ token, message: "user created" });
    } catch (error) {
      if (error.routine === "_bt_check_unique") {
        return res
          .status(400)
          .send({ message: "User with that EMAIL already exist" });
      }
      return res
        .status(400)
        .send({ message: "error occured while trying to create user", error });
    }
  },
  /**
   * Login user object
   */
  async signIn(req, res) {
    if (!Helper.validateLogin) {
      return res.status(400).send({ message: "Some values are missing" });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: "Please enter a valid email address" });
    }
    const text = "SELECT * FROM users WHERE email = $1";
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res
          .status(400)
          .send({ message: "The credentials you provided is incorrect" });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res
          .status(400)
          .send({
            message:
              "Your email or password is incorrect, rectify and try again"
          });
      }
      const token = Helper.generateToken(rows[0].id);
      res
        .status(200)
        .send({
          token,
          message: "You have successfully logged in",
          users: rows[0]
        });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  },
  /**
   * Delete A User
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const deleteQuery = "DELETE FROM users WHERE id=$1 returning *";
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "user not found" });
      }
      return res.status(204).send({ message: "deleted" });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default User;
