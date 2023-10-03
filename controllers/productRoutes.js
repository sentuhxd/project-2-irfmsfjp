const express = require('express');
const router = express.Router();
const { Product } = require('../models');

router.get('/products', async (req, res) => {
    try{
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve products'});
    }
});

router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.json(product);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve product' });
    }
  });
  
  router.post('/products', async (req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create a new product' });
    }
  });
  
  router.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const [rowsUpdated] = await Product.update(req.body, {
        where: { id: productId },
      });
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.json({ message: 'Product updated successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });
  
  router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await Product.destroy({
        where: { id: productId },
      });
      if (!deletedProduct) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.json({ message: 'Product deleted successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });
  
  module.exports = router;