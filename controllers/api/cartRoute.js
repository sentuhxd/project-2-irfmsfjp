const router = require('express').Router();
const Dish = require('../models/Cart');


router.get('/cart/:id', async (req, res) => {
    try {
        const dishData = await Dish.findByPk(req.params.id);
        console.log(cartData)