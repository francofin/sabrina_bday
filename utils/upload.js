const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "post_images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-sabrina-${file.originalname}`);
  },
});


const uploadFile = multer({
  storage: storage,
  fileFilter: imageFilter
});


module.exports = uploadFile;