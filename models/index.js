const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const CartItem = require('./Cart-Item');

Product.belongsToMany(Category);

Category.hasMany(Product);

User.hasMany(Product);

User.hasMany(CartItem, {
    foreignKey: {name: 'userId', allowNull:false}, 
    onDelete: 'CASCADE'
});

Product.belongsTo(Category, {
    foreignKey: { name: 'categoryid', allowNull: false },
    onDelete: 'CASCADE'
});

Category.hasMany(Product, {
    foreignKey: { name: 'categoryid', allowNull: false },
    onDelete: 'CASCADE'
})

Cart.belongsTo(User, {
    foreignKey: {name: 'userid', allowNull: false},
    onDelete: 'CASCADE'

})

Cart.hasMany(CartItem, {
    foreignKey: {name: 'cartid', allowNull:false},
    onDelete: 'CASCADE'

})

CartItem.belongsTo(User, {
    foreignKey: {name: 'userid', allowNull:false},
    onDelete: 'CASCADE'
});

CartItem.belongsTo(Product, {
    foreignKey: {name: 'productid', allowNull: false},
    onDelete: 'CASCADE'
});

Product.hasMany(CartItem, {
    foreignKey: {name: 'productid', allowNull: false},
    onDelete: 'CASCADE'
})









module.exports = { User, Product, Category, Cart, CartItem } ;