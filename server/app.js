// call the packages the product needs
import express from 'express';
import winston from 'winston';
import routes from './routes/red-flag-routes';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

const app = express();

// get homepage
app.get('/', (res, req) => {
  res.status(200).json({
      message:'hi, server is running fine',
    });
});

app.use('/api/v1', routes);
app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3020;
app.listen(port, () => logger.info(`listening on port ${port}...`));

export default app;