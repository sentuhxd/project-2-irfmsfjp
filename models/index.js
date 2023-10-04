const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const CartItem = require('./Cart-Item');

// Product.belongsToMany(Category, {
//     through: 'category.id'
// });

User.hasOne(Cart, {
    foreignKey: 'user_id'
});

Cart.belongsTo(User, {
    foreignKey: 'user_id'
}); 

Cart.hasMany(CartItem, {
    foreignKey: 'cart_id'
})

CartItem.belongsTo(Cart, {
    foreignKey: 'cart_id'
})

Product.belongsToMany(Cart, {
    through: {
        model: CartItem,
        unique: false
    }
})

// Category.hasMany(Product);

// User.hasMany(Product);

// User.hasMany(CartItem, {
//     foreignKey: {name: 'user.id', allowNull:false}, 
//     onDelete: 'CASCADE'
// });

// Product.belongsTo(Category, {
//     foreignKey: { name: 'category.id', allowNull: false },
//     onDelete: 'CASCADE'
// });

// Category.hasMany(Product, {
//     foreignKey: { name: 'category.id', allowNull: false },
//     onDelete: 'CASCADE'
// })

// Cart.belongsTo(User, {
//     foreignKey: {name: 'user.id', allowNull: false},
//     onDelete: 'CASCADE'

// })

// Cart.hasMany(CartItem, {
//     foreignKey: {name: 'cart.id', allowNull:false},
//     onDelete: 'CASCADE'

// })

// CartItem.belongsTo(User, {
//     foreignKey: {name: 'user.id', allowNull:false},
//     onDelete: 'CASCADE'
// });

// CartItem.belongsTo(Product, {
//     foreignKey: {name: 'product.id', allowNull: false},
//     onDelete: 'CASCADE'
// });

// Product.hasMany(CartItem, {
//     foreignKey: {name: 'product.id', allowNull: false},
//     onDelete: 'CASCADE'
// })









module.exports = { User, Product, Category, Cart, CartItem } ;