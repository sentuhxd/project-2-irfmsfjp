const router = require('express').Router();
const { Category } = require('../../models');

router.get('/categories', async (req, res) => {
    try{
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve categories'});
    }
});

module.exports = router;
