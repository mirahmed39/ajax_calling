const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Bring in mongoose model, Place, to represent a restaurant
const Place = mongoose.model('Place');

// TODO: create two routes that return json
// GET /api/places
// POST /api/places/create
// You do not have to specify api in your urls
// since that's taken care of in app.js when
// this routes file is loaded as middleware
router.get('/places', (req, res) => {
    const location = req.query.location;
    const cuisine = req.query.cuisine;

    if(location && cuisine) {
        Place.find({location: location, cuisine:cuisine}, function (err, restaurants) {
           res.json(restaurants);
        });
    } else if (location) {
        Place.find({location: location}, function (err, restaurants) {
            res.json(restaurants);
        });
    } else if (cuisine) {
        Place.find({cuisine:cuisine}, function (err, restaurants) {
            res.json(restaurants);
        });
    } else {
        Place.find(function (err, restaurants) {
            res.json(restaurants);
        });
    }
});

router.post('/places/create', (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const cuisine = req.body.cuisine;

    const restaurant = new Place({
        name: name,
        cuisine: cuisine,
        location: location
    });
    restaurant.save(function(err, restaurant) {
        if (err && err.code === 11000) {
            res.json({"error": "Restaurant Already Exists!"});
        } else if(err)
            res.json({"error": "All the fields must be populated"});
        else
            // send back the object that was saved.
            res.json(restaurant);
    });
});

module.exports = router;
