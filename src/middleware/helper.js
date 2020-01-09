// import dotenv from 'dotenv';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    }, process.env.JWT_SECRET, { expiresIn: '5d' });
    return token;
  },
  validateIncident(incident) {
    const schema = {
      username: Joi.string().min(5).required(),
      type: Joi.any().valid(['Red Flag', 'Intervention']).required(),
      subject: Joi.valid('Bad Road', 'Environmental Hazard', 'Health Hazard', 'Safety Hazard', 'Human Right', 'Corruption', 'other'),
      other: Joi.string()
        .when('a', { is: 'other', then: Joi.required() }),
      comment: Joi.string().email({ minDomainAtoms: 2 }).required(),
      status: Joi.string().default('pending'),
      location: Joi.string().min(3),
      created_date: Joi.date().default(Date.now, 'time of creation'),
      modified_date: Joi.date().default(Date.now, 'time of update'),
    };

    return Joi.validate(incident, schema, { abortEarly: false });
  },
  
  validateUpdateComment(incident) {
    const schema = {
      comment: Joi.string().min(3).required(),
      location: Joi.string().min(3).required(),
    };

    return Joi.validate(incident, schema);
  },

  validateUpdateStatus(incident) {
    const schema = {
      status: Joi.any().valid(['pending', 'investigating', 'resolved', 'rejected']).required(),
    };
    return Joi.validate(incident, schema);
  },
  validateUser(user) {
    const schema = {
      username: Joi.string().min(5).required(),
      fullName: Joi.string().min(5).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(6).required(),

    };
    return Joi.validate(user, schema);
  },
  validateLogin(user) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(6).required(),
    };
    return Joi.validate(user, schema);
  },
};

export default Helper;
