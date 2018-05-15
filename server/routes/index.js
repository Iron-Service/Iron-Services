const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");
const ShopList = require("../models/ShopList");
const City = require("../models/City");
const _ = require("lodash");
const ensureLogedIn = require("../middlewares/ensureLogedIn");
/* GET home page */

const s = {};

router.get("/", (req, res, next) => {
  Shop.find()
    .select({
      name: 1,
      direction: 1,
      serviceType: 1,
      serviceList: 1,
      positive: 1,
      negative: 1
    })
    .then(shop => {
      console.log(shop);
      res.status(200).json(shop);
    })
    .catch(err => res.status(500).json({ message: err }));
});

//ShopList
router.get("/shopList", (req, res) => {
  ShopList.find()
    .then(shopList => res.status(200).json(shopList))
    .catch(err => res.status(500).json({ message: err }));
});

//City
router.get("/city", (req, res) => {
  City.find()
    .then(city => res.status(200).json(city))
    .catch(err => res.status(500).json({ message: err }));
});

router.get("/:service", (req, res) => {
  let joker = {};

  let min = req.query.min;
  min = { priceMin: { $gte: min } };
  min.priceMin = _.pickBy(min.priceMin, _.identity);
  if (min.priceMin.$gte == undefined) min = _.pickBy(min.priceMin, _.identity);

  let max = req.query.max;
  max = { priceMax: { $lte: max } };
  max.priceMax = _.pickBy(max.priceMax, _.identity);
  if (max.priceMax.$lte == undefined) max = _.pickBy(max.priceMax, _.identity);

  if (req.query.name != undefined && req.query.name != "")
    joker = {
      "serviceList.name": {
        $all: decodeURIComponent(req.query.name).split(",")
      }
    };
  

  Shop.find({
    $and: [
      { serviceType: req.params.service },
      joker,
      { serviceList: { $elemMatch: min } },
      { serviceList: { $elemMatch: max } }
    ]
  })
    .select({ name: 1, direction: 1, description: 1, serviceList: 1 })
    .then(shop => res.status(200).json(shop))
    .catch(err => json.status(500).json({ message: err }));
});

router.get("/search/:id", (req, res) => {
  Shop.findOneAndUpdate(
    req.params.id,
    { $inc: { numVisits: +1 } },
    { new: true }
  )
    .select({
      name: 1,
      direction: 1,
      description: 1,
      serviceType: 1,
      serviceList: 1,
      comments: 1,
      positive: 1,
      negative: 1
    })
    .populate({
      path: "comments",
      populate: {
        path: "_author",
        select: "username",
        model: "User"
      }
    })
    .then(shop => res.status(200).json(shop))
    .catch(err => res.status(500).json({ message: err }));
});
//Update comments
router.get("/search/:id/:num", (req, res) => {
  const idShop = req.params.id;
  Shop.findByIdAndUpdate(idShop);
});

module.exports = router;
