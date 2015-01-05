var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var httpServer = require('http').Server(app);
var io = require('socket.io').listen(httpServer);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req,res){
  res.sendfile(__dirname+"/static/bootstrap.html");
});

app.get('/admin',function (req,res){
  res.sendfile(__dirname+"/static/admin.html");
})

io.sockets.on('connection',function(socket){
  socket.on('message',function(point){
    if(!isNaN(point.x) && !isNaN(point.y)){
      io.sockets.emit('data',point);
    }
  })
});

httpServer.listen(3000, function(){
  console.log("Express-Server laeuft auf dem Port 3000");
});
