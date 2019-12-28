const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Restaurant = require('../../models/Restaurant');

router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.json({ restaurants });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
