var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var Image = require("../models/images");
const upload = require("../multer/storage");
const fs = require("fs");

router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Image.find({
            user: req.query.user
        },function (err, images) {
            if (err) return next(err);
            res.json(images);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.post("/", passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
	if (token) {
        upload(req, res, function (err) {
            if(req.file == null || req.file == undefined || req.file == ""){
                res.json('No Image Set');
            }else{
                if (err) {
                    console.log(err);
                }else{
                    let image = new Image();
                    image.image = req.file.filename;
                    image.user = req.query.user;
                    image.save(()=>{
                        if (err) return next(err);
                        res.json(image.image);
                    });
                }
            }
        });
	} else {
	  	return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}    
});

router.delete("/:id", (req,res)=>{
    let query= {image:req.params.id};
    Image.remove(query, (err)=>{
        if(err){
            console.log(err);
        }else{
            let $filePath= "./uploads/" + req.params.id
            fs.unlinkSync($filePath, (err)=>{
                if(err){
                    console.log("couldnt delete " + req.params.id + " image");
                }              
            });
            res.send("The image was deleted...");
        }
    });
});

module.exports = router;
