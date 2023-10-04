const router = require('express').Router();
const CartItem = require('../models/Cart-Item'); 

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
