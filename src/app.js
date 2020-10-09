/* eslint-disable no-console */
// call the packages the product needs
import express from 'express';
import path from 'path';
import winston from 'winston';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import "regenerator-runtime/runtime";
import {notFound, errorHandler} from './middleware/errorMiddleware'
import routes from './routes/incident-routes';
import userRoute from './routes/user-route';
import contact from './routes/contact-route';
// import errorMiddleware from './middleware/errorMiddleware';

// initialize winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

// initialize new express app
const app = express();
app.use(morgan('common'));
//app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());

// load all files in public directory
app.use(express.static(path.resolve(`${__dirname}/../public`)));

// createTables();

// import routesnode
app.use('/api/v1', routes);
app.use('/api/v1/users', userRoute);
app.use('/api/v1', contact);

app.use(notFound);
app.use(errorHandler)

const port = process.env.PORT || 4020;
app.listen(port, () => logger.info(`listening on port ${port}...`));

export default app;
