const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Restaurant = require('../../models/Restaurant');

router.get('/', async (req, res) => {
  try {
    let restaurants = undefined;
    const sortBy = req.query.sort_by;
    if (sortBy === 'votes') {
      restaurants = await Restaurant.find().sort('-votes');
    } else if (sortBy === 'aggregate_rating') {
      restaurants = await Restaurant.find().sort('-aggregate_rating');
    } else if (sortBy === 'average_cost_for_two') {
      restaurants = await Restaurant.find().sort('-average_cost_for_two');
    } else {
      restaurants = await Restaurant.find();
    }

    res.json({ restaurants });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
