var http = require('http');
var fs = require('fs');
var path = require('path');
const makeDir = require('make-dir');

//Datum funktion.
function addzero(number){if(number <= 9){return "0" + number;}else{return number;};};
function getDate(dateannan, timeannan, milisecsave){
	if(!dateannan && !timeannan && !milisecsave){var date = new Date();}else if(!milisecsave){var annatdatum = dateannan.split('-');var annattid = timeannan.split(':');var date = new Date(annatdatum[0], annatdatum[1] - 1, annatdatum[2], annattid[0], annattid[1]);}else{var date = new Date(parseInt(milisecsave));};
	return {"datum": date.getFullYear() + '-' + addzero(date.getMonth() + 1) + '-' + addzero(date.getDate()), "tid": addzero(date.getHours()) + ':' + addzero(date.getMinutes()), "milisec": date.getTime(), "manad": date.getFullYear() + '-' + addzero(date.getMonth() + 1)};
};


var config = {
	"public": __dirname + '/public',
	"port": 7777
};


//Startar server och tillåtna filer
var server = http.createServer(function (request, response) {
	var filePath = '.' + request.url;
	if (filePath == './') {filePath = './index.html';};
	//Här radas alla tillåtna filer
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;	  
		case '.jpg':
			contentType = 'image/jpg';
			break;
		case '.ico':
			contentType = 'image/x-icon';
			break;
		case '.wav':
			contentType = 'audio/wav';
			break;
	};
	loadpage(filePath, extname, response, contentType);
});

function loadpage(filePath, extname, response, contentType){
	fs.readFile(config.public + '/' + filePath, function(error, content) {
		if (error) {
			if(error.code == 'ENOENT'){
				fs.readFile('./404.html', function(error, content) {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				});
			}
			else {
				response.writeHead(500);
				response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
				response.end(); 
			}
		}
		else {
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(content, 'utf-8');
		}
	});
};
var dataraids = [];
// Loading socket.io
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket, username) {
	// socket.emit('err', 'Användare kunde inte hittas.');
	socket.on('login', function (data){
		var datajson = JSON.parse(data);
		socket.username = datajson.username;
		socket.team = datajson.team;
		console.log('Namn: ' + datajson.username + ', Team: ' + datajson.team);
		var dataraidsfirst = [];
		for (var i = 0; i < dataraids.length; i++){
			if(i == 10){
				i = 9999999999;
			};
			dataraidsfirst.push(dataraids[i]);
		};
		socket.emit('sendinfo', {"userinfo": datajson, "dataraidsfirst": dataraidsfirst});
	});
	socket.on('postraid', function (data){
		data.username = socket.username;
		data.team = socket.team;
		data.kommer = 1;
		data.kommentar = [];
		console.log(data);
		dataraids.push(data);
		socket.emit('nyraid', data);
		socket.broadcast.emit('nyraid', data);
	});
	socket.on('disconnect', function (){
		var connected = io.sockets.sockets[socket.pair];
		if(!connected || connected == ''){}else{
			connected.pair = '';
			connected.emit('kopplingbruten', {type: 'error', text: 'Av någon anlening har parkopplingen avbrutits.'});
		};
		socket.pair = '';
	});
});
	
	
//Kollar IP adress för server.
function getIPAddress() {
	var interfaces = require('os').networkInterfaces();
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
			return alias.address;
		};
	};
	return '0.0.0.0';
};
var ip = getIPAddress();
console.log('http://localhost:' + config.port);
console.log('http://' + ip + ':' + config.port);
server.listen(config.port);