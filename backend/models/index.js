

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use SQLite for development, PostgreSQL for production
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'production' ? undefined : './database.sqlite',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
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

