const path= require("path");
//add multer to manage multipart form
const multer= require("multer");

//storage management for the file
//that will be uploaded
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      // cb(null, file.originalname)
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })


 //management of the storage and the file that will be uploaded 
 //.single expects the name of the file input field
const upload= multer({storage: storage}).single("file");

module.exports= upload;

// this is the config file for multer
