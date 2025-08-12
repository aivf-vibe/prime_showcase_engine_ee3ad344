












module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    technologies: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    projectUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true,
    tableName: 'portfolios'
  });

  return Portfolio;
};












