var http = require('http'),
	parking = require('./data'),
	db = require('./db'),
	app = require('./app')(parking);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});