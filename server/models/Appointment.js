const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const appointmentSchema = new Schema({
    _author:{type:Schema.Types.ObjectId, ref:'User'},
    _shop: {type:Schema.Types.ObjectId, ref: "Shop"},
    content: String,
    date: Date,
    approved: {type:Boolean, default:false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
