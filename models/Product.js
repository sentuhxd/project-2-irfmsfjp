module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    freezeTableName: true
  })
  Product.associate = (models) => {
    Product.hasMany(models.reviews, {
      foreignKey: { name: 'productId', allowNull: false },
      onDelete: 'cascade'
    })
    Product.hasMany(models.orderitems, {
      foreignKey: { name: 'productId', allowNull: false },
      onDelete: 'cascade'
    })
    Product.hasMany(models.cartitems, {
      foreignKey: { name: 'productId', allowNull: false },
      onDelete: 'cascade'
    })
    Product.belongsTo(models.categories, {
      foreignKey: { name: 'categoryId', allowNull: false },
      onDelete: 'cascade'
    })
  }
  return Product
}
