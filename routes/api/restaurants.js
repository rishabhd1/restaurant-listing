const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Restaurant = require('../../models/Restaurant');

router.get('/', async (req, res) => {
  try {
    let restaurants = undefined;
    let sortBy = req.query.sort_by;
    let cuisines = req.query.cuisines;
    if (cuisines) {
      cuisines = new RegExp(
        cuisines.charAt(0).toUpperCase() + cuisines.slice(1)
      );
      if (sortBy) {
        restaurants = await Restaurant.find({ cuisines: cuisines }).sort(
          `-${sortBy}`
        );
        return res.json({ restaurants });
      }
      restaurants = await Restaurant.find({ cuisines: cuisines });
      res.json({ restaurants });
    } else if (sortBy && !cuisines) {
      restaurants = await Restaurant.find().sort(`-${sortBy}`);
      res.json({ restaurants });
    } else {
      restaurants = await Restaurant.find();
      res.json({ restaurants });
    }
    console.log(cuisines);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
