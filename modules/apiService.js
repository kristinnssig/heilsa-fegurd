var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var Staff = require('../models/staff.js');
var Api = require('../models/api.js');
var Service = require('../models/service.js');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var _ = module.exports;

_.newService = function(a, b){
    console.log(a);
};

_.getServices = function(public){
    var call;
    Service.find({'published':public},function(err,response){
        call = response;
        console.log(response);
    });
    return call;
    console.log(call);
};