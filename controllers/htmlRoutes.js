const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const op = Sequelize.Op

const db = require('../models')


router.get('/user/status', (req, res) => {
  res.send({ user: req.isAuthenticated() })
})


router.get('/category/list', (req, res) => {
  db.categories.findAll({
    attributes: ['id', 'name', 'description'],
    order: [['id', 'ASC']]
  }).then((categoryList) => {
    res.send({ categoryList })
  })
})


router.get('/cart/info', (req, res) => {
  if (req.isAuthenticated()) {
    db.cart_items.findAll({
      attributes: ['id', 'num', 'each_price', 'productId'],
      where: { userId: req.user }
    }).then((cart) => {
      const cartInfo = {}
      let totalCost = 0
      let uniqueItems = 0
      let totalItems = 0
      cart.forEach((element) => {
        totalCost += element.num * element.each_price
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


router.get('/', (req, res) => {
  db.categories.findAll({
    attributes: ['id', 'name', 'description', 'image_name'],
    order: [['id', 'ASC']]
  }).then((category) => {
    if (req.isAuthenticated()) {
      res.render('categories', { category })
    } else {
      res.render('categories', { layout: 'guest', category })
    }
  })
})


router.get('/category/:id', (req, res) => {
  db.products.findAll({
    attributes: ['id', 'name', 'description', 'image_name', 'price'],
    where: { categoryId: req.params.id },
    order: [['id', 'ASC']]
  }).then((categoryitems) => {
    if (req.isAuthenticated()) {
      res.render('category_items', { categoryitems })
    } else {
      res.render('guest_category_items', { layout: 'guest', categoryitems })
    }
  })
})


router.get('/search/:criteria', (req, res) => {
  db.products.findAll({
    attributes: ['id', 'name', 'description', 'image_name', 'price'],
    where: {
      [op.or]: [
        Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('name')),
          { [op.like]: '%' + req.params.criteria + '%' }
        ),
        Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('description')),
          { [op.like]: '%' + req.params.criteria + '%' }
        )
      ]
    },
    order: [['id', 'ASC']]
  }).then((categoryitems) => {
    if (req.isAuthenticated()) {
      res.render('category_items', { categoryitems })
    } else {
      res.render('guest_category_items', { layout: 'guest', categoryitems })
    }
  })
})


router.get('/logout', (req, res) => {
  req.logout()
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/login')
  })
})


router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/')
  } else {
    res.render('login', { layout: 'guest' })
  }
})


router.get('/signup', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/account')
  } else {
    res.render('signup', { layout: 'guest' })
  }
})

router.get('/account', (req, res) => {
  if (req.isAuthenticated()) {
    db.users.findOne({
      attributes: ['id', 'username', 'email'],
      where: {
        id: req.user
      }
    }).then((account) => {
      res.render('account', { account })
    })
  } else {
    res.redirect('/login')
  }
})


router.get('/account/orders', (req, res) => {
  if (req.isAuthenticated()) {
    db.orders.findAll({
      attributes: ['id', 'order_total', 'createdAt'],
      where: { userId: req.user },
      order: [['id', 'ASC']]
    }).then(orderHistory => res.render('order_history', { orderHistory }))
  } else {
    res.redirect('/login')
  }
})


router.get('/account/orders/:id', (req, res) => {
  if (req.isAuthenticated()) {
    db.orders.findOne({
      attributes: ['id', 'order_total', 'createdAt'],
      where: { id: req.params.id, userId: req.user },
      include: [
        { model: db.order_items, attributes: ['num', 'each_price'], include: [{ model: db.products, attributes: ['name', 'description'] }] }
      ]
    }).then((order) => {
      res.render('order_details', { order })
    })
  } else {
    res.redirect('/login')
  }
})


router.get('/cart', (req, res) => {
  if (req.isAuthenticated()) {
    db.cart_items.findAll({
      attributes: ['id', 'num', 'each_price', 'productId'],
      where: { userId: req.user },
      order: [['id', 'ASC']],
      include: [
        { model: db.products, attributes: ['name', 'description'] }
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
        tempObj.each_price = data[i].each_price
        tempObj.total_price = (data[i].num * data[i].each_price).toFixed(2)
        tempObj.productId = data[i].productId
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

router.get('*', (req, res) => {
  res.render('error')
})

module.exports = router
