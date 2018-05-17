require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const Shop = require("../models/Shop");
const Comment = require("../models/Comment");
const ShopList = require("../models/ShopList");
const City = require("../models/City");

mongoose.connect(process.env.MONGODB_URI);

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync("1234", salt);

const cityMadrid = [
  {
    name: "Madrid",
    districts: [
      { name: "Centro" },
      { name: "Arganzuela" },
      { name: "Barajas" },
      { name: "Carabanchel" },
      { name: "Chamartín" },
      { name: "Chamberí" },
      { name: "Ciudad Lineal" },
      { name: "Fuencarral-El Pardo" },
      { name: "Hortaleza" },
      { name: "Latina" },
      { name: "Moncloa-Aravaca" },
      { name: "Moratalaz" },
      { name: "Puente de Vallecas" },
      { name: "Retiro" },
      { name: "Salamanca" },
      { name: "San Blas" },
      { name: "Tetuán" },
      { name: "Usera" },
      { name: "Vicálvaro" },
      { name: "Villa de Vallecas" },
      { name: "Villaverde" }
    ]
  }
];

const serviceList = [
  {
    serviceType: "Hairdresser",
    serviceList: [
      { name: "Wet Cut" },
      { name: "Dry Cut" },
      { name: "Hair Up" },
      { name: "Hair Up and Trial" },
      { name: "Bridal Hair and Trial" },
      { name: "Cut and Finish" },
      { name: "Clipper Cut" },
      { name: "Full Head Highlights" },
      { name: "Full Head Bleach" },
      { name: "Tonal Glossing" },
      { name: "Balayage" },
      { name: "Roots Tint" },
      { name: "T-Section Highlights" },
      { name: "Gents' Highlights" }
    ]
  },
  {
    serviceType: "Mechanic",
    serviceList: [
      { name: "Brake & Clutch" },
      { name: "Car Electrical" },
      { name: "Suspension & Steering" },
      { name: "Cooling System & Overheating" },
      { name: "Engine Work & Tuning" },
      { name: "Fuel Injection" }
    ]
  },
  {
    serviceType: "Tailor",
    serviceList: [
      { name: "Skirts" },
      { name: "Dresses" },
      { name: "Trousers" },
      { name: "Jackets" },
      { name: "Coats" },
      { name: "Shirts / Blouses" },
      { name: "Miscellaneous" }
    ]
  },
  {
    serviceType: "Photographer",
    serviceList: [
      { name: "Portrait Photography" },
      { name: "Corporate Portrait" },
      { name: "Event Photography" },
      { name: "Artists and public figures" },
      { name: "Architectural photography" },
      { name: "Beauty and fashion photography" },
      { name: "The body and artistic nudes" }
    ]
  },
  {
    serviceType: "Driving Courses",
    serviceList: [
      { name: "Car License" },
      { name: "Motorcycle License" },
      { name: "Commercial License" },
      { name: "Heavy Trailer Endorsement" },
      { name: "Heavy RVs License" },
      { name: "Riding mopeds and scooters" }
    ]
  }
];


const shop = [
  {
    name: "Hairdresser1",
    description: "oandosadpasmd",
    direction:{
      address: "a",
      lat:40.391746, 
      lng:-3.697098
    },
    serviceType: "Hairdresser",
    serviceList: [
      {
        name: "Wet Cut",
        priceMin: 1
      },
      {
        name: "Dry Cut",
        priceMin: 2
      }
    ]
  },
  {
    name: "Hairdresser2",
    description: "oandosadpasmd",
    direction: {
      city:"Madrid",
      city:"Madrid",
      address: "b",
      lat:40.396372, 
      lng:-3.700283
    },
    serviceType: "Hairdresser",
    serviceList: [
      {
        name: "Dry Cut",
        priceMin: 10
      },
      {
        name: "Wet Cut",
        priceMin: 3
      },
      {
        name: "Gents' Highlights",
        priceMin: 50
      }
    ]
  },
  {
    name: "Hairdresser3",
    description: "oandosadpasmd",
    direction: {
      city:"Madrid",
      city:"Madrid",
      address: "c",
      lat:40.396372, 
      lng:-3.700283
    },
    serviceType: "Hairdresser",
    serviceList: [
      {
        name: "Bridal Hair and Trial",
        priceMin: 25
      },
      {
        name: "Fuencarral-El Pardo",
        priceMin: 10
      },
      {
        name: "Wet Cut",
        priceMin: 1
      }
    ]
  },
  {
    name: "Mechanic1",
    description: "oandosadpasmd",
    direction: {
      city:"Madrid",
      address: "d",
      lat:40.391746, 
      lng:-3.697098
    },
    serviceType: "Mechanic",
    serviceList: [
      {
        name: "Car Electrical",
        priceMin: 150
      },
      {
        name: "Fuel Injection",
        priceMin: 1130
      }
    ]
  },
  {
    name: "Mechanic2",
    description: "oandosadpasmd",
    direction: {
      city:"Madrid",
      address: "e",
      lat:40.396372, 
      lng:-3.700283
    },
    serviceType: "Mechanic",
    serviceList: [
      {
        name: "Car Electrical",
        priceMin: 160
      }
    ]
  },
  {
    name: "Mechanic3",
    description: "oandosadpasmd",
    direction: {
      city:"Madrid",
      address: "f",
      lat:40.396372, 
      lng:-3.700283
    },
    serviceType: "Mechanic",
    serviceList: [      
      {
        name: "Fuel Injection",
        priceMin: 120
      }
    ]
  },
];
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
  Comment.collection.drop(),
  ShopList.collection.drop(),
  City.collection.drop()
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
        const comments = [
          {_author:user[0]._id, content: "blabla" },
          {_author:user[0]._id, content: "blabla" },
          {_author:user[0]._id, content: "blabla" },
          {_author:user[0]._id, content: "blabla" }
        ];
      Comment.create(comments, err => {
        if (err) {
          throw err;
        }
      }).then(comment => {
        return Promise.all(
          comment.map(c => shop[0].update({ $push: { comments: c._id } }))
        ).then(() => {
          City.create(cityMadrid, err => {
            if (err) throw err;
            console.log("Se ha creado cityMadrid");
          }).then(() => {
            ShopList.create(serviceList, err => {
              if (err) throw err;
              console.log("Se ha creado serviceList");
              mongoose.connection.close();
            });
          });
        });
      });
    });
  });
});
