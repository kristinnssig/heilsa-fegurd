var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var BookingSchema = mongoose.Schema({
    service_id: ObjectId,
    provider_id: ObjectId,
    duration: String,
    time: Date,
    price: String,
    booked_at: {type:Date, default:Date.now()}
});

var Booking = module.exports = mongoose.model('Booking', ServiceSchema);

module.exports.bookService = function(newBooking, callback){
    newBooking.save(callback);
}