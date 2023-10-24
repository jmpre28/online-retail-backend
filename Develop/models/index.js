// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: 'product_id',
  unique: false
});

Category.hasMany(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

Product.belongsToMany(Tag, {
  through: { model: ProductTag },
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

Tag.belongsToMany(Product, {
  through: { model: ProductTag },
  foreignKey: 'tag_id',
  onDelete: 'CASCADE'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
