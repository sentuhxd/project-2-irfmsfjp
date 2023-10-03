const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cart extends Model {}

Cart.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        }
    }, {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'cart'
    }
)


module.exports = Cart