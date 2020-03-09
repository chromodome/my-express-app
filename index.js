const express = require('express');
const path = require('path');

// Initialize express app
const app = express();
const router = express.Router();

// Serve static pages
app.use(express.static('./'));

// Add API Routes
app.use('/api', router);

// Specify public page entry point
app.get('/', function(req, res) {
  res.sendFile(path.join('/index.html'));
});

// Serve backend routes
app.get('/api', function(req, res) {
  res.status(200).send('Hello World API');
});

// Specify port
const port = process.env.PORT || 5000;

// Start the app
app.listen(port, () => {
  console.log('App started on port: ' + port);
});
