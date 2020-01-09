import express from 'express';
import bodyParser from 'body-parser';
import Auth from '../middleware/auth';
import Incidents from '../controllers/incidentController';

const app = express();
app.use(bodyParser.json());


app.get('/incidents', Auth.verifyToken, Incidents.getAllIncidents);
app.get('/admin/incidents', Auth.verifyToken, Auth.checkUser, Incidents.getAllIncidentsAdm);
app.get('/incidents/:id', Auth.verifyToken, Incidents.getIncident);
app.get('/admin/incidents/:id', Auth.verifyToken, Auth.checkUser, Incidents.getIncidentAdm);
app.post('/incidents', Auth.verifyToken, Incidents.createIncident);
app.patch('/incidents/comment/:id', Auth.verifyToken, Incidents.updateIncidentCom);
app.patch('/incidents/status/:id', Auth.verifyToken, Auth.checkUser, Incidents.updateStatus);
app.delete('/incidents/:id', Auth.verifyToken, Auth.checkUser, Incidents.deleteIncident);


export default app;
