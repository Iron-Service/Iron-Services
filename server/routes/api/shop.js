const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Shop = require("../../models/Shop");
const Comment = require("../../models/Comment");
const Appointment = require("../../models/Appointment");
const Message = require("../../models/Message");
const User = require("../../models/User");
const City = require("../../models/City");
const ShopList = require("../../models/ShopList");
const isUserShop = require("../../middlewares/isUserShop");
const ensureLogedIn = require("../../middlewares/ensureLogedIn");

router.post("/create", ensureLogedIn("Error"), (req, res) => {
  const {
    name,
    direction,
    description,
    serviceType,
    serviceList,
    date
  } = req.body;

  const shop = { name, direction, description, serviceType, serviceList, date };
  Shop.findOne({ "direction.address": shop.direction.address }).then(shops => {
    if (shops && shops.direction.address === shop.direction.address)
      return res.status(400).json({
        message: `There's already a shop at ${shop.direction.address} place.`
      });
    ShopList.findOne({ serviceType: shop.serviceType }).then(serviceType => {
      if (!serviceType)
        return res.status(400).json({ message: "Error, serviceType no found" });

      let cont = [];
      const newShop = shop.serviceList;
      const serviceList = serviceType.serviceList;
      for (let i = 0, len = newShop.length; i < len; i++) {
        for (let j = 0, len2 = serviceList.length; j < len2; j++) {
          console.log(newShop[i])
          if (newShop[i].name === serviceList[j].name) {
            if (cont.indexOf(newShop[i]) != -1) cont.push("err");
            if(newShop[i].priceMax == 0) newShop[i].priceMax = newShop[i].priceMin;
            cont.push(newShop[i].name);
            break;
          }
        }

      }
      if (cont.length < 3 || cont.indexOf("err") != -1)
        return res.status(500).json({ message: "ListService error" });
      Shop.create(shop, (err, arrayShop) => {
        if (err)
          return res.status(402).json({ message: `Shop ${shop.name} error.` });
        req.user
          .update({ $push: { shopsList: arrayShop._id }, shop: true })
          .then(() =>
            City.findOne({ name: arrayShop.direction.city }).then(city => {
              if (!city)
                City.create({ name: arrayShop.direction.city }, err =>
                  res
                    .status(200)
                    .json({ message: `Shop ${shop.name} created.` })
                );
            })
          );
      });
    });
  });
});

//Show all shops of the owner
router.get("/", ensureLogedIn("Error"), (req, res) => {
  Shop.find({ _id: req.user.shopsList })
    .select({ name: 1, direction: 1, numVisits: 1 })
    .then(list => res.status(200).json(list))
    .catch(err => res.status(400).json(err));
});

//Enter into the shop
router.get("/:id", isUserShop("Error"), (req, res) => {
  Shop.findById(req.params.id)
    .then(shop => res.status(200).json(shop))
    .catch(err => res.status(400).json(err));
});

//Update address
router.put("/:id/update", isUserShop("Error"), (req, res) => {
  const { direction, description, horario, serviceList } = req.body;
  const shopUpdate = { direction, description, horario, serviceList };
  const p = _.pickBy(shopUpdate, _.identity);

  Shop.findByIdAndUpdate(req.params.id, p, { new: true })
    .then(shop => res.status(200).json(shop))
    .catch(err => res.status(400).json(err));
});
//Delete shop
router.delete("/:id/delete", isUserShop("Error"), (req, res) => {
  Shop.findByIdAndRemove(req.params.id)
    .then(shop => {
      if (!shop)
        return res.status(400).json({ message: "No such shop was found." });

      function commentPromise() {
        if (!shop.comments) return;
        return Promise.all(
          shop.comments.map(c => Comment.findByIdAndRemove(c))
        ).catch(err => console.log(err));
      }
      function messagePromise() {
        if (!shop.messages) return;
        return Promise.all(
          shop.messages.map(m => Message.findByIdAndRemove(m))
        ).catch(err => console.log(err));
      }
      function appointPromise() {
        if (!shop.appointments) return;
        return Promise.all(
          shop.appointments.map(a => Appointment.findByIdAndRemove(a))
        ).catch();
      }
      return Promise.all([
        commentPromise(),
        messagePromise(),
        appointPromise(),
        User.findByIdAndUpdate(req.user.id, {
          $pull: { shopsList: shop._id }
        }).exec()
      ])
        .then(() =>
          res
            .status(200)
            .json({ message: `Shop ${shop.name} removed from DB.` })
        )
        .catch(err => res.status(304).json({ message: err }));
    })
    .catch(err =>
      res.status(500).json({ message: `Delete did not succeed. ${err}` })
    );
});
module.exports = router;
