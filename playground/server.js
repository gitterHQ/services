var express = require('express');
var hbs = require('express-hbs');
var localtunnel = require('localtunnel');
var marked = require('marked');
var fs = require('fs');
var extend = require('extend');
var services = require('..');
var app = express();

var lastParsed = {};
var userSettings = {};

app.use(express.bodyParser());

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.engine('hbs', hbs.express3());

var activityTemplate = require('handlebars').compile(fs.readFileSync(__dirname+'/views/activityItem.hbs', 'utf8'));

var tunnelUrl = '';
var PORT = 3333;

var prettyPrintExamples = function(service) {
  var stringified = {};
  Object.keys(service.examples).forEach(function(key) {
    stringified[key] = {
      headers: JSON.stringify(service.examples[key].headers, null, '  '),
      body: JSON.stringify(service.examples[key].body, null, '  ')
    };
  });
  return stringified;
};

var extendEvents = function(events, eventSettings) {
  return events.map(function(event) {
    return extend({}, event, {
      userSelected: eventSettings[event.id]
    });
  });
};

var mapEventsList = function(events) {
  var eventMap = {};
  events.forEach(function(event) {
    eventMap[event.id] = event.selected;
  });
  return eventMap;
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-Le-Account");
  next();
});

app.get('/', function(req, res){
  res.render('index', { services: services });
});

app.get('/:service', function(req, res) {
  var serviceName = req.params.service;
  var service = services[serviceName];
  if(!service) return res.send(404);

  var defaultEvents = service.settings.events;

  userSettings[serviceName] = userSettings[serviceName] || mapEventsList(defaultEvents);

  res.render('service', {
    id: serviceName,
    hookUrl: tunnelUrl + '/' + serviceName + '/hook',
    events: extendEvents(defaultEvents, userSettings[serviceName]),
    instructions: marked(service.instructions),
    examples: prettyPrintExamples(service),
    name: service.name
  });
});

app.get('/:service/icons/:icon/:type', function(req, res) {
  var service = services[req.params.service];
  if(!service) return res.send(404);

  var iconObj = service.icons[req.params.icon];
  if(!iconObj) return res.send(404);

  fs.readFile(iconObj[req.params.type], function(err, data) {
    if(err) return res.send(500, err);
    res.send(data);
  });
});

app.post('/:service/hook', function(req, res) {
  var serviceName = req.params.service;
  var service = services[serviceName];
  if(!service) return res.send(404);

  var settings = { events: userSettings[req.params.service] };
  var result;
  try {
    result = service.parse(req.headers, req.body, settings);
  } catch(e) {
    console.log(e);
  }
  var resultArray = [].concat(result || []);

  lastParsed[serviceName] = {
    headers: JSON.stringify(req.headers, null, '  '),
    body: JSON.stringify(req.body, null, '  '),
    settings: JSON.stringify(settings, null, '  '),
    raw: JSON.stringify(result, null, '  '),
    html: resultArray.map(function(result) {
      return activityTemplate({
        service: serviceName,
        messageMarkdown: marked(result.message),
        icon: result.icon,
        isError: result.errorLevel === 'error'
      });
    }).join('\n')
  };

  res.send(200);

});

app.post('/:service/settings/events/:id', function(req, res) {
  var service = services[req.params.service];
  if(!service) return res.send(404);

  userSettings[req.params.service][req.params.id] = !userSettings[req.params.service][req.params.id];

  res.send(200);
});

app.get('/:service/lastParsed', function(req, res) {
  var service = services[req.params.service];
  if(!service) return res.send(404);

  res.send(lastParsed[req.params.service]);
});

localtunnel(PORT, function(err, tunnel) {
    if (err) return console.log(err);

    tunnelUrl = tunnel.url;
    app.listen(PORT);
    console.log('server running at '+tunnelUrl+' and http://localhost:'+PORT);

    process.on('exit', function() {
      tunnel.close();
    });
});
