const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const Product_Tag = require('./Product_Tag');



Product.belongsTo(Category, {

  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});


// Define a category as having many products, thus creating a foreign key in the `product` table
Category.hasMany(Product, {
  foreignKey: 'category_id',
   onDelete: 'CASCADE'
});


Product.belongsToMany(Tag, {
  through: {
    model: Product_Tag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'Product_Tags'
});

Tag.belongsToMany(Product, {
  through: {
    model: Product_Tag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'Tag_Products'
});

module.exports = { Category, Product, Tag, Product_Tag };
