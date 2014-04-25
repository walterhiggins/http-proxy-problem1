var https = require('https'),
    http = require('http'),
    fs   = require('fs'),
    path = require('path'),
    httpProxy = require('http-proxy'),
    express = require('express'),
    httpsOpts = {
      key: fs.readFileSync(path.join(__dirname,'/private', 'agent2-key.pem'), 'utf8'),
      cert: fs.readFileSync(path.join(__dirname,'/private', 'agent2-cert.pem'), 'utf8')
    };

var app = express();
app.configure(function(){
  app.use('/static', express.static(path.join(__dirname,'/public')));
});
//
// Create the target HTTPS server 
//
https.createServer(httpsOpts, app ).listen(9010);

//
// Create the proxy server listening on port 443
//
httpProxy.createServer({
  ssl: httpsOpts,
  target: 'https://localhost:9010',
  secure: false
}).listen(8010);
