var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var app = express();

var configMapping = {
  databaseURI:   'PARSE_MONGODB_URI',
  appId:         'PARSE_APP_ID',
  masterKey:     'PARSE_MASTER_KEY',
  fileKey:       'PARSE_FILE_KEY',
  clientKey:     'PARSE_CLIENT_KEY',
  javascriptKey: 'PARSE_JAVASCRIPT_KEY',
  restAPIKey:    'PARSE_REST_API_KEY',
  dotNetKey:     'PARSE_DOTNET_KEY'
};

// Specify the connection string for your mongodb database
// and the location to your Parse cloud code
var config = {
  cloud: '/usr/src/app/parse-server/cloud/main.js', // Provide an absolute path
};

Object.keys(configMapping).forEach(function(configKey) {
  var configVal = process.env[configMapping[configKey]];
  if (configVal) {
    config[configKey] = configVal;
  }
});

var api = new ParseServer(config);

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// Hello world
app.get('/', function(req, res) {
  res.status(200).send('Express is running here. Check /parse directory for magic :)');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('parse-server running on port', port);
  console.log('config:', config);
});

