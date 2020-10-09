import express from 'express';
import bodyParser from 'body-parser';
import Auth from '../middleware/auth';
import allIncidents from '../controllers/incidentController';
import Incidents from '../controllers/aIncidentController';

const app = express();
app.use(bodyParser.json());


app.get('/incidents/:page', Auth.verifyToken, allIncidents.getAllIncidents);
app.get('/admin/incidents/:page', Auth.verifyToken, Auth.checkUser, allIncidents.getAllIncidentsAdm);
app.get('/incident/:id', Auth.verifyToken, Incidents.getIncident);
app.get('/admin/incidents/:id', Auth.verifyToken, Auth.checkUser, Incidents.getIncidentAdm);
app.post('/incidents', Auth.verifyToken, Incidents.createIncident);
app.patch('/incidents/comment/:id', Auth.verifyToken, Incidents.updateIncidentCom);
app.patch('/incidents/status/:id', Auth.verifyToken, Auth.checkUser, allIncidents.updateStatus);
app.delete('/incidents/:id', Auth.verifyToken, Auth.checkUser, allIncidents.deleteIncident);


export default app;
