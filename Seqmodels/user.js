/* jshint indent: 1 */


const sequelize = require('../config/dbConfig');
const DataTypes = require('sequelize');
  const user = sequelize.define('user', {
		UserId: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		Username: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		Password: {
			type: DataTypes.BLOB,
			allowNull: true
		},
		Role: {
			type: DataTypes.STRING(10),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'user',
		hasTrigger: true,
		timestamps: false
	});
module.exports = user;
