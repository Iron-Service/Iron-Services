const express = require('express');
const router  = express.Router();
const Shop = require("../models/Shop");

const ensureLogedIn = require("../middlewares/ensureLogedIn");
/* GET home page */

const s = {

}

router.get('/', ensureLogedIn("/shop"), (req, res, next) => {

  Shop.find().then(
    shop => {
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

  Shop.find({serviceType:req.params.service})
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


module.exports = router;
