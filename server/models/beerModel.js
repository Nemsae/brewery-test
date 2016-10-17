const { get } = require('axios');

const connection = require('../config/db');
const squel = require('squel').useFlavour('mysql');

const beersTable = 'beers';

connection.query(`CREATE TABLE IF NOT EXISTS ${beersTable} (
   beer VARCHAR(100),
   description VARCHAR(2000),
   rating INT(100),
   comments VARCHAR(2000),
   id INT NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (id, beer),
   UNIQUE(beer)
)`, (err) => {
  if (err) throw err;
});

exports.getRandomBeer = (cb) => {
  get(`https://api.brewerydb.com/v2/beer/random?key=${process.env.BEER_KEY}`)
    .then((res) => {
      console.log('res.data: ', res.data);
      cb(null, res.data);
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

exports.addSample = (query, cb) => {
  console.log('query: ', query);
  exports.readData(beersTable, (err, favorites) => {
    if (err) throw err;
  });
  exports.create(beersTable, query, cb);
};

exports.readData = function (tablename, cb) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tablename}`, (err, data) => {
      if (err) return reject(err);
      // resolve(favorites);
      cb(null, data);
    });
  });
};

exports.getSamples = function (cb) {
  exports.readData(beersTable, (err, samples) => {
    if (err) throw err;
    cb(null, samples);
  });
};

// exports.deleteFavorite = (id, cb) => {
//   let currId = parseInt(id.id);
//   return new Promise((resolve, reject) => {
//     connection.query(`DELETE FROM ${favoritesTable} WHERE animeId = ${currId}`, (err, undeletedFavorites) => {
//       if (err) return reject(err);
//       exports.readData(favoritesTable, (err, data) => {
//         if (err) throw err;
//         cb(null, data);
//       });
//     });
//   });
// };

// exports.deleteTowatch = (id, cb) => {
//   let currId = parseInt(id.id);
//   console.log('currId deleteToWatch: ', currId);
//   return new Promise((resolve, reject) => {
//     connection.query(`DELETE FROM ${toWatchTable} WHERE animeId = ${currId}`, (err, undeletedWatchList) => {
//       if (err) return reject(err);
//       exports.readData(toWatchTable, (err, data) => {
//         if (err) throw err;
//         cb(null, data);
//       });
//     });
//   });
// };

// exports.addToWatchList = (toWatch, cb) => {
//   exports.readData(toWatchTable, (err, toWatchList) => {
//     if (err) throw err;
//     exports.create(toWatchTable, toWatch, cb)
//   });
// };

exports.create = (tablename, beer, cb) => {
  let beerRow = {
    beer: beer.name,
    description: beer.description,
    rating: beer.rating,
    comments: beer.comments
  };

  console.log('beerRow: ', beerRow);

  return new Promise((resolve, reject) => {
    let sql = squel.insert()
      .into(tablename) //  insert tablename
      .setFields(beerRow)
      .toString();

    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
      exports.readData(tablename, (err, data) => { //  insert tablename
        if (err) throw err;
        cb(null, data);
      });
    });
  });
};
