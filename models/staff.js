var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var StaffSchema = mongoose.Schema({
    name: { type: String, required: true, index: true },
    bio: String,
    username: { type: String, required: true},
    published: Boolean,
    hours: [{day:String,time:String}],
    email: { type: String, required: true},
    password: { type: String, required: true },
    images: [{src : String, placement: Number}],
    roles: Array,
    created_at: {type:Date, default:Date.now()}
});

var Staff = module.exports = mongoose.model('Staff', StaffSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.validatePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    })
}