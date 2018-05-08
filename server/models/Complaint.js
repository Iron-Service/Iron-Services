const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const complaintSchema = new Schema({
    author:{type:Schema.Types.ObjectId, ref:'User'},
    shop: {type:Schema.Types.ObjectId, ref: "Shop"},
    complaintType: {type:String, required:true},
    content: String,
    resolved: {type:Boolean, default:false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
