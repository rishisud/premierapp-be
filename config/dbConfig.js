const Sequelize = require('sequelize');
MYSQL_CONFIG= {
    user: 'premierapp',
    host: 'premierapp-db.cvqpsge3a5to.ap-south-1.rds.amazonaws.com',
    database: 'premierapp',
    password: 'Pr3mi3raPP',
    dialect: "mysql"
}
const sequelize = new Sequelize(MYSQL_CONFIG.database,MYSQL_CONFIG.user,MYSQL_CONFIG.password, {
    host: MYSQL_CONFIG.host,
    dialect: MYSQL_CONFIG.dialect,
    define:{timestamps: true},
    pool:{
        max:10,
        min:0,
        acquire: 30000,
        idle: 10000
    }
})
module.exports = sequelize;