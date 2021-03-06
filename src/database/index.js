import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import HelpOrder from '../app/models/HelpOrder';

const models = [User, Student, Plan, Registration, HelpOrder];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    const host = process.env.MONGO_HOST;
    const db = process.env.MONGO_DB;
    const port = process.env.MONGO_PORT;

    const mongoUrl = `mongodb://${host}:${port}/${db}`;

    this.mongoConnection = mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
