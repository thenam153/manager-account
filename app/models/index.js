const Sequelize = require('sequelize')
const dbConfig  = require('config').database

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, {
    define: {
        freezeTableName: true
    },
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    logging: dbConfig.logging,
    dialect: dbConfig.dialect
})

sequelize.sync({
    force: false
})
.then(() => {
    console.log("SYNC SUCCESSED")
})
.catch((error) => {
    console.log("SYNC FAILED", error)
})
const Info = require('./Info')(sequelize)
module.exports.sequelize = sequelize
module.exports.Info = Info