const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({}, { collection: 'restaurants' });

module.exports = Restaurant = mongoose.model('restaurants', RestaurantSchema);
