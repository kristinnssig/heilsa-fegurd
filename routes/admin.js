var express = require('express'),
    router  = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

router.get('/', function(req, res){
    res.render('admin', {
        recipe: "recipes",
        title: "Home",
        splash: "true"
    });
});

module.exports = router;