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

router.put('/pub/:id', (req, res, next) => {
  var pub = req.body;
  
  var updatedPub = {
    properties: {},
    geometry:{}
  };

  if(pub.type){
    updatedPub.type = pub.type
  }

  if(pub.properties.Brewery){
    updatedPub.properties.Brewery = pub.properties.Brewery;
  }

  if(pub.properties.Address){
    updatedPub.properties.Address = pub.properties.Address;
  }

  if(pub.properties.Website){
    updatedPub.properties.Website = pub.properties.Website;
  }

  if(pub.properties.Amenities){
    updatedPub.properties.Amenities = pub.properties.Amenities;
  }

  if(pub.properties.Visited){
    updatedPub.properties.Visited = pub.properties.Visited;
  }

  if(pub.geometry.type){
    updatedPub.geometry.type = pub.geometry.type;
  }

  if(pub.geometry.coordinates){
    updatedPub.geometry.coordinates = pub.geometry.coordinates;
  }

  if(!updatedPub){
    res.status(400);
    res.json({
      "error": "Bad data"
    });
  } else {
    db.breweries.update({_id: mongojs.ObjectId(req.params.id)}, updatedPub, {}, (err, pub) => {
      if(err){
        res.send(err);
      }
      res.json(pub);
    });
  }
});


module.exports = router;
