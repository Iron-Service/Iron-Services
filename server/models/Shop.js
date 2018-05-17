const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const shopSchema = new Schema({
  name: {type:String, required:true},
  description: String,
  direction: {
    city:String,
    address:String,
    lat: Number,
    lng: Number,
  },
  date: [{
    name: String,
    amOp: {hour: String, minute:String},
    amCl: {hour: String, minute:String},    
    pmOp: {hour: String, minute:String},
    pmCl: {hour: String, minute:String},
    open: {type:Boolean, default:false},
    evening: Boolean
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
