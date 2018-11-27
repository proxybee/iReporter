import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

//get homepage
app.get('/', (res, req) => {
    res.status(200).send('hi, server is running fine');
});

const port = process.env.PORT || 3020;
app.listen(port, () => console.log(`listening on port ${port}...`));

export default app;
