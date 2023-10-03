const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const CartItem = require('./Cart-Item');

Product.belongsTo(Category);

Category.hasMany(Product);

Product.belongsTo(User, {
    through: 'user.id'
})

User.hasMany(CartItem, {
    through: 'cart.id'
});

CartItem.belongsTo(Cart, {
    through: 'user.id'
});







module.exports = { User, Product, Category, Cart, CartItem } ;