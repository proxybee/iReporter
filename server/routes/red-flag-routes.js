import express from 'express';
import {getAllRedFlags, getRedFlag, addRedFlag, updateRedFlagLocation, updateRedFlagcomment, deleteRedFlag} from '../controllers/red-flag-controller';

const app = express();
app.use(express.json());

app.get('/red-flags', getAllRedFlags);
app.get('/red-flags/:redFlagId', getRedFlag);
app.post('/red-flags', addRedFlag);
app.patch('/red-flags/:redFlagId/location', updateRedFlagLocation);

export default app;