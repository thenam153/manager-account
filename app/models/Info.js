const { DataTypes, Model} = require('sequelize')

class Info extends Model {

}

module.exports = function(sequelize) {
    Info.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        star4: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        star5: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        gem: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        csb: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        autoTime: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, { sequelize })
    return Info
}