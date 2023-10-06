const router = require('express').Router();
const CartItem = require('../../models/Cart-Item'); 
const withAuth = require('../../utils/auth')
const { User, Product} = require('../../models')

router.get('/cart/info', withAuth, async (req, res) => {
    if (req.isAuthenticated()) {
    CartItem.findAll({
        attributes: ['id', 'quantity', 'cart_id', 'product_id'],
        where: { user_id: req.user }
      }).then((cart) => {
        const cartInfo = {}
        let totalCost = 0
        let uniqueItems = 0
        let totalItems = 0
        cart.forEach((element) => {
          totalCost += element.num * element.price
          uniqueItems++
          totalItems += element.num
        })
        cartInfo.totalCost = totalCost.toFixed('2')
        cartInfo.uniqueItems = uniqueItems
        cartInfo.totalItems = totalItems
        res.send({ cartInfo })
      })
    } else {
      res.send({})
    }
  })

router.get('/cart', withAuth, async (req, res) => {
    if (req.isAuthenticated()) {
      CartItem.findAll({
        attributes: ['id', 'quantity', 'cart_id', 'product_id'],
        where: { user_id: req.user },
        order: [['id', 'ASC']],
        include: [
          { model: Product, attributes: ['product_name', 'description'] }
        ]
      }).then((data) => {
        let totalCost = 0
        let totalItems = 0
        const cart = []
        for (let i = 0; i < data.length; i++) {
          const tempObj = {}
          totalItems += data[i].num
          totalCost += data[i].num * data[i].each_price
          tempObj.id = data[i].id
          tempObj.num = data[i].num
          tempObj.product = data[i].each_price
          tempObj.total_price = (data[i].num * data[i].each_price).toFixed(2)
          tempObj.product_id = data[i].product_id
          tempObj.product = data[i].product
          cart.push(tempObj)
        }
        totalCost = totalCost.toFixed(2)
        res.render('checkout', { cart, cart_total: totalCost, total_items: totalItems })
      })
    } else {
      res.redirect('/login')
    }
  })

router.post('/cart/add', async (req, res) => {
  try {
      const newItem = await CartItem.create(req.body);

      res.status(201).json(newItem);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

router.get('/cart/:id', async (req, res) => {
    try {
       
        const cartItems = await CartItem.findAll({
            where: {
                cart_id: req.params.id
            }
          });
        console.log(cartItems);
        res.json(cartItems);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
router.put('/cart/update/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
      // Update the cart item's quantity based on the request data
      const [rowsUpdated] = await CartItem.update(req.body, {
          where: { id: itemId },
      });

      if (rowsUpdated === 0) {
          res.status(404).json({ message: 'Cart item not found' });
      } else {
          res.json({ message: 'Cart item updated successfully' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update cart item' });
  }
});

router.delete('/cart/remove/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
      // Delete the cart item based on the item ID
      const deletedItem = await CartItem.destroy({
          where: { id: itemId },
      });

      if (!deletedItem) {
          res.status(404).json({ message: 'Cart item not found' });
      } else {
          res.json({ message: 'Cart item deleted successfully' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

module.exports = router;
