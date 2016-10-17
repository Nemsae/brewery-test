const express = require('express');
const router = express.Router();
const BeerModel = require('../models/beerModel');

router.route('/random')
  .get((req, res) => {
    // let animeSearch = req.query;
    BeerModel.getRandomBeer((err, randomBeer) => {
      res.status(err ? 400 : 200).send(err || randomBeer);
    });
  });

router.route('/sample')
  .post((req, res) => {
    let query = req.query;
    BeerModel.addSample(query, (err, Samples) => {
      res.status(err ? 400 : 200).send(err || Samples);
    });
  })
  .get((req, res) => {
    BeerModel.getSamples((err, Samples) => {
      res.status(err ? 400 : 200).send(err || Samples);
    });
  });

// router.route('/favorites')
//   .post((req, res) => {
//     let animeToWatch = req.body;
//     BeerModel.addFavorite(animeToWatch, (err, favorites) => {
//       res.status(err ? 400 : 200).send(err || favorites);
//     });
//   })
//   .get((req, res) => {
//     BeerModel.readData('favorites', (err, favorites) => {
//       res.status(err ? 400 : 200).send(err || favorites);
//     });
//   })
//   .delete((req, res) => {
//     let id = req.query;
//     BeerModel.deleteFavorite(id, (err, undeletedFavorites) => {
//       res.status(err ? 400 : 200).send(err || undeletedFavorites);
//     });
//   });

module.exports = router;
