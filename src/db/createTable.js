import db from './db';


/**
 * Create Tables
 */
(async () => {
  try {
    const typeEnum = 'CREATE TYPE incident AS ENUM (\'redFlag\', \'intervention\');';
    await db.query(typeEnum);
  } catch (err) {
    console.log('Type incident already exist');
  } finally {
    const userTable = `CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY,
        firstname VARCHAR (64) NOT NULL,
        lastname VARCHAR (64) NOT NULL,
        username VARCHAR (80) NOT NULL,
        email VARCHAR (124) NOT NULL UNIQUE,
        phone_number VARCHAR NOT NULL,
        isAdmin BOOLEAN NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        password VARCHAR NOT NULL
      )`;
    const incidentTable = `CREATE TABLE IF NOT EXISTS incidents(
      id UUID PRIMARY KEY,
      createdBy UUID REFERENCES users(id),
      type incident,
      subject VARCHAR NOT NULL,
      comment VARCHAR NOT NULL,
      image VARCHAR,
      video VARCHAR,
      location VARCHAR NOT NULL,
      status VARCHAR NOT NULL DEFAULT 'pending',
      created_date TIMESTAMP,
      modified_date TIMESTAMP
      )`;

    await db.query(userTable);
    await db.query(incidentTable);
    console.log('Created user and Incident table');
  }
})();
