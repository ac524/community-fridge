const User = require('./User');
const FoodItem = require('./FoodItem');

// Create associations
User.hasMany(FoodItem, {
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
});

FoodItem.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, FoodItem };
