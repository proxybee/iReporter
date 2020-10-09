/* eslint-disable max-len */
import db from "../db/db";
import Pagination from "../middleware/pagination"
// import Auth from '../middleware/auth';

// set-up end point to create a intervention
const allIncidents = {
  /**
   * Get All Incidents
   * @param {object} req
   * @param {object} res
   * @returns {object} incidents array
   */
  async getAllIncidents(req, res) {
    // Get current page from url (request parameter)
    const page_id = parseInt(req.params.page),
      currentPage = page_id === 1 ? page_id : currentPage,
      pageUri = '/incidents/';
    /*Get total items*/
    const { rowCount }= await db.query(`SELECT * FROM incidents WHERE createdBy = '${req.user.id}'`)
        // Display 10 items per page
    const perPage = 10,
      totalCount = rowCount;

    // Instantiate Pagination class
    const Paginate = new Pagination(totalCount, currentPage, pageUri, perPage),
    offset = (currentPage - 1) * perPage;
    const getAllQuery = `SELECT * FROM incidents WHERE createdBy = '${req.user.id}' ORDER BY type = 'redFlag', type = 'intervention' LIMIT '${Paginate.perPage}' OFFSET '${offset}'`;
    try {
      /*Query items*/
      const { rows } = await db.query(getAllQuery)
      if (!rows[0]) {
        return res.status(404).send({ message: "No Incident found" });
      }
      if (rows[0]) {
       const pages = Paginate.links()
        return res.status(200).send({ rows, pages, totalCount });
      }
    } catch (error) {
      return res.status(500)
        .send({ message: "Request gone wrong", error });
    }
  },

  async getAllIncidentsAdm(req, res) {
    const getAllQueryAdmin = "SELECT * FROM incidents";
    try {
      // check for if there are no incidents
      const { rows } = await db.query(
        getAllQueryAdmin
      ); /** if this doesn't work, review this line */
      if (!rows[0]) {
        return res.status(404).send({ message: "No Incident found" });
      }
      const { rowCount } = await db.query(getAllQueryAdmin);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(500)
      .send({ message: "Server error, please try again", error })
      .redirect("/");
    }
  },

  async updateStatus(req, res) {
    const getQuery = "SELECT * FROM incidents WHERE id=$1";
    const statusUpdate = `UPDATE incidents
          SET status=$1 where id=$2 returning *`;
    try {
      const { rows } = await db.query(getQuery, [req.params.id]);
      if (!rows[0]) {
        res.status(404).send({ message: "Incident not found" });
        return;
      }
      if (rows[0].status === "resolved" || rows[0].status === "rejected") {
        res.status(400).send({ message: "This incident has been closed" });
        return;
      }
      const values = [req.body.status, req.params.id];
      const result = await db.query(statusUpdate, values);
      console.log (res)
      return res.status(200).send(result.rows[0]);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  /**
   * Delete An Incident
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  async deleteIncident(req, res) {
    const deleteQuery = "DELETE FROM incidents WHERE id=$1 returning *";
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "Incident not found" });
      }
      return res.status(204).send({ message: "Incident deleted" });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default allIncidents;
