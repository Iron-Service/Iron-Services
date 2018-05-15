const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const shopSchema = new Schema({
  name: {type:String, required:true},
  description: String,
  direction: {
    address:String,
    lat: Number,
    lng: Number,
  },
  date: [{
    name: String,
    amOp: String,
    amCl: String,
    pmOp: String,
    pmCl: String
  }],
  serviceType:{
    type:String, 
    enum:['Hairdresser', "Mechanic", "Tailor", "Photographer", "Driving Courses"],
    required:true},
  serviceList: [{
    name:{type:String, required:true},
    priceMin:{type:Number, required:true},
    priceMax:{type:Number}
  }],
  comments: [{type:Schema.Types.ObjectId, ref:"Comment"}],
  evaluees: [{type:Schema.Types.ObjectId, ref: "User"}],
  positive: Number,
  negative: Number,
  numVisits: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
