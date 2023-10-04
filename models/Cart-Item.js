const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CartItem extends Model {}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        // Assuming you have a foreign key for the cart ID, add it here as 'cart_id'
        cart_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'cart', // Replace with your actual model name for carts
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'cart_item', // Change to your desired model name
    }
);

module.exports = CartItem;