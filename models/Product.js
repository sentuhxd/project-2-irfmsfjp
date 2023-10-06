// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const cloudinary = require('cloudinary').v2;
// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model: "category",
        key: "id"
      }
    }
    

    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);
Product.beforeCreate(async (product) => {
  console.log(product.imageUrl);
  if(product.imageUrl) {
    try {
      const result = await cloudinary.uploader.upload(product.imageUrl);
      console.log(result)
      product.imageUrl = result.secure_url;
    } catch(err) {
      console.error(err);
    }
  }
})
module.exports = Product;
