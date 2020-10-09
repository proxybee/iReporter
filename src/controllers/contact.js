import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db/db";
import Helper from "../middleware/helper";

const Contact = {
  /**
   * Create A Contact */
  async sendContact(req, res) {
    if (!req.body.message || !req.body.firstname || !req.body.email) {
      res.status(400).send({ message: "fill required fields" });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      res
        .status(400)
        .send({ message: "Please enter a valid email address or password" });
      return;
    }
    const createQuery = `INSERT INTO
      contacts(id, firstname, lastname, email, subject, message, created_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      uuidv4(),
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.subject,
      req.body.message,
      moment(new Date()),
    ];

    try {
      const {row} = await db.query(createQuery, values)
      res.status(200).send({ status: 200, message: "contact submitted", contact: row });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "error occured while trying to create contact", error });
    }
  },
};

export default Contact;