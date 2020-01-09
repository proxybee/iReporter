import db from './db';

const queryText = ` DROP TABLE IF EXISTS incidents;
                    DROP TABLE IF EXISTS users;
                    DROP TYPE IF EXISTS incident;`;
db.query(queryText)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.stack, 'error occured while dropping tables');
    db.end();
  });
