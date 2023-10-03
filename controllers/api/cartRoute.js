const router = require('express').Router();
const Dish = require('../models/Cart');


router.get('/cart/:id', async (req, res) => {
    try {
        const cartData = await Dish.findByPk(req.params.id);
        console.log(cartData)
        res.render('dish', cartData);
    } catch (err) {
      res.status(500).json(err);
    }
  });