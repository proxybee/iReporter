/* eslint-disable max-len */
import moment from "moment";
import uuidv4 from "uuid/v4";
import Helper from "../middleware/helper";
import db from "../db/db";
import Pagination from "../middleware/pagination"
// import Auth from '../middleware/auth';

// set-up end point to create a intervention
const Incidents = {
   /**
   * Get An Incident
   * @param {object} req
   * @param {object} res
   * @returns {object} incident object
   */
  async getIncident(req, res) {
    const getAQuery =
      "SELECT * FROM incidents WHERE id = $1 AND createdBy = $2";
    try {
      const { rows } = await db.query(getAQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "incident not found" });
      }
      console.log('gotchyaaaaaaaaaaaa', rows[0])
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Get An Incident Admin
   * @param {object} req
   * @param {object} res
   * @returns {object} incident object
   */
  async getIncidentAdm(req, res) {
    const getAQuery = "SELECT * FROM incidents WHERE id = $1";
    try {
      const { rows } = await db.query(getAQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "incident not found" });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Server error, please try again", error })
        .redirect("/");
    }
  },

  /**
   * Create An Incident
   * @param {object} req
   * @param {object} res
   * @returns {object} incident object
   */

  async createIncident(req, res) {
    const { err } = Helper.validateIncident(req.body);
    if (err) {
      res.status(400).send({ message: err.details[0].message });
      return;
    }
    const createQuery = `INSERT INTO
      incidents(id, createdBy, type, subject, comment, image, video, location, status, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning *`;
    const values = [
      uuidv4(),
      req.user.id,
      // Create type
      req.body.type,
      // Create subject
      req.body.subject,
      req.body.comment,
      req.body.image,
      req.body.video,
      req.body.location,
      "pending",
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res
        .status(201)
        .send({ message: "incident created", incident: rows, status: 201 });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async updateIncidentCom(req, res) {
    const findOneQuery =
      "SELECT * FROM incidents WHERE id=$1 AND createdBy = $2";
    const updateOneQuery = `UPDATE incidents
    SET comment=$1, image=$2, video=$3, location=$4, modified_date=$5 WHERE id = $6 AND createdBy = $7 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [
        req.params.id,
        req.user.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ message: "Incident not found" });
      }
      if (rows[0].status === "rejected" || rows[0].status === "resolved") {
        return res.status(400).send({
          message:
            "The incident have been resolved or rejected. Create a new incident"
        });
      }
      const newComment = [
        req.body.comment || rows[0].comment,
        req.body.image || rows[0].image,
        req.body.video || rows[0].video,
        req.body.location || rows[0].location,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, newComment);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

};

export default Incidents;
