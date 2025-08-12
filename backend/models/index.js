

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use PostgreSQL database
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'techcorp_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Service = require('./Service')(sequelize, Sequelize.DataTypes);
const Product = require('./Product')(sequelize, Sequelize.DataTypes);
const Blog = require('./Blog')(sequelize, Sequelize.DataTypes);
const Career = require('./Career')(sequelize, Sequelize.DataTypes);
const Portfolio = require('./Portfolio')(sequelize, Sequelize.DataTypes);

// Define associations
User.hasMany(Blog, { foreignKey: 'authorId' });
Blog.belongsTo(User, { foreignKey: 'authorId' });

module.exports = {
  sequelize,
  User,
  Service,
  Product,
  Blog,
  Career,
  Portfolio
};

