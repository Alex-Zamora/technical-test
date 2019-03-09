const path = require('path');
const multer = require('multer');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './src/public/images/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Check File Type
// function checkFileType(file, cb, req){
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);
//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     return cb('Error: Images Only!');
//   }
// }

// Init Upload
const upload = multer({
  storage: storage,
  // limits:{fileSize: 1000000},
  // fileFilter: function(req, file, cb){
  //   checkFileType(file, cb, req);
  // }
});

module.exports = {
  upload
}