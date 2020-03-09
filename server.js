//Install express server
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

app.use(compression());
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/niboxweb'));
// app.use(compression({ filter: shouldCompress }));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);



function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.get('/*', function (req, res, next) {
  if(req.xhr || req.headers.accept.indexOf('json') > -1 || req.url.indexOf('file-upload') > -1){
    next();
  }else{
    res.sendFile('index.html', {root: __dirname +'/dist/niboxweb'});
}});
