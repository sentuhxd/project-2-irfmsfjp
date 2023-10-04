const sequelize = require('../config/connection');
const { 
  User, 
  CartItem,
  Product,
  Cart,
  Category
} = require('../models');



const userData = require('./userData.json');
const productData = require('./productData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Category.bulkCreate(categoryData, {
    returning: true,
  });

  const products = await Product.bulkCreate(productData, {
    returning: true,
  });


  for (const user of users) {

    const cart = await Cart.create({
      user_id: user.id
    })
    const randomNumOfCartItems =  Math.floor(Math.random() * 5) + 1;
    // for (let i = 0; i < randomNumOfCartItems; i++) {
    //   const cartItem = await CartItem.create({
    //     cart_id: cart.id, quantity: 1
    //   })
    // }
  }

  

  process.exit(0);
};

seedDatabase();