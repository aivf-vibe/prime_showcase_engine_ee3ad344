









module.exports = (sequelize, DataTypes) => {
  const Career = sequelize.define('Career', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    requirements: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    responsibilities: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    salaryRange: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    tableName: 'careers'
  });

  return Career;
};










