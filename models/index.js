const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const CartItem = require('./Cart-Item');

Product.belongsTo(Category);

Category.hasMany(Product);







module.exports = { User, Product, Category, Cart, CartItem } ;