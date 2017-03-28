var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ServiceSchema = mongoose.Schema({
    title: { type: String, required: true, index: true },
    desc: String,
    slug: String,
    published: Boolean,
    providers: [{userid: ObjectId}],
    price: String,
    duration: String,
    created_at: {type:Date, default:Date.now()}
});

var Service = module.exports = mongoose.model('Service', ServiceSchema);

module.exports.createService = function(newService, callback){
    newService.save(callback);
}
