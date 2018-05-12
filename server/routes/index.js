const express = require('express');
const router  = express.Router();
const Shop = require("../models/Shop");
const _ = require('lodash');
const ensureLogedIn = require("../middlewares/ensureLogedIn");
/* GET home page */

const s = {

}

router.get('/', (req, res, next) => {

  

  Shop.find().then(
    shop => {
      console.log(shop)
      let serviceTypearray = [];
      shop.forEach(e => {
        if(serviceTypearray.indexOf(e.serviceType) === -1)
          serviceTypearray.push(e.serviceType)
      })
      res.status(200).json(serviceTypearray)}
  )
  .catch(err => res.status(500).json({message:err}))

});

router.get('/:service', (req, res) => {

   const all = [];

  let {priceMin, priceMax} = req.query;
  priceMin =  _.pickBy({priceMax, priceMin}, _.identity);

  let name = req.query.name;
  name = _.pickBy({name}, _.identity); //{serviceList:{$elemMatch:{name}}}
  all.push(name);
  let name2 = req.query.name2;
  name2 = _.pickBy({name:name2}, _.identity);
  all.push(name2)
  console.log(all)


  Shop.find({$and:[{serviceType:req.params.service},{serviceList:{$elemMatch:name}},{serviceList:{$elemMatch:name2}}]})
  .then(shop => {
      let search = []
      shop.forEach(e => {
        search.push({_id:e._id ,name:e.name, direction:e.direction, description:e.description})
      })
      res.status(200).json(search)}
  )
  .catch(err => json.status(500).json({message:err}))

});

router.get('/search/:id', (req, res) => {
  console.log(req.params.id)
  Shop.findOne({_id:req.params.id})
  .populate("comments")
  .then(shop => res.status(200).json(shop))
  .catch(err => res.status(500).json({message:err}))
})

// router.get('/search')

module.exports = router;
