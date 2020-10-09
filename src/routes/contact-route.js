import express from 'express';
import bodyParser from 'body-parser';
import Contact from '../controllers/contact';

const app = express();
app.use(bodyParser.json());

app.post('/contact', Contact.sendContact);

export default app;