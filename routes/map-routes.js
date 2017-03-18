const express = require('express');
const router = express.Router();
const collections = ["pubs"];
const mongojs = require('mongojs');
const config = require('../config/database');
//161209 61209
const db = mongojs('mongodb://' + config.userName + ':' + config.password + '@ds161209.mlab.com:61209/portland_breweries', ['breweries']);

router.get('/pubs', (req, res, next) => {
  db.breweries.find((err, pubs) => {
    if(err){
      res.send(err);
    }else{
      res.json(pubs);
    }
  });
});

module.exports = router;
