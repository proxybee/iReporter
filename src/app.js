/* eslint-disable no-console */
// call the packages the product needs
import express from 'express';
import path from 'path';
import winston from 'winston';
import "regenerator-runtime/runtime";
import routes from './routes/incident-routes';
import userRoute from './routes/user-route';

// initialize winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

// initialize new express app
const app = express();

// load all files in public directory
app.use(express.static(path.resolve(`${__dirname}/../public`)));

// createTables();

// import routes
app.use('/api/v1', routes);
app.use('/api/v1/users', userRoute);


const port = process.env.PORT || 4020;
app.listen(port, () => logger.info(`listening on port ${port}...`));

export default app;
