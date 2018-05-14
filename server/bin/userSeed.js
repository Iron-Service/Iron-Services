require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const Shop = require("../models/Shop");
const Comment = require("../models/Comment");

mongoose.connect(process.env.MONGODB_URI);

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync("1234", salt);

const comments = [
  { content: "blabla" },
  { content: "blabla" },
  { content: "blabla" },
  { content: "blabla" }
];
const shop = {
  name: "Chambawamba",
  description:"oandosadpasmd",
  direction:"landpmsad",
  serviceType: "Hairdresser",
  serviceList: [
    {
      name: "blabla",
      priceMin: 1
    },
    {
      name: "Pepe",
      priceMin: 1
    }
  ]
};
const users = [
  {
    username: "Pepe",
    email: "pepe@pepe.pepe",
    password: hashPass,
    shop: false,
    admin: false,
    evaluatedShops: []
  }
];

Promise.all([
  User.collection.drop(),
  Shop.collection.drop(),
  Comment.collection.drop()
]).then(() => {
  User.create(users, err => {
    if (err) {
      throw err;
    }
    console.log("Se ha añadido un Pepe");
  }).then(user => {
    Shop.create(shop, err => {
      if (err) {
        throw err;
      }
    }).then(shop => {
      console.log("Se ha creado una PepeShop");

      user[0]
        .update({ $push: { shopsList: shop._id }, shop: true })
        .then(() => {});
      console.log(comments);
      Comment.create(comments, err => {
        if (err) {
          throw err;
        }
      }).then(comment => {
        return Promise.all(
          comment.map(c => shop.update({ $push: { comments: c._id } }).exec())
        ).then(() => mongoose.connection.close());
      });
    });
  });
});
