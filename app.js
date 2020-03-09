const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10485760 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /mp4/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Erro: MP4 files Only!');
  }
}

//Init app
const app = express();

// Public Folder
app.use(express.static('./'));

app.get('/', function(req, res) {
  res.sendFile(path.join('/index.html'));
});

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send('No file selected');
      } else {
        res.send('File Uploaded');
      }
    }
  });
});

// Specify port
const port = process.env.PORT || 5000;

// Start the app
app.listen(port, () => {
  console.log('App started on port: ' + port);
});
