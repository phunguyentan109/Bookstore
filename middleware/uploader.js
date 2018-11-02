require('dotenv').config();

var multer 	= require("multer");
var	storage = multer.diskStorage({
	filename: function(req, file, callback){
		callback(null, Date.now() + file.originalname);
	}
});

var	imageFilter = function(req, file, cb){
	if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
		return cb(new Error('Only image files are allowed!'), false);	
	}
	cb(null, true);
};

var cloudinary = require("cloudinary");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

module.exports = {
	upload: multer({storage: storage, fileFilter: imageFilter}),
	cloudinary: cloudinary
}