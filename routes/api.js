var express = require('express'),
    router  = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Staff = require('../models/staff.js');
var Api = require('../models/api.js');
var Service = require('../models/service.js');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var bcrypt = require('bcryptjs');

var newApi = Api({
	username:'kristinnssig',
	password:'Kss030801'
});

var newUser = Staff({
	name: 'Kristinn Snær',
	bio: 'Kristinn bjó til þessa síðu',
	email: 'mortallighting@gmail.com',
	username: 'kristinnssig',
	password: 'Kss030801',
	published: true,
	hours: [{day: 'man', time:'12:45-15:30'},{day:'þri',time:'10:00-14:00'}],
	images:[{src:'ds_kss.jpg',placement:1}],
	roles:['admin']
});

//Staff.createUser(newUser); 
//Api.createUser(newApi);    

passport.use(new BasicStrategy(
  function(username, password, done) {
    Api.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
			console.log(password + " + " + user.password);
			bcrypt.compare(password, user.password, function(err, isMatch){
				console.log(isMatch)
					if(err) handleError(err);
					if (!isMatch) { return done(null, false); }else{
						return done(null, user);
					}
			});
    });
  }
));

router.get('/',function(req,res){
	res.json([{uri : '/', method:'GET',description:'Sýna þessar upplýsingar.'},{uri : '/staff', method:'GET',description:'Sýna starfsfólk.'}]);
});

router.get('/staff', function(req, res){
	Staff.find({published:true},function(err,responses){
		res.json(responses);
	});
});
router.get('/staff/all',passport.authenticate('basic', { session: false }), function(req, res){
	Staff.find({published:true},function(err,responses){
		res.json(responses);
	});
});
router.post('/staff/new',passport.authenticate('basic', { session: false }), function(req, res){
	var b = req.body;

	req.checkBody('name', 'Name was not defined').notEmpty();
	req.checkBody('email', 'Email was not defined').notEmpty();
	req.checkBody('username', 'Username was not defined').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password was not defined').notEmpty();
	req.checkBody('bio', 'Bio was not defined').notEmpty();
	req.checkBody('password', 'Password was not defined').notEmpty();

	var newUser = Staff({
		name: b.name,
		bio: b.bio,
		email: b.email,
		username: b.username,
		password: b.password,
		published: b.pub,
		hours: b.hours,
		images: b.images,
		roles: b.roles
	});

	// save the user
	newUser.save(function(err) {
		if (err) throw err;

		console.log('User created!');
	});
	
	res.json({"User":"Created Successfully"},newUser);
});
router.post('/services/new',passport.authenticate('basic', { session: false }), function(req, res){
	var b = req.body;

	req.checkBody('title', 'Title was not defined').notEmpty();
	req.checkBody('username', 'Username was not defined').notEmpty();
	req.checkBody('slug', 'Slug was not defined').notEmpty();
	req.checkBody('price', 'Price was not defined').notEmpty();

	if(b.price == "undefined")
		b.price = true;

	var newService = Service({
		title: b.title,
		desc: b.description,
		slug: b.slug,
		published: b.published,
		providers: b.providers,
		price: b.price,
		duration: b.duration
	});

	// save the user
	newService.save(function(err) {
		if (err) throw err;

		console.log('Service "'+ b.title +'" created!');
	});
	
	res.json(newService);
});

router.get('/services', function(req,res){
	Service.find({'published':true},function(err,responses){
		res.json(responses);
	});
});
router.get('/services/all',passport.authenticate('basic', { session: false }), function(req,res){
	Service.find({},function(err,responses){
		res.json(responses);
	});
});

module.exports = router;