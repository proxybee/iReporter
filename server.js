// call the packages the product needs
import express from 'express';
import winston from 'winston';
import routes from './server/routes/red-flag-routes';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

const app = express();

// get homepage
app.get('/', (res, req) => {
  res.status(200).send('hi, server is running fine');
});

app.use('/api/v1', routes);

const port = process.env.PORT || 3020;
app.listen(port, () => logger.info(`listening on port ${port}...`));

export default app;
