// Assuming Sequelize or similar ORM
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Assignment = sequelize.define('Assignment', {
  mentor_id: { type: DataTypes.INTEGER, allowNull: false },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  // Add fields for growth tracking, e.g., progress notes
  progress: { type: DataTypes.TEXT, allowNull: true },
});

module.exports = Assignment;
